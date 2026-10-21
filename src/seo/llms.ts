/**
 * llms.txt generator (https://llmstxt.org)
 *
 * A short, factual description of the business for AI assistants (ChatGPT, Gemini, Perplexity,
 * Claude...). It is built at deploy time from the same vehicle list, pricing rules and route
 * registry the website uses, so it always matches the site. Route tariffs are not listed,
 * because the site shows them only through the calculator.
 */

import { DEFAULT_VEHICLE_CONFIG } from '../config/vehicles';
import { BUSINESS_PRICING_RULES } from '../config/pricingRules';
import { CONTACT_INFO } from '../constants/contact';
import { getAllApprovedYukdasimaRoutes, getAllApprovedEvakuatorRoutes } from './routeRegistry';
import { SITE_URL, GOOGLE_BUSINESS_PROFILE, PAGE_SEO_CONFIGS } from './metadata';
import { RU_PAGE_SEO } from './metadataRu';
import { toRuPath } from '../i18n/paths';

export function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push('# yukdasima.ai');
  lines.push('');
  lines.push(
    '> Bakı və Azərbaycanın regionlarında yükdaşıma və 24/7 evakuator xidməti. Ev və ofis köçürülməsi, ' +
      'mebel daşınması, yük maşını sifarişi (2m–7m, TIR), fəhlə xidməti və avtomobil evakuasiyası. ' +
      'Saytda şəkillərlə AI həcm analizi və tarif bazasına əsaslanan onlayn ilkin qiymət hesablanır.'
  );
  lines.push('');

  lines.push('## Əlaqə');
  lines.push('');
  lines.push(`- Telefon / WhatsApp: ${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} (${CONTACT_INFO.PRIMARY_PHONE_RAW})`);
  lines.push(`- Qısa nömrə: ${CONTACT_INFO.HOTLINE_DISPLAY}`);
  lines.push(`- WhatsApp: ${CONTACT_INFO.WHATSAPP_URL_BASE}`);
  lines.push('- İş saatları: 24/7, həftənin 7 günü');
  lines.push('- Xidmət ərazisi: Bakı, Abşeron və Azərbaycanın bütün regionları');
  lines.push(`- Google Business Profile: ${GOOGLE_BUSINESS_PROFILE.mapsUrl}`);
  lines.push('');

  lines.push('## Qiymətlər necə hesablanır');
  lines.push('');
  lines.push('- Bütün qiymətlər ilkin qiymətdir; yekun qiyməti operator təsdiqləyir.');
  lines.push('- Yükdaşıma: qiymət maşının ölçüsünə və marşruta görə sabit tarif bazasından götürülür. AI yalnız şəkillərdən yükün həcmini təxmin edir, qiyməti təyin etmir.');
  lines.push(`- Fəhlə xidməti: ${BUSINESS_PRICING_RULES.workerBaseStartingPrice} AZN-dən / nəfər. Rayonlararası sifarişlərdə fəhlə ayrıca hesablanır.`);
  lines.push(`- Liftsiz ${BUSINESS_PRICING_RULES.stairsFloorThreshold}-cü və daha yuxarı mərtəbələrdə əlavə daşıma haqqı tətbiq oluna bilər.`);
  lines.push('- Pianino, seyf və ağır avadanlıq ayrıca hesablanır.');
  lines.push('- Mebelin sökülüb-yığılması usta xidmətidir və ayrıca hesablanır.');
  lines.push('- Evakuator: marşrut tarifi + Minivan üçün +10 AZN + işləməyən (təkəri kilidli) avtomobil üçün +5 AZN. Mikroavtobus və xüsusi texnika fərdi hesablanır.');
  lines.push('');

  lines.push('## Yük maşınları');
  lines.push('');
  for (const v of DEFAULT_VEHICLE_CONFIG.vehicles) {
    if (v.category === 'tir') {
      lines.push(`- ${v.name}: böyük həcmli yüklər, qiymət operatorla razılaşdırılır`);
    } else {
      lines.push(
        `- ${v.name}: kuzov ${v.lengthM.toFixed(2)} × ${v.widthM.toFixed(2)} × ${v.heightM.toFixed(2)} m, praktiki tutum ~${v.practicalCapacityM3} m³`
      );
    }
  }
  lines.push('');

  lines.push('## Yükdaşıma marşrut səhifələri (Bakıdan)');
  lines.push('');
  for (const r of getAllApprovedYukdasimaRoutes()) {
    const distance = r.distanceKm ? `, ${r.distanceKm} km` : '';
    lines.push(`- [${r.origin}–${r.destination} yükdaşıma](${SITE_URL}${r.routePath})${distance}`);
  }
  lines.push('');
  lines.push(
    `Marşrut və maşın ölçüsünə görə ilkin qiyməti saytdakı onlayn kalkulyatorla (${SITE_URL}/yukdasima, ${SITE_URL}/evakuator) ` +
      'və ya telefonla öyrənmək olar. Regiondan Bakıya və digər istiqamətlər üçün qiymət operatorla dəqiqləşdirilir.'
  );
  lines.push('');

  lines.push('## Əsas səhifələr');
  lines.push('');
  for (const [path, cfg] of Object.entries(PAGE_SEO_CONFIGS)) {
    lines.push(`- [${cfg.h1}](${SITE_URL}${path === '/' ? '/' : path}): ${cfg.metaDescription}`);
  }
  lines.push('');

  lines.push('## Rus dilində səhifələr (Русская версия)');
  lines.push('');
  for (const [path, cfg] of Object.entries(RU_PAGE_SEO)) {
    lines.push(`- [${cfg.h1}](${SITE_URL}${toRuPath(path)}): ${cfg.metaDescription}`);
  }
  lines.push('');

  lines.push('## Evakuator marşrut səhifələri');
  lines.push('');
  for (const r of getAllApprovedEvakuatorRoutes()) {
    lines.push(`- [${r.origin}–${r.destination} evakuator](${SITE_URL}${r.routePath})`);
  }
  lines.push('');

  return lines.join('\n');
}
