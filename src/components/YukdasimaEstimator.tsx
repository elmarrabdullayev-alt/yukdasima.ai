import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Camera,
  Upload,
  X,
  Sparkles,
  Truck,
  Box,
  MessageSquare,
  Phone,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Minus,
  Trash2,
  Layers,
  Info,
  ShieldAlert,
  Wrench,
  Users,
  Building2,
  ArrowRight,
  MapPin,
  Check,
  AlertTriangle,
  FileText
} from 'lucide-react';
import {
  YukdasimaFormData,
  CargoItem,
  CargoAnalysisData,
  UploadedImage,
  DeterministicPricingResult,
  CallbackInitialData
} from '../types';
import { POPULAR_LOCATIONS } from '../data/mockData';
import { generateWhatsAppLink } from '../utils/calculator';
import { calculateTransportationPricing } from '../pricing/pricingEngine';
import { ROUTE_TARIFFS } from '../config/tariffs';
import { DEFAULT_VEHICLE_CONFIG } from '../config/vehicles';
import { findDestinationSuggestions } from '../services/destinationResolver';
import { BUSINESS_PRICING_RULES } from '../config/pricingRules';
import { CONTACT_INFO } from '../constants/contact';
import { DirectYukdasimaOrder } from './DirectYukdasimaOrder';

interface YukdasimaEstimatorProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
  initialFromAddress?: string;
  initialToAddress?: string;
  initialMode?: 'ai' | 'direct';
}

const LOADING_MESSAGES = [
  'Şəkillər analiz edilir...',
  'Əşyalar və ölçülər müəyyən edilir...',
  'Təxmini həcm hesablanır...',
];

const SAMPLE_DEMO_IMAGES = [
  {
    name: 'Qonaq_mebeli.jpg',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=70',
  },
  {
    name: 'Yataq_otağı_dolab.jpg',
    url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=600&auto=format&fit=crop&q=70',
  },
  {
    name: 'Mətbəx_qutular.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=70',
  },
];

// Helper function to resize and compress uploaded images before sending to AI
function compressImageFile(file: File, maxDim = 1600, quality = 0.85): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        try {
          const img = new Image();
          img.onload = () => {
            try {
              let width = img.width || 800;
              let height = img.height || 600;

              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width);
                  width = maxDim;
                } else {
                  width = Math.round((width * maxDim) / height);
                  height = maxDim;
                }
              }

              const canvas = document.createElement('canvas');
              canvas.width = Math.max(1, width);
              canvas.height = Math.max(1, height);
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                resolve({
                  base64: (readerEvent.target?.result as string) || '',
                  mimeType: file.type || 'image/jpeg',
                });
                return;
              }

              ctx.drawImage(img, 0, 0, width, height);
              const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
              const compressedBase64 = canvas.toDataURL(mimeType, quality);
              resolve({
                base64: compressedBase64,
                mimeType,
              });
            } catch (canvasErr) {
              console.warn('[compressImageFile] Canvas processing fallback:', canvasErr);
              resolve({
                base64: (readerEvent.target?.result as string) || '',
                mimeType: file.type || 'image/jpeg',
              });
            }
          };
          img.onerror = () => {
            resolve({
              base64: (readerEvent.target?.result as string) || '',
              mimeType: file.type || 'image/jpeg',
            });
          };
          img.src = (readerEvent.target?.result as string) || '';
        } catch (imgErr) {
          console.warn('[compressImageFile] Image instantiation fallback:', imgErr);
          resolve({
            base64: (readerEvent.target?.result as string) || '',
            mimeType: file.type || 'image/jpeg',
          });
        }
      };
      reader.onerror = () => {
        resolve({
          base64: '',
          mimeType: file.type || 'image/jpeg',
        });
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('[compressImageFile] FileReader fallback:', err);
      resolve({
        base64: '',
        mimeType: file.type || 'image/jpeg',
      });
    }
  });
}

// Helper to convert remote URL to Base64 safely
async function urlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url, { mode: 'cors' }).catch(() => null);
    if (!response || !response.ok) {
      return '';
    }
    const blob = await response.blob().catch(() => null);
    if (!blob) return '';

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve((reader.result as string) || '');
      };
      reader.onerror = () => {
        resolve('');
      };
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn('[urlToBase64] Could not convert url to base64:', err);
    return '';
  }
}

export const YukdasimaEstimator: React.FC<YukdasimaEstimatorProps> = ({
  onOpenCallback,
  initialFromAddress = '',
  initialToAddress = '',
  initialMode = 'ai',
}) => {
  const [yukdasimaMode, setYukdasimaMode] = useState<'ai' | 'direct'>(initialMode);
  const [formData, setFormData] = useState<YukdasimaFormData>({
    images: [],
    details: '',
    fromAddress: initialFromAddress,
    toAddress: initialToAddress,
    fromFloor: '1',
    toFloor: '1',
    hasElevator: 'yes',
    itemsFitElevator: 'yes',
    workerCount: 2,
    needsAssembly: false,
    phone: '',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<CargoAnalysisData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // New item manual addition inline state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemVolume, setNewItemVolume] = useState(0.5);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cycle loading messages during analysis
  useEffect(() => {
    let interval: any = null;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1600);
    } else {
      setLoadingStepIndex(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnalyzing]);

  // Deterministic Pricing Computation (Runs dynamically whenever items, volume, or form inputs change)
  const pricingResult: DeterministicPricingResult | null = useMemo(() => {
    if (!analysisResult) return null;
    return calculateTransportationPricing(analysisResult, formData);
  }, [analysisResult, formData]);

  // Handle image files upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    setErrorMessage(null);

    if (e.target.files && e.target.files.length > 0) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
      const maxSizeBytes = 20 * 1024 * 1024; // 20MB raw limit before compression

      const filesArray = Array.from(e.target.files) as File[];
      const validFiles: File[] = [];

      for (const file of filesArray) {
        if (!allowedTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpg|jpeg|png|webp|heic|heif)$/i)) {
          setUploadError('Bu şəkil formatı dəstəklənmir. Zəhmət olmasa JPG, PNG və ya WEBP formatlı şəkillər seçin.');
          continue;
        }
        if (file.size > maxSizeBytes) {
          setUploadError('Şəkil ölçüsü çox böyükdür (maksimum 20MB).');
          continue;
        }
        validFiles.push(file);
      }

      if (validFiles.length === 0) {
        return;
      }

      // Convert and optimize files to lightweight base64
      for (const file of validFiles) {
        try {
          const { base64, mimeType } = await compressImageFile(file, 1600, 0.85);
          if (base64) {
            const newImg: UploadedImage = {
              id: Math.random().toString(36).substring(2, 9),
              url: base64,
              base64: base64,
              mimeType: mimeType || file.type || 'image/jpeg',
              name: file.name,
              size: Math.round((base64.length * 3) / 4),
            };
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, newImg],
            }));
          }
        } catch (err) {
          console.error('[YukdasimaEstimator] Error processing image file:', err);
        }
      }
    }

    // Reset input value
    if (e.target) {
      e.target.value = '';
    }
  };

  // Add demo sample photos for rapid testing
  const handleAddSamplePhotos = async () => {
    setUploadError(null);
    setErrorMessage(null);
    try {
      const loadedImages: UploadedImage[] = [];
      for (const sample of SAMPLE_DEMO_IMAGES) {
        try {
          const b64 = await urlToBase64(sample.url);
          loadedImages.push({
            id: Math.random().toString(36).substring(2, 9),
            url: b64,
            base64: b64,
            mimeType: 'image/jpeg',
            name: sample.name,
            size: 1024 * 250,
          });
        } catch {
          loadedImages.push({
            id: Math.random().toString(36).substring(2, 9),
            url: sample.url,
            name: sample.name,
            size: 1024 * 250,
          });
        }
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...loadedImages],
        fromAddress: prev.fromAddress || 'Bakı, Nərimanov r.',
        toAddress: prev.toAddress || 'Xırdalan',
        details: prev.details || '3 otaqlı mənzil, divan, yataq dəsti və mətbəx qutuları.',
      }));
    } catch (err) {
      console.error('Error loading sample photos:', err);
    }
  };

  const handleRemoveImage = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  // Recalculate total volume range when items change
  const recalculateVolume = (items: CargoItem[]) => {
    const totalVolume = items.reduce((acc, item) => acc + item.quantity * item.estimatedVolumeM3, 0);
    if (totalVolume <= 0) {
      return { min: 0, max: 0 };
    }
    const min = Math.max(1, Math.round(totalVolume * 0.85));
    const max = Math.max(min + 1, Math.round(totalVolume * 1.15));
    return { min, max };
  };

  // Manual Item Quantity Increase
  const handleQuantityIncrease = (itemId: string) => {
    if (!analysisResult) return;
    const updatedItems = analysisResult.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    const { min, max } = recalculateVolume(updatedItems);
    setAnalysisResult({
      ...analysisResult,
      items: updatedItems,
      estimatedTotalVolumeMinM3: min,
      estimatedTotalVolumeMaxM3: max,
    });
  };

  // Manual Item Quantity Decrease
  const handleQuantityDecrease = (itemId: string) => {
    if (!analysisResult) return;
    const itemToUpdate = analysisResult.items.find((i) => i.id === itemId);
    if (!itemToUpdate) return;

    let updatedItems: CargoItem[];
    if (itemToUpdate.quantity <= 1) {
      updatedItems = analysisResult.items.filter((i) => i.id !== itemId);
    } else {
      updatedItems = analysisResult.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    }

    const { min, max } = recalculateVolume(updatedItems);
    setAnalysisResult({
      ...analysisResult,
      items: updatedItems,
      estimatedTotalVolumeMinM3: min,
      estimatedTotalVolumeMaxM3: max,
    });
  };

  // Remove Detected Item
  const handleRemoveItem = (itemId: string) => {
    if (!analysisResult) return;
    const updatedItems = analysisResult.items.filter((i) => i.id !== itemId);
    const { min, max } = recalculateVolume(updatedItems);
    setAnalysisResult({
      ...analysisResult,
      items: updatedItems,
      estimatedTotalVolumeMinM3: min,
      estimatedTotalVolumeMaxM3: max,
    });
  };

  // Add Custom Missing Item
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !analysisResult) return;

    const newItem: CargoItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: newItemName.trim(),
      quantity: Math.max(1, newItemQty),
      estimatedVolumeM3: Math.max(0.1, newItemVolume),
      confidence: 'high',
    };

    const updatedItems = [...analysisResult.items, newItem];
    const { min, max } = recalculateVolume(updatedItems);

    setAnalysisResult({
      ...analysisResult,
      items: updatedItems,
      estimatedTotalVolumeMinM3: min,
      estimatedTotalVolumeMaxM3: max,
    });

    setNewItemName('');
    setNewItemQty(1);
    setNewItemVolume(0.5);
    setShowAddForm(false);
  };

  // Submit to Gemini Multimodal Analysis API
  const handleStartAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setUploadError(null);

    if (formData.images.length === 0) {
      setUploadError('Zəhmət olmasa analiz üçün ən azı bir şəkil əlavə edin.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const payload = {
        images: formData.images.map((img) => ({
          base64: img.base64 || img.url,
          mimeType: img.mimeType || 'image/jpeg',
        })),
        details: formData.details,
      };

      const response = await fetch('/api/analyze-cargo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error('[Gemini Cargo Analysis Failed Response]:', {
          status: response.status,
          statusText: response.statusText,
          error: data?.error,
        });
        throw new Error(data?.error || `Server status: ${response.status}`);
      }

      // Ensure valid structure with item IDs
      const formattedItems: CargoItem[] = (data.items || []).map((item: any) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: item.name || 'Əşya',
        quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
        estimatedVolumeM3: parseFloat(item.estimatedVolumeM3) || 0.5,
        confidence: item.confidence === 'low' ? 'low' : item.confidence === 'high' ? 'high' : 'medium',
        isSpecialOrHeavy: !!item.isSpecialOrHeavy,
      }));

      const finalResult: CargoAnalysisData = {
        items: formattedItems,
        estimatedTotalVolumeMinM3: Math.max(1, Math.round(data.estimatedTotalVolumeMinM3 || 3)),
        estimatedTotalVolumeMaxM3: Math.max(
          Math.max(1, Math.round(data.estimatedTotalVolumeMinM3 || 3)) + 1,
          Math.round(data.estimatedTotalVolumeMaxM3 || 5)
        ),
        analysisConfidence:
          data.analysisConfidence === 'low' ? 'low' : data.analysisConfidence === 'high' ? 'high' : 'medium',
        notes: data.notes || [],
      };

      setAnalysisResult(finalResult);

      // Smooth scroll to result card
      setTimeout(() => {
        const resEl = document.getElementById('yukdasima-analysis-result');
        if (resEl) {
          resEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 150);
    } catch (err: any) {
      console.error('[Gemini Cargo Analysis Failed]:', err);
      setErrorMessage('Əməliyyatı tamamlamaq mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // WhatsApp formatted share link with deterministic breakdown
  const handleWhatsAppShare = () => {
    if (!analysisResult || !pricingResult) return;

    const itemsSummary = analysisResult.items
      .map((it) => `* ${it.quantity} ${it.name}`)
      .join('\n');

    let msg = `Salam. yukdasima.ai saytından müraciət edirəm.\n\n`;
    const routeText = pricingResult.routeSummary 
      ? pricingResult.routeSummary 
      : `${formData.fromAddress || 'Bakı'} → ${formData.toAddress || 'Təyin edilməyib'}`;
    
    msg += `Marşrut: ${routeText}\n`;
    msg += `Yük həcmi təxmini: ${pricingResult.volumeRangeDisplay}\n`;
    msg += `Tövsiyə olunan avtomobil: ${pricingResult.vehicleCategory || '4m'}\n`;
    msg += `Avtomobil üçün ilkin qiymət: ${pricingResult.vehicleTransportPriceDisplay}\n\n`;

    if (itemsSummary) {
      msg += `Müəyyən edilən əşyalar:\n${itemsSummary}\n\n`;
    }

    msg += `Əlavə xidmət:\n`;
    msg += `Fəhlə: ${formData.workerCount && formData.workerCount > 0 ? `${formData.workerCount} nəfər tələb olunur` : 'tələb olunur'}\n`;
    msg += `Mebel sökülməsi: ${formData.needsAssembly ? 'tələb olunur' : 'tələb olunmur'}\n`;

    if (pricingResult.specialItems.length > 0) {
      msg += `Xüsusi əşyalar: ${pricingResult.specialItems.map((s) => s.name).join(', ')}\n`;
    }

    msg += `\nDəqiq ümumi qiymət almaq istəyirəm.`;

    window.open(generateWhatsAppLink(msg), '_blank');
  };

  const getConfidenceBadge = (confidence: 'high' | 'medium' | 'low') => {
    if (confidence === 'high') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Yüksək
        </span>
      );
    }
    if (confidence === 'medium') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          Orta
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        Aşağı
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-5 sm:p-8 md:p-10 transition-all">
      {/* 1. TOP TWO YÜKDAŞIMA OPTIONS */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: AI */}
          <div
            id="yukdasima-option-ai"
            onClick={() => setYukdasimaMode('ai')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              yukdasimaMode === 'ai'
                ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`p-3 rounded-xl shrink-0 transition-colors ${
                  yukdasimaMode === 'ai' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-1.5">
                    <span>✨ Yükümü AI ilə hesabla</span>
                  </h3>
                  {yukdasimaMode === 'ai' && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      Seçildi
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Əşyalarınızın şəkillərini göndərin, uyğun avtomobili və ilkin qiyməti müəyyən edək.
                </p>
              </div>
            </div>
          </div>

          {/* Option 2: Direct */}
          <div
            id="yukdasima-option-direct"
            onClick={() => setYukdasimaMode('direct')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              yukdasimaMode === 'direct'
                ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`p-3 rounded-xl shrink-0 transition-colors ${
                  yukdasimaMode === 'direct' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Truck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-1.5">
                    <span>🚚 Sadəcə maşın sifariş et</span>
                  </h3>
                  {yukdasimaMode === 'direct' && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      Seçildi
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Hansı avtomobilə ehtiyacınız olduğunu bilirsinizsə, birbaşa seçin və ilkin qiyməti görün.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {yukdasimaMode === 'direct' ? (
        <DirectYukdasimaOrder
          onOpenCallback={onOpenCallback}
          onSwitchToAi={() => setYukdasimaMode('ai')}
          initialFromAddress={initialFromAddress || formData.fromAddress || 'Bakı'}
          initialToAddress={initialToAddress || formData.toAddress || ''}
        />
      ) : (
        <>
          {/* Header */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Truck className="w-4 h-4" />
              <span>Yükdaşıma & Mebel Analizi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Əşyalarınızın şəkillərini yükləyin
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Əşyalarınızın şəkillərini yükləyin. Süni intellekt yükünüzü analiz etsin, uyğun avtomobili müəyyənləşdirsin və mövcud tariflər əsasında ilkin qiyməti hesablasın.
            </p>
          </div>

      <form onSubmit={handleStartAnalysis} className="mt-8 space-y-8">
        {/* IMAGE UPLOAD SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-600" />
              <span>Əşyalarınızın şəkillərini əlavə edin</span>
              <span className="text-xs font-normal text-slate-500">(Çoxlu foto dəstəklənir)</span>
            </label>
            {formData.images.length === 0 && (
              <button
                type="button"
                onClick={handleAddSamplePhotos}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nümunə foto ilə sına</span>
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
            id="yukdasima-file-input"
          />

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/30 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200"
          >
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-100/80 group-hover:bg-blue-200/80 text-blue-700 flex items-center justify-center mb-3 transition-colors shadow-xs">
              <Upload className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                📸 Şəkilləri seçin və ya çəkin
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                JPG, PNG, WEBP formatları (Maks. 20MB). Eyni əşyanı fərqli bucaqlardan çəkə bilərsiniz.
              </p>
            </div>
          </div>

          {/* Upload Error Message */}
          {uploadError && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Image Thumbnails */}
          {formData.images.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>Yüklənmiş şəkillər ({formData.images.length} ədəd)</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Daha çox əlavə et
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {formData.images.map((img) => (
                  <div
                    key={img.id}
                    className="group relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs"
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(img.id);
                      }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                      title="Şəkli sil"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent p-1.5 text-[10px] text-white truncate">
                      {img.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ADDITIONAL INFORMATION TEXTAREA */}
        <div className="space-y-2">
          <label htmlFor="yukdasima-details" className="block text-sm font-bold text-slate-900">
            Yükünüz haqqında əlavə məlumat <span className="text-xs font-normal text-slate-500">(İstəyə görə)</span>
          </label>
          <textarea
            id="yukdasima-details"
            rows={2}
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            placeholder="Məsələn: 3 otaqlı evdir, böyük qarderob sökülməlidir, piano var..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 transition-all outline-none"
          />
        </div>

        {/* ROUTE DESTINATIONS (HARADAN? / HARAYA?) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
          {/* Haradan */}
          <div className="space-y-2">
            <label htmlFor="from-address" className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Haradan? (Götürülmə ünvanı)</span>
            </label>
            <input
              id="from-address"
              type="text"
              value={formData.fromAddress}
              onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
              placeholder="Məs: Bakı, Nərimanov r."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm outline-none"
            />
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {['Bakı', 'Nərimanov', 'Yasamal', 'Xətai'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setFormData({ ...formData, fromAddress: loc })}
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-[11px] text-slate-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Haraya */}
          <div className="space-y-2">
            <label htmlFor="to-address" className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Haraya? (Çatdırılma ünvanı / Rayon)</span>
            </label>
            <input
              id="to-address"
              type="text"
              value={formData.toAddress}
              onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
              placeholder="Məs: Gəncə, Xırdalan, Sumqayıt..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm outline-none"
            />
            {/* Dynamic Search Suggestions */}
            {formData.toAddress.trim().length >= 2 && (() => {
              const dynamicSuggestions = findDestinationSuggestions(formData.toAddress, 5);
              if (dynamicSuggestions.length === 0) return null;
              return (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-blue-700 font-bold">Təkliflər:</span>
                  {dynamicSuggestions.map((s) => (
                    <button
                      key={s.canonicalName}
                      type="button"
                      onClick={() => setFormData({ ...formData, toAddress: s.canonicalName })}
                      className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[11px] text-blue-700 font-bold hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      {s.canonicalName}
                    </button>
                  ))}
                </div>
              );
            })()}
            {/* Quick Regional Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {['Gəncə', 'Xırdalan', 'Sumqayıt', 'Şəki', 'Quba', 'Lənkəran'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setFormData({ ...formData, toAddress: loc })}
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-[11px] text-slate-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FLOORS, ELEVATOR & FIT QUESTIONS */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Mərtəbə və Lift məlumatları</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="space-y-1.5">
              <label htmlFor="from-floor" className="block text-xs font-bold text-slate-700">
                Yük hansı mərtəbədən götürüləcək?
              </label>
              <select
                id="from-floor"
                value={formData.fromFloor}
                onChange={(e) => setFormData({ ...formData, fromFloor: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:border-blue-600 outline-none"
              >
                <option value="1">1-ci mərtəbə / Həyət evi</option>
                <option value="2">2-ci mərtəbə</option>
                <option value="3">3-cü mərtəbə</option>
                <option value="4">4-cü mərtəbə</option>
                <option value="5">5-ci mərtəbə</option>
                <option value="6">6-10-cu mərtəbə</option>
                <option value="11">11+ mərtəbə</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="to-floor" className="block text-xs font-bold text-slate-700">
                Yük hansı mərtəbəyə aparılacaq?
              </label>
              <select
                id="to-floor"
                value={formData.toFloor}
                onChange={(e) => setFormData({ ...formData, toFloor: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:border-blue-600 outline-none"
              >
                <option value="1">1-ci mərtəbə / Həyət evi</option>
                <option value="2">2-ci mərtəbə</option>
                <option value="3">3-cü mərtəbə</option>
                <option value="4">4-cü mərtəbə</option>
                <option value="5">5-ci mərtəbə</option>
                <option value="6">6-10-cu mərtəbə</option>
                <option value="11">11+ mərtəbə</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="has-elevator" className="block text-xs font-bold text-slate-700">
                Lift var?
              </label>
              <select
                id="has-elevator"
                value={formData.hasElevator}
                onChange={(e) => setFormData({ ...formData, hasElevator: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:border-blue-600 outline-none"
              >
                <option value="yes">Hər iki ünvanda var</option>
                <option value="no">Lift yoxdur (Pilləkən)</option>
                <option value="from_only">Yalnız 1-ci ünvanda var</option>
                <option value="to_only">Yalnız 2-ci ünvanda var</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="items-fit-elevator" className="block text-xs font-bold text-slate-700">
                Əşyalar liftə yerləşir?
              </label>
              <select
                id="items-fit-elevator"
                value={formData.itemsFitElevator || 'yes'}
                onChange={(e) => setFormData({ ...formData, itemsFitElevator: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:border-blue-600 outline-none"
              >
                <option value="yes">Bəli, əsas əşyalar yerləşir</option>
                <option value="no">Xeyr, pilləkənlə daşınmalıdır</option>
                <option value="partial">Qismən (bəzi böyük əşyalar yerləşmir)</option>
              </select>
            </div>
          </div>
        </div>

        {/* WORKERS & CRAFTSMAN SERVICE SELECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Worker Service */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Fəhlə xidməti</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Fəhlə xidməti 1 nəfər üçün 20 AZN-dən başlayır (şəhərdaxili standart şəraitdə).
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-blue-100">
              <span className="text-xs font-semibold text-slate-700">Tələb olunan fəhlə sayı:</span>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({ ...formData, workerCount: num })}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      formData.workerCount === num
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {num === 0 ? '0' : num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Furniture Disassembly & Assembly (Usta) */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Mebel sökülməsi və yığılması</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Mebelin sökülməsi və yığılması usta xidmətidir və ayrıca hesablanır.
              </p>
            </div>

            <label className="flex items-center gap-2.5 pt-1 border-t border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.needsAssembly || false}
                onChange={(e) => setFormData({ ...formData, needsAssembly: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-800">
                Mebel ustası xidməti tələb olunur
              </span>
            </label>
          </div>
        </div>

        {/* PHONE NUMBER */}
        <div className="max-w-md space-y-1.5">
          <label htmlFor="yukdasima-phone" className="block text-sm font-bold text-slate-800">
            Əlaqə nömrəniz <span className="text-xs font-normal text-slate-500">(İstəyə görə)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="yukdasima-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+994 50 123 45 67"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm bg-slate-50/50 outline-none"
            />
          </div>
        </div>

        {/* MAIN SUBMIT ACTION */}
        <div className="pt-2">
          <button
            id="btn-analyze-cargo"
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto min-w-[260px] py-4 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>{LOADING_MESSAGES[loadingStepIndex]}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Yükümü analiz et və qiymətləndir</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* ERROR STATE */}
      {errorMessage && !isAnalyzing && (
        <div className="mt-8 p-6 rounded-2xl bg-rose-50 border border-rose-200 text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="font-bold text-rose-900 text-base">
                Şəkilləri analiz etmək mümkün olmadı.
              </h4>
              <p className="text-sm text-rose-700">
                Zəhmət olmasa yenidən cəhd edin və ya internet bağlantınızı yoxlayın.
              </p>
              <button
                type="button"
                onClick={handleStartAnalysis}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Yenidən analiz et</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOADING STATE ANIMATION */}
      {isAnalyzing && (
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-blue-50 border border-blue-200/90 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-600/30 animate-spin">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-blue-950 transition-all duration-300">
            {LOADING_MESSAGES[loadingStepIndex]}
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-blue-700">
            Süni intellekt əşyaları analiz edir, uyğun avtomobil və ilkin qiymət hesablanır...
          </p>
        </div>
      )}

      {/* DETERMINISTIC RESULT PRESENTATION */}
      {analysisResult && pricingResult && !isAnalyzing && (
        <div
          id="yukdasima-analysis-result"
          className="mt-10 rounded-2xl border-2 border-blue-600 bg-white p-6 sm:p-8 shadow-xl animate-in fade-in zoom-in-95 duration-300 space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wide mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Süni İntellekt Təhlili</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Yükünüz analiz edildi
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <span className="font-semibold">Təhlilin etibarlılığı:</span>
              {getConfidenceBadge(analysisResult.analysisConfidence)}
            </div>
          </div>

          {/* CRITICAL OPERATOR / OVERLOAD / FIT ALERTS */}
          {pricingResult.isOverCapacity && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm sm:text-base text-amber-900">
                  {BUSINESS_PRICING_RULES.overloadMessage}
                </h4>
                <p className="text-xs sm:text-sm text-amber-800">
                  Ümumi yük həcmi 32 m³-dən artıqdır. Ən sərfəli variant üçün operatorumuz sizinlə xüsusi nəqliyyat və ya çoxsaylı reys planını razılaşdıracaq.
                </p>
              </div>
            </div>
          )}

          {pricingResult.hasLargeItemFitRisk && !pricingResult.isOverCapacity && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-blue-900">
                  İri ölçülü əşya xəbərdarlığı
                </h4>
                <p className="text-xs sm:text-sm text-blue-800">
                  {BUSINESS_PRICING_RULES.largeItemFitWarning}
                </p>
              </div>
            </div>
          )}

          {/* DETECTED ITEMS LIST */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-600" />
                <span>Müəyyən edilən əşyalar ({analysisResult.items.length})</span>
              </h3>
              <span className="text-xs text-slate-500">Miqdarı dəyişə və ya yeni əşya əlavə edə bilərsiniz</span>
            </div>

            {analysisResult.items.length === 0 ? (
              <p className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200">
                Heç bir əşya aşkarlanmadı. Aşağıdakı düymə ilə əl ilə əşya əlavə edə bilərsiniz.
              </p>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                {analysisResult.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-sm flex items-center justify-center shrink-0">
                        {item.quantity}×
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm sm:text-base">
                            {item.name}
                          </span>
                          {getConfidenceBadge(item.confidence)}
                          {item.isSpecialOrHeavy && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                              Xüsusi / Ağır
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 block">
                          Təxmini həcm: ~{(item.estimatedVolumeM3 * item.quantity).toFixed(1)} m³ ({item.estimatedVolumeM3} m³ / ədəd)
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleQuantityDecrease(item.id)}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                        title="Sayını azalt"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-slate-900 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityIncrease(item.id)}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                        title="Sayını artır"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="w-8 h-8 ml-1 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-400 hover:text-rose-600 flex items-center justify-center cursor-pointer transition-colors"
                        title="Əşyanı sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Custom Item */}
            {!showAddForm ? (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-xs sm:text-sm font-bold text-blue-600 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Əşya əlavə et</span>
              </button>
            ) : (
              <form onSubmit={handleAddNewItem} className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Yeni əşya əlavə edin:</span>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    Ləğv et
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Əşyanın adı"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      placeholder="Sayı (ədəd)"
                      value={newItemQty}
                      onChange={(e) => setNewItemQty(parseInt(e.target.value, 10) || 1)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0.1}
                      max={10}
                      placeholder="Həcmi (m³)"
                      value={newItemVolume}
                      onChange={(e) => setNewItemVolume(parseFloat(e.target.value) || 0.5)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Əlavə et
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* TWO CORE DETERMINISTIC CARDS: VOLUME & VEHICLE SELECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Volume Assessment */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 block mb-1">
                  Təxmini yük həcmi
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {pricingResult.volumeRangeDisplay}
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Avtomobil seçimi üçün təhlükəsizlik nəzərə alınaraq ümumi həcm ({pricingResult.evaluatedVolumeM3} m³) əsas götürülmüşdür.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs text-slate-600">
                <span>Daşınan əşya sayı:</span>
                <span className="font-bold text-slate-900">
                  {analysisResult.items.reduce((sum, it) => sum + it.quantity, 0)} ədəd
                </span>
              </div>
            </div>

            {/* Card 2: Recommended Vehicle */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-800 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 block">
                    Tövsiyə olunan avtomobil
                  </span>
                  {pricingResult.vehicleCategory && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[11px] font-extrabold">
                      {pricingResult.vehicleCategory} kateqoriyası
                    </span>
                  )}
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {pricingResult.vehicleName}
                </div>
                <p className="mt-1.5 text-xs text-slate-300">
                  Avtomobil seçimi yükün təxmini həcminə əsaslanır.
                </p>
                {pricingResult.hasLargeItemFitRisk && (
                  <p className="mt-2 text-xs text-amber-300 font-medium bg-amber-950/50 p-2 rounded-lg border border-amber-500/30">
                    ⚠️ İri ölçülü əşya aşkarlandığı üçün avtomobil ölçüsünün operator tərəfindən təsdiqlənməsi tövsiyə olunur.
                  </p>
                )}
                {pricingResult.vehicleDimensionsDisplay && (
                  <p className="mt-2 text-xs text-slate-400 font-mono">
                    Ölçülər: {pricingResult.vehicleDimensionsDisplay}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
                <span>Praktiki tutum:</span>
                <span className="font-bold text-emerald-400">
                  {pricingResult.vehiclePracticalCapacityM3 ? `~${pricingResult.vehiclePracticalCapacityM3} m³` : 'Xüsusi'}
                </span>
              </div>
            </div>
          </div>

          {/* DETERMINISTIC VEHICLE TRANSPORT PRICE SECTION */}
          <div className="p-6 rounded-2xl bg-blue-50/80 border-2 border-blue-600/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 block">
                  Avtomobil üçün ilkin qiymət
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900">
                  {pricingResult.vehicleTransportPriceDisplay}
                </div>
              </div>

              {pricingResult.routeSummary && (
                <div className="sm:text-right">
                  <span className="text-xs font-semibold text-slate-500 block">Marşrut:</span>
                  <span className="text-sm font-bold text-slate-800">
                    {pricingResult.routeSummary} ({pricingResult.distanceKm} km)
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-700">
              ℹ️ Bu məbləğ avtomobilin sifariş/daşınma qiymətidir. Əlavə xidmətlər ayrıca hesablana bilər.
            </p>

            {pricingResult.hasMissingTariff && (
              <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Bu istiqamət üçün avtomatik tarif mövcud deyil. Dəqiq qiymət üçün bizimlə əlaqə saxlayın.</span>
              </div>
            )}
          </div>

          {/* EXTRA SERVICES BREAKDOWN (ƏLAVƏ XİDMƏTLƏR) */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Əlavə xidmətlər</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Worker Service Status */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Fəhlə xidməti</span>
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    {pricingResult.isIntercity ? 'Ayrıca hesablanır' : '1 nəfər üçün 20 AZN-dən başlayır'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {pricingResult.isIntercity
                    ? 'Rayonlararası sifarişlərdə fəhlə xidmətinin qiyməti ayrıca hesablanır.'
                    : 'Standart daşıma üçün 1 nəfər 20 AZN-dən başlayır.'}
                </p>
                {pricingResult.stairsNotice && (
                  <p className="text-[11px] text-amber-800 font-medium">
                    ⚠️ Mərtəbə, yükün ağırlığı və daşınma çətinliyinə görə əlavə xidmət haqqı tələb oluna bilər.
                  </p>
                )}
              </div>

              {/* Furniture Assembly Craftsman Status */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-amber-600" />
                    <span>Mebel sökülməsi / yığılması</span>
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    {pricingResult.assemblyServiceDisplay}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Mebelin sökülməsi və yığılması usta xidmətidir və ayrıca hesablanır.
                </p>
              </div>
            </div>
          </div>

          {/* SPECIAL / HEAVY ITEMS DETECTED SECTION */}
          {pricingResult.specialItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Xüsusi və Ağır Əşya Qeydləri:</span>
              </div>
              <div className="space-y-2">
                {pricingResult.specialItems.map((sp, idx) => (
                  <div key={idx} className="text-xs text-amber-900 bg-white/80 p-2.5 rounded-xl border border-amber-200/60 flex items-start gap-2">
                    <span className="font-bold text-amber-950 shrink-0">• {sp.name}:</span>
                    <span>{sp.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI NOTES IF ANY */}
          {analysisResult.notes && analysisResult.notes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-700 block">Süni intellekt qeydləri:</span>
              <ul className="list-disc pl-4 space-y-0.5">
                {analysisResult.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* OFFICIAL CONFIRMATION NOTICE */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-slate-800">
                Təxmini ilkin qiymətləndirmədir. Operator təsdiqi tələb olunur.
              </p>
              <p>
                Dəqiq yekun qiymət daşınma şəraiti və xüsusi tələblər nəzərə alınaraq operator tərəfindən təsdiqlənir.
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS: YEKUN QİYMƏTİ DƏQİQLƏŞDİRİN */}
          <div className="space-y-2.5 pt-2">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Yekun qiyməti dəqiqləşdirin
            </h4>
            <div className="flex flex-col sm:flex-row gap-3.5">
              <button
                id="yukdasima-btn-whatsapp"
                type="button"
                onClick={handleWhatsAppShare}
                className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-5 h-5" />
                <span>💬 WhatsApp ilə dəqiq qiymət al</span>
              </button>

              <button
                id="yukdasima-btn-callback"
                type="button"
                onClick={() =>
                  onOpenCallback({
                    phone: formData.phone,
                    service: 'yukdasima',
                    source: 'Yükdaşıma AI Hesablayıcı',
                    route: pricingResult?.routeSummary || `${formData.fromAddress || 'Bakı'} → ${formData.toAddress || 'Təyin edilməyib'}`,
                    vehicle: pricingResult?.vehicleName,
                    estimatedPrice: pricingResult?.vehicleTransportPriceDisplay,
                    notes: analysisResult
                      ? `Həcm: ${analysisResult.estimatedTotalVolumeMinM3}-${analysisResult.estimatedTotalVolumeMaxM3} m³, Əşyalar: ${analysisResult.items.map((i) => `${i.quantity} ${i.name}`).join(', ')}`
                      : undefined,
                  })
                }
                className="py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                <span>📞 Mənimlə əlaqə saxlayın</span>
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
};
