import { Resend } from 'npm:resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface EmailRequest {
  name: string;
  email: string;
  organization: string;
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to sanitize input (prevent XSS in email content)
function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Check for API key
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Parse and validate request body
    let requestData: EmailRequest;
    try {
      requestData = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const { name, email, organization } = requestData;

    // Validate required fields
    if (!name || !email || !organization) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields', 
          required: ['name', 'email', 'organization'] 
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Sanitize inputs to prevent XSS
    const safeName = sanitizeInput(name);
    const safeOrganization = sanitizeInput(organization);

    const resend = new Resend(resendApiKey);
    
    // FIX: Use a verified domain or resend's default domain
    // Replace 'send.impactcloudpro.com' with either:
    // 1. 'onboarding@resend.dev' (Resend's default - works immediately)
    // 2. Your verified domain from Resend dashboard
    const emailResult = await resend.emails.send({
      from: 'سحابة الأثر <onboarding@resend.dev>', // ✅ Using Resend's verified domain
      to: [email],
      subject: '🎉 طلب تسجيلك مستلم',
      html: `
        <div dir="rtl" style="font-family: 'Tajawal', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #18325a 0%, #2563eb 100%); padding: 40px 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 28px; margin: 0; font-weight: bold;">سحابة الأثر</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 10px 0 0 0;">منصة قياس الأثر الاجتماعي</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #18325a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">مرحباً ${safeName}</h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
              لقد استلمنا طلب تسجيل منظمتك <strong style="color: #18325a;">${safeOrganization}</strong> وسنراجع البيانات قريباً.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-right: 4px solid #18325a; margin: 20px 0;">
              <h3 style="color: #18325a; font-size: 18px; margin: 0 0 10px 0;">ماذا يحدث الآن؟</h3>
              <ul style="color: #6b7280; margin: 0; padding-right: 20px;">
                <li style="margin-bottom: 8px;">سيتواصل معك فريقنا خلال 24 ساعة</li>
                <li style="margin-bottom: 8px;">ستحصل على دعوة للوصول المبكر للمنصة</li>
                <li>ستكون من أوائل من يجرب منصة سحابة الأثر</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                شكراً لثقتك في سحابة الأثر
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 سحابة الأثر. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      `,
    });

    // Better error handling for Resend API
    if (emailResult.error) {
      console.error('Resend API error:', emailResult.error);
      
      // Return user-friendly error based on Resend error type
      let userError = 'Failed to send email';
      if (emailResult.error.message?.includes('domain is not verified')) {
        userError = 'Email service configuration issue';
      } else if (emailResult.error.message?.includes('rate limit')) {
        userError = 'Too many requests, please try again later';
      }
      
      return new Response(
        JSON.stringify({ 
          error: userError,
          // Only include details in development
          ...(Deno.env.get('ENVIRONMENT') === 'development' && { details: emailResult.error })
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    console.log('Email sent successfully:', emailResult.data?.id);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        emailId: emailResult.data?.id 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error('Unexpected error in send-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        // Only show error details in development
        ...(Deno.env.get('ENVIRONMENT') === 'development' && { 
          details: error instanceof Error ? error.message : 'Unknown error' 
        })
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});
