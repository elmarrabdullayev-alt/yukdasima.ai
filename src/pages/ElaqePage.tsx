import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { generateWhatsAppLink } from '../utils/calculator';
import { Link } from '../router/RouterContext';

interface ElaqePageProps {
  onOpenCallback: (phone?: string) => void;
}

export const ElaqePage: React.FC<ElaqePageProps> = ({ onOpenCallback }) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsApp = () => {
    window.open(generateWhatsAppLink('Salam, yukdasima.ai xidmətləri ilə bağlı məlumat almaq və ya sifariş vermək istəyirəm.'), '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPhone) return;
    setIsSubmitted(true);
    setTimeout(() => {
      onOpenCallback(formPhone);
    }, 400);
  };

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Phone className="w-4 h-4" />
            <span>24/7 Dəstək və Sifariş</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bizimlə Əlaqə və Operativ Sifariş
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Yükdaşıma və ya evakuasiya xidməti üçün 24/7 bizimlə əlaqə saxlaya, zəng sifariş edə və ya birbaşa WhatsApp vasitəsilə müraciət edə bilərsiniz.
          </p>
        </header>

        {/* Contact Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Əlaqə Vasitələri">
          {/* Hotline Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Qaynar Xətt</h2>
              <p className="text-xs text-slate-500 mt-1">24/7 Operativ operator dəstəyi</p>
            </div>
            <a
              href={CONTACT_INFO.HOTLINE_TEL}
              className="text-2xl font-black text-blue-600 hover:text-blue-700 tracking-tight"
            >
              {CONTACT_INFO.HOTLINE_SHORT_DISPLAY}
            </a>
            <p className="text-xs text-slate-400">Bütün mobil operatorlardan və şəhər telefonlarından</p>
          </div>

          {/* WhatsApp Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">WhatsApp ilə Əlaqə</h2>
              <p className="text-xs text-slate-500 mt-1">Şəkil və məkan göndərmək üçün</p>
            </div>
            <button
              onClick={handleWhatsApp}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              WhatsApp-da Yazın
            </button>
            <p className="text-xs text-slate-400">{CONTACT_INFO.MOBILE_DISPLAY}</p>
          </div>

          {/* Location / Hours */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">İş Qrafiki</h2>
              <p className="text-xs text-slate-500 mt-1">Fasiləsiz xidmət</p>
            </div>
            <div className="text-xl font-bold text-slate-800">24 Saat / 7 Gün</div>
            <p className="text-xs text-slate-400">Bakı, Abşeron və bütün Azərbaycan regionları</p>
          </div>
        </section>

        {/* Quick Callback Request Form */}
        <section className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6" aria-label="Geri Zəng Sifarişi">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Biz Sizə Zəng Edək</h2>
            <p className="text-sm text-slate-600">
              Nömrənizi qeyd edin, operatorumuz 1–2 dəqiqə ərzində sizinlə əlaqə saxlasın.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-900 text-lg">Müraciətiniz qəbul edildi!</h3>
              <p className="text-xs text-emerald-700">Operatorumuz tezliklə sizinlə əlaqə saxlayacaq.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Adınız
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Məs: Rəşad Əliyev"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Əlaqə Nömrəniz *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  placeholder="050 123 45 67"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Qeyd (istəyə bağlı)
                </label>
                <textarea
                  id="contact-msg"
                  rows={3}
                  placeholder="Yük növü və ya çatdırılma ünvanı haqqında qısa məlumat..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Zəng Sifariş Et</span>
              </button>
            </form>
          )}
        </section>

        {/* Internal Linking */}
        <section className="space-y-6" aria-label="Xidmətlər">
          <h2 className="text-2xl font-bold text-slate-900">Xidmətlərimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Yükdaşıma Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Bakı və regionlar üzrə daşıma.</p>
            </Link>

            <Link
              href="/evakuasiya"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>24/7 Evakuator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Təcili çıxış və rəsmi tariflər.</p>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Tariflər Cədvəli</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Bütün qiymətlər bir yerdə.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
