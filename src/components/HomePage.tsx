import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface HomePageProps {
  onNavigate: (page: 'home' | 'register' | 'thank-you') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  // بيانات وهمية للرسوم البيانية
  const barData = [
    { name: 'يناير', المستفيدون: 2400, الأثر: 1800 },
    { name: 'فبراير', المستفيدون: 1398, الأثر: 2200 },
    { name: 'مارس', المستفيدون: 9800, الأثر: 3400 },
    { name: 'أبريل', المستفيدون: 3908, الأثر: 2800 },
    { name: 'مايو', المستفيدون: 4800, الأثر: 3200 },
    { name: 'يونيو', المستفيدون: 3800, الأثر: 4100 },
  ];

  const pieData = [
    { name: 'التعليم', value: 400, color: '#18325a' },
    { name: 'الصحة', value: 300, color: '#2563eb' },
    { name: 'البيئة', value: 200, color: '#60a5fa' },
    { name: 'التنمية', value: 100, color: '#93c5fd' },
  ];

  const pieData2 = [
    { name: 'المجتمع', value: 350, color: '#18325a' },
    { name: 'الاقتصاد', value: 280, color: '#2563eb' },
    { name: 'الثقافة', value: 180, color: '#60a5fa' },
    { name: 'التكنولوجيا', value: 150, color: '#93c5fd' },
  ];

  const lineData = [
    { name: 'الأسبوع 1', نمو: 65 },
    { name: 'الأسبوع 2', نمو: 78 },
    { name: 'الأسبوع 3', نمو: 82 },
    { name: 'الأسبوع 4', نمو: 95 },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* القسم الرئيسي - Hero Section */}
      <section id="hero" className="bg-brand-primary py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* العمود الأيسر - النص */}
            <div className="order-2 lg:order-1 text-center lg:text-right">
              <h1 className="text-white font-bold text-4xl lg:text-5xl mb-8 leading-tight text-right">
                منصة قياس الأثر الاجتماعى الأولى عربياً
              </h1>
              <p className="text-white opacity-90 mb-10 leading-relaxed max-w-2xl text-lg">
                أول منصّة عربية سحابية لقياس وإدارة الأثر الاجتماعي للمؤسسات والمنظمات
              </p>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-white text-brand-primary px-8 py-4 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
              >
                انضم إلينا
              </button>
            </div>
            
            {/* العمود الأيمن - لوحة تحكم مبسطة */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 rotate-2 transition-transform duration-300">
                {/* Header with dots and title */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-gray-700 font-bold text-lg">لوحة المعلومات</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                {/* Top statistics cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Total beneficiaries card */}
                  <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <div className="text-blue-600 font-bold text-3xl mb-1">127</div>
                    <div className="text-blue-700 text-sm font-medium">إجمالي المستفيدين</div>
                  </div>
                  
                  {/* Improvement rate card */}
                  <div className="bg-green-100 rounded-lg p-4 text-center">
                    <div className="text-green-600 font-bold text-3xl mb-1">89%</div>
                    <div className="text-green-700 text-sm font-medium">نسبة التحسن</div>
                  </div>
                </div>

                {/* Chart area */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={barData.slice().reverse()} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 10, fill: '#6b7280' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis hide />
                        <Line 
                          type="monotone"
                          dataKey="المستفيدون" 
                          stroke="#18325a" 
                          strokeWidth={3}
                          dot={{ fill: '#18325a', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, fill: '#18325a' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم رسالتنا */}
      <section id="mission" className="bg-[rgba(255,255,255,1)] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[rgba(24,50,90,1)] font-bold text-3xl lg:text-4xl mb-8 text-center">رسالتنا</h2>
          
          <p className="text-[rgba(24,50,90,1)] opacity-90 leading-relaxed text-center text-lg mb-12">
            في سحابة الأثر نؤمن أن التغيير الإيجابي يبدأ من القدرة على قياسه وفهمه. لذلك، نعمل على تمكين المنظمات والمؤسسات العربية من
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* تخطيط الأثر */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all text-center">
              <h3 className="text-brand-primary font-bold text-lg mb-3">تخطيط الأثر</h3>
              <p className="text-brand-primary opacity-80 leading-relaxed">
                تحديد الأهداف الاستراتيجية ورسم خارطة طريق واضحة لرحلة التغيير.
              </p>
            </div>

            {/* تصميم المبادرات */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all text-center">
              <h3 className="text-brand-primary font-bold text-lg mb-3">تصميم المبادرات</h3>
              <p className="text-brand-primary opacity-80 leading-relaxed">
                تطوير برامج ومشاريع فعّالة تستجيب للتحديات الاجتماعية والاقتصادية والبيئية.
              </p>
            </div>

            {/* قياس الأثر */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all text-center">
              <h3 className="text-brand-primary font-bold text-lg mb-3">قياس الأثر</h3>
              <p className="text-brand-primary opacity-80 leading-relaxed">
                استخدام أدوات سحابية متقدمة لقياس النتائج بدقة وتحويل البيانات إلى رؤى قابلة للتنفيذ.
              </p>
            </div>

            {/* بناء حلول مستدامة */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all text-center">
              <h3 className="text-brand-primary font-bold text-lg mb-3">بناء حلول مستدامة</h3>
              <p className="text-brand-primary opacity-80 leading-relaxed">
                المساهمة في إحداث تغيير حقيقي ومستمر يخدم المجتمع ويواجه التحديات المعاصرة.
              </p>
            </div>
          </div>

          {/* الهدف */}
          <div className="text-center bg-[rgba(24,50,90,0)]">
            <h3 className="text-[rgba(24,50,90,1)] font-bold text-2xl mb-6">هدفنا</h3>
            <p className="text-[rgba(24,50,90,1)] opacity-90 leading-relaxed max-w-4xl mx-auto text-lg">
              نساعد المنظمات على تخطيط وتصميم وقياس الأثر لنشهد حلول مستدامة للتحديات الاجتماعية والاقتصادية والبيئية التي تواجه مجتمعنا
            </p>
          </div>
        </div>
      </section>

      {/* قسم الخدمات */}
      <section id="services" className="bg-[rgba(24,50,90,1)] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[rgba(255,255,255,1)] font-bold text-3xl lg:text-4xl mb-4">
              خدماتنا
            </h2>
            <p className="text-white opacity-80 text-lg leading-relaxed max-w-2xl mx-auto">
              كل خدمة خطوة نحو تغيير مستدام
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* استبيانات */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-brand-primary">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <h3 className="text-brand-primary font-bold text-xl mb-4 text-center">استبيانات</h3>
              <p className="text-gray-600 text-center leading-relaxed">تصميم وإدارة استبيانات ذكية لجمع البيانات بطريقة منهجية وفعّالة</p>
            </div>
            
            {/* تحليلات */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-brand-primary">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21M16,8H18V15H16V8M12,2H14V15H12V2M8,13H10V15H8V13M4,18H6V15H4V18Z" />
                </svg>
              </div>
              <h3 className="text-brand-primary font-bold text-xl mb-4 text-center">تحليلات</h3>
              <p className="text-gray-600 text-center leading-relaxed">تحليل البيانات المتقدم لاستخراج رؤى عميقة وفهم الاتجاهات</p>
            </div>
            
            {/* قياس الأثر */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-brand-primary">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 12a9 9 0 1 1 18 0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 12a6 6 0 1 1 12 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" opacity="0.7" />
                  <path d="M9 12a3 3 0 1 1 6 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" opacity="0.5" />
                  <path d="M12 12l-2-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                  <path d="M8 16l1-1M16 16l-1-1M4 8l1 1M20 8l-1 1" strokeLinecap="round" strokeWidth="1.5" opacity="0.6" />
                </svg>
              </div>
              <h3 className="text-brand-primary font-bold text-xl mb-4 text-center">قياس الأثر</h3>
              <p className="text-gray-600 text-center leading-relaxed">قياس الأثر الاجتماعي والاقتصادي بمعايير علمية موثقة</p>
            </div>
            
            {/* تقارير تفاعلية */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-brand-primary">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,3H21C21.53,3 22,3.47 22,4V16C22,16.53 21.53,17 21,17H7L3,21V4C3,3.47 3.47,3 4,3H3M6,7V9H18V7H6M6,11V13H15V11H6Z" />
                </svg>
              </div>
              <h3 className="text-brand-primary font-bold text-xl mb-4 text-center">تقارير تفاعلية</h3>
              <p className="text-gray-600 text-center leading-relaxed">تقارير ديناميكية وتفاعلية تساعد في عرض النتائج بوضوح</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الدعوة للعمل - CTA */}
      <section id="cta" className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-brand-primary font-bold text-3xl lg:text-4xl mb-6">
            كن أول من يساهمون فى صناعة الأثر
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            كن من أوائل المنظمات التي ستستخدم سحابة الأثر لقياس وإدارة أثرها الاجتماعي
          </p>
          <button 
            onClick={() => onNavigate('register')}
            className="bg-brand-primary text-white px-12 py-4 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
          >
            ابدأ رحلتك معنا
          </button>
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