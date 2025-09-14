import { serve } from "https://deno.land/std@1.369.0/http/server.ts";
import { Resend } from "npm:resend";

const kv = await Deno.openKv();
const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const functionSecret = Deno.env.get("FUNCTION_SECRET");
const RATE_LIMIT_MAX = Number(Deno.env.get("RATE_LIMIT_MAX") ?? "5");
const RATE_LIMIT_WINDOW = Number(Deno.env.get("RATE_LIMIT_WINDOW") ?? "60");

interface EmailRequest {
  name: string;
  email: string;
  organization: string;
}

serve(async (req: Request): Promise<Response> => {
  const origin = req.headers.get("Origin") ?? "";
  if (!allowedOrigins.includes(origin)) {
    return new Response(
      JSON.stringify({ error: "Origin not allowed" }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  if (!functionSecret || authHeader !== `Bearer ${functionSecret}`) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const rateLimitKey = ["rate_limit", ip];
  const { value } = await kv.get<number>(rateLimitKey);
  if ((value ?? 0) >= RATE_LIMIT_MAX) {
    return new Response(
      JSON.stringify({ error: "Too many requests" }),
      {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
  await kv.set(rateLimitKey, (value ?? 0) + 1, { expireIn: RATE_LIMIT_WINDOW * 1000 });

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "Missing RESEND_API_KEY environment variable" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const { name, email, organization } = (await req.json()) as EmailRequest;

    if (!name || !email || !organization) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, organization" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const resend = new Resend(resendApiKey);

    const emailResult = await resend.emails.send({
      from: 'سحابة الأثر@impactcloudpro.com',
      to: [email],
      subject: '🎉 طلب تسجيلك مستلم',
      html: `
        <div dir="rtl" style="font-family: 'Cairo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
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
                <li style="margin-bottom: 8px;">سيتواصل معك فريقنا فور إنطلاق المنصة</li>
                <li style="margin-bottom: 8px;">ستحصل على دعوة للوصول المبكر للمنصة</li>
                <li>ستكون من أوائل من يجرب منصة سحابة الأثر</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
               شكراً لانضمامك إلى رحلة التغيير الإيجابي معنا
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
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: emailResult.error }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        emailId: emailResult.data?.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in send-email function:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});

