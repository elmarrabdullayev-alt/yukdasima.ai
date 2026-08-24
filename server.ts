import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

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
    });
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
