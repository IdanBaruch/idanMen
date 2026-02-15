
import React, { useState, useEffect } from 'react';
import { 
  Wrench, Palette, Package, Cpu, Megaphone, BadgeDollarSign, 
  Handshake, HelpCircle, User, Activity, FlaskConical, 
  MessageSquareQuote, Sparkles, ChevronRight, Play, X,
  Terminal, ShieldCheck, Heart, Scale, Pill, Wallet, Briefcase,
  Key, TestTube, LineChart, Globe, Users, Brain, Clock, ShieldAlert,
  Search, Lock, Database, Eye, FileText, Smartphone, Zap, Soup,
  BookOpen, Cloud, Server
} from 'lucide-react';
import PatientApp from './PatientApp';
import StaffDashboard from './StaffDashboard';
import { PersonaExpert, AppSettings } from '../types';
import { GoogleGenAI } from '@google/genai';

const MOCK_SETTINGS: AppSettings = {
  isAiEnabled: true,
  isMvpMode: true,
  activeFeatures: {
    journal: true,
    breathing: true,
    innerChild: true,
    podcasts: true,
  },
};

const EXPERTS: PersonaExpert[] = [
  // Tech & Cloud
  { id: 'mimar', name: 'יריב ניר', title: 'CIO Ichilov', category: 'Strategy', icon: 'Cloud', prompt: 'פעל כיריב ניר, סמנכ"ל טכנולוגיות מידע באיכילוב. התמקד ביתרונות המעבר לענן של AWS, במהפכת ה-AI ובשיפור הביצועים לצוות הרפואי.' },
  { id: 'security', name: 'דני הסייבר', title: 'Cloud Security', category: 'Tech', icon: 'Lock', prompt: 'פעל כמומחה אבטחת מידע בענן (CISO). נתח את הגנת הפרטיות של המטופלים תחת רגולציית משרד הבריאות ומערכות ה-AWS.' },
  { id: 'architect', name: 'הארכיטקט', title: 'Technical Architect', category: 'Tech', icon: 'Cpu', prompt: 'פעל כארכיטקט תוכנה בכיר. נתח את יציבות המערכת, ה-Scalability והאינטגרציה מול מערכת קמיליון בענן.' },
  
  // Clinical & Spiritual
  { id: 'rabbi', name: 'הרב מנחם', title: 'Spiritual Advisor', category: 'Support', icon: 'BookOpen', prompt: 'פעל כיועץ רוחני יהודי (הרב מנחם ברוך). בדוק האם המערכת מעניקה תקווה (Emunah) ומכבדת את כבוד האדם והנשמה.' },
  { id: 'psych', name: 'האנליטיקאי', title: 'Clinical Psychologist', category: 'Support', icon: 'Brain', prompt: 'פעל כפסיכולוג קליני בכיר. נתח את הדינמיקה הטיפולית של אמונה AI מול מטופל בפוסט-טראומה.' },
  
  // Users
  { id: 'patient', name: 'עידן', title: 'Patient Persona', category: 'User', icon: 'User', prompt: 'פעל כמטופל צעיר במיון. תגיד לי אם אמונה נשמעת לך כמו רובוט מעצבן או כמו מישהי שבאמת אכפת לה.' },
  { id: 'manager', name: 'ד"ר אפרת', title: 'Manager Persona', category: 'User', icon: 'Activity', prompt: 'פעל כמנהלת מחלקה. האם דשבורד ה-Guardian Safety באמת מוריד ממני את החרדה של שגיאות תרופות?' }
];

const PersonaLab: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<PersonaExpert | null>(null);
  const [targetApp, setTargetApp] = useState<'patient' | 'staff'>('staff');
  const [critique, setCritique] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCritique = async (expert: PersonaExpert) => {
    setIsGenerating(true);
    setCritique('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `אלו הפרטים של האפליקציה "שלוותה OS". המערכת כוללת דשבורד לצוות ואפליקציה למטופלים.
        ${expert.prompt}
        האפליקציה כרגע מציגה את מסך ה${targetApp === 'staff' ? 'דשבורד הניהולי' : 'ממשק המטופל'}.
        תן לי ביקורת קצרה וקולעת (עד 3 פסקאות) בטון המדויק של הדמות שלך.`,
      });
      setCritique(response.text || 'לא התקבלה ביקורת.');
    } catch (err) {
      setCritique('שגיאה בייצור הביקורת. וודא שמפתח ה-API תקין.');
    } finally {
      setIsGenerating(false);
    }
  };

  const IconMap: Record<string, any> = {
    Cpu, Palette, Package, Wrench, Megaphone, BadgeDollarSign, Handshake, HelpCircle, 
    User, Activity, Lock, Database, Scale, Pill, Brain, Wallet, Briefcase, Zap, Eye, Users, Soup, BookOpen, Cloud, Server
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans overflow-hidden" dir="rtl">
      <div className="bg-slate-800 border-b border-white/10 p-4 flex justify-between items-center z-[1002]">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg"><FlaskConical className="text-white" size={24}/></div>
          <h1 className="text-xl font-black text-white tracking-tighter">Persona Lab <span className="text-blue-400 font-light tracking-normal italic">Cloud Simulation</span></h1>
        </div>
        <div className="flex bg-slate-700 rounded-full p-1 border border-white/10">
          <button onClick={() => setTargetApp('staff')} className={`px-6 py-2 rounded-full text-xs font-black transition-all ${targetApp === 'staff' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Dashboard</button>
          <button onClick={() => setTargetApp('patient')} className={`px-6 py-2 rounded-full text-xs font-black transition-all ${targetApp === 'patient' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Patient OS</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {!selectedExpert ? (
          <div className="flex-1 p-8 overflow-y-auto bg-slate-950 custom-scrollbar">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {EXPERTS.map(expert => {
                const Icon = IconMap[expert.icon] || HelpCircle;
                return (
                  <button key={expert.id} onClick={() => { setSelectedExpert(expert); generateCritique(expert); }} className="bg-slate-800 border border-white/5 p-6 rounded-[2.5rem] flex flex-col items-center group hover:bg-blue-600 transition-all shadow-xl">
                    <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-blue-600 transition-all"><Icon size={32} /></div>
                    <h3 className="text-md font-black text-white mb-1">{expert.name}</h3>
                    <p className="text-[9px] text-slate-500 font-bold uppercase group-hover:text-blue-100">{expert.title}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex">
            <div className="flex-1 bg-slate-200 overflow-hidden relative border-l border-white/10">
              <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                 {targetApp === 'staff' ? <StaffDashboard /> : <PatientApp settings={MOCK_SETTINGS} />}
              </div>
            </div>
            <aside className="w-[400px] bg-slate-900 flex flex-col z-[1001] shadow-2xl">
              <div className="p-6 border-b border-white/10 flex justify-between bg-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    {React.createElement(IconMap[selectedExpert.icon] || HelpCircle, { size: 24, className: 'text-white' })}
                  </div>
                  <h3 className="text-lg font-black text-white">{selectedExpert.name}</h3>
                </div>
                <button onClick={() => setSelectedExpert(null)} className="p-2 bg-white/5 rounded-full"><X size={20}/></button>
              </div>
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="bg-slate-800 p-6 rounded-[2rem] border border-blue-500/20">
                   <h4 className="text-[9px] text-blue-400 font-black uppercase mb-4 italic">Expert Critique</h4>
                   {isGenerating ? <div className="animate-pulse space-y-2"><div className="h-4 bg-slate-700 rounded w-full"></div><div className="h-4 bg-slate-700 rounded w-5/6"></div></div> : <div className="text-slate-200 text-sm italic">{critique}</div>}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaLab;
