'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'input' | 'waiting' | 'result'>('input');
  const [countdown, setCountdown] = useState(10);
  const [shareCount, setShareCount] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  // 🔴 مهم: غيّر هذا الرابط إلى رابط Vercel بعد النشر
  const SITE_URL = 'https://social-media8.vercel.app';

  const mockSearch = (number: string) => {
    const platforms = ['فيسبوك', 'إنستغرام', 'تويتر', 'لينكدإن', 'تيك توك', 'سناب شات'];
    const found = platforms.filter(() => Math.random() > 0.5);
    return found.length > 0 
      ? `✅ تم العثور على حسابات في: ${found.join('، ')}`
      : '❌ لم يتم العثور على حسابات لهذا الرقم';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setStep('waiting');
    setCountdown(10);
    setShareCount(0);
  };

  const simulateShare = () => {
    if (shareCount < 10) {
      setShareCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (shareCount >= 10) {
      setResult(mockSearch(phone));
      setStep('result');
    }
  }, [shareCount, phone]);

  useEffect(() => {
    if (step === 'waiting' && shareCount < 10) {
      const timer = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, shareCount]);

  const handleShare = () => {
    const text = `🔍 اختبر رقمك واكتشف حساباتك على وسائل التواصل!\n${SITE_URL}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      simulateShare();
    }, 3000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(SITE_URL);
    alert('✅ تم نسخ الرابط! شاركه الآن في 10 مجموعات.');
    setTimeout(() => {
      simulateShare();
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <section className="py-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          مدقق وسائل التواصل الاجتماعي
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          ابحث عن حسابات التواصل الاجتماعي المرتبطة برقم هاتفك
        </p>

        {step === 'input' && (
          <form onSubmit={handleSearch} className="bg-gray-50 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="أدخل رقم الهاتف مع مفتاح الدولة" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition">
                بحث
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">مثال: ٩٧١+ ٥٠ ١٢٣ ٤٥٦٧</p>
          </form>
        )}

        {step === 'waiting' && (
          <div className="bg-yellow-50 border-2 border-yellow-400 p-8 rounded-2xl max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-2xl font-bold text-yellow-700 mb-2">جاري البحث...</h2>
              <p className="text-gray-700 mb-4">
                <span className="font-bold text-red-600">خطوة واحدة</span> تفصلك عن النتيجة!
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-inner my-6">
              <p className="text-lg font-semibold mb-2">
                📢 شارك الرابط في <span className="text-blue-600">١٠ مجموعات</span> أو مع ١٠ أصدقاء
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full transition-all ${
                      i < shareCount ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                تم المشاركة: {shareCount} من ١٠
              </p>
              <p className="text-sm text-gray-400 mt-1">
                ⏱️ سيتم الكشف تلقائياً خلال {countdown} ثانية
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleShare}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <span>📱</span> مشاركة عبر واتساب
              </button>
              <button
                onClick={copyLink}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <span>📋</span> نسخ الرابط
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              🔒 سيتم كشف النتيجة فور اكتمال ١٠ مشاركات
            </p>
          </div>
        )}

        {step === 'result' && (
          <div className="bg-green-50 border-2 border-green-400 p-8 rounded-2xl max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-700 mb-4">النتيجة</h2>
            <div className="bg-white p-6 rounded-xl shadow-inner">
              <p className="text-lg font-mono text-gray-800">{phone}</p>
              <div className="border-t-2 my-4"></div>
              <p className="text-xl font-bold text-blue-700">{result}</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              شكراً لمشاركتك! 👏
            </p>
            <button
              onClick={() => { setStep('input'); setPhone(''); setShareCount(0); }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              بحث جديد
            </button>
          </div>
        )}
      </section>

      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🚀', title: 'مجاني وسهل', desc: 'أدخل الرقم واحصل على النتائج فوراً' },
              { icon: '⏱️', title: 'يوفر الوقت', desc: 'تخطى البحث اليدوي عبر منصات متعددة' },
              { icon: '🔍', title: 'نتائج دقيقة', desc: 'مسح فوري للحصول على بيانات محدثة' }
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6 px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} مدقق التواصل الاجتماعي</p>
      </footer>
    </main>
  );
      }
