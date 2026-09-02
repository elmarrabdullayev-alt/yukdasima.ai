export interface ConversionEventParams {
  page_path: string;
  service_type?: string;
  route?: string;
  cta_location: 'sticky_mobile_bar' | 'hero' | 'navbar' | 'footer' | 'modal' | 'card' | 'quick_action' | string;
  [key: string]: unknown;
}

export type ConversionEventName =
  | 'mobile_call_click'
  | 'mobile_whatsapp_click'
  | 'call_click'
  | 'whatsapp_click';

/**
 * Reusable, safe client-side conversion event tracking helper.
 * Compatible with GTM (dataLayer), GA4, custom DOM listeners, and browser diagnostics.
 */
export function trackConversionEvent(
  eventName: ConversionEventName,
  params: ConversionEventParams
): void {
  try {
    if (typeof window === 'undefined') return;

    // 1. Standard dataLayer push (GTM / GA4 compatible)
    if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: eventName,
        ...params,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Custom DOM event for extensible app analytics hooks
    const customEvent = new CustomEvent('yukdasima_conversion', {
      detail: {
        eventName,
        ...params,
        timestamp: new Date().toISOString(),
      },
    });
    window.dispatchEvent(customEvent);

    // 3. Development diagnostic log
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Conversion Event] ${eventName}:`, params);
    }
  } catch (err) {
    // Non-blocking guard
    console.warn('[Analytics Tracker Warning]:', err);
  }
}
