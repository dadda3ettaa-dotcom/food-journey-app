import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[Gemini] GEMINI_API_KEY environment variable is not set. Gemini endpoints will use fallback logic.');
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Health Check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // 1. Spontaneous Question API for Moments
  app.post('/api/gemini/spontaneous-question', async (req: Request, res: Response) => {
    try {
      const { moment, selectedOption, detail, dayContext } = req.body;
      const ai = getGenAI();

      if (!ai) {
        // High quality rule-based fallback if no API key is set
        return res.json({
          spontaneousQuestion: `Was hat dich bei „${selectedOption?.title || moment?.title}“ am meisten geleitet?`,
          quickChips: ['Körperliches Bedürfnis 🥑', 'Gewohnheit / Routine ☕', 'Stress oder Eile ⚡'],
          foxThought: 'Der Körper sendet feine Signale, bevor der Kopf überhaupt nachdenkt.',
          isFallback: true
        });
      }

      const prompt = `
Du bist der achtsame, sympathische Fuchs-Coach in der "Food Journey" App (basierend auf Chronobiologie, biologischem Rhythmus und wertfreier Achtsamkeit ohne Diät-Dogmen).
Der Nutzer hat gerade folgenden Moment seines Tages dokumentiert:

- Moment: ${moment?.label || 'Tagesmoment'} um ${moment?.time || ''} Uhr ("${moment?.title || ''}")
- Gewählte Option: "${selectedOption?.title || 'Ausgewählt'}" (${selectedOption?.subtitle || ''})
${detail?.hungerBefore ? `- Hunger vorher: Stufe ${detail.hungerBefore} von 4` : ''}
${detail?.satietyAfter ? `- Sättigung nachher: Stufe ${detail.satietyAfter} von 4` : ''}
${detail?.context ? `- Kontext: ${detail.context}` : ''}
${detail?.foodFlexTags?.length ? `- Tags: ${detail.foodFlexTags.join(', ')}` : ''}
${detail?.note ? `- Notiz des Nutzers: "${detail.note}"` : ''}
${dayContext?.wakeTime ? `- Aufstehzeit heute: ${dayContext.wakeTime} Uhr` : ''}

Deine Aufgabe:
Stelle dem Nutzer EINE spontane, neugierige, sympathische Reflexionsfrage auf Deutsch (maximal 12-14 Wörter). Keine Vorwürfe, keine Diät-Tipps, sondern pure achtsame Neugier über das Körpergefühl, den Gedanken oder den Auslöser in genau diesem Moment.
Erstelle dazu genau 3 prägnante, lebensnahe 1-Klick-Antwort-Chips (inkl. 1 passendem Emoji) und 1 kurzen, charmanten Fuchs-Gedanken (1 Satz).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              spontaneousQuestion: {
                type: Type.STRING,
                description: 'Eine kurze, neugierige spontane Frage auf Deutsch (max 14 Wörter)'
              },
              quickChips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Genau 3 kurze Antwortoptionen mit Emoji'
              },
              foxThought: {
                type: Type.STRING,
                description: 'Ein kurzer, charmanter biologischer/achtsamer Gedanke (1 Satz)'
              }
            },
            required: ['spontaneousQuestion', 'quickChips', 'foxThought']
          }
        }
      });

      const responseText = response.text?.trim() || '{}';
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch (error: any) {
      console.error('Error generating spontaneous question:', error);
      return res.status(200).json({
        spontaneousQuestion: 'Wie hat sich dein Körper kurz nach diesem Moment angefühlt?',
        quickChips: ['Voller Energie ✨', 'Leicht & entspannt 🌿', 'Eher schwer / träge 😴'],
        foxThought: 'Jede Beobachtung schärft deine intuitive Körperwahrnehmung.',
        isFallback: true
      });
    }
  });

  // 2. Full Day Holistic Rhythm Analysis API
  app.post('/api/gemini/analyze-day', async (req: Request, res: Response) => {
    try {
      const { report, answers, momentDetails, wakeTime, bedTime, streakDays, userAge, userGender } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          primaryArchetypeFeedback: `Dein Tag spiegelte heute die Qualitäten des ${report?.primary?.germanName || 'Fuchses'} wider: Achtsamkeit und Flexibilität.`,
          rhythmEvaluation: `Mit Aufstehen um ${wakeTime || '07:00'} Uhr und Bettzeit um ${bedTime || '23:00'} Uhr hast du ein klares Tagesfenster.`,
          strengths: ['Regelmäßige Dokumentation der Momente', 'Gute Wahrnehmung von Hunger und Sättigung'],
          tailoredHebel: 'Vor dem ersten Koffein oder Frühstück 1 großes Glas lauwarmes Wasser trinken.',
          spontaneousEveningQuestion: 'Welcher Moment hat dir heute die meiste innere Ruhe geschenkt?',
          isFallback: true
        });
      }

      const prompt = `
Du bist der leitende Chronobiologie- und Achtsamkeits-Experte der "Food Journey" Methode.
Bewerte den heutigen Tag des Nutzers wertfrei, motivierend und wissenschaftlich fundiert:

Nutzer-Profil:
- Alter: ${userAge || 'Unbekannt'}, Geschlecht: ${userGender || 'divers/nicht angegeben'}
- Aufstehzeit: ${wakeTime || '07:00'} Uhr, Geplante Bettzeit: ${bedTime || '23:00'} Uhr
- Beobachtungstag: Tag ${streakDays || 1}
- Vorläufiger Tages-Archetyp: ${report?.primary?.germanName || 'Fuchs'} (${report?.primary?.characteristic || ''})

Erfasste Momente & Entscheidungen:
${JSON.stringify(answers || {}, null, 2)}

Erfasste Details & Notizen (Hunger, Sättigung, Kontext):
${JSON.stringify(momentDetails || {}, null, 2)}

Erstelle eine präzise, warme und tiefgründige Tagesauswertung auf Deutsch:
1. "primaryArchetypeFeedback": Warum dieser Tag chronobiologisch genau zu diesem Archetyp passte (2 prägnante Sätze).
2. "rhythmEvaluation": Analyse des biologischen Rhythmus (Essfenster, Kaffeetiming, Verdauungspausen, Abendruhe).
3. "strengths": 2-3 konkrete Stärken, die heute bereits intuitiv gut liefen (als Array von Strings).
4. "tailoredHebel": Genau 1 sanfter, müheloser Hebel / Mikro-Gewohnheit für morgen (keine Verbote, z.B. 10 Min Bildschirmpause vor dem Essen oder warmes Wasser morgens).
5. "spontaneousEveningQuestion": 1 tiefgründige, entspannende Reflexionsfrage für den Abend.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              primaryArchetypeFeedback: { type: Type.STRING },
              rhythmEvaluation: { type: Type.STRING },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              tailoredHebel: { type: Type.STRING },
              spontaneousEveningQuestion: { type: Type.STRING }
            },
            required: ['primaryArchetypeFeedback', 'rhythmEvaluation', 'strengths', 'tailoredHebel', 'spontaneousEveningQuestion']
          }
        }
      });

      const responseText = response.text?.trim() || '{}';
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch (error: any) {
      console.error('Error analyzing day with Gemini:', error);
      return res.status(200).json({
        primaryArchetypeFeedback: 'Dein Tag zeigt ein gutes Gespür für deinen biologischen Rhythmus.',
        rhythmEvaluation: 'Deine Mahlzeiten und Pausen geben deinem Körper wichtige Ankerpunkte im Alltag.',
        strengths: ['Aufmerksame Selbstbeobachtung', 'Ehrliche Dokumentation'],
        tailoredHebel: 'Schenke dir morgen bei der Hauptmahlzeit die ersten 3 Bissen in voller Stille.',
        spontaneousEveningQuestion: 'Wie fühlt sich dein Körper jetzt gerade an, wenn du tief ausatmest?',
        isFallback: true
      });
    }
  });

  // 3. Adaptive Question Generator for Multi-Day Pattern
  app.post('/api/gemini/adaptive-question', async (req: Request, res: Response) => {
    try {
      const { historyCount, commonTags, primaryArchetype } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          title: 'Nachmittags-Impuls',
          question: 'Wie möchtest du mit dem Energietief am Nachmittag umgehen?',
          options: [
            { label: '5 Minuten Frischluft & tief durchatmen', icon: '🍃' },
            { label: 'Ein Glas kaltes Wasser mit Zitrone', icon: '🍋' },
            { label: 'Einen bewussten Nuss-Snack genießen', icon: '🥜' },
            { label: 'Einfach die Müdigkeit wertfrei annehmen', icon: '🧘' }
          ]
        });
      }

      const prompt = `
Generiere eine adaptive Reflexionsfrage für die "Food Journey" App für Tag ${historyCount || 3}.
Archetyp: ${primaryArchetype || 'Fuchs'}.
Häufige Muster: ${commonTags?.join(', ') || 'Nachmittagssnack, Kaffee am Morgen'}.
Gib 1 kluge Frage und genau 4 praxisnahe, sanfte Antwortmöglichkeiten zurück.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    icon: { type: Type.STRING }
                  },
                  required: ['label', 'icon']
                }
              }
            },
            required: ['title', 'question', 'options']
          }
        }
      });

      const responseText = response.text?.trim() || '{}';
      return res.json(JSON.parse(responseText));
    } catch (error) {
      return res.json({
        title: 'Achtsamer Impuls',
        question: 'Wie möchtest du deinen Rhythmus heute unterstützen?',
        options: [
          { label: 'Eine kurze Pause vor dem Essen einlegen', icon: '🪑' },
          { label: 'Zuerst Wasser trinken', icon: '💧' },
          { label: 'Wertfrei beobachten', icon: '🌿' }
        ]
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Food Journey Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
