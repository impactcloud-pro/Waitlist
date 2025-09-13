import { supabase, type RegistrationRequest } from '../lib/supabase'

export interface RegistrationData {
  name: string
  email: string
  phone: string
  organization: string
  country: string
  city: string
}

export async function submitRegistration(data: RegistrationData) {
  try {
    // Save to Supabase
      const { data: savedData, error: dbError } = await supabase
        .from('registration_requests')
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            organization: data.organization,
            country: data.country,
            city: data.city,
          },
        ])
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        return {
          success: false,
          message: 'فشل في حفظ البيانات. يرجى المحاولة مرة أخرى.',
          errorType: 'database',
        }
      }

      // Send welcome email via Supabase Edge Function
      let emailErrorMessage: string | null = null
      try {
        const emailResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            organization: data.organization
          })
        })

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json()
          console.error('Email API error:', errorData)
          emailErrorMessage = 'تم حفظ البيانات لكن فشل إرسال البريد الإلكتروني.'
        }
      } catch (emailError) {
        console.error('Email error:', emailError)
        emailErrorMessage = 'تم حفظ البيانات لكن فشل إرسال البريد الإلكتروني.'
      }

      return {
        success: true,
        message: emailErrorMessage || 'تم تسجيل طلبك بنجاح!',
        data: savedData,
        emailError: emailErrorMessage
      }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'حدث خطأ غير متوقع'
    }
  }
}
