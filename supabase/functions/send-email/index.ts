// api/send-email.ts (or api/send-email.js)
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(req: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Missing RESEND_API_KEY environment variable' },
        { 
          status: 500,
          headers: corsHeaders
        }
      );
    }

    const body: EmailRequest = await req.json();
    const { name, email, organization } = body;

    if (!name || !email || !organization) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, organization' },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    const resend = new Resend(resendApiKey);
    
    // Debug logging
    console.log('=== EMAIL DEBUG INFO ===');
    console.log('API Key (first 10 chars):', resendApiKey.substring(0, 10));
    console.log('Sender email:', 'سحابة الأثر <noreply@impactcloudpro.com>');
    console.log('Recipient email:', email);
    console.log('========================');
    
    const emailResult = await resend.emails.send({
      from: 'سحابة الأثر <noreply@impactcloudpro.com>',
      to: [email],
      subject: '🎉 طلب تسجيلك مستلم',
      html: `
        <div dir="rtl" style="font-family: 'Tajawal', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #18325a 0%, #2563eb 100%); padding: 40px 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 28px; margin: 0; font-weight: bold;">سحابة الأثر</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 10px 0 0 0;">منصة قياس الأثر الاجتماعي</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #18325a; font-size: 24px; margin: 0 0 20px 0; text-align: center;">مرحباً ${name}</h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
              لقد استلمنا طلب تسجيل منظمتك <strong style="color: #18325a;">${organization}</strong> وسنراجع البيانات قريباً.
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

    if (emailResult.error) {
      console.error('Email sending failed:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email', details: emailResult.error },
        { 
          status: 500,
          headers: corsHeaders
        }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        emailId: emailResult.data?.id 
      },
      { 
        status: 200,
        headers: corsHeaders
      }
    );

  } catch (error) {
    console.error('Error in send-email function:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}
