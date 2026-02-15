
import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, HeartPulse, ShieldAlert, Sparkles, 
  ChevronRight, ArrowLeft, CheckCircle2, Loader2, 
  Activity, Pill, Moon, Brain, User
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const STEPS = [
  { id: 'reason', title: 'סיבת הפנייה', icon: Brain, q: 'מה הביא אותך אלינו היום? (במילים שלך)' },
  { id: 'sleep', title: 'שינה ותיאבון', icon: Moon, q: 'איך ישנת בלילות האחרונים? האם יש שינוי בתיאבון?' },
  { id: 'meds', title: 'תרופות', icon: Pill, q: 'האם את/ה נוטל/ת תרופות באופן קבוע? אם כן, אילו?' },
  { id: 'safety', title: 'בטיחות', icon: ShieldAlert, q: 'האם הרגשת סכנה לעצמך או לסביבה בתקופה האחרונה?' },
];

const IntakeQuestionnaire: React.FC<{ onComplete: (summary: string) => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const step = STEPS[currentStep];

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      generateContextualFeedback();
    } else {
      finishIntake();
    }
  };

  const generateContextualFeedback = async () => {
    const lastAnswer = answers[step.id];
    if (!lastAnswer) return;
    
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `משתמש ענה על השאלה "${step.q}" את התשובה: "${lastAnswer}".
        את אמונה, מלווה במיון. תני תגובה אמפתית וקצרה מאוד (משפט אחד) שמתקפת את מה שהוא כתב.`,
      });
      setAiFeedback(response.text || '');
    } catch (err) { console.error(err); }
    finally { setIsTyping(false); }
  };

  const finishIntake = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const summaryPrompt = `נתח את תשובות המטופל במיון שלוותה וצור סיכום רפואי מקצועי לרופא (Brief):
      ${JSON.stringify(answers)}
      הסיכום צריך לכלול: תלונה מרכזית, מצב תפקוד (שינה/אוכל), תרופות וסיכוני בטיחות.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: summaryPrompt,
      });
      onComplete(response.text || 'שאלון הושלם.');
    } catch (err) { console.error(err); }
    finally { setIsAnalyzing(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-y-auto pb-40" dir="rtl">
      {/* Header */}
      <header className="p-8 bg-white border-b border-slate-200 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <ClipboardList size={24} />
           </div>
           <div>
              <h1 className="text-xl font-black tracking-tight">שאלון קבלה <span className="text-blue-600 italic">חכם</span></h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Digital Triage Assistant</p>
           </div>
        </div>
        <div className="text-xs font-black text-slate-400">שלב {currentStep + 1} מתוך {STEPS.length}</div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-8 space-y-12 animate-in fade-in slide-in-from-bottom duration-700">
        
        {/* Progress Bar */}
        <div className="flex gap-2">
           {STEPS.map((_, i) => (
             <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]' : 'bg-slate-200'}`} />
           ))}
        </div>

        {/* Question Card */}
        <div className="space-y-10">
           <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                 <step.icon size={32} />
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter leading-none">{step.title}</h2>
           </div>

           <div className="space-y-6">
              <p className="text-2xl font-medium italic text-slate-600 leading-tight">"{step.q}"</p>
              
              <textarea 
                value={answers[step.id] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))}
                placeholder="כתב/י כאן בחופשיות..."
                className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 text-xl font-medium outline-none focus:border-blue-500 transition-all min-h-[250px] shadow-inner"
              />
           </div>

           {aiFeedback && (
             <div className="bg-blue-600/5 border border-blue-500/10 p-6 rounded-[2rem] flex items-start gap-4 animate-in zoom-in duration-500">
                <Sparkles className="text-blue-500 shrink-0 mt-1" size={20} />
                <p className="text-md font-black italic text-blue-700 leading-snug">{aiFeedback}</p>
             </div>
           )}
        </div>

        <div className="flex gap-4 pt-10">
           {currentStep > 0 && (
             <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="p-8 bg-slate-100 text-slate-400 rounded-[2.5rem] hover:bg-slate-200 transition-all"
             >
                <ArrowLeft size={32} />
             </button>
           )}
           <button 
            onClick={handleNext}
            disabled={!answers[step.id]}
            className="flex-1 bg-blue-600 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-4"
           >
              {currentStep === STEPS.length - 1 ? 'סיום והגשה' : 'השאלה הבאה'} 
              <ChevronRight size={32} />
           </button>
        </div>
      </main>

      {/* Analyzing Screen */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-[2000] bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
           <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
              <Loader2 size={120} className="text-blue-500 animate-spin relative" />
           </div>
           <h2 className="text-5xl font-black text-white italic tracking-tighter mt-12 mb-4">מעבדת נתונים...</h2>
           <p className="text-slate-400 font-medium italic text-xl">אמונה מכינה את הסיכום עבור הצוות הקליני שלך.</p>
        </div>
      )}
    </div>
  );
};

export default IntakeQuestionnaire;
