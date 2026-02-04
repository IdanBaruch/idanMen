
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { SessionSummary } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
  }

  async processInput(input: string, sources: string[]) {
    const context = sources.length > 0 
      ? `\n\n### ADDITIONAL SOURCES CONTENT ###\n${sources.join('\n---\n')}\n`
      : "";

    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: input + context,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    return response.text;
  }

  async generateSummary(history: string[]): Promise<SessionSummary> {
    const prompt = `Based on the following conversation history, generate a medical-grade consciousness summary and an Action Plan for the patient. 
    Use the Drawer Method.
    
    HISTORY:
    ${history.join('\n')}
    
    Return a JSON response matching the SessionSummary structure.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            medicalObservation: { type: Type.STRING },
            spiritualInsight: { type: Type.STRING },
            actionPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  drawer: { type: Type.STRING, enum: ['sovereign', 'partnership', 'fatherhood', 'noise'] },
                  task: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['high', 'medium', 'low'] }
                },
                required: ['drawer', 'task', 'priority']
              }
            }
          },
          required: ['medicalObservation', 'actionPlan', 'spiritualInsight']
        }
      }
    });

    return JSON.parse(response.text);
  }

  async generateAudio(text: string, voiceName: string = 'Kore'): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName }
          }
        }
      }
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  }

  async generateAudioSummary(text: string): Promise<string> {
    return this.generateAudio(`קרא את הסיכום הבא בקול סמכותי, רגוע וריבוני: ${text}`);
  }
}

export const gemini = new GeminiService();
