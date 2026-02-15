
import React, { useState } from 'react';
import PatientApp from './components/PatientApp';
import StaffDashboard from './components/StaffDashboard';
import SocialWorkerApp from './components/SocialWorkerApp';
import CaregiverApp from './components/CaregiverApp';
import PatientERApp from './components/PatientERApp';
import ManagementDashboard from './components/ManagementDashboard';
import RikiAdmin from './components/RikiAdmin';
import PersonaLab from './components/PersonaLab';
import PharmacyLoopScreen from './components/PharmacyLoopScreen';
import PitchDeck from './components/PitchDeck';
import RecoveryCockpit from './components/RecoveryCockpit';
import RightsBot from './components/RightsBot';
import HealingPath from './components/HealingPath';
import IntakeQuestionnaire from './components/IntakeQuestionnaire';
import SpiritualSupport from './components/SpiritualSupport';
import SmokeFreeApp from './components/SmokeFreeApp';
import MedicationSafety from './components/MedicationSafety';
import SovereigntyBridge from './components/SovereigntyBridge';
import { AppRole, AppSettings } from './types';
import { 
  Activity, Users, HeartHandshake, Waves, 
  Stethoscope, ShieldCheck, PieChart, FlaskConical,
  Zap, LogOut, ChevronLeft, ShoppingBag, Flame,
  Scale, Soup, BookOpen, CigaretteOff, ShieldAlert,
  Clock, Heart, Shield, TrendingUp, Sun, Smile, UserCheck, 
  CheckCircle, Pill, Star, Moon, ChevronDown, UserCircle2, Quote,
  Utensils, Building2, Cloud, PlayCircle, Layers, ArrowRight,
  ShieldX, Smartphone, Monitor, Briefcase, Eye, Brain
} from 'lucide-react';

const USE_CASE_GROUPS = [
  {
    title: "מסע המטופל במיון (ER Journey)",
    items: [
      { id: AppRole.INTAKE, title: 'אינטייק וקבלה חכמה', desc: 'שאלון דיגיטלי ושיחת היכרות עם אמונה AI', icon: Stethoscope, color: 'blue' },
      { id: AppRole.ER_PATIENT, title: 'לובי הממתינים', desc: 'ניהול תור, הרגעה קולית ומדד המתנה פעילה', icon: Clock, color: 'indigo' },
    ]
  },
  {
    title: "ריבונות וטיפול (Sovereignty & Treatment)",
    items: [
      { id: AppRole.PATIENT, title: 'מרחב הריבונות', desc: 'כיוון הכלי (תרופות) ומדד השקט הפנימי', icon: ShieldCheck, color: 'orange' },
      { id: AppRole.SOVEREIGNTY_BRIDGE, title: 'גשר הלוגיקה', desc: 'עקיפת התנגדות לטיפול דרך הסבר ביו-פרוקסי', icon: Scale, color: 'indigo' },
      { id: AppRole.PHARMACY_LOOP, title: 'סגירת לופ תרופות', desc: 'אימות רכישה (OCR) מול בית המרקחת', icon: ShoppingBag, color: 'teal' },
      { id: AppRole.MED_SAFETY, title: 'Guardian Safety', desc: 'מניעת שגיאות קמיליון וניטור בטיחות בענן', icon: ShieldAlert, color: 'red' },
    ]
  },
  {
    title: "החלמה וגמילה (Recovery & ED)",
    items: [
      { id: AppRole.RECOVERY_COCKPIT, title: 'Recovery Cockpit', desc: 'ניהול דחפים, ימי נקיות וקוקפיט למכורים', icon: Flame, color: 'orange' },
      { id: AppRole.HEALING_PATH, title: 'HealingPath (ED)', desc: 'החלמה מהפרעות אכילה עם אמונה AI', icon: Soup, color: 'emerald' },
      { id: AppRole.SMOKE_FREE, title: 'חופש מעישון', desc: 'גמילה בשיטת אלן קאר והרב מנחם ברוך', icon: CigaretteOff, color: 'blue' },
    ]
  },
  {
    title: "פיקוח קליני וניהול (Staff & Admin)",
    items: [
      { id: AppRole.STAFF, title: 'דשבורד צוות קליני', desc: 'ניטור דופמין וירטואלי וניהול מחלקה', icon: Activity, color: 'blue' },
      // Fixed: Added Brain to imports to resolve line 62 error
      { id: AppRole.RIKI_ADMIN, title: 'RIKI AI Admin', desc: 'ניהול מודלים, לוגים וניטור ביצועי בינה', icon: Brain, color: 'cyan' },
      { id: AppRole.MANAGEMENT, title: 'דשבורד הנהלה ROI', desc: 'ניתוח טראפיק, שביעות רצון ויעילות כלכלית', icon: PieChart, color: 'slate' },
    ]
  },
  {
    title: "קהילה ותמיכה (Community & Rights)",
    items: [
      { id: AppRole.SOCIAL_WORKER, title: 'שיקום וקהילה (עו"ס)', desc: 'ניהול מקרים וסנכרון מול ביטוח לאומי', icon: Briefcase, color: 'teal' },
      { id: AppRole.CAREGIVER, title: 'פורטל מלווים', desc: 'תמיכה בבני משפחה ופרוטוקול עקיפת התנגדות', icon: HeartHandshake, color: 'orange' },
      { id: AppRole.RIGHTS_BOT, title: 'Zchut-Bot Pro', desc: 'סוכן AI למיצוי זכויות ובירוקרטיה', icon: Scale, color: 'amber' },
      { id: AppRole.SPIRITUAL_SUPPORT, title: 'לב אל לב AI', desc: 'לוגיקה רוחנית מבוססת תניא (מנחם ברוך)', icon: BookOpen, color: 'blue' },
    ]
  }
];

const App: React.FC = () => {
  const [activeIdentity, setActiveIdentity] = useState<AppRole | null>(null);
  
  const [settings] = useState<AppSettings>({
    isAiEnabled: true,
    isMvpMode: true,
    activeFeatures: {
      journal: true,
      breathing: true,
      innerChild: true,
      podcasts: true,
    }
  });

  const renderActiveApp = () => {
    switch (activeIdentity) {
      case AppRole.PITCH: return <PitchDeck onStart={() => setActiveIdentity(null)} />;
      case AppRole.PATIENT: return <PatientApp settings={settings} onNavigate={setActiveIdentity} />;
      case AppRole.ER_PATIENT: return <PatientERApp />;
      case AppRole.STAFF: return <StaffDashboard />;
      case AppRole.SOCIAL_WORKER: return <SocialWorkerApp />;
      case AppRole.CAREGIVER: return <CaregiverApp />;
      case AppRole.MANAGEMENT: return <ManagementDashboard />;
      case AppRole.RIKI_ADMIN: return <RikiAdmin />;
      case AppRole.PERSONA_LAB: return <PersonaLab />;
      case AppRole.RECOVERY_COCKPIT: return <RecoveryCockpit />;
      case AppRole.RIGHTS_BOT: return <RightsBot />;
      case AppRole.HEALING_PATH: return <HealingPath />;
      case AppRole.SPIRITUAL_SUPPORT: return <SpiritualSupport />;
      case AppRole.SMOKE_FREE: return <SmokeFreeApp />;
      case AppRole.MED_SAFETY: return <MedicationSafety />;
      case AppRole.SOVEREIGNTY_BRIDGE: return <SovereigntyBridge />;
      case AppRole.INTAKE: return <IntakeQuestionnaire onComplete={() => setActiveIdentity(AppRole.ER_PATIENT)} />;
      case AppRole.PHARMACY_LOOP: return <PharmacyLoopScreen onComplete={() => setActiveIdentity(AppRole.PATIENT)} />;
      default: return null;
    }
  };

  if (activeIdentity) {
    return (
      <div className="relative min-h-screen font-assistant">
        <button 
          onClick={() => setActiveIdentity(null)}
          className="fixed bottom-6 left-6 z-[9999] bg-[#1e40af] text-white p-4 rounded-full shadow-2xl hover:bg-[#1e3a8a] transition-all flex items-center gap-2 group border border-white/20"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest px-2">חזרה לגלריית הפלואו</span>
        </button>
        {renderActiveApp()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col items-center font-assistant overflow-x-hidden relative scroll-smooth" dir="rtl">
      
      {/* Chameleon Top Utility Bar */}
      <div className="w-full bg-[#1e40af] text-white py-2 px-8 flex justify-between items-center text-[10px] font-bold sticky top-0 z-50 shadow-md">
         <div className="flex gap-4">
            <span className="flex items-center gap-2"><Layers size={12}/> Shalvata Consciousness OS v4.5</span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1"><Shield size={10} className="text-blue-300"/> AWS Cloud Hub: Active</span>
         </div>
         <div className="flex gap-4">
            <span className="animate-pulse flex items-center gap-1 text-emerald-400 font-black uppercase"><Activity size={10}/> Bio-Proxy Stream: Live</span>
         </div>
      </div>

      {/* Hero Section */}
      <header className="w-full max-w-7xl px-8 pt-16 pb-12 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
           <div className="inline-flex items-center gap-2 text-[#1e40af] font-black tracking-widest uppercase text-xs bg-white px-4 py-2 rounded-full border border-blue-100 shadow-sm">
             <Smartphone size={14} className="text-blue-600" />
             גלריית Use Cases קלינית
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-[#1e3a8a]">
            מערכת הפעלה <br/> <span className="text-blue-600 italic">תודעתית.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium italic leading-relaxed max-w-2xl">
            ברוכים הבאים למרחב הדמו של "שלוותה OS". כאן תוכלו לדגום את כל הפלואו הקיימים במערכת, מחולקים לפי תרחישים קליניים ומסעות משתמש.
          </p>
          <div className="flex gap-4">
             <button onClick={() => setActiveIdentity(AppRole.PITCH)} className="bg-[#1e40af] text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-3 hover:bg-[#1e3a8a] transition-all shadow-xl">
                <PlayCircle /> הצג Pitch מלא
             </button>
             <button onClick={() => setActiveIdentity(AppRole.PERSONA_LAB)} className="bg-white border-2 border-[#1e40af] text-[#1e40af] px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-3 hover:bg-blue-50 transition-all shadow-lg">
                <FlaskConical /> Persona Lab (ביקורת)
             </button>
          </div>
        </div>

        <div className="w-full md:w-[400px]">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl relative rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <Quote className="absolute -top-6 -right-6 text-blue-50 group-hover:text-blue-100 transition-colors" size={80} fill="currentColor" />
              <div className="flex items-center gap-4 mb-6">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shlomo" className="w-16 h-16 rounded-full bg-blue-50 border border-slate-100 shadow-sm" alt="Dr. Shlomo" />
                 <div>
                    <p className="font-black text-lg text-[#1e3a8a] leading-none">ד"ר שלמה מנדלוביץ'</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">מייסד וחזונאי</p>
                 </div>
              </div>
              <p className="text-xl text-[#1e293b] font-bold italic leading-snug">
                "אנחנו לא נותנים 'אבחנות', אנחנו נותנים <span className="text-blue-600">ריבונות</span>. המערכת היא הברקס הקרמי שמאפשר לפרארי של המטופל לנווט בשלום."
              </p>
           </div>
        </div>
      </header>

      {/* Structured Use Cases Gallery */}
      <section className="w-full max-w-7xl px-8 py-16 space-y-20">
        {USE_CASE_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <h2 className="text-3xl font-black italic tracking-tighter text-[#1e40af]">{group.title}</h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIdentity(item.id)}
                  className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 text-right overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 tracking-tighter text-[#1e3a8a] leading-tight">{item.title}</h3>
                  <p className="text-slate-500 text-[10px] font-medium leading-relaxed italic mb-8 h-10">{item.desc}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-black text-[9px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all">
                    כניסה לפלואו <ArrowRight size={12} className="rotate-180" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Institutional Footer */}
      <footer className="w-full py-20 px-8 border-t border-slate-200 bg-white text-center">
         <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <h2 className="text-4xl font-black italic tracking-tighter text-[#1e3a8a]">שלוותה <span className="text-blue-600 font-light italic">OS</span></h2>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
               <span className="flex items-center gap-2"><Building2 size={14}/> Pilot: Shalvata & Ichilov Node</span>
               <span className="flex items-center gap-2"><Cloud size={14}/> AWS Hybrid Cloud Deployment</span>
               <span className="flex items-center gap-2"><Zap size={14}/> Gemini 2.5 Flash Native Native</span>
            </div>
            <p className="text-slate-400 text-xs italic font-bold">© 2026 Shalvata Consciousness OS. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};

export default App;
