import { GoogleGenerativeAI } from "@google/generative-ai";

// אתחול ה-AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// 1. צ'אט בסיסי
export const chatWithGemini = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "שגיאה בחיבור לבינה המלאכותית.";
  }
};

// 2. פונקציית ציר הזמן (שהייתה חסרה קודם)
export const getFHIRTimeline = async (patientData: any) => {
  return [];
};

// 3. פונקציית הטריאז' החי (החלק שחסר עכשיו)
export const startLiveTriageSession = async () => {
  console.log("Starting live triage session...");
  return { status: "active" };
};

// 4. ניהול אודיו (Stub)
export const AudioManager = {
  start: () => console.log("Audio started"),
  stop: () => console.log("Audio stopped"),
};

// 5. הגדרת סוג תור (Placeholder)
export const FHIRAppointment = {};