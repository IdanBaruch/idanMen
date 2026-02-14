import { GoogleGenerativeAI } from "@google/generative-ai"; // וודא שזה ה-SDK המותקן
import { SYSTEM_INSTRUCTION } from "../constants";
import { SessionSummary } from "../types";

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    // שימוש ב-import.meta.env עבור Vite
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async processInput(input: string, sources: string[]) {
    const model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // מודל יציב ומהיר
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const context = sources.length > 0
      ? `\n\n### SOURCES ###\n${sources.join('\n')}`
      : "";

    const result = await model.generateContent(input + context);
    return result.response.text(); // שים לב לסוגריים ()
  }

  async generateSummary(history: string[]): Promise<SessionSummary> {
    const model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Generate a medical-grade summary using the Drawer Method. HISTORY: ${history.join('\n')}`;
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
}

export const gemini = new GeminiService();