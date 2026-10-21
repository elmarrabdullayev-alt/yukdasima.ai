import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { isValidPhoneNumber } from "./src/utils/phone";

dotenv.config();

// Global server process error resilience
process.on("unhandledRejection", (reason) => {
  console.warn("[Server Process] Handled unhandled rejection safely:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("[Server Process] Uncaught exception:", err);
});

/**
 * Simple in-memory rate limiter (per client IP, per route).
 * Protects the Telegram lead channel from spam and the Gemini key from abuse.
 */
function createRateLimiter(options: { windowMs: number; max: number; message: string }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  // Periodically drop expired entries so the map does not grow forever
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, options.windowMs);
  (cleanup as unknown as { unref?: () => void }).unref?.();

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Cloudflare sends the visitor IP in CF-Connecting-IP; fall back to Express' proxy-aware req.ip
    const cfIp = req.headers["cf-connecting-ip"];
    const key = (typeof cfIp === "string" && cfIp) || req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + options.windowMs });
      return next();
    }

    entry.count += 1;
    if (entry.count > options.max) {
      res.setHeader("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ success: false, error: options.message });
    }
    return next();
  };
}

/** Telegram rejects messages over 4096 characters, so every free-text field is capped. */
function limitText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

/**
 * Builds the 404 page from the built index.html: noindex, a "not found" title and an empty
 * #root, so the browser renders the "Səhifə tapılmadı" page instead of a copy of the home page.
 */
function buildNotFoundHtml(template: string, lang: "az" | "ru" = "az"): string {
  let html = template;
  html = html.replace(/<meta\s+name="robots"[^>]*>/gi, "");
  html = html.replace("</head>", '  <meta name="robots" content="noindex, follow">\n  </head>');
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    lang === "ru" ? "<title>Страница не найдена | yukdasima.ai</title>" : "<title>Səhifə tapılmadı | yukdasima.ai</title>"
  );
  if (lang === "ru") {
    html = html.replace(/<html([^>]*)\slang="[^"]*"/i, '<html$1 lang="ru"');
  }
  html = html.replace(/<link\s+rel="alternate"\s+hreflang[^>]*>\s*/gi, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, "");
  html = html.replace(/<script\s+id="seo-structured-data-jsonld"[\s\S]*?<\/script>/gi, "");

  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.lastIndexOf("</body>");
  const rootEnd = bodyEnd === -1 ? -1 : html.lastIndexOf("</div>", bodyEnd);
  if (rootStart !== -1 && rootEnd > rootStart) {
    html = html.slice(0, rootStart) + '<div id="root"></div>' + html.slice(rootEnd + "</div>".length);
  }
  return html;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // The site runs behind Cloudflare / a hosting proxy: use the real visitor IP for rate limiting
  app.set("trust proxy", true);

  // JSON body limit: up to 10 compressed photos fit comfortably in 25 MB
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  const callbackRateLimit = createRateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Çox sayda müraciət göndərildi. Zəhmət olmasa bir neçə dəqiqə sonra yenidən cəhd edin və ya 878 ilə əlaqə saxlayın.",
  });
  const analyzeRateLimit = createRateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: "Çox sayda analiz sorğusu göndərildi. Zəhmət olmasa bir neçə dəqiqə sonra yenidən cəhd edin.",
  });

  // Shared Gemini client lazy initialization
  let aiClient: GoogleGenAI | null = null;
  function getGeminiAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      aiClient = new GoogleGenAI({
        apiKey: apiKey || "",
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Route: Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      hasTelegramConfig: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    });
  });

  // API Route: Telegram Callback & Lead Delivery
  app.post("/api/callback", callbackRateLimit, async (req, res) => {
    try {
      const { name, phone, service, message, source, route, vehicle, estimatedPrice, notes, lang } = req.body || {};

      const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
      if (!trimmedPhone) {
        return res.status(400).json({
          success: false,
          error: "Telefon nömrəsi daxil edilməlidir.",
        });
      }

      if (!isValidPhoneNumber(trimmedPhone)) {
        return res.status(400).json({
          success: false,
          error: "Telefon nömrəsi düzgün deyil. Məsələn: 050 123 45 67",
        });
      }

      // Each field is capped so the whole message always stays under Telegram's 4096 character limit
      const trimmedName = typeof name === "string" ? limitText(name.trim(), 100) : "";
      const trimmedService = typeof service === "string" ? limitText(service.trim(), 50) : "";
      const trimmedMessage = typeof message === "string" ? limitText(message.trim(), 1500) : "";
      const trimmedSource = typeof source === "string" ? limitText(source.trim(), 200) : "";
      const trimmedRoute = typeof route === "string" ? limitText(route.trim(), 200) : "";
      const trimmedVehicle = typeof vehicle === "string" ? limitText(vehicle.trim(), 100) : "";
      const trimmedEstimatedPrice =
        typeof estimatedPrice === "string"
          ? limitText(estimatedPrice.trim(), 100)
          : typeof estimatedPrice === "number"
          ? String(estimatedPrice).trim()
          : "";
      const trimmedNotes = typeof notes === "string" ? limitText(notes.trim(), 1200) : "";

      const escapeHtml = (text: string): string =>
        text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const lines: string[] = ["🔔 <b>Yeni müraciət — yukdasima.ai</b>", ""];

      if (trimmedName) {
        lines.push(`👤 <b>Ad:</b> ${escapeHtml(trimmedName)}`);
      }
      lines.push(`📞 <b>Telefon:</b> <code>${escapeHtml(trimmedPhone)}</code>`);

      if (trimmedService) {
        const isEvak = trimmedService.toLowerCase().includes("evaku");
        lines.push(`🚚 <b>Xidmət:</b> ${isEvak ? "🚗 Evakuasiya" : "🚚 Yükdaşıma"}`);
      }

      if (trimmedRoute) {
        lines.push(`📍 <b>Marşrut:</b> ${escapeHtml(trimmedRoute)}`);
      }

      if (trimmedVehicle) {
        lines.push(`🚛 <b>Avtomobil:</b> ${escapeHtml(trimmedVehicle)}`);
      }

      if (trimmedEstimatedPrice) {
        let displayPrice = trimmedEstimatedPrice;
        // If it's purely numeric or number range without AZN, append AZN without duplication
        if (/^\d+(\.\d+)?(\s*-\s*\d+(\.\d+)?)?$/.test(displayPrice)) {
          displayPrice = `${displayPrice} AZN`;
        }
        lines.push(`💰 <b>İlkin AI qiyməti:</b> ${escapeHtml(displayPrice)} <i>(İlkin təxmin, operator təsdiqi tələb olunur)</i>`);
      }

      if (trimmedNotes) {
        lines.push(`📝 <b>Qeyd:</b> ${escapeHtml(trimmedNotes)}`);
      }

      if (trimmedMessage) {
        lines.push(`💬 <b>Mesaj:</b> ${escapeHtml(trimmedMessage)}`);
      }

      if (trimmedSource) {
        lines.push(`📄 <b>Mənbə:</b> ${escapeHtml(trimmedSource)}`);
      }

      if (lang === "ru") {
        lines.push(`🌐 <b>Dil:</b> Rus dili (müştəriyə rusca cavab verin)`);
      }

      const now = new Date();
      const formattedDate = now.toLocaleString("az-AZ", {
        timeZone: "Asia/Baku",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      lines.push(`⏱️ <b>Tarix:</b> ${formattedDate}`);

      const telegramText = limitText(lines.join("\n"), 4000);

      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!botToken || !chatId) {
        console.warn("[Telegram Callback] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables.");
        return res.status(500).json({
          success: false,
          error: "Server konfiqurasiya xətası: Telegram bildiriş xidməti aktiv deyil. Zəhmət olmasa birbaşa 878 qaynar xətti və ya WhatsApp ilə əlaqə saxlayın.",
        });
      }

      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const telegramResponse = await fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: "HTML",
        }),
      });

      const telegramResult: any = await telegramResponse.json().catch(() => null);

      if (!telegramResponse.ok || !telegramResult?.ok) {
        console.error("[Telegram Callback Error]: Delivery to Telegram failed", {
          status: telegramResponse.status,
          description: telegramResult?.description || "Unknown error",
        });
        return res.status(502).json({
          success: false,
          error: "Müraciəti çatdırmaq mümkün olmadı. Zəhmət olmasa birbaşa qaynar xətlə (878) və ya WhatsApp ilə əlaqə saxlayın.",
        });
      }

      console.log("[Telegram Callback] Message successfully delivered to Telegram chat");
      return res.json({
        success: true,
        message: "Müraciətiniz uğurla qəbul edildi! Operatorumuz tezliklə sizinlə əlaqə saxlayacaq.",
      });
    } catch (err: any) {
      console.error("[Telegram Callback Exception]:", err?.message || err);
      return res.status(500).json({
        success: false,
        error: "Sistem xətası baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin və ya 878 ilə əlaqə saxlayın.",
      });
    }
  });

  // SEO Route: robots.txt
  app.get("/robots.txt", (_req, res) => {
    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    if (fs.existsSync(robotsPath)) {
      res.type("text/plain").sendFile(robotsPath);
    } else {
      res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://yukdasima.ai/sitemap.xml\n`);
    }
  });

  // SEO Route: sitemap.xml
  app.get("/sitemap.xml", (_req, res) => {
    const distSitemap = path.join(process.cwd(), "dist", "sitemap.xml");
    const publicSitemap = path.join(process.cwd(), "public", "sitemap.xml");
    if (fs.existsSync(distSitemap)) {
      return res.type("application/xml").sendFile(distSitemap);
    }
    if (fs.existsSync(publicSitemap)) {
      return res.type("application/xml").sendFile(publicSitemap);
    }
    res.status(404).send("Sitemap not found");
  });

  // 301 Permanent SEO Redirects: Evakuasiya -> Evakuator Migration
  app.use((req, res, next) => {
    const url = req.originalUrl;
    if (url === '/evakuasiya' || url.startsWith('/evakuasiya/') || url.startsWith('/evakuasiya?')) {
      // Single 301 straight to the canonical address (no trailing slash)
      const redirectedUrl = url.replace(/^\/evakuasiya(\/|\?|$)/, '/evakuator$1').replace(/^([^?]+?)\/+(\?|$)/, '$1$2');
      return res.redirect(301, redirectedUrl);
    }
    next();
  });

  // Helper: Execute promise with timeout
  function promiseWithTimeout<T>(promise: Promise<T>, timeoutMs: number, timeoutMsg: string): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(timeoutMsg));
        }, timeoutMs);
        (timer as unknown as { unref?: () => void }).unref?.();
      }),
    ]);
  }

  // Helper: Clean and safely parse JSON from Gemini multimodal response
  function extractAndParseCargoJson(rawText: string): any {
    if (!rawText || typeof rawText !== "string") {
      throw new Error("Boş AI cavabı.");
    }

    let cleaned = rawText.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    cleaned = cleaned.trim();

    try {
      return JSON.parse(cleaned);
    } catch (_firstParseErr) {
      // Attempt to locate outermost JSON object if model included commentary
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const substringJson = cleaned.substring(firstBrace, lastBrace + 1);
        try {
          return JSON.parse(substringJson);
        } catch (_subParseErr) {
          // Continue to fallback
        }
      }
      throw new Error("AI cavabının JSON strukturu oxunmadı.");
    }
  }

  // API Route: Gemini Cargo Multimodal Analysis with Resilience, Validation & Diagnostic Logging
  app.post("/api/analyze-cargo", analyzeRateLimit, async (req, res) => {
    const startTime = Date.now();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const { images, details } = req.body || {};

    let detectedMimeList: string[] = [];
    let isTimeoutOccurred = false;
    let isRateLimitOccurred = false;
    let failureReason: string | null = null;
    let parsingErrorDetail: string | null = null;

    try {
      if (!images || !Array.isArray(images) || images.length === 0) {
        failureReason = "No images provided";
        return res.status(400).json({
          error: "Zəhmət olmasa ən azı bir şəkil təqdim edin.",
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        failureReason = "Missing GEMINI_API_KEY";
        console.error(`[Gemini API] [${requestId}] GEMINI_API_KEY environment variable is not configured.`);
        return res.status(500).json({
          error: "Sistem konfiqurasiya xətası. Zəhmət olmasa bir az sonra yenidən cəhd edin və ya 878 ilə əlaqə saxlayın.",
          developerDetails: "Missing GEMINI_API_KEY in environment variables",
        });
      }

      // Filter and validate images (strip broken/empty items, normalize MIME types)
      const validInlineParts: Array<{ inlineData: { mimeType: string; data: string } }> = [];

      // At most 10 photos per analysis (the page enforces the same limit)
      for (const img of images.slice(0, 10)) {
        let rawData = typeof img?.base64 === "string" ? img.base64 : typeof img?.url === "string" ? img.url : "";
        let detectedMime = typeof img?.mimeType === "string" ? img.mimeType.toLowerCase().trim() : "image/jpeg";

        if (!rawData || rawData.length < 50) {
          continue;
        }

        if (rawData.includes(";base64,")) {
          const parts = rawData.split(";base64,");
          rawData = parts[1] || "";
          const match = parts[0].match(/:(.*?);/);
          if (match && match[1]) {
            detectedMime = match[1].toLowerCase().trim();
          }
        }

        // Clean any whitespace from base64 string
        rawData = rawData.replace(/\s+/g, "");
        if (rawData.length < 50) {
          continue;
        }

        // Normalize supported MIME types for multimodal vision
        let finalMime = "image/jpeg";
        if (detectedMime === "image/png") {
          finalMime = "image/png";
        } else if (detectedMime === "image/webp") {
          finalMime = "image/webp";
        } else if (detectedMime === "image/heic" || detectedMime === "image/heif") {
          // Gemini reads HEIC/HEIF natively; labelling HEIC bytes as JPEG makes the analysis fail
          finalMime = detectedMime;
        } else {
          finalMime = "image/jpeg";
        }

        detectedMimeList.push(finalMime);
        validInlineParts.push({
          inlineData: {
            mimeType: finalMime,
            data: rawData,
          },
        });
      }

      if (validInlineParts.length === 0) {
        failureReason = "No valid image data after decompression and sanitization";
        return res.status(400).json({
          error: "Təqdim edilən şəkillər oxunmadı. Zəhmət olmasa JPG, PNG və ya WEBP formatlı aydın şəkillər seçin.",
        });
      }

      const ai = getGeminiAI();

      const userPrompt = `Aşağıdakı ${validInlineParts.length} ədəd fotoşəkili analiz et. Müştərinin köçürülməsi/yükdaşınması üçün daşınacaq bütün əşyaları siyahıya al və onların təxmini həcmini hesabla.${
        details && typeof details === "string" && details.trim().length > 0
          ? `\nMüştərinin əlavə qeydləri: "${limitText(details.trim(), 1000)}"`
          : ""
      }`;

      const systemInstruction = `Sən Azərbaycan üzrə peşəkar yükdaşıma, logistika və köçürülmə ekspert süni intellektsən (yukdasima.ai).
Sənə müştərinin yükdaşıma sifarişi üçün yüklədiyi ${validInlineParts.length} ədəd fotoşəkil verilir.

ƏSAS VƏZİFƏ:
Müştərinin otaq və ya ofis şəkillərində görünən və daşınması lazım olan mebelləri, məişət avadanlıqlarını, qutuları və digər daşınan əşyaları müəyyən et və onların təxmini həcmini (m³) hesabla.
ÇOX MÜHÜM: QƏTİYYƏN nəqliyyat qiyməti HESABLAMA və heç bir pul/AZN məbləği YAZMA! Bütün qiymətləndirmə proqram təminatının deterministik tarif bazası tərəfindən həyata keçirilir.

MÜHÜM TƏLƏBLƏR VƏ QAYDALAR:
1. DAŞINAN ƏŞYALAR: Yalnız daşınacaq əşyaları qeyd et (məsələn: Divan, Kreslo, Yataq, Döşək, Dolab, Qarderob, Komod, Masa, Stul, Televizor, TV altlığı, Soyuducu, Paltaryuyan, Qabyuyan, Soba, Mikrodalğalı soba, Kondisioner, Xalça, Güzgü, Kitab rəfi, İş masası, Ofis kreslosu, Qutular, Çantalar, Çilçıraq və s.).
2. XÜSUSİ VƏ AĞIR ƏŞYALAR: Əgər şəkildə Pianino, Seyf, İkiqapılı böyük soyuducu, çox uzun divan, böyük qarderob, kommersiya və ya sənaye avadanlığı görsən, həmin əşyanı qeyd et və 'isSpecialOrHeavy' sahəsini true qoy.
3. DAŞINMAZ KONSTRUKSİYALAR: Divarlar, tavan, döşəmə, qapılar, pəncərələr, divara bərkidilmiş binaların daşınmaz hissələrini ƏŞYA KİMİ SAYMA.
4. TƏKRARLANAN ƏŞYALAR: Müştəri eyni otağı və ya əşyanı müxtəlif rakurslardan çəkmiş ola bilər. Eyni əşyanı 2 dəfə sayma! Şəkillərdəki vizual və mühit ipuclarını müqayisə et.
5. HƏCM TƏXMİNİ: Hər bir əşyanın 1 ədədi üçün real həcmi (m³) təxmin et (məs: Divan ~1.5-2 m³, Soyuducu ~1-1.3 m³, Kitab rəfi ~0.8 m³, Qutu ~0.1 m³).
6. ÜMUMİ HƏCM INTERVALI: Şəkillər dəqiq fiziki ölçü vermədiyi üçün ümumi həcmi heç vaxt tək dəqiq rəqəmlə vermə, MÜTLƏQ təxmini aralıq (məs: min 5, max 7) kimi ver.
7. ETİBARLILIQ (CONFIDENCE): Əgər şəkillər aydındırsa 'high' və ya 'medium', şəkillər qaranlıqdırsa və ya əşyalar kəsilmiş/qeyri-müəyyəndirsə 'low' qoy və 'notes' massivində Azərbaycan dilində aydın qeyd yaz.
8. Bütün əşya adları və qeydlər yalnız Azərbaycan dilində olmalıdır.`;

      // Production Optimized Multimodal Architecture:
      // Primary: gemini-3.6-flash (Official Google recommended fast multimodal model)
      // Fallback: gemini-3.1-flash-lite (Ultra-fast backup, activated ONLY if primary returns an immediate non-timeout API error and budget remains)
      const primaryModel = "gemini-3.6-flash";
      const fallbackModel = "gemini-3.1-flash-lite";
      const serverHardTimeoutMs = 45000;
      const perModelTimeoutMs = 35000;

      let response: any = null;
      let usedModel = primaryModel;
      let lastError: any = null;

      const modelGenerationConfig = {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "Əşyanın Azərbaycan dilində adı (məsələn: Divan, Soyuducu, Kitab rəfi, Qutu)",
                  },
                  quantity: {
                    type: Type.INTEGER,
                    description: "Müəyyən edilən əşyanın sayı",
                  },
                  estimatedVolumeM3: {
                    type: Type.NUMBER,
                    description: "1 ədəd üçün təxmini həcm (m³)",
                  },
                  confidence: {
                    type: Type.STRING,
                    description: "'high', 'medium', və ya 'low'",
                  },
                  isSpecialOrHeavy: {
                    type: Type.BOOLEAN,
                    description: "Pianino, seyf, böyük soyuducu, xüsusi ağır və ya həddən artıq iri əşya olduqda true",
                  },
                },
                required: ["name", "quantity", "estimatedVolumeM3", "confidence"],
              },
            },
            estimatedTotalVolumeMinM3: {
              type: Type.NUMBER,
              description: "Minimum təxmini ümumi həcm (m³)",
            },
            estimatedTotalVolumeMaxM3: {
              type: Type.NUMBER,
              description: "Maksimum təxmini ümumi həcm (m³)",
            },
            analysisConfidence: {
              type: Type.STRING,
              description: "'high', 'medium', və ya 'low'",
            },
            notes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Təhlil üzrə qeydlər və ya əlavə tövsiyələr",
            },
          },
          required: [
            "items",
            "estimatedTotalVolumeMinM3",
            "estimatedTotalVolumeMaxM3",
            "analysisConfidence",
          ],
        },
      };

      // Step 1: Execute primary model call with strict per-model timeout
      try {
        const modelCallPromise = ai.models.generateContent({
          model: primaryModel,
          contents: [
            ...validInlineParts,
            {
              text: userPrompt,
            },
          ],
          config: modelGenerationConfig,
        });

        response = await promiseWithTimeout(
          modelCallPromise,
          perModelTimeoutMs,
          `Model ${primaryModel} timeout (${perModelTimeoutMs}ms)`
        );
        usedModel = primaryModel;
      } catch (primaryErr: any) {
        lastError = primaryErr;
        const errMsg = String(primaryErr?.message || primaryErr);
        const elapsed = Date.now() - startTime;

        if (errMsg.toLowerCase().includes("timeout") || elapsed >= perModelTimeoutMs) {
          isTimeoutOccurred = true;
          console.warn(`[Gemini API] Primary model ${primaryModel} timed out after ${elapsed}ms. Skipping fallback to avoid cascade.`);
        } else {
          // If it was a fast explicit API error (e.g. 500 or 503) and we have plenty of budget left (< 10s elapsed)
          if (elapsed < 10000 && !errMsg.includes("429")) {
            console.warn(`[Gemini API] Primary model ${primaryModel} failed quickly (${elapsed}ms: ${errMsg}). Attempting single fallback ${fallbackModel}...`);
            try {
              const fallbackRemainingMs = Math.min(12000, serverHardTimeoutMs - elapsed);
              const fallbackCallPromise = ai.models.generateContent({
                model: fallbackModel,
                contents: [
                  ...validInlineParts,
                  {
                    text: userPrompt,
                  },
                ],
                config: modelGenerationConfig,
              });

              response = await promiseWithTimeout(
                fallbackCallPromise,
                fallbackRemainingMs,
                `Model ${fallbackModel} fallback timeout (${fallbackRemainingMs}ms)`
              );
              usedModel = fallbackModel;
            } catch (fbErr: any) {
              lastError = fbErr;
              const fbMsg = String(fbErr?.message || fbErr);
              if (fbMsg.toLowerCase().includes("timeout")) {
                isTimeoutOccurred = true;
              }
            }
          }
        }
      }

      if (!response || !response.text) {
        throw lastError || new Error("Gemini modeli cavab qaytarmadı.");
      }

      let parsedData: any = null;
      try {
        parsedData = extractAndParseCargoJson(response.text);
      } catch (jsonErr: any) {
        parsingErrorDetail = jsonErr?.message || String(jsonErr);
        throw jsonErr;
      }

      // Validate parsed shape structure
      if (!parsedData || !Array.isArray(parsedData.items)) {
        parsedData = {
          items: parsedData?.items || [],
          estimatedTotalVolumeMinM3: Number(parsedData?.estimatedTotalVolumeMinM3) || 3,
          estimatedTotalVolumeMaxM3: Number(parsedData?.estimatedTotalVolumeMaxM3) || 6,
          analysisConfidence: parsedData?.analysisConfidence || "medium",
          notes: Array.isArray(parsedData?.notes) ? parsedData.notes : [],
        };
      }

      const totalPayloadBytes = validInlineParts.reduce((acc, part) => acc + (part.inlineData?.data?.length || 0), 0);
      const totalDuration = Date.now() - startTime;
      console.log(
        JSON.stringify({
          level: "info",
          tag: "CARGO_ANALYSIS_SUCCESS",
          requestId,
          timestamp: new Date().toISOString(),
          usedModel,
          imageCount: validInlineParts.length,
          imageMimeTypes: detectedMimeList,
          payloadSizeBytes: totalPayloadBytes,
          aiResponseStatus: "ok",
          timeout: false,
          rateLimit: false,
          processingDurationMs: totalDuration,
        })
      );

      return res.json({
        ...parsedData,
        _diagnostics: {
          usedModel,
          payloadSizeBytes: totalPayloadBytes,
          processingDurationMs: totalDuration,
        },
      });
    } catch (error: any) {
      const totalDuration = Date.now() - startTime;
      const errorMessageStr = String(error?.message || error);
      if (errorMessageStr.toLowerCase().includes("timeout") || totalDuration >= 44000) {
        isTimeoutOccurred = true;
      }
      if (errorMessageStr.includes("429") || errorMessageStr.toLowerCase().includes("rate") || errorMessageStr.toLowerCase().includes("quota")) {
        isRateLimitOccurred = true;
      }

      failureReason = errorMessageStr;

      // Structured Server Diagnostic Logging for all failed analyses
      console.error(
        JSON.stringify({
          level: "error",
          tag: "CARGO_ANALYSIS_FAILURE",
          timestamp: new Date().toISOString(),
          requestId,
          imageCount: detectedMimeList.length || (Array.isArray(images) ? images.length : 0),
          imageMimeTypes: detectedMimeList,
          aiResponseStatus: isTimeoutOccurred ? "timeout" : isRateLimitOccurred ? "rate_limit" : parsingErrorDetail ? "parsing_error" : "api_error",
          timeout: isTimeoutOccurred,
          rateLimit: isRateLimitOccurred,
          apiError: failureReason ? failureReason.substring(0, 300) : "Unknown API Error",
          parsingError: parsingErrorDetail,
          processingDurationMs: totalDuration,
        })
      );

      const isClientFacingTimeout = isTimeoutOccurred || totalDuration >= 44000;
      return res.status(isClientFacingTimeout ? 504 : isRateLimitOccurred ? 429 : 500).json({
        success: false,
        error: "Şəkillərin analizi tamamlanmadı. Zəhmət olmasa yenidən cəhd edin.",
        timeout: isClientFacingTimeout,
        requestId,
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    // SEO: canonical URLs and the sitemap use addresses WITHOUT a trailing slash
    // (https://yukdasima.ai/yukdasima). express.static used to answer those with a 301 to
    // "/yukdasima/". Now both forms are served directly with 200 (the page's canonical tag points
    // to the address without the slash). No new redirect is added on purpose: browsers have
    // cached the old 301, and a reverse redirect would send those visitors into a loop.

    // The server bundle lives in dist/ too: never serve it (or its source map) to browsers
    app.use((req, res, next) => {
      if (/^\/server\.(c?js)(\.map)?$/i.test(req.path)) {
        return res.status(404).type("text/plain").send("Not found");
      }
      next();
    });

    // Real files only (JS, CSS, images, sitemap...). Folders are handled below without redirects.
    app.use(express.static(distPath, { index: false, redirect: false }));

    const notFoundHtmlCache: Partial<Record<"az" | "ru", string>> = {};
    const getNotFoundHtml = (lang: "az" | "ru" = "az"): string => {
      if (notFoundHtmlCache[lang] === undefined) {
        const template = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        notFoundHtmlCache[lang] = buildNotFoundHtml(template, lang);
      }
      return notFoundHtmlCache[lang] as string;
    };

    app.get("*", (req, res) => {
      // Every valid page is prerendered at build time as dist/<route>/index.html
      let relativePath = "";
      try {
        relativePath = decodeURIComponent(req.path).replace(/^\/+/, "");
      } catch {
        relativePath = "\u0000invalid";
      }
      const pageFile = path.resolve(distPath, relativePath, "index.html");
      const isInsideDist = pageFile.startsWith(path.resolve(distPath) + path.sep);

      if (isInsideDist && fs.existsSync(pageFile)) {
        return res.sendFile(pageFile);
      }

      // Unknown address: real 404 status (+ noindex) so Google does not index copies of the home page
      const notFoundLang = /^\/ru(\/|$)/.test(req.path) ? "ru" : "az";
      res.status(404).type("html").send(getNotFoundHtml(notFoundLang));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
