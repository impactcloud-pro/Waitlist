import { supabase, type RegistrationRequest } from '../lib/supabase'

export interface RegistrationData {
  name: string
  email: string
  phone: string
  organization: string
  country: string
}

export async function submitRegistration(data: RegistrationData) {
  try {
    // Save to Supabase
    const { data: savedData, error: dbError } = await supabase
      .from('registration_requests')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        country: data.country
      }])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('فشل في حفظ البيانات. يرجى المحاولة مرة أخرى.')
    }

    // Send welcome email via Supabase Edge Function
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
      } else {
        const emailResult = await emailResponse.json()
        console.log('Email sent successfully:', emailResult)
      }
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the entire process if email fails
      // The registration is still saved
    }

    return {
      success: true,
      message: 'تم تسجيل طلبك بنجاح!',
      data: savedData
    }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'حدث خطأ غير متوقع'
    }
  }
}
