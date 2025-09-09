import { supabase, type RegistrationRequest } from '../lib/supabase'
import { sendWelcomeEmail } from '../api/send-email'

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

    // Send welcome email
    try {
      await sendWelcomeEmail({
        name: data.name,
        email: data.email,
        organization: data.organization
      })
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