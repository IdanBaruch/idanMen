
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
import CoursesCenter from './components/CoursesCenter';
import MedicationVerifier from './components/MedicationVerifier';
import LittlePrinceApp from './components/LittlePrinceApp';
import FinancialShield from './components/FinancialShield';
import DeEscalation from './components/DeEscalation';
import CompassionMirror from './components/CompassionMirror';
import LiquidClarity from './components/LiquidClarity';
import VoltKidPatient from './components/VoltKidPatient';
import VoltKidParent from './components/VoltKidParent';
import VictoryStore from './components/VictoryStore';
import MedicalRecordsRoom from './components/MedicalRecordsRoom';
import OnboardingWizard from './components/OnboardingWizard';
import SovereigntyJoyApp from './components/SovereigntyJoyApp';
import WardSelection from './components/WardSelection';
import StaffEcosystem from './components/StaffEcosystem';
import ConsultationPortal from './components/ConsultationPortal';
import CyberGuardian from './components/CyberGuardian';
import EcoSystemMap from './components/EcoSystemMap';
import StaffTerminal from './components/StaffTerminal';
import PsychologistPortal from './components/PsychologistPortal';
import OTPortal from './components/OTPortal';
import SocialWorkerPortal from './components/SocialWorkerPortal';
import DailyDigest from './components/DailyDigest';
import HospitalAdminDashboard from './components/HospitalAdminDashboard';
import AIBoardroom from './components/AIBoardroom';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { AppRole, AppSettings, LedgerEntry } from './types';
import {
  Activity, Users, HeartHandshake, Waves,
  Stethoscope, ShieldCheck, PieChart, FlaskConical,
  Zap, LogOut, ChevronLeft, ShoppingBag, Flame,
  Scale, Soup, BookOpen, CigaretteOff, ShieldAlert, FileText,
  Clock, Heart, Shield, TrendingUp, Sun, Smile, UserCheck,
  CheckCircle, Pill, Star, Moon, ChevronDown, UserCircle2, Quote,
  Utensils, Building2, Cloud, PlayCircle, Layers, ArrowRight,
  ShieldX, GraduationCap, Calculator, Siren, Anchor, Wine,
  Package, Trophy, History, ClipboardList, Layout, Briefcase
} from 'lucide-react';

const DEMO_SCENARIOS = [
  { id: 'scenario-er', title: '1. תרחיש מיון (ER)', desc: 'אינטייק חכם, שיחה עם המלווה וצמצום זמן המתנה.', role: AppRole.INTAKE, icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'scenario-rewards', title: '2. חנות הניצחונות', desc: 'המרת נקודות ריבונות לפרסים מותגיים (Nike/Sony).', role: AppRole.REWARDS, icon: ShoppingBag, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'scenario-meds', title: '3. פרוטוקול תרופות', desc: 'אימות נטילה (vDOT) וקבלת בונוס ריבונות.', role: AppRole.PHARMACY_LOOP, icon: Pill, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'scenario-crisis', title: '4. גשר הריבונות', desc: 'כניסה למוד מצוקה, קרקוע לוגי וחסימת סיכונים.', role: AppRole.SOVEREIGNTY_BRIDGE, icon: Anchor, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'scenario-healing', title: '5. שיקום ומשמעות', desc: 'שיחה עם היועץ הרוחני ובניית נרטיב החלמה.', role: AppRole.SPIRITUAL_SUPPORT, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const SECONDARY_MODULES = [
  { id: AppRole.SPIRITUAL_SUPPORT, title: 'לב אל לב AI', desc: 'לוגיקה רוחנית (היועץ הרוחני)', icon: BookOpen, color: 'from-[#1e40af] to-[#3b82f6]' },
  { id: AppRole.COURSES, title: 'אקדמיית שלוותה', desc: 'קורסים, סדנאות וכלים לחיים', icon: GraduationCap, color: 'from-violet-600 to-purple-600' },
  { id: AppRole.LITTLE_PRINCE, title: 'בית הגיבורים', desc: 'מתמטיקה כסדר בתוך הכאוס', icon: Calculator, color: 'from-indigo-900 to-slate-800' },
  { id: AppRole.COMPASSION_MIRROR, title: 'מראת החמלה', desc: 'חיבוק לילד הפנימי (SOS רגשי)', icon: HeartHandshake, color: 'from-rose-400 to-rose-300' },
  { id: AppRole.FINANCIAL_SHIELD, title: 'המגן הפיננסי', desc: 'הגנה מפני מאניה ובזבוזים', icon: Shield, color: 'from-emerald-800 to-emerald-600' },
  { id: AppRole.LIQUID_CLARITY, title: 'צלילות נוזלית', desc: 'השריון החברתי (גמילה מאלכוהול)', icon: Wine, color: 'from-blue-600 to-cyan-500' },
  { id: AppRole.RIGHTS_BOT, title: 'Zchut-Bot Pro', desc: 'מיצוי זכויות ובירוקרטיה', icon: Scale, color: 'from-[#d97706] to-[#f59e0b]' },
  { id: AppRole.SMOKE_FREE, title: 'חופש מעישון', desc: 'שיטת אלן קאר והרב', icon: CigaretteOff, color: 'from-[#1e3a8a] to-[#1d4ed8]' },
  { id: AppRole.HEALING_PATH, title: 'HealingPath', desc: 'החלמה מהפרעות אכילה', icon: Soup, color: 'from-[#059669] to-[#10b981]' },
  { id: AppRole.VOLT_KID, title: 'VoltKid (ילד)', desc: 'הזמנת ציוד מהבית', icon: ShoppingBag, color: 'from-purple-500 to-pink-500' },
  { id: AppRole.VOLT_PARENT, title: 'VoltKid (הורה)', desc: 'ניהול הזמנות ואספקה', icon: Package, color: 'from-blue-600 to-indigo-600' },
  { id: AppRole.MEDICAL_RECORDS, title: 'התיק הרפואי שלי', desc: 'עקיפת בירוקרטיה ופענוח מסמכים', icon: FileText, color: 'from-emerald-500 to-teal-500' },
  { id: AppRole.SOVEREIGNTY_JOY, title: 'ריבונות ושמחה', desc: 'ליווי טקטי (כיפת ברזל וניהול כעס)', icon: ShieldAlert, color: 'from-[#020617] to-[#1e1b4b]' },
  { id: AppRole.CONSULTATION, title: 'פורטל מומחים', desc: 'פענוח החלטות רפואיות (Z-Orders)', icon: ClipboardList, color: 'from-indigo-600 to-indigo-900' },
  { id: AppRole.WARD_SELECTION, title: 'בחירת מחלקה', desc: 'מעבר בין יחידות האשפוז', icon: Building2, color: 'from-slate-600 to-slate-800' },
];

const AppContent: React.FC = () => {
  const { hasOnboarded } = useSettings();
  const [activeIdentity, setActiveIdentity] = useState<AppRole | null>(null);
  const [activePortal, setActivePortal] = useState<'patient' | 'staff' | 'family' | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);
  const [showCourses, setShowCourses] = useState(false);
  const [showVerifier, setShowVerifier] = useState(false);
  const [authenticatedRoles, setAuthenticatedRoles] = useState<AppRole[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(() => {
    const saved = localStorage.getItem('sovereign_ledger');
    return saved ? JSON.parse(saved) : [];
  });

  const addLedgerEntry = (type: LedgerEntry['type'], content: any) => {
    const newEntry: LedgerEntry = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      date: new Date().toISOString(),
      content
    };
    const updated = [...ledgerEntries, newEntry];
    setLedgerEntries(updated);
    localStorage.setItem('sovereign_ledger', JSON.stringify(updated));
    addPoints(50); // Reward for success documented by care team
  };

  const addPoints = (amount: number) => {
    setUserPoints(prev => prev + amount);
  };

  const [settings, setSettings] = useState<AppSettings>({
    userName: 'היועץ הרוחני',
    theme: 'light',
    notifications: true,
    soundEnabled: true
  });

  if (!hasOnboarded) {
    return <OnboardingWizard />;
  }

  const renderActiveApp = () => {
    switch (activeIdentity) {
      case AppRole.PITCH: return <PitchDeck onStart={() => setActiveIdentity(null)} />;
      case AppRole.PATIENT: return <PatientApp settings={settings} onNavigate={setActiveIdentity} userPoints={userPoints} onAddPoints={addPoints} />;
      case AppRole.ER_PATIENT: return <PatientERApp userPoints={userPoints} onAddPoints={addPoints} />;
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
      case AppRole.COURSES: return <CoursesCenter />;
      case AppRole.LITTLE_PRINCE: return <LittlePrinceApp onBack={() => setActiveIdentity(null)} />;
      case AppRole.FINANCIAL_SHIELD: return <FinancialShield onBack={() => setActiveIdentity(null)} />;
      case AppRole.DE_ESCALATION: return <DeEscalation onComplete={() => setActiveIdentity(null)} />;
      case AppRole.COMPASSION_MIRROR: return <CompassionMirror onBack={() => setActiveIdentity(null)} />;
      case AppRole.LIQUID_CLARITY: return <LiquidClarity onBack={() => setActiveIdentity(null)} />;
      case AppRole.VOLT_KID: return <VoltKidPatient onBack={() => setActiveIdentity(null)} />;
      case AppRole.VOLT_PARENT: return <VoltKidParent onBack={() => setActiveIdentity(null)} />;
      case AppRole.REWARDS: return <VictoryStore onBack={() => setActiveIdentity(null)} userPoints={userPoints} />;
      case AppRole.MEDICAL_RECORDS:
        return authenticatedRoles.includes(AppRole.MEDICAL_RECORDS) ? (
          <MedicalRecordsRoom onBack={() => setActiveIdentity(null)} />
        ) : (
          <CyberGuardian
            label="MEDICAL DATABASE - CLALIT EMR"
            onUnlock={() => setAuthenticatedRoles(prev => [...prev, AppRole.MEDICAL_RECORDS])}
          />
        );
      case AppRole.SOVEREIGNTY_JOY: return <SovereigntyJoyApp onBack={() => setActiveIdentity(null)} userPoints={userPoints} onAddPoints={addPoints} />;
      case AppRole.CONSULTATION:
        return authenticatedRoles.includes(AppRole.CONSULTATION) ? (
          <ConsultationPortal onBack={() => setActiveIdentity(null)} onAddPoints={addPoints} />
        ) : (
          <CyberGuardian
            label="SPECIALIST DECISION PORTAL"
            onUnlock={() => setAuthenticatedRoles(prev => [...prev, AppRole.CONSULTATION])}
          />
        );
      case AppRole.STAFF: return <StaffEcosystem onBack={() => setActiveIdentity(null)} onSelect={(role) => setActiveIdentity(role)} />;
      case AppRole.RABBI:
      case AppRole.CLEANER:
      case AppRole.SECURITY:
        return <StaffTerminal role={activeIdentity} onBack={() => setActiveIdentity(AppRole.STAFF)} />;
      case AppRole.CEO:
        return <HospitalAdminDashboard onBack={() => setActiveIdentity(AppRole.STAFF)} />;
      case AppRole.PSYCHOLOGIST:
        return <PsychologistPortal onBack={() => setActiveIdentity(AppRole.STAFF)} onAddEntry={(c) => addLedgerEntry('psychologist', c)} />;
      case AppRole.OCCUPATIONAL_THERAPIST:
        return <OTPortal onBack={() => setActiveIdentity(AppRole.STAFF)} onAddEntry={(c) => addLedgerEntry('ot', c)} />;
      case AppRole.SOCIAL_WORKER:
        return <SocialWorkerPortal onBack={() => setActiveIdentity(AppRole.STAFF)} onAddEntry={(c) => addLedgerEntry('social_worker', c)} />;
      case AppRole.WARD_SELECTION: return <WardSelection onSelect={(ward) => { alert(`עברת למחלקה: ${ward}`); setActiveIdentity(null); }} />;
      case AppRole.DIGEST: return <DailyDigest entries={ledgerEntries} onBack={() => setActiveIdentity(null)} />;
      case AppRole.INTAKE: return <IntakeQuestionnaire onComplete={(s) => { addPoints(100); setActiveIdentity(AppRole.ER_PATIENT); }} />;
      case AppRole.PHARMACY_LOOP: return <PharmacyLoopScreen onComplete={() => { addPoints(50); setActiveIdentity(AppRole.PATIENT); }} />;
      default: return null;
    }
  };

  const renderContent = () => {
    if (activeIdentity) {
      return (
        <div className="relative min-h-screen font-assistant">
          <button
            onClick={() => setActiveIdentity(null)}
            className="fixed bottom-6 left-6 z-[9999] bg-[#1e40af] text-white p-4 rounded-full shadow-2xl hover:bg-[#1e3a8a] transition-all flex items-center gap-2 group border border-white/20"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest px-2">חזרה לפורטל</span>
          </button>
          {renderActiveApp()}
        </div>
      );
    }

    if (showMap) {
      return (
        <div className="relative min-h-screen bg-[#f1f5f9]">
          <button
            onClick={() => setShowMap(false)}
            className="fixed top-8 left-8 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-slate-900 transition-all border border-slate-200"
          >
            <ChevronLeft size={24} />
          </button>
          <EcoSystemMap onSelect={(p) => { setActivePortal(p); setShowMap(false); }} />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col items-center font-assistant overflow-x-hidden relative scroll-smooth" dir="rtl">

        {/* Chameleon Top Utility Bar */}
        <div className="w-full bg-[#1e40af] text-white py-2 px-8 flex justify-between items-center text-[10px] font-bold sticky top-0 z-50 shadow-md">
          <div className="flex gap-4">
            <span className="flex items-center gap-2"><Layers size={12} /> הכרטיס לחופש (Shalvata OS v4.0)</span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1"><Shield size={10} className="text-blue-300" /> AWS Cloud Nodes: Online</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActiveIdentity(AppRole.DE_ESCALATION)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
              <Siren size={12} /> SOS
            </button>
            <span className="opacity-40">|</span>
            <span className="text-blue-200">System Healthy</span>
            <span className="opacity-40">|</span>
            <button onClick={() => setShowVerifier(true)} className="hover:text-white transition-colors flex items-center gap-1">
              <Pill size={12} className="text-emerald-400" />
              אימות נטילה (vDOT)
            </button>
            <span className="opacity-40">|</span>
            <span className="hover:text-blue-200 cursor-pointer" onClick={() => setActiveIdentity(AppRole.MANAGEMENT)}>דשבורד הנהלה (ROI)</span>
          </div>
        </div>

        {/* Hero Section */}
        <header className="w-full max-w-7xl px-8 pt-20 pb-12 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 text-[#1e40af] font-black tracking-widest uppercase text-xs bg-white px-4 py-2 rounded-full border border-blue-100 shadow-sm">
              <Activity size={14} className="text-blue-600" />
              חזון הרצף הקליני
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-[#1e3a8a]">
              הכרטיס <br /> <span className="text-blue-600 italic">לחופש.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium italic leading-relaxed max-w-2xl">
              אנחנו משנים את המשחק: במקום "פיקוח", אנחנו מעניקים <span className="text-blue-700 font-black">ריבונות</span>.
              גשר דיגיטלי המאפשר למטופל להישאר בבית, בזמן שה-OS שלנו שומרת עליו.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <button onClick={() => setActivePortal('patient')} className="bg-[#1e40af] text-white p-6 rounded-2xl font-black text-lg flex flex-col items-center gap-3 hover:bg-[#1e3a8a] transition-all shadow-xl group">
                <UserCircle2 size={32} className="group-hover:scale-110 transition-transform" />
                <span className="leading-tight">אפליקציית <br /> המטופל</span>
              </button>
              <button onClick={() => setActivePortal('staff')} className="bg-slate-900 text-white p-6 rounded-2xl font-black text-lg flex flex-col items-center gap-3 hover:bg-black transition-all shadow-xl group">
                <Briefcase size={32} className="group-hover:scale-110 transition-transform" />
                <span className="leading-tight">כניסת <br /> צוות</span>
              </button>
              <button onClick={() => setActivePortal('family')} className="bg-rose-600 text-white p-6 rounded-2xl font-black text-lg flex flex-col items-center gap-3 hover:bg-rose-700 transition-all shadow-xl group">
                <Heart size={32} className="group-hover:scale-110 transition-transform" />
                <span className="leading-tight">פורטל <br /> משפחה</span>
              </button>
              <button onClick={() => setActiveIdentity(AppRole.DIGEST)} className="bg-emerald-600 text-white p-6 rounded-2xl font-black text-lg flex flex-col items-center gap-3 hover:bg-emerald-700 transition-all shadow-xl group">
                <Trophy size={32} className="group-hover:scale-110 transition-transform" />
                <span className="leading-tight">סיכום <br /> הצלחות</span>
              </button>
              <button onClick={() => setActiveIdentity(AppRole.BOARDROOM)} className="bg-indigo-900/10 text-indigo-400 p-6 rounded-2xl font-black text-lg flex flex-col items-center gap-3 hover:bg-indigo-900/20 transition-all shadow-xl group border border-indigo-500/20">
                <Users size={32} className="group-hover:scale-110 transition-transform" />
                <span className="leading-tight">דירקטוריון <br /> AI</span>
              </button>
              <button onClick={() => setShowMap(true)} className="bg-white border-2 border-[#1e40af] text-[#1e40af] p-6 rounded-2xl font-black text-lg flex flex-col items-center gap-3 hover:bg-blue-50 transition-all shadow-lg group">
                <Layout size={32} className="group-hover:scale-110 transition-transform" />
                <span className="leading-tight">מפת <br /> המערכות</span>
              </button>
            </div>
            <div className="flex gap-6 mt-8">
              <button onClick={() => setActiveIdentity(AppRole.PITCH)} className="flex items-center gap-2 text-amber-600 font-bold hover:underline">
                <PlayCircle size={18} /> שמע את החזון (Glory Pitch)
              </button>
              <span className="text-slate-300">|</span>
              <p className="text-slate-400 text-xs font-bold italic">בחר פורטל כדי להתחיל את החוויה</p>
            </div>
          </div>

          {/* Shlomo Vision Quote */}
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
                "נפש פצועה היא לא תקלה טכנית. היא דורשת <span className="text-blue-600">שליטה וריבונות</span>.
                המערכת שלנו היא הברקס הקרמי שמאפשר לפרארי להאט ולנווט."
              </p>
            </div>
          </div>
        </header>

        {/* Portal-Specific Module Launcher */}
        {activePortal && (
          <section className="w-full bg-[#e2e8f0] py-20 mt-12 animate-in slide-in-from-bottom duration-700">
            <div className="max-w-7xl mx-auto px-8 space-y-12">
              <div className="flex justify-between items-center bg-white/50 p-6 rounded-[2.5rem] border border-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  {activePortal === 'patient' ? <UserCircle2 className="text-blue-600" size={32} /> : activePortal === 'staff' ? <Briefcase className="text-slate-800" size={32} /> : <Heart className="text-rose-600" size={32} />}
                  <div>
                    <h2 className="text-3xl font-black italic text-[#1e3a8a]">
                      {activePortal === 'patient' ? 'פורטל הריבונות (Patient)' : activePortal === 'staff' ? 'פורטל המקצוענים (Staff)' : 'פורטל בני המשפחה (Family)'}
                    </h2>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Modules approved for your identity level</p>
                  </div>
                </div>
                <button onClick={() => setActivePortal(null)} className="text-slate-400 hover:text-slate-900 flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                  סגור פורטל <LogOut size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Common Role Mapper */}
                {activePortal === 'patient' && (
                  <>
                    <button onClick={() => setActiveIdentity(AppRole.PATIENT)} className="p-8 bg-white rounded-[2.5rem] border-2 border-blue-500 shadow-xl text-right group hover:scale-[1.02] transition-all">
                      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6"><Activity size={32} /></div>
                      <h3 className="text-2xl font-black italic">אפליקציית הריבון</h3>
                      <p className="text-xs text-slate-500 font-medium italic mt-2 italic">הכניסה הראשית ליהונתן (Bio-Reactor, Control Tower)</p>
                    </button>
                    <button onClick={() => setActiveIdentity(AppRole.INTAKE)} className="p-8 bg-white rounded-[2.5rem] border border-slate-300 text-right group hover:border-blue-400">
                      <h3 className="text-xl font-black mb-2">אינטייק חכם (ER)</h3>
                      <p className="text-[10px] text-slate-500 italic">כניסה ראשונית למיון</p>
                    </button>
                    <button onClick={() => setActiveIdentity(AppRole.REWARDS)} className="p-8 bg-white rounded-[2.5rem] border border-slate-300 text-right group hover:border-amber-400">
                      <h3 className="text-xl font-black mb-2">חנות הניצחונות</h3>
                      <p className="text-[10px] text-slate-500 italic">מימוש נקודות ריבונות</p>
                    </button>
                    <button onClick={() => setActiveIdentity(AppRole.MEDICAL_RECORDS)} className="p-8 bg-white rounded-[2.5rem] border border-slate-300 text-right group hover:border-emerald-400">
                      <h3 className="text-xl font-black mb-2">התיק הרפואי שלי</h3>
                      <p className="text-[10px] text-slate-500 italic">שקיפות ופענוח מסמכים</p>
                    </button>
                  </>
                )}
                {activePortal === 'staff' && (
                  <>
                    <button onClick={() => setActiveIdentity(AppRole.STAFF)} className="p-8 bg-slate-900 rounded-[2.5rem] text-right text-white shadow-2xl group hover:scale-[1.02] transition-all">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6"><Briefcase size={32} /></div>
                      <h3 className="text-2xl font-black italic">הזירה הקלינית</h3>
                      <p className="text-xs text-slate-400 font-medium italic mt-2">מעקב ADT, ROI וניהול מחלקה מלא</p>
                    </button>
                    <button onClick={() => setActiveIdentity(AppRole.MANAGEMENT)} className="p-8 bg-white rounded-[2.5rem] border border-slate-300 text-right group hover:border-slate-900">
                      <h3 className="text-xl font-black mb-2">דשבורד הנהלה</h3>
                      <p className="text-[10px] text-slate-500 italic">מדדי חפיר (Moat) ועלויות</p>
                    </button>
                    <button onClick={() => setActiveIdentity(AppRole.PHARMACY_LOOP)} className="p-8 bg-white rounded-[2.5rem] border border-slate-300 text-right group hover:border-emerald-600">
                      <h3 className="text-xl font-black mb-2">אימות נטילה (vDOT)</h3>
                      <p className="text-[10px] text-slate-500 italic">בקרת בטיחות תרופתית</p>
                    </button>
                    <button onClick={() => setActiveIdentity(AppRole.WARD_SELECTION)} className="p-8 bg-white rounded-[2.5rem] border border-slate-300 text-right group hover:border-indigo-600">
                      <h3 className="text-xl font-black mb-2">מעבר מחלקות</h3>
                      <p className="text-[10px] text-slate-500 italic">ניווט בין יחידות אשפוז</p>
                    </button>
                  </>
                )}
                {activePortal === 'family' && (
                  <>
                    <button onClick={() => setActiveIdentity(AppRole.VOLT_PARENT)} className="p-8 bg-emerald-600 rounded-[2.5rem] text-right text-white shadow-xl group hover:scale-[1.02] transition-all">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6"><Package size={32} /></div>
                      <h3 className="text-2xl font-black italic">ניהול אספקה (VoltKid)</h3>
                      <p className="text-xs text-emerald-100 font-medium italic mt-2">קבלת בקשות והזמנת ציוד ליקרים לכם</p>
                    </button>
                    <button onClick={() => setActiveIdentity(AppRole.CAREGIVER)} className="p-8 bg-white rounded-[2.5rem] border border-slate-300 text-right group hover:border-rose-400">
                      <h3 className="text-xl font-black mb-2">פורטל הורים</h3>
                      <p className="text-[10px] text-slate-500 italic">עדכונים קליניים ותמיכה</p>
                    </button>
                    <button onClick={() => setActivePortal('patient')} className="p-8 bg-white rounded-[2.5rem] border border-slate-300 text-right group hover:border-blue-400">
                      <h3 className="text-xl font-black mb-2 text-blue-600">גשר התחושות</h3>
                      <p className="text-[10px] text-slate-500 italic">חיבור פיזי מרחוק (Haptic Sync)</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Menu / Launcher - Secondary Modules */}
        <section className="w-full max-w-7xl px-8 py-24 space-y-16">
          <div className="text-right">
            <h2 className="text-4xl font-black italic tracking-tighter text-[#1e3a8a]">מודולי "הכרטיס לחופש"</h2>
            <p className="text-slate-500 font-bold text-lg italic mt-2">גישה לכל רכיבי המערכת המבצעיים.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECONDARY_MODULES.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveIdentity(item.id)}
                className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 text-right overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-black mb-2 tracking-tighter text-[#1e3a8a]">{item.title}</h3>
                <p className="text-slate-500 text-[10px] font-medium leading-relaxed italic mb-6">{item.desc}</p>
                <div className="flex items-center gap-2 text-blue-600 font-black text-[9px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all">
                  כניסה למודול <ChevronLeft size={12} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Institutional Footer */}
        <footer className="w-full py-20 px-8 border-t border-slate-200 bg-white text-center">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <h2 className="text-4xl font-black italic tracking-tighter text-[#1e3a8a]">שלוותה <span className="text-blue-600 font-light italic">OS</span></h2>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
              <span className="flex items-center gap-2"><Building2 size={14} /> Clinic: Tel-Aviv Ichilov Node</span>
              <span className="flex items-center gap-2"><Cloud size={14} /> Architecture: AWS Hybrid Cloud</span>
              <span className="flex items-center gap-2"><Zap size={14} /> Engine: Gemini 2.5 Flash Native</span>
            </div>
            <p className="text-slate-400 text-xs italic font-bold">© 2026 Shalvata Consciousness OS. All rights reserved.</p>
          </div>
        </footer>

        {showVerifier && <MedicationVerifier onClose={() => setShowVerifier(false)} />}
        {activeIdentity === AppRole.BOARDROOM && <AIBoardroom onBack={() => setActiveIdentity(null)} />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-assistant" dir="rtl">
      {renderContent()}
    </div>
  );
};

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
