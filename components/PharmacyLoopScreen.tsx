
import React, { useState, useRef } from 'react';
import { ShoppingBag, CheckCircle2, Zap, Camera, Loader2, ArrowRight, MapPin, Clock, ShieldCheck, FileText } from 'lucide-react';

const PharmacyLoopScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState<'info' | 'sync' | 'analyzing' | 'success'>('info');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
        setStep('analyzing');
        // Simulate a "smart" scan of the Super-Pharm receipt
        setTimeout(() => setStep('success'), 4000);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col items-center justify-center p-6 font-assistant overflow-hidden" dir="rtl">
      
      <div className="max-w-md w-full relative z-10">
        {step === 'info' && (
          <div className="space-y-10 text-center animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-[#1e40af] rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl">
              <ShoppingBag size={48} className="text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black italic tracking-tighter text-[#1e40af]">איסוף הערכה (Kit)</h2>
              <p className="text-slate-500 text-lg font-medium italic">סגירת הלופ מול בית המרקחת.</p>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] text-right space-y-6 shadow-xl">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">מיקום האיסוף</p>
                    <p className="text-lg font-bold">סניף סופר-פארם (קניון ערים)</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">סטטוס מרשם</p>
                    <p className="text-lg font-bold">ממתין לסנכרון קבלה</p>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => setStep('sync')}
              className="w-full bg-[#1e40af] text-white py-6 rounded-[2rem] font-black text-2xl shadow-xl hover:bg-[#1e3a8a] active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              הגעתי לסופר-פארם <ArrowRight size={28} className="group-hover:translate-x-[-8px] transition-transform" />
            </button>
          </div>
        )}

        {step === 'sync' && (
          <div className="space-y-12 text-center animate-in slide-in-from-left duration-700">
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-[#0d9488] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <FileText size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter text-[#0d9488]">סנכרון קבלה (OCR)</h2>
            </div>

            <div className="space-y-4 px-4">
               <p className="text-xl text-slate-500 font-medium leading-tight italic">
                  נא לצלם את הקבלה שקיבלת מהרוקח. <br/> המערכת תזהה את המרשם ותסגור את הלופ הקליני.
               </p>
            </div>
            
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleCapture}
            />

            <div className="space-y-6 pt-4">
              <button 
                onClick={triggerCamera}
                className="w-full bg-[#0d9488] text-white py-8 rounded-[2.5rem] font-black text-3xl shadow-xl active:scale-95 transition-all flex flex-col items-center gap-2 group"
              >
                <Camera size={40} className="mb-1" />
                צילום קבלה (Scan)
              </button>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">נדרש אימות סופר-פארם</p>
              </div>
            </div>
          </div>
        )}

        {step === 'analyzing' && (
          <div className="space-y-10 text-center animate-in fade-in duration-500">
             <div className="relative mx-auto w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden border-4 border-white bg-slate-200 shadow-2xl">
                {capturedImage && <img src={capturedImage} alt="Receipt" className="w-full h-full object-cover opacity-50 grayscale" />}
                
                {/* Scanning Laser Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d9488]/40 to-transparent h-16 w-full animate-[scan_2.5s_ease-in-out_infinite] border-y-2 border-[#0d9488] shadow-[0_0_30px_rgba(13,148,136,0.5)]" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                   <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full flex items-center gap-3 border border-slate-200 shadow-xl">
                      <Loader2 size={20} className="animate-spin text-[#0d9488]" />
                      <span className="text-xs font-black uppercase tracking-widest text-[#0d9488]">מפענח נתוני מרשם (AWS OCR)...</span>
                   </div>
                </div>
             </div>
             <div className="space-y-2">
                <p className="text-slate-500 italic text-lg font-bold">אנא המתן, סוגרים את המעגל מול קמיליון...</p>
                <div className="flex justify-center gap-2">
                   <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                   <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
             </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-10 text-center animate-in zoom-in duration-700">
            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-white">
              <CheckCircle2 size={64} className="text-white animate-bounce" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-5xl font-black italic tracking-tighter text-emerald-600 leading-none">הלופ נסגר.</h2>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full border border-emerald-100">
                <ShieldCheck size={16} />
                <span className="text-xs font-black uppercase tracking-widest italic">Freedom Ticket Activated</span>
              </div>
            </div>

            <p className="text-slate-500 text-xl font-medium italic leading-relaxed px-6">
              הקבלה אומתה. הטיפול סונכרן לתיק האישי שלך. <br/> <span className="text-blue-600 font-black">"מדד החופש" שלך עלה ל-100%</span>. 
            </p>

            <button 
              onClick={onComplete}
              className="w-full bg-[#1e40af] text-white py-6 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 shadow-xl hover:bg-[#1e3a8a] active:scale-95 transition-all"
            >
              המשך למרחב הריבונות <ArrowRight size={32} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(450%); }
        }
      `}</style>
    </div>
  );
};

export default PharmacyLoopScreen;
