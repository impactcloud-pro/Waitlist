import logoImage from '/5.png';
import { useState } from 'react';
import { ChevronDown } from "lucide-react";
import { submitRegistration, type RegistrationData } from '../services/registrationService';
import countries from '../data/countries';

interface RegisterPageProps {
  onNavigate: (page: 'home' | 'register' | 'thank-you') => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    country: '',
    city: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // فلترة الدول حسب النص المكتوب
  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchValue.toLowerCase()) ||
    country.includes(searchValue)
  );

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({ ...prev, country: country }));
    setSearchValue(country);
    setIsOpen(false);
  };

  const handleCountryInputChange = (value: string) => {
    // فقط السماح بالقيم التي تطابق بداية أسماء الدول أو جزء منها
    const hasPartialMatch = countries.some(country => 
      country.startsWith(value) || 
      country.toLowerCase().startsWith(value.toLowerCase()) ||
      country.includes(value) ||
      country.toLowerCase().includes(value.toLowerCase())
    );
    if (hasPartialMatch || value === '') {
      setSearchValue(value);
      // فقط تحديث قيمة الدولة إذا كانت موجودة في القائمة بالضبط
      if (countries.includes(value)) {
        setFormData(prev => ({ ...prev, country: value }));
      } else {
        // إذا لم تكن موجودة بالضبط، امسح قيمة النموذج
        setFormData(prev => ({ ...prev, country: '' }));
      }
      setIsOpen(value.length > 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // التحقق من أن الدولة مختارة من القائمة المحددة
    if (!countries.includes(formData.country)) {
      alert('يرجى اختيار دولة من القائمة المتاحة');
      return;
    }
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const registrationData: RegistrationData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        country: formData.country || searchValue,
        city: formData.city
      };
      
      const result = await submitRegistration(registrationData);
      
if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message });
        onNavigate('thank-you');
      } else {
        setSubmitMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* الهيدر */}
      <section className="bg-brand-primary py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white font-bold text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight">
            انضم إلى قائمة الانتظار وكن من الأوائل فى تجربة سحابة الأثر
          </h1>
          <p className="text-white opacity-90 leading-relaxed max-w-3xl mx-auto text-base md:text-lg">
            املأ النموذج التالى لتحصل على وصول مبكر وتجربة مميزة مع سحابة الأثر
          </p>
        </div>
      </section>

      {/* نموذج التسجيل */}
      <section className="bg-gray-50 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
            <h2 className="text-brand-primary font-bold text-2xl md:text-3xl mb-8 md:mb-10 text-center">بيانات التسجيل</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* رسالة النجاح أو الخطأ */}
              {submitMessage && (
                <div className={`p-4 rounded-xl text-center font-medium ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage.text}
                </div>
              )}
              
              {/* الاسم الكامل */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="أدخل اسمك الكامل"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* البريد الإلكتروني */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="example@email.com"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* رقم الجوال */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="+966 XX XXX XXXX"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* اسم المنظمة */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  اسم المنظمة
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="أدخل اسم المنظمة"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* الدولة */}
              <div dir="rtl" className="relative">
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  الدولة
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => handleCountryInputChange(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white text-right pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="اكتب أو اختر الدولة"
                    style={{ height: '56px', minHeight: '56px' }}
                    dir="rtl"
                    autoComplete="country"
                    disabled={isSubmitting}
                    required
                  />
                  <ChevronDown 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" 
                  />
                  
                  {isOpen && filteredCountries.length > 0 && (
                    <div 
                      className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                      dir="rtl"
                    >
                      {filteredCountries.slice(0, 10).map((country) => (
                        <div
                          key={country}
                          onClick={() => handleCountrySelect(country)}
                          className="px-5 py-3 hover:bg-gray-50 cursor-pointer text-right border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          {country}
                        </div>
                      ))}
            
                        </div>
                  )}
              </div>
            </div>

            {/* المدينة */}
            <div>
              <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                المدينة
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="أدخل المدينة"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* زر الإرسال */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                  className="w-full bg-brand-primary text-white py-4 px-8 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg font-bold text-lg text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري الإرسال...
                    </div>
                  ) : (
                    'إرسال طلب التسجيل'
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      </section>



      {/* الفوتر */}
      <footer className="bg-brand-primary py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
          <img 
              src={logoImage} 
              alt="سحابة الأثر" 
              style={{ display: "block", margin: "0 auto" }}
              className="h-12 w-auto md:h-16 lg:h-18 object-contain" 
            />
            <p className="text-white opacity-90 mb-6">
              مدعومة من أثرنا
            </p>
            <div className="border-t border-white border-opacity-20 pt-6">
              <p className="text-white opacity-70 text-sm">
                © 2025 سحابة الأثر. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
