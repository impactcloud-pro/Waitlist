import { Resend } from 'resend'

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

export interface EmailRequest {
  name: string
  email: string
  organization: string
}

export async function sendWelcomeEmail({ name, email, organization }: EmailRequest) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'سحابة الأثر@impactcloud.com',
      to: [email],
      subject: '🎉 طلب تسجيلك مستلم',
      html: `
        <div dir="rtl" style="font-family: 'Tajawal', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #18325a; color: white; padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">سحابة الأثر</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">مدعومة من أثرنا</p>
          </div>
          
          <div style="background-color: white; padding: 40px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #18325a; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;">
              🎉 مرحباً بك في سحابة الأثر
            </h2>
            
            <p style="color: #333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
              مرحباً <strong>${name}</strong>،
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              لقد استلمنا طلب تسجيل منظمتك (<strong>${organization}</strong>) وسنراجع البيانات قريباً.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin: 25px 0;">
              <h3 style="color: #18325a; font-size: 18px; font-weight: bold; margin-bottom: 15px;">ماذا يحدث الآن؟</h3>
              <ul style="color: #666; margin: 0; padding-right: 20px;">
                <li style="margin-bottom: 8px;">سيتواصل معك فريقنا فور إنطلاق المنصة</li>
                <li style="margin-bottom: 8px;">ستحصل على دعوة للوصول المبكر للمنصة</li>
                <li style="margin-bottom: 8px;">ستكون من أوائل من يجرب منصة سحابة الأثر</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.5; margin-top: 30px; text-align: center;">
              شكراً لانضمامك إلى رحلة التغيير الإيجابي معنا
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>© 2025 سحابة الأثر. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      `,
      text: `مرحباً ${name}، لقد استلمنا طلب تسجيل منظمتك (${organization}) وسنراجع البيانات قريباً. شكراً لانضمامك إلى سحابة الأثر.`
    })

    if (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send email')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}
