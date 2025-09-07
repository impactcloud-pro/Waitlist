import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface RegisterPageProps {
  onNavigate: (page: 'home' | 'register' | 'thank-you') => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    country: ''
  });

  // قائمة الدول
  const countries = [
    'الإمارات العربية المتحدة',
    'المملكة العربية السعودية',
    'الكويت',
    'قطر',
    'البحرين',
    'عُمان',
    'مصر',
    'الأردن',
    'لبنان',
    'سوريا',
    'العراق',
    'فلسطين',
    'المغرب',
    'الجزائر',
    'تونس',
    'ليبيا',
    'السودان',
    'اليمن',
    'الصومال',
    'جيبوتي',
    'موريتانيا',
    'جزر القمر',
    'أفغانستان',
    'باكستان',
    'بنغلاديش',
    'إندونيسيا',
    'ماليزيا',
    'بروناي',
    'المالديف',
    'تركيا',
    'إيران',
    'أذربيجان',
    'كازاخستان',
    'قيرغيزستان',
    'طاجيكستان',
    'تركمانستان',
    'أوزبكستان',
    'ألبانيا',
    'البوسنة والهرسك',
    'كوسوفو',
    'الولايات المتحدة الأمريكية',
    'كندا',
    'المملكة المتحدة',
    'فرنسا',
    'ألمانيا',
    'إيطاليا',
    'إسبانيا',
    'هولندا',
    'بلجيكا',
    'سويسرا',
    'النمسا',
    'السويد',
    'النرويج',
    'الدنمارك',
    'فنلندا',
    'روسيا',
    'أوكرانيا',
    'بولندا',
    'التشيك',
    'المجر',
    'رومانيا',
    'بلغاريا',
    'كرواتيا',
    'صربيا',
    'سلوفينيا',
    'سلوفاكيا',
    'ليتوانيا',
    'لاتفيا',
    'إستونيا',
    'اليونان',
    'قبرص',
    'مالطا',
    'البرتغال',
    'أيسلندا',
    'لوكسمبورغ',
    'موناكو',
    'ليختنشتاين',
    'سان مارينو',
    'الفاتيكان',
    'أندورا',
    'الصين',
    'اليابان',
    'كوريا الجنوبية',
    'كوريا الشمالية',
    'الهند',
    'تايلاند',
    'فيتنام',
    'الفلبين',
    'سنغافورة',
    'ميانمار',
    'كمبوديا',
    'لاوس',
    'منغوليا',
    'نيبال',
    'بوتان',
    'سريلانكا',
    'أستراليا',
    'نيوزيلندا',
    'فيجي',
    'بابوا غينيا الجديدة',
    'جزر سليمان',
    'فانواتو',
    'ساموا',
    'تونغا',
    'ناورو',
    'بالاو',
    'كيريباتي',
    'توفالو',
    'جزر مارشال',
    'ميكرونيزيا',
    'البرازيل',
    'الأرجنتين',
    'تشيلي',
    'كولومبيا',
    'بيرو',
    'فنزويلا',
    'الإكوادور',
    'بوليفيا',
    'باراغواي',
    'أوروغواي',
    'غيانا',
    'سورينام',
    'غيانا الفرنسية',
    'المكسيك',
    'غواتيمالا',
    'بليز',
    'السلفادور',
    'هندوراس',
    'نيكاراغوا',
    'كوستاريكا',
    'بنما',
    'كوبا',
    'جامايكا',
    'هايتي',
    'جمهورية الدومينيكان',
    'ترينيداد وتوباغو',
    'باربادوس',
    'جرينادا',
    'سانت لوسيا',
    'سانت فنسنت والغرينادين',
    'أنتيغوا وباربودا',
    'دومينيكا',
    'سانت كيتس ونيفيس',
    'جنوب أفريقيا',
    'نيجيريا',
    'كينيا',
    'إثيوبيا',
    'غانا',
    'الكاميرون',
    'أوغندا',
    'تنزانيا',
    'زيمبابوي',
    'زامبيا',
    'بوتسوانا',
    'ناميبيا',
    'موزمبيق',
    'مدغشقر',
    'مالاوي',
    'رواندا',
    'بوروندي',
    'جمهورية الكونغو الديمقراطية',
    'جمهورية الكونغو',
    'جمهورية أفريقيا الوسطى',
    'تشاد',
    'النيجر',
    'مالي',
    'بوركينا فاسو',
    'ساحل العاج',
    'غينيا',
    'سيراليون',
    'ليبيريا',
    'السنغال',
    'غامبيا',
    'غينيا بيساو',
    'الرأس الأخضر',
    'ساو تومي وبرينسيبي',
    'غينيا الاستوائية',
    'الغابون',
    'أنغولا',
    'إريتريا',
    'جنوب السودان',
    'سوازيلاند',
    'ليسوتو',
    'بنين',
    'توغو'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // معالجة إرسال النموذج
    console.log('Form data:', formData);
    // التوجه إلى صفحة الشكر
    onNavigate('thank-you');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* الهيدر */}
      <section className="bg-brand-primary py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white font-bold text-4xl lg:text-5xl mb-8 leading-tight">
            انضم إلى قائمة الانتظار وكن من الأوائل فى تجربة سحابة الأثر
          </h1>
          <p className="text-white opacity-90 leading-relaxed max-w-3xl mx-auto text-lg">
            املأ النموذج التالى لتحصل على وصول مبكر وتجربة مميزة مع سحابة الأثر
          </p>
        </div>
      </section>

      {/* نموذج التسجيل */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
            <h2 className="text-brand-primary font-bold text-3xl mb-10 text-center">بيانات التسجيل</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* الاسم الكامل */}
              <div>
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="أدخل اسمك الكامل"
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
                  className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="example@email.com"
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
                  className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="+966 XX XXX XXXX"
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
                  className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white"
                  placeholder="أدخل اسم المنظمة"
                  required
                />
              </div>

              {/* الدولة */}
              <div dir="rtl">
                <label className="block text-brand-primary mb-3 font-bold text-lg text-right">
                  الدولة
                </label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)} required dir="rtl">
                  <SelectTrigger className="w-full h-14 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all text-lg bg-gray-50 hover:bg-white text-right custom-select-trigger" dir="rtl" style={{ height: '56px', minHeight: '56px' }}>
                    <SelectValue placeholder="اختر الدولة" className="text-right" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60" dir="rtl">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country} className="text-right cursor-pointer hover:bg-gray-50" dir="rtl">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* زر الإرسال */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-brand-primary text-white py-4 px-8 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg font-bold text-lg text-center"
                >
                  إرسال طلب التسجيل
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
            <h3 className="text-white font-bold text-xl mb-4">سحابة الأثر</h3>
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