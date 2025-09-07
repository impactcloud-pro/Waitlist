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
                منصة قياس الأثر الاجتماعى الأولى عربيا
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
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-blue-500">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="9" cy="13" r="1" fill="currentColor" />
                  <circle cx="9" cy="16" r="1" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-blue-600 font-bold text-xl mb-4 text-center">استبيانات</h3>
              <p className="text-gray-600 text-center leading-relaxed">تصميم وإدارة استبيانات ذكية لجمع البيانات بطريقة منهجية وفعّالة</p>
            </div>
            
            {/* تحليلات */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-green-500">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h3m0 0v3m0-3l-3 3" />
                </svg>
              </div>
              <h3 className="text-green-600 font-bold text-xl mb-4 text-center">تحليلات</h3>
              <p className="text-gray-600 text-center leading-relaxed">تحليل البيانات المتقدم لاستخراج رؤى عميقة وفهم الاتجاهات</p>
            </div>
            
            {/* قياس الأثر */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-orange-500">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 21l4-7 4 7M3 7l3 10 3-10m8 0l3 10 3-10" opacity="0.5" />
                </svg>
              </div>
              <h3 className="text-orange-600 font-bold text-xl mb-4 text-center">قياس الأثر</h3>
              <p className="text-gray-600 text-center leading-relaxed">قياس الأثر الاجتماعي والاقتصادي بمعايير علمية موثقة</p>
            </div>
            
            {/* تقارير تفاعلية */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-purple-500">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h.01M13 9h.01M17 9h.01" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-2-2m4 4l-2-2" opacity="0.6" />
                </svg>
              </div>
              <h3 className="text-purple-600 font-bold text-xl mb-4 text-center">تقارير تفاعلية</h3>
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