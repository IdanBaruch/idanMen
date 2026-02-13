import { GoogleGenerativeAI } from "@google/generative-ai";

// שליפת המפתח מהגדרות המערכת
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const chatWithGemini = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "מצטער, חלה שגיאה בחיבור לבינה המלאכותית.";
  }
};

// הפונקציה שהייתה חסרה וגרמה למסך השחור
export const getFHIRTimeline = async (patientData: any) => {
  // כרגע מחזירים מערך ריק או דאטה בסיסי כדי שהאפליקציה תעלה
  console.log("Fetching timeline for:", patientData);
  return [];
};

// פונקציות עזר נוספות שייתכן ונדרשות
export const analyzeSovereigntyLevel = async (score: number) => {
  return score > 70 ? "ריבונות גבוהה" : "נדרש ליווי";
};