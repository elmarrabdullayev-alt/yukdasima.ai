import React, { useState, useEffect } from 'react';
import { X, Phone, User, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/calculator';

interface ContactCallbackModalProps {
  isOpen: boolean;
  initialPhone?: string;
  onClose: () => void;
}

export const ContactCallbackModal: React.FC<ContactCallbackModalProps> = ({
  isOpen,
  initialPhone = '',
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(initialPhone);
  const [service, setService] = useState<'yukdasima' | 'evakuasiya'>('yukdasima');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialPhone) {
      setPhone(initialPhone);
    }
  }, [initialPhone]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    const text = `Salam, adım ${name || 'Müştəri'}. ${
      service === 'yukdasima' ? 'Yükdaşıma' : 'Evakuasiya'
    } xidməti ilə bağlı əlaqə saxlamaq istəyirəm. Nömrəm: ${phone || 'qeyd olunmayıb'}`;
    window.open(generateWhatsAppLink(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Mənimlə əlaqə saxlayın
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              Nömrənizi qeyd edin, 2 dəqiqə ərzində operatorumuz sizə zəng etsin.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Xidmət növü
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setService('yukdasima')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      service === 'yukdasima'
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🚚 Yükdaşıma
                  </button>
                  <button
                    type="button"
                    onClick={() => setService('evakuasiya')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      service === 'evakuasiya'
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🚗 Evakuasiya
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Adınız
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Məs: Elvin Əliyev"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Əlaqə nömrəsi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+994 50 123 45 67"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Zəng sifarişi göndər
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink mx-3 text-xs text-slate-400 font-semibold uppercase">və ya</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppInstant}
                className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp ilə dərhal yaz</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Müraciətiniz qəbul edildi!
            </h3>
            <p className="text-sm text-slate-600">
              Təşəkkür edirik, <strong>{name || 'Dəyərli müştəri'}</strong>. Operatorumuz <strong>{phone}</strong> nömrəsi ilə ən qısa zamanda əlaqə saxlayacaq.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
              >
                Bağla
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
