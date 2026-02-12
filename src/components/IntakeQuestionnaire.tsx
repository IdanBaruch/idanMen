
import React, { useState, useEffect } from 'react';
import {
  ClipboardList, HeartPulse, ShieldAlert, Sparkles,
  ChevronRight, ArrowLeft, CheckCircle2, Loader2,
  Activity, Pill, Moon, Brain, User, Mic
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const STEPS = [
  { id: 'reason', title: 'סיבת הפנייה', icon: Brain, q: 'מה הביא אותך אלינו היום? (במילים שלך)', type: 'text' },
  { id: 'sleep', title: 'שינה ותיאבון', icon: Moon, q: 'איך ישנת בלילות האחרונים? האם יש שינוי בתיאבון?', type: 'text' },
  { id: 'meds', title: 'תרופות', icon: Pill, q: 'האם את/ה נוטל/ת תרופות באופן קבוע? אם כן, אילו?', type: 'med-grid' },
  { id: 'safety', title: 'בטיחות', icon: ShieldAlert, q: 'האם הרגשת סכנה לעצמך או לסביבה בתקופה האחרונה?', type: 'binary' },
];

const PSYCH_MEDS = [
  'ציפרלקס', 'רספרידל', 'ליתיום', 'סרוקהוול', 'קלוזאפין', 'הלופרידול',
  'ויפאקס', 'לוסטרל', 'בונסרין', 'פקסיל', 'אריליפי', 'קלופיקסול'
];

const IntakeQuestionnaire: React.FC<{ onComplete: (summary: string) => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState('');

  const step = STEPS[currentStep];

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setTranscriptionStatus('');
      return;
    }

    setIsListening(true);
    setTranscriptionStatus('מקשיב...');

    // Simulate speech-to-text
    setTimeout(() => {
      const phrases = ["אני מרגיש קצת לחוץ", "קשה לי לישון לאחרונה", "הגעתי כי ביקשו ממני", "אני לא בטוח מה קורה"];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setAnswers(prev => ({ ...prev, [step.id]: (prev[step.id] || '') + ' ' + randomPhrase }));
      setIsListening(false);
      setTranscriptionStatus('');
    }, 2000);
  };

  const handleNext = async () => {
    // Start generating feedback but don't strictly await it if it's the last step
    // to avoid leaving the user hanging on the final submission
    const feedbackPromise = generateContextualFeedback(step.id);

    if (currentStep < STEPS.length - 1) {
      await feedbackPromise;
      setCurrentStep(prev => prev + 1);
    } else {
      // For the last step, proceed to finishing immediately
      finishIntake();
    }
  };

  const generateContextualFeedback = async (stepId: string) => {
    const lastAnswer = answers[stepId];
    if (!lastAnswer) return;

    const currentStepData = STEPS.find(s => s.id === stepId);
    if (!currentStepData) return;

    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{
          role: 'user', parts: [{
            text: `משתמש ענה על השאלה "${currentStepData.q}" את התשובה: "${lastAnswer}".
        את המלווה, מלווה במיון. תני תגובה אמפתית וקצרה מאוד (משפט אחד) שמתקפת את מה שהוא כתב.` }]
        }],
      });
      setAiFeedback(response.text || '');
    } catch (err) { console.error('Feedback AI Error:', err); }
    finally { setIsTyping(false); }
  };

  const finishIntake = async () => {
    setIsAnalyzing(true);
    let summary = 'שאלון הושלם.';
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const summaryPrompt = `נתח את תשובות המטופל במיון שלוותה וצור סיכום רפואי מקצועי לרופא (Brief):
      ${JSON.stringify(answers)}
      הסיכום צריך לכלול: תלונה מרכזית, מצב תפקוד (שינה/אוכל), תרופות וסיכוני בטיחות.`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: summaryPrompt }] }],
      });
      summary = response.text || summary;
    } catch (err) {
      console.error('Summary AI Error:', err);
    } finally {
      setIsAnalyzing(false);
      onComplete(summary);
    }
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
            <h1 className="text-3xl font-black italic text-blue-400">הכרטיס לחופש</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">מערכת קבלה זריזה</p>
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

            {step.type === 'binary' ? (
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setAnswers(prev => ({ ...prev, [step.id]: 'כן' }))}
                  className={`p-10 rounded-[2.5rem] text-3xl font-black border-4 transition-all ${answers[step.id] === 'כן' ? 'bg-red-500 text-white border-red-600 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-red-200'}`}
                >
                  כן
                </button>
                <button
                  onClick={() => setAnswers(prev => ({ ...prev, [step.id]: 'לא' }))}
                  className={`p-10 rounded-[2.5rem] text-3xl font-black border-4 transition-all ${answers[step.id] === 'לא' ? 'bg-emerald-500 text-white border-emerald-600 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-200'}`}
                >
                  לא
                </button>
              </div>
            ) : step.type === 'med-grid' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {PSYCH_MEDS.map(med => (
                    <button
                      key={med}
                      onClick={() => setAnswers(prev => ({ ...prev, [step.id]: (prev[step.id] || '') + (prev[step.id] ? ', ' : '') + med }))}
                      className="bg-white border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm hover:border-blue-500 transition-all text-slate-700"
                    >
                      {med}
                    </button>
                  ))}
                </div>
                <textarea
                  value={answers[step.id] || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))}
                  placeholder="רשום/י תרופות נוספות כאן..."
                  className="w-full bg-white border-2 border-slate-100 rounded-[2rem] p-6 text-lg font-medium outline-none focus:border-blue-500 transition-all min-h-[150px] shadow-sm"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {step.id !== 'reason' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setAnswers(prev => ({ ...prev, [step.id]: 'כן' }))}
                      className={`flex-1 py-4 rounded-2xl font-black border-2 transition-all ${answers[step.id] === 'כן' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-400 border-slate-100'}`}
                    >
                      כן
                    </button>
                    <button
                      onClick={() => setAnswers(prev => ({ ...prev, [step.id]: 'לא' }))}
                      className={`flex-1 py-4 rounded-2xl font-black border-2 transition-all ${answers[step.id] === 'לא' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-400 border-slate-100'}`}
                    >
                      לא
                    </button>
                  </div>
                )}
                <div className="relative">
                  <textarea
                    value={answers[step.id] || ''}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))}
                    placeholder="פרט/י כאן..."
                    className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 text-xl font-medium outline-none focus:border-blue-500 transition-all min-h-[250px] shadow-inner"
                  />
                  <button
                    onClick={toggleListening}
                    className={`absolute bottom-6 left-6 p-4 rounded-2xl transition-all shadow-sm flex items-center gap-2 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                  >
                    <Mic size={24} />
                    {transcriptionStatus && <span className="text-xs font-black">{transcriptionStatus}</span>}
                  </button>
                </div>
              </div>
            )}
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
          <p className="text-slate-400 font-medium italic text-xl">המלווה מכינה את הסיכום עבור הצוות הקליני שלך.</p>
        </div>
      )}
    </div>
  );
};

export default IntakeQuestionnaire;
