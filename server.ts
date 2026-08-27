import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Global server process error resilience
process.on("unhandledRejection", (reason) => {
  console.warn("[Server Process] Handled unhandled rejection safely:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("[Server Process] Uncaught exception:", err);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware with large payload support for images
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

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
  app.post("/api/callback", async (req, res) => {
    try {
      const { name, phone, service, message, source, route, vehicle, estimatedPrice, notes } = req.body || {};

      const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
      if (!trimmedPhone) {
        return res.status(400).json({
          success: false,
          error: "Telefon nömrəsi daxil edilməlidir.",
        });
      }

      const trimmedName = typeof name === "string" ? name.trim() : "";
      const trimmedService = typeof service === "string" ? service.trim() : "";
      const trimmedMessage = typeof message === "string" ? message.trim() : "";
      const trimmedSource = typeof source === "string" ? source.trim() : "";
      const trimmedRoute = typeof route === "string" ? route.trim() : "";
      const trimmedVehicle = typeof vehicle === "string" ? vehicle.trim() : "";
      const trimmedEstimatedPrice =
        typeof estimatedPrice === "string"
          ? estimatedPrice.trim()
          : typeof estimatedPrice === "number"
          ? String(estimatedPrice).trim()
          : "";
      const trimmedNotes = typeof notes === "string" ? notes.trim() : "";

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

      const telegramText = lines.join("\n");

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
      const redirectedUrl = url.replace(/^\/evakuasiya(\/|\?|$)/, '/evakuator$1');
      return res.redirect(301, redirectedUrl);
    }
    next();
  });

  // API Route: Gemini Cargo Multimodal Analysis
  app.post("/api/analyze-cargo", async (req, res) => {
    try {
      const { images, details } = req.body;

      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({
          error: "Zəhmət olmasa ən azı bir şəkil təqdim edin.",
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error("[Gemini API] GEMINI_API_KEY environment variable is not configured.");
        return res.status(500).json({
          error: "GEMINI_API_KEY konfiqurasiya edilməyib. Zəhmət olmasa Settings > Secrets panelindən API açarınızı daxil edin.",
          developerDetails: "Missing GEMINI_API_KEY in environment variables",
        });
      }

      const ai = getGeminiAI();

      // Format images into inlineData parts for multimodal input
      const inlineParts = images.map((img: { base64: string; mimeType?: string; url?: string }, index: number) => {
        let rawData = img.base64 || img.url || "";
        let detectedMime = img.mimeType || "image/jpeg";

        if (rawData.includes(";base64,")) {
          const parts = rawData.split(";base64,");
          rawData = parts[1];
          const match = parts[0].match(/:(.*?);/);
          if (match && match[1]) {
            detectedMime = match[1];
          }
        }

        // Normalize common MIME types
        let finalMime = detectedMime.toLowerCase().trim();
        if (finalMime === "image/jpg") finalMime = "image/jpeg";
        if (!["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"].includes(finalMime)) {
          finalMime = "image/jpeg";
        }

        return {
          inlineData: {
            mimeType: finalMime,
            data: rawData.trim(),
          },
        };
      });

      const userPrompt = `Aşağıdakı ${images.length} ədəd fotoşəkili analiz et. Müştərinin köçürülməsi/yükdaşınması üçün daşınacaq bütün əşyaları siyahıya al və onların təxmini həcmini hesabla.${
        details && typeof details === "string" && details.trim().length > 0
          ? `\nMüştərinin əlavə qeydləri: "${details.trim()}"`
          : ""
      }`;

      const systemInstruction = `Sən Azərbaycan üzrə peşəkar yükdaşıma, logistika və köçürülmə ekspert süni intellektsən (yukdasima.ai).
Sənə müştərinin yükdaşıma sifarişi üçün yüklədiyi ${images.length} ədəd fotoşəkil verilir.

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

      // Candidate multimodal models in order of priority
      const candidateModels = ["gemini-3.6-flash", "gemini-3.7-flash", "gemini-2.5-flash-lite"];
      let response: any = null;
      let lastError: any = null;

      for (const modelName of candidateModels) {
        try {
          console.log(`[Gemini API] Sending multimodal request (${images.length} images) with model: ${modelName}`);
          response = await ai.models.generateContent({
            model: modelName,
            contents: [
              ...inlineParts,
              {
                text: userPrompt,
              },
            ],
            config: {
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
            },
          });

          if (response && response.text) {
            console.log(`[Gemini API] Successfully analyzed with ${modelName}`);
            break;
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`[Gemini API] Model ${modelName} failed:`, err?.message || err);
        }
      }

      if (!response || !response.text) {
        throw lastError || new Error("Gemini modeli cavab qaytarmadı.");
      }

      let responseText = response.text.trim();
      if (responseText.startsWith("```json")) {
        responseText = responseText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (responseText.startsWith("```")) {
        responseText = responseText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      const parsedData = JSON.parse(responseText);
      return res.json(parsedData);
    } catch (error: any) {
      console.error("[Gemini API Error Detail]:", {
        message: error?.message,
        status: error?.status,
        stack: error?.stack,
      });
      return res.status(500).json({
        error: "Şəkilləri analiz etmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.",
        developerDetails: error?.message || String(error),
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
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
