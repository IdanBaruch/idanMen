
import React, { useState, useEffect } from 'react';
import { 
  Heart, Sparkles, MessageCircle, BookOpen, 
  Sun, Moon, Music, ArrowLeft, Loader2,
  CheckCircle2, Wind, ScrollText, Star, Brain, Zap, Activity,
  Volume2, VolumeX, ShieldCheck, Quote
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SpiritualSupport: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'rabbi' | 'sovereignty'>('home');
  const [transcription, setTranscription] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [verseOfDay] = useState('מֹחַ שַׁלִּיט עַל הַלֵּב - בְּטֶבַע תּוֹלַדְתּוֹ.');

  const consultRabbi = async (prompt: string, mode: 'spiritual' | 'sovereignty' = 'spiritual') => {
    setActiveScreen('rabbi');
    setIsAiLoading(true);
    setTranscription('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstructions = mode === 'spiritual' 
        ? `אתה הרב מנחם ברוך (בהרב), יועץ רוחני אמפתי. שלב לוגיקה של ספר התניא (נפש אלוקית מול בהמית) עם חמלה קלינית. התמקד במושג "ריבונות הנשמה".`
        : `אתה מומחה לוגיקה קלינית-רוחנית (מנחם ברוך AI). המטופל מתנגד לקחת תרופות כי הוא מרגיש "בריא" וחושב שהאבחנה (סכיזופרניה/מאניה) היא שקר. 
           הסבר לו שהתרופה היא לא "תיקון למחלה" אלא "כפתור Mute לרעש". המוח שלו (הפרארי) נוסע מהר מדי והתרופה היא הברקס הקרמי שמאפשר לו לשלוט בלב. 
           השתמש בגישה של ריבונות ושליטה, לא החלמה.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: systemInstructions }
      });
      setTranscription(response.text || 'הכל יהיה לטובה, יקירי.');
    } catch (err) {
      console.error(err);
      setTranscription('המילים נעתקו, אך הלב פתוח.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col font-assistant overflow-y-auto pb-40 relative" dir="rtl">
      
      <header className="p-8 bg-white border-b border-slate-200 sticky top-0 z-50">
        <h1 className="text-3xl font-black italic tracking-tighter text-[#1e40af]">לב אל לב <span className="text-blue-500 font-light italic tracking-normal">AI</span></h1>
        <p className="text-slate-400 font-black uppercase tracking-widest text-[9px] mt-1 italic">מנחם ברוך (בהרב) | לוגיקה קלינית-רוחנית</p>
      </header>

      <main className="flex-1 p-6 space-y-8 relative z-10 max-w-4xl mx-auto w-full">
        
        {/* Tanya Banner */}
        <section className="bg-[#1e40af] text-white p-12 rounded-[3.5rem] shadow-2xl text-center space-y-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-10 translate-y--10" />
           <Brain size={40} className="mx-auto text-blue-200 animate-pulse" />
           <p className="text-3xl md:text-5xl font-black italic leading-tight text-white tracking-tighter">
             "{verseOfDay}"
           </p>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 italic opacity-80">יסוד הריבונות הקוגניטיבית</p>
        </section>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => consultRabbi('אני מרגיש חסר אונים מול הדחפים שלי, איך המוח שלי יכול לשלוט בלב?')}
            className="bg-white border-2 border-slate-100 p-10 rounded-[4rem] text-right space-y-6 hover:border-blue-400 hover:shadow-2xl transition-all group"
          >
             <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl w-fit group-hover:scale-110 transition-transform shadow-sm">
                <Zap size={32} />
             </div>
             <div>
                <h3 className="text-3xl font-black italic tracking-tighter text-[#1e40af]">ריבונות תודעתית</h3>
                <p className="text-sm font-bold text-slate-400 italic mt-1 uppercase">כלים לשליטה עצמית מהתניא</p>
             </div>
          </button>

          <button 
            onClick={() => consultRabbi('אני לא חולה ואני לא רוצה לקחת כדורים, סתם הדביקו לי תווית בבית חולים.', 'sovereignty')}
            className="bg-white border-2 border-slate-100 p-10 rounded-[4rem] text-right space-y-6 hover:border-blue-400 hover:shadow-2xl transition-all group"
          >
             <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl w-fit group-hover:scale-110 transition-transform shadow-sm">
                <VolumeX size={32} />
             </div>
             <div>
                <h3 className="text-3xl font-black italic tracking-tighter text-[#b45309]">ביטול הרעש (Mute)</h3>
                <p className="text-sm font-bold text-slate-400 italic mt-1 uppercase">למה לקחת תרופות כשמרגישים בריאים?</p>
             </div>
          </button>
        </div>

        {/* Insight Card */}
        <section className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-lg relative group">
           <Quote className="absolute top-6 left-6 text-slate-50" size={60} />
           <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] italic mb-4">תובנת הריבון</h4>
           <div className="space-y-4">
              <p className="text-xl italic font-bold leading-relaxed text-[#1e293b] relative z-10">
                "התרופה היא לא הוכחה שאתה פגום. היא הוכחה שאתה אחראי. היא המשקפיים שמאפשרים לך לראות את האמת מעבר לערפל של הנפש הבהמית."
              </p>
              <div className="flex items-center gap-2 text-slate-400 italic">
                 <ShieldCheck size={14}/>
                 <span className="text-[9px] font-black uppercase tracking-widest">פרוטוקול מנחם ברוך AI v4</span>
              </div>
           </div>
        </section>

      </main>

      {/* AI Dialog Overlay */}
      {activeScreen === 'rabbi' && (
        <div className="fixed inset-0 z-[3000] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500 overflow-y-auto">
           <div className="relative z-10 space-y-12 max-w-lg w-full">
              <div className="flex flex-col items-center gap-4">
                 <div className="w-20 h-20 bg-[#1e40af] rounded-[2rem] flex items-center justify-center shadow-2xl">
                    <Sparkles size={40} className="text-white animate-pulse" />
                 </div>
                 <h2 className="text-4xl font-black italic tracking-tighter text-[#1e40af]">מנחם ברוך AI</h2>
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] italic">סנכרון תודעתי (Sovereignty OS)</p>
              </div>

              <div className="bg-white border-2 border-slate-100 p-10 rounded-[3.5rem] min-h-[350px] flex items-center justify-center shadow-2xl relative">
                 {isAiLoading ? (
                   <div className="flex flex-col items-center gap-6 animate-pulse">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" />
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">מנתח לוגיקה תודעתית...</p>
                   </div>
                 ) : (
                   <div className="text-2xl md:text-3xl italic text-[#1e293b] leading-tight font-bold whitespace-pre-wrap text-right">
                      {transcription}
                   </div>
                 )}
              </div>

              <div className="space-y-6 pt-4">
                 <button 
                  onClick={() => setActiveScreen('home')}
                  className="w-full bg-[#1e40af] text-white py-6 rounded-[2rem] font-black text-2xl shadow-xl hover:bg-[#1e3a8a] active:scale-95 transition-all"
                 >
                    אני הריבון. המשך.
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SpiritualSupport;
