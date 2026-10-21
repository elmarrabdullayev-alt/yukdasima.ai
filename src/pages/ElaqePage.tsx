import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, Send, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { generateWhatsAppLink } from '../utils/calculator';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { Link } from '../router/RouterContext';
import { CallbackInitialData } from '../types';
import { isValidPhoneNumber } from '../utils/phone';
import { getLang } from '../i18n';
import { t } from '../i18n';

interface ElaqePageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const ElaqePage: React.FC<ElaqePageProps> = ({ onOpenCallback }) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleWhatsApp = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: '/elaqe',
      cta_location: 'contact_page',
    });
    window.open(getContextualWhatsAppUrl('/elaqe'), '_blank');
  };

  const handleCallClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: '/elaqe',
      cta_location: 'contact_page_phone',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formPhone.trim();
    if (!cleanPhone) {
      setErrorMessage(t('Zəhmət olmasa telefon nömrənizi daxil edin.'));
      return;
    }
    if (!isValidPhoneNumber(cleanPhone)) {
      setErrorMessage(t('Telefon nömrəsi düzgün deyil. Məsələn: 050 123 45 67'));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Lets the operator see that the customer wrote from the Russian site
          lang: getLang(),
          name: formName.trim(),
          phone: cleanPhone,
          message: formMessage.trim(),
          service: 'Ümumi Müraciət',
          source: 'Əlaqə Səhifəsi Forması',
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Müraciəti göndərmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('[ElaqePage submit failed]:', err);
      setErrorMessage(err.message || t(`Müraciət zamanı xəta baş verdi. Zəhmət olmasa ${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsi ilə əlaqə saxlayın.`));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Phone className="w-4 h-4" />
            <span>{t("24/7 Dəstək və Sifariş")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{t("Bizimlə Əlaqə və Operativ Sifariş")}</h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{t("Yükdaşıma və ya evakuasiya xidməti üçün 24/7 bizimlə əlaqə saxlaya, zəng sifariş edə və ya birbaşa WhatsApp vasitəsilə müraciət edə bilərsiniz.")}</p>
        </header>

        {/* Contact Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label={t("Əlaqə Vasitələri")}>
          {/* Primary Call Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t("Zəng Edin")}</h2>
              <p className="text-xs text-slate-500 mt-1">{t("24/7 Birbaşa dispetçer əlaqəsi")}</p>
            </div>
            <a
              id="elaqe-call-link"
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              onClick={handleCallClick}
              aria-label={t(`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`)}
              className="text-2xl sm:text-3xl font-black text-blue-600 hover:text-blue-700 tracking-tight transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-6 h-6" />
              <span>{t(CONTACT_INFO.PRIMARY_PHONE_DISPLAY)}</span>
            </a>
            <p className="text-xs text-slate-400">{t("Bütün operatorlardan birbaşa zəng")}</p>
          </div>

          {/* WhatsApp Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t("WhatsApp ilə Yazın")}</h2>
              <p className="text-xs text-slate-500 mt-1">{t("Şəkil, video və məkan göndərmək üçün")}</p>
            </div>
            <a
              id="elaqe-whatsapp-link"
              href={CONTACT_INFO.WHATSAPP_URL_BASE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
              aria-label={t("WhatsApp vasitəsilə yaz")}
              className="text-2xl font-bold text-slate-900 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
            >
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              <span>{t(CONTACT_INFO.WHATSAPP_DISPLAY)}</span>
            </a>
            <button
              onClick={handleWhatsApp}
              type="button"
              className="w-full px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t("WhatsApp-da Aç")}</span>
            </button>
          </div>

          {/* Location / Hours */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t("İş Qrafiki")}</h2>
              <p className="text-xs text-slate-500 mt-1">{t("Fasiləsiz xidmət")}</p>
            </div>
            <div className="text-xl font-bold text-slate-800">{t("24 Saat / 7 Gün")}</div>
            <p className="text-xs text-slate-400">{t("Bakı, Abşeron və bütün Azərbaycan regionları")}</p>
          </div>
        </section>

        {/* Quick Callback Request Form */}
        <section className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6" aria-label={t("Geri Zəng Sifarişi")}>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">{t("Biz Sizə Zəng Edək")}</h2>
            <p className="text-sm text-slate-600">{t("Nömrənizi qeyd edin, operatorumuz 1–2 dəqiqə ərzində sizinlə əlaqə saxlasın.")}</p>
          </div>

          {t(isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-900 text-lg">{t("Müraciətiniz qəbul edildi!")}</h3>
              <p className="text-xs text-emerald-700">{t("Operatorumuz tezliklə sizinlə əlaqə saxlayacaq.")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {t(errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{t(errorMessage)}</span>
                </div>
              ))}

              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">{t("Adınız")}</label>
                <input
                  id="contact-name"
                  type="text"
                  disabled={isSubmitting}
                  placeholder={t("Məs: Rəşad Əliyev")}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">{t("Əlaqə Nömrəniz *")}</label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  disabled={isSubmitting}
                  placeholder="050 123 45 67"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium disabled:bg-slate-50"
                />
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">{t("Qeyd (istəyə bağlı)")}</label>
                <textarea
                  id="contact-msg"
                  rows={3}
                  disabled={isSubmitting}
                  placeholder={t("Yük növü və ya çatdırılma ünvanı haqqında qısa məlumat...")}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {t(isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t("Göndərilir...")}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t("Zəng Sifariş Et")}</span>
                  </>
                ))}
              </button>
            </form>
          ))}
        </section>

        {/* Internal Linking */}
        <section className="space-y-6" aria-label={t("Xidmətlər")}>
          <h2 className="text-2xl font-bold text-slate-900">{t("Xidmətlərimiz")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Yükdaşıma Xidməti")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">{t("Bakı və regionlar üzrə daşıma.")}</p>
            </Link>

            <Link
              href="/evakuator"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("24/7 Evakuator")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">{t("Təcili çıxış və rəsmi tariflər.")}</p>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Tariflər Cədvəli")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">{t("Bütün qiymətlər bir yerdə.")}</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
