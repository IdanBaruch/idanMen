import React, { useState, useEffect } from 'react';
import PatientApp from './components/PatientApp';
import RealityCheck from './components/RealityCheck';
import ZeroGSanctuary from './components/ZeroGSanctuary';
import VoiceProxy from './components/VoiceProxy';
import BioReactor from './components/BioReactor';
import AlchemistOrb from './components/AlchemistOrb';
import NurseRadar from './components/NurseRadar';
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
import PersonalityCompass from './components/PersonalityCompass';
import SovereigntyJoyApp from './components/SovereigntyJoyApp';
import WardSelection from './components/WardSelection';
import StaffEcosystem from './components/StaffEcosystem';
import ConsultationPortal from './components/ConsultationPortal';
import CyberGuardian from './components/CyberGuardian';
import EcoSystemMap from './components/EcoSystemMap';
import SymptomMap from './components/SymptomMap';
import StaffTerminal from './components/StaffTerminal';
import PsychologistPortal from './components/PsychologistPortal';
import OTPortal from './components/OTPortal';
import SocialWorkerPortal from './components/SocialWorkerPortal';
import DailyDigest from './components/DailyDigest';
import Homecoming from './components/Homecoming';
import AutoScribe from './components/AutoScribe';
import EmergencySupport from './components/EmergencySupport';
import HospitalAdminDashboard from './components/HospitalAdminDashboard';
import AIBoardroom from './components/AIBoardroom';
import AdaptiveWorkspace from './components/AdaptiveWorkspace';
import WardSchedule from './components/WardSchedule';
import SovereignLedger from './components/SovereignLedger';
import SovereignBrief from './components/SovereignBrief';
import MedicalVault from './components/MedicalVault';
import ResilienceLedger from './components/ResilienceLedger';
import AdaptiveFlow from './components/AdaptiveFlow';
import DailyFuel from './components/DailyFuel';
import SonicAnchor from './components/SonicAnchor';
import EnergyManager from './components/EnergyManager';
import NeuroGrowth from './components/NeuroGrowth';
import { SettingsProvider, useSettings } from '../contexts/SettingsContext';
import { AppRole, AppSettings, LedgerEntry } from './types';
import {
  Activity, Users, HeartHandshake, Waves,
  Stethoscope, ShieldCheck, PieChart, FlaskConical,
  Zap, LogOut, ChevronLeft, BarChart3, ShoppingBag, Flame,
  Scale, Soup, BookOpen, CigaretteOff, ShieldAlert, FileText,
  Clock, Heart, Shield, TrendingUp, Sun, Smile, UserCheck,
  CheckCircle, Pill, Star, Moon, ChevronDown, UserCircle2, Quote,
  Utensils, Building2, Cloud, PlayCircle, Layers, ArrowRight,
  ShieldX, GraduationCap, Calculator, Siren, Anchor, Wine,
  Package, Trophy, History, ClipboardList, Layout, Briefcase, Scan, Rocket, Mic, Brain, Radar, Settings, HelpCircle, Lock, Server, Check, PenTool, Sparkles, CheckCircle2, Calendar, Book, Hammer, Music, BatteryCharging
} from 'lucide-react';

type Persona = 'patient' | 'staff' | 'family';

interface ModuleItem {
  id: AppRole;
  title: string;
  desc: string;
  practical: string;
  cta: string;
  type: 'ai' | 'tool' | 'content';
  icon: React.ElementType;
  color: 'emergency' | 'daily' | 'rights' | 'primary';
  personas: Persona[];
  isCritical?: boolean;
}

const ALL_MODULES: ModuleItem[] = [
  { id: AppRole.SOVEREIGNTY_BRIDGE, title: 'מרחב נשימה', desc: 'המקום שלך להירגע כשעולה כעס או סערה.', practical: 'תרגילי נשימה והרפיה מותאמים אישית.', cta: 'אני צריך להירגע עכשיו', type: 'tool', icon: Siren, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.COMPASSION_MIRROR, title: 'חיזוק פנימי', desc: 'להזכיר לעצמי את הכוחות שלי ולהרגיש טוב.', practical: 'הצהרות חיוביות וחיזוק הערך העצמי.', cta: 'תחזק אותי', type: 'tool', icon: HeartHandshake, color: 'emergency', personas: ['patient', 'family'], isCritical: true },
  { id: AppRole.DE_ESCALATION, title: 'עצור וקח נשימה', desc: 'עוזר לי לעצור רגע לפני שאני מאבד שליטה.', practical: 'טכניקות לעצירה ומניעת התפרצות.', cta: 'אני מרגיש עומס', type: 'tool', icon: Zap, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.BIO_REACTOR, title: 'תדלוק מנועים', desc: 'בודק שהגוף והמנוע הקוגניטיבי שלך מסונכרנים היום.', practical: 'ניטור דופק ודיווח על תדלוק (תרופות).', cta: 'בדוק מדדי כוח', type: 'tool', icon: Activity, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.NURSE_RADAR, title: 'מוקד הצוות', desc: 'כלי לצוות לזיהוי ריבונים שזקוקים לתמיכה מיידית.', practical: 'תעדוף קליני מבוסס נתונים.', cta: 'פתח מוקד ניטור', type: 'tool', icon: Radar, color: 'emergency', personas: ['staff'], isCritical: true },
  { id: AppRole.ALCHEMIST_ORB, title: 'עוזר אישי חכם', desc: 'בינה מלאכותית שזוכרת מה עזר לך בעבר ומציעה פתרונות.', practical: 'ניתוח מגמות אישיות והמלצות יומיות.', cta: 'שאל את העוזר', type: 'ai', icon: Brain, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.LITTLE_PRINCE, title: 'היום המוצלח שלי', desc: 'עוזר לייצר סדר יום רגוע ובטוח.', practical: 'ניהול משימות יומיות עם תזכורות.', cta: 'תכנן לי את היום', type: 'tool', icon: Clock, color: 'daily', personas: ['patient'] },
  { id: AppRole.REWARDS, title: 'בונוס הצלחה', desc: 'קבלת נקודות ופרסים על התמדה בתהליך.', practical: 'מערכת תגמולים על עמידה במשימות.', cta: 'ראה מתנות', type: 'tool', icon: Trophy, color: 'daily', personas: ['patient'] },
  { id: AppRole.COURSES, title: 'ספריית כוחות', desc: 'תכנים מעשירים ומחזקים שעוזרים להחלמה.', practical: 'סדנאות וידאו ושמע קצרות.', cta: 'בוא נלמד', type: 'content', icon: GraduationCap, color: 'daily', personas: ['patient'] },
  { id: AppRole.FINANCIAL_SHIELD, title: 'שומר הארנק', desc: 'הגנה על הכסף שלך בזמנים של חוסר יציבות.', practical: 'מניעת רכישות חריגות וניהול תקציב.', cta: 'נהל תקציב', type: 'tool', icon: Shield, color: 'daily', personas: ['patient'] },
  { id: AppRole.PHARMACY_LOOP, title: 'ניהול תדלוק', desc: 'תזכורות חכמות לנטילת תרופות ודיווח תופעות לוואי.', practical: 'סנכרון מלא עם התיק הרפואי.', cta: 'עדכן נטילה', type: 'tool', icon: Pill, color: 'daily', personas: ['patient', 'staff'] },
  { id: AppRole.REALITY_CHECK, title: 'הבית הבטוח', desc: 'הדרכה ויזואלית לווידוא שהסביבה מסביבי בטוחה.', practical: 'צקליסט בטיחות לחדר ולבית.', cta: 'בדוק סביבה', type: 'tool', icon: Scan, color: 'daily', personas: ['patient'] },
  { id: AppRole.ZERO_G, title: 'מרחב מנוחה', desc: 'חוויה ויזואלית מרגיעה לשחרור עומס מחשבתי.', practical: 'טכניקות ויזואליזציה נגד דיכאון.', cta: 'כנס לנוח', type: 'content', icon: Rocket, color: 'daily', personas: ['patient'] },
  { id: AppRole.SPIRITUAL_SUPPORT, title: 'לב אל לב AI', desc: 'שיח אמפתי שמחזק את הנשמה דרך אמונה.', practical: 'ייעוץ רגשי רוחני מבוסס בינה מלאכותית.', cta: 'בוא נדבר', type: 'ai', icon: BookOpen, color: 'daily', personas: ['patient'] },
  { id: AppRole.ADAPTIVE_WORKSPACE, title: 'המעסיק המכיל', desc: 'סביבת עבודה תומכת שמתאימה את עצמה למצבך היומי.', practical: 'ניהול משימות תעסוקתיות ותגמול כספי.', cta: 'כנס לעבוד', type: 'tool', icon: Briefcase, color: 'daily', personas: ['patient', 'staff', 'family'], isCritical: true },
  { id: AppRole.MEDICAL_VAULT, title: 'כספת המרפא', desc: 'ניהול מקורות ידע וניתוח קליני מבוסס מקורות.', practical: 'העלאת מסמכים וצ\'אט עם האנליסט המלווה.', cta: 'פתח כספת', type: 'tool', icon: FileText, color: 'rights', personas: ['patient'], isCritical: true },
  { id: AppRole.RIGHTS_BOT, title: 'מימוש זכויות', desc: 'עוזר לך לקבל את מה שמגיע לך מהמדינה.', practical: 'בדיקת זכאות לסל שיקום וקצבאות.', cta: 'בדוק זכויות', type: 'tool', icon: Scale, color: 'rights', personas: ['patient'] },
  { id: AppRole.CONSULTATION, title: 'החלטות משותפות', desc: 'להבין ביחד עם הרופאים את תוכנית הטיפול.', practical: 'פורטל שקיפות בין הריבון לרופא.', cta: 'פתח תוכנית', type: 'tool', icon: ClipboardList, color: 'rights', personas: ['patient', 'staff'] },
  { id: AppRole.SOVEREIGN_BRIEF, title: 'התדרוך הריבוני', desc: 'תמונת מצב יומית מבוססת Bio-Sync לניהול המציאות.', practical: 'מעקב שינה, תרופות ומשימה יומית.', cta: 'קבל תדרוך', type: 'ai', icon: Sparkles, color: 'primary', personas: ['patient'], isCritical: true },
  { id: AppRole.MANAGEMENT, title: 'בקרה מחלקתית', desc: 'שיפור הטיפול דרך הבנת המדדים המרכזיים.', practical: 'דו"ח התקדמות לניהול המחלקה.', cta: 'ראה מדדים', type: 'tool', icon: TrendingUp, color: 'rights', personas: ['staff'] },
  { id: AppRole.SOVEREIGN_LEDGER, title: 'ספר הניצחונות', desc: 'הפיכת הדיווח היומי לסיפור הצלחה ריבוני.', practical: 'תיעוד ניצחונות ורפלקציה.', cta: 'פתח את הספר', type: 'ai', icon: Book, color: 'daily', personas: ['patient'], isCritical: true },
  { id: AppRole.HOMECOMING, title: 'עוגן אמוני', desc: 'חיזוק הקשר לכוחות הטוב ולבורא דרך אמונה.', practical: 'תפילות וחיזוקים יומיים.', cta: 'מצא עוגן', type: 'ai', icon: Anchor, color: 'daily', personas: ['patient'] },
  { id: AppRole.PERSONALITY_COMPASS, title: 'מצפן האישיות', desc: 'כיול המנוע הרגשי ותמונת מצב קלינית.', practical: 'אבחון עצמי מבוסס DSM-5.', cta: 'התחל כיול', type: 'ai', icon: Radar, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.WARD_SCHEDULE, title: 'תכנית מבצעית', desc: 'לו"ז קבוצות, ביקורי רופאים ותפריט תזונה.', practical: 'מעקב אחר סדר היום במחלקה.', cta: 'צפה בלו"ז', type: 'tool', icon: Calendar, color: 'primary', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.RESILIENCE_LEDGER, title: 'יומן החוסן', desc: 'מעקב אחר יצירה במלאכה ופעילות גופנית מווסתת.', practical: 'תיעוד נגרייה ואימון מותאם לתדר.', cta: 'הראה לי את החוסן', type: 'tool', icon: Hammer, color: 'daily', personas: ['patient'], isCritical: true },
  { id: AppRole.ADAPTIVE_FLOW, title: 'זרימה אדפטיבית', desc: 'ניהול זמן לא-ליניארי ותרגולי נשימה.', practical: 'סנכרון סדר היום לפי המצב הרגשי.', cta: 'בוא נזרום', type: 'tool', icon: Waves, color: 'emergency', personas: ['patient'], isCritical: true },
  { id: AppRole.ENERGY_MANAGER, title: 'מנהל אנרגיה', desc: 'שינה ושגרת בוקר ליציבות.', practical: 'מעקב שעות שינה + צ׳ק-ליסט בוקר.', cta: 'טען אותי', type: 'tool', icon: BatteryCharging, color: 'daily', personas: ['patient'], isCritical: true },
  { id: AppRole.EMERGENCY_SUPPORT, title: 'מרחב מגן (SOS)', desc: 'עזרה מיידית כשמשהו לא מרגיש בטוח.', practical: 'קריאה מהירה לער"ן, משטרה או צוות.', cta: 'אני מרגיש בסכנה', type: 'tool', icon: ShieldAlert, color: 'emergency', personas: ['patient'], isCritical: true },
];

const AppContent: React.FC = () => {
  const { hasOnboarded, completeOnboarding } = useSettings();
  const [activeIdentity, setActiveIdentity] = useState<AppRole | null>(null);
  const [activePersona, setActivePersona] = useState<Persona | null>(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [authenticatedRoles, setAuthenticatedRoles] = useState<AppRole[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasOnboarded) {
    return <PersonalityCompass onComplete={() => completeOnboarding()} />;
  }

  const renderActiveApp = () => {
    switch (activeIdentity) {
      case AppRole.PATIENT: return <PatientApp onNavigate={setActiveIdentity} userPoints={userPoints} onAddPoints={setUserPoints} />;
      case AppRole.LITTLE_PRINCE: return <LittlePrinceApp onBack={() => setActiveIdentity(null)} />;
      case AppRole.DE_ESCALATION: return <DeEscalation onComplete={() => setActiveIdentity(null)} />;
      case AppRole.EMERGENCY_SUPPORT: return <EmergencySupport onBack={() => setActiveIdentity(null)} />;
      case AppRole.ALCHEMIST_ORB: return <AlchemistOrb onBack={() => setActiveIdentity(null)} />;
      default: return null;
    }
  };

  if (activeIdentity) {
    return (
      <div className="relative min-h-screen font-assistant">
        <button onClick={() => setActiveIdentity(null)} className="fixed bottom-6 left-6 z-[9999] bg-indigo-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2">
          <LogOut size={20} /> <span className="text-xs font-black">חזרה</span>
        </button>
        {renderActiveApp()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center font-assistant" dir="rtl">
      <div className="fixed top-0 left-0 h-1 bg-indigo-600 z-[200]" style={{ width: `${scrollProgress}%` }} />

      <header className="w-full max-w-7xl px-8 pt-20 pb-16 text-center">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-slate-900 mb-6">
          הכרטיס <span className="text-indigo-600">לחופש.</span>
        </h1>
        <p className="text-2xl font-bold text-slate-500 max-w-2xl mx-auto italic">
          מערכת הפעלה דיגיטלית לניהול מסע החלמה נפשי.
        </p>

        <div className="flex justify-center gap-8 mt-16">
          {['patient', 'family', 'staff'].map((p) => (
            <button key={p} onClick={() => setActivePersona(p as Persona)} className={`p-8 rounded-[3rem] border-2 transition-all ${activePersona === p ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-white text-slate-900 border-slate-200'}`}>
              <span className="text-2xl font-black italic uppercase">{p}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="w-full max-w-7xl px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {ALL_MODULES.filter(m => !activePersona || m.personas.includes(activePersona)).map((item) => (
          <button key={item.id} onClick={() => setActiveIdentity(item.id)} className="bg-white border border-slate-200 rounded-[3rem] p-8 text-right hover:shadow-2xl transition-all flex flex-col justify-between h-[300px]">
            <div>
              <item.icon size={40} className="text-indigo-600 mb-6" />
              <h4 className="text-2xl font-black italic mb-2">{item.title}</h4>
              <p className="text-slate-500 text-sm font-bold">{item.desc}</p>
            </div>
            <span className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full text-xs font-black uppercase self-start">{item.cta}</span>
          </button>
        ))}
      </main>
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