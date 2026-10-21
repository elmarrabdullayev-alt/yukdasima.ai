import React, { useState, useEffect } from 'react';
import { X, Phone, User, CheckCircle2, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { generateWhatsAppLink } from '../utils/calculator';
import { CallbackInitialData } from '../types';
import { isValidPhoneNumber } from '../utils/phone';
import { getLang } from '../i18n';
import { t } from '../i18n';

interface ContactCallbackModalProps {
  isOpen: boolean;
  initialPhone?: string;
  initialData?: CallbackInitialData;
  onClose: () => void;
}

export const ContactCallbackModal: React.FC<ContactCallbackModalProps> = ({
  isOpen,
  initialPhone = '',
  initialData,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(initialPhone);
  const [service, setService] = useState<'yukdasima' | 'evakuasiya'>('yukdasima');
  const [source, setSource] = useState<string>('');
  const [route, setRoute] = useState<string>('');
  const [vehicle, setVehicle] = useState<string>('');
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Every time the modal opens, start from a clean form: show the form (not the previous
  // "success" screen) and only carry the route/price details passed for THIS request.
  // Name and phone are kept so a returning visitor doesn't have to retype them.
  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage(null);
    setService(initialData?.service || 'yukdasima');
    setSource(initialData?.source || '');
    setRoute(initialData?.route || '');
    setVehicle(initialData?.vehicle || '');
    setEstimatedPrice(initialData?.estimatedPrice || '');
    setNotes(initialData?.notes || '');
    if (initialData?.name) setName(initialData.name);
    if (initialData?.phone) {
      setPhone(initialData.phone);
    } else if (initialPhone) {
      setPhone(initialPhone);
    }
  }, [isOpen, initialPhone, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      setErrorMessage(t('Zəhmət olmasa telefon nömrənizi qeyd edin.'));
      return;
    }
    if (!isValidPhoneNumber(cleanPhone)) {
      setErrorMessage(t('Telefon nömrəsi düzgün deyil. Məsələn: 050 123 45 67'));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Lets the operator see that the customer wrote from the Russian site
          lang: getLang(),
          name: name.trim(),
          phone: cleanPhone,
          service,
          source: source.trim() || 'Əlaqə Modalı',
          route: route.trim() || undefined,
          vehicle: vehicle.trim() || undefined,
          estimatedPrice: estimatedPrice.trim() || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Müraciəti göndərmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('[Callback submit failed]:', err);
      setErrorMessage(err.message || t(`Müraciəti göndərmək mümkün olmadı. Zəhmət olmasa birbaşa ${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} ilə əlaqə saxlayın.`));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppInstant = () => {
    const text = t(`Salam, adım ${name || t('Müştəri')}. ${
      service === 'yukdasima' ? t('Yükdaşıma') : t('Evakuasiya')
    } xidməti ilə bağlı əlaqə saxlamaq istəyirəm. Nömrəm: ${phone || t('qeyd olunmayıb')}${
      route ? t(`\nMarşrut: ${route}`) : ''
    }${vehicle ? t(`\nAvtomobil: ${vehicle}`) : ''}${estimatedPrice ? t(`\nİlkin qiymət: ${estimatedPrice}`) : ''}`);
    window.open(generateWhatsAppLink(t(text)), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {t(!submitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t("Mənimlə əlaqə saxlayın")}</h3>
            <p className="mt-1.5 text-sm text-slate-600">{t("Nömrənizi qeyd edin, 2 dəqiqə ərzində operatorumuz sizə zəng etsin.")}</p>

            {t((route || vehicle || estimatedPrice) && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 space-y-1.5">
                {t(route && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">{t("📍 Marşrut:")}</span>
                    <span className="text-blue-700 font-bold text-right">{t(route)}</span>
                  </div>
                ))}
                {t(vehicle && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">{t("🚛 Avtomobil:")}</span>
                    <span className="text-slate-900 font-bold text-right">{t(vehicle)}</span>
                  </div>
                ))}
                {t(estimatedPrice && (
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium">{t("💰 İlkin qiymət:")}</span>
                    <span className="text-emerald-700 font-bold text-right">{t(estimatedPrice)}</span>
                  </div>
                ))}
              </div>
            ))}

            {t(errorMessage && (
              <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{t(errorMessage)}</span>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t("Xidmət növü")}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setService('yukdasima')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      service === 'yukdasima'
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >{t("🚚 Yükdaşıma")}</button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setService('evakuasiya')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      service === 'evakuasiya'
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >{t("🚗 Evakuasiya")}</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t("Adınız")}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("Məs: Elvin Əliyev")}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none disabled:bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">{t("Əlaqə nömrəsi *")}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    disabled={isSubmitting}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+994 50 123 45 67"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none disabled:bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {t(isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t("Göndərilir...")}</span>
                    </>
                  ) : (
                    <span>{t("Zəng sifarişi göndər")}</span>
                  ))}
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink mx-3 text-xs text-slate-400 font-semibold uppercase">{t("və ya")}</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleWhatsAppInstant}
                className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{t("WhatsApp ilə dərhal yaz")}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">{t("Müraciətiniz qəbul edildi!")}</h3>
            <p className="text-sm text-slate-600">{t("Təşəkkür edirik, ")}<strong>{t(name || 'Dəyərli müştəri')}</strong>{t(". Operatorumuz ")}<strong>{t(phone)}</strong>{t(" nömrəsi ilə ən qısa zamanda əlaqə saxlayacaq.")}</p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm cursor-pointer transition-colors"
              >{t("Bağla")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
