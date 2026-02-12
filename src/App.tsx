
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
  // --- Emergency / Clinical ---
  { id: AppRole.SOVEREIGNTY_BRIDGE, title: 'מרחב נשימה', desc: 'המקום שלך להירגע כשעולה כעס או סערה.', practical: 'תרגילי נשימה והרפיה מותאמים אישית.', cta: 'אני צריך להירגע עכשיו', type: 'tool', icon: Siren, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.COMPASSION_MIRROR, title: 'חיזוק פנימי', desc: 'להזכיר לעצמי את הכוחות שלי ולהרגיש טוב.', practical: 'הצהרות חיוביות וחיזוק הערך העצמי.', cta: 'תחזק אותי', type: 'tool', icon: HeartHandshake, color: 'emergency', personas: ['patient', 'family'], isCritical: true },
  { id: AppRole.DE_ESCALATION, title: 'עצור וקח נשימה', desc: 'עוזר לי לעצור רגע לפני שאני מאבד שליטה.', practical: 'טכניקות לעצירה ומניעת התפרצות.', cta: 'אני מרגיש עומס', type: 'tool', icon: Zap, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.BIO_REACTOR, title: 'תדלוק מנועים', desc: 'בודק שהגוף והמנוע הקוגניטיבי שלך מסונכרנים היום.', practical: 'ניטור דופק ודיווח על תדלוק (תרופות).', cta: 'בדוק מדדי כוח', type: 'tool', icon: Activity, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.NURSE_RADAR, title: 'מוקד הצוות', desc: 'כלי לצוות לזיהוי ריבונים שזקוקים לתמיכה מיידית.', practical: 'תעדוף קליני מבוסס נתונים.', cta: 'פתח מוקד ניטור', type: 'tool', icon: Radar, color: 'emergency', personas: ['staff'], isCritical: true },
  { id: AppRole.ALCHEMIST_ORB, title: 'עוזר אישי חכם', desc: 'בינה מלאכותית שזוכרת מה עזר לך בעבר ומציעה פתרונות.', practical: 'ניתוח מגמות אישיות והמלצות יומיות.', cta: 'שאל את העוזר', type: 'ai', icon: Brain, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },

  // --- Daily Life / Meds ---
  { id: AppRole.LITTLE_PRINCE, title: 'היום המוצלח שלי', desc: 'עוזר לייצר סדר יום רגוע ובטוח.', practical: 'ניהול משימות יומיות עם תזכורות.', cta: 'תכנן לי את היום', type: 'tool', icon: Clock, color: 'daily', personas: ['patient'] },
  { id: AppRole.REWARDS, title: 'בונוס הצלחה', desc: 'קבלת נקודות ופרסים על התמדה בתהליך.', practical: 'מערכת תגמולים על עמידה במשימות.', cta: 'ראה מתנות', type: 'tool', icon: Trophy, color: 'daily', personas: ['patient'] },
  { id: AppRole.COURSES, title: 'ספריית כוחות', desc: 'תכנים מעשירים ומחזקים שעוזרים להחלמה.', practical: 'סדנאות וידאו ושמע קצרות.', cta: 'בוא נלמד', type: 'content', icon: GraduationCap, color: 'daily', personas: ['patient'] },
  { id: AppRole.FINANCIAL_SHIELD, title: 'שומר הארנק', desc: 'הגנה על הכסף שלך בזמנים של חוסר יציבות.', practical: 'מניעת רכישות חריגות וניהול תקציב.', cta: 'נהל תקציב', type: 'tool', icon: Shield, color: 'daily', personas: ['patient'] },
  { id: AppRole.PHARMACY_LOOP, title: 'ניהול תדלוק', desc: 'תזכורות חכמות לנטילת תרופות ודיווח תופעות לוואי.', practical: 'סנכרון מלא עם התיק הרפואי.', cta: 'עדכן נטילה', type: 'tool', icon: Pill, color: 'daily', personas: ['patient', 'staff'] },
  { id: AppRole.REALITY_CHECK, title: 'הבית הבטוח', desc: 'הדרכה ויזואלית לווידוא שהסביבה מסביבי בטוחה.', practical: 'צקליסט בטיחות לחדר ולבית.', cta: 'בדוק סביבה', type: 'tool', icon: Scan, color: 'daily', personas: ['patient'] },
  { id: AppRole.ZERO_G, title: 'מרחב מנוחה', desc: 'חוויה ויזואלית מרגיעה לשחרור עומס מחשבתי.', practical: 'טכניקות ויזואליזציה נגד דיכאון.', cta: 'כנס לנוח', type: 'content', icon: Rocket, color: 'daily', personas: ['patient'] },
  { id: AppRole.SPIRITUAL_SUPPORT, title: 'לב אל לב AI', desc: 'שיח אמפתי שמחזק את הנשמה דרך אמונה.', practical: 'ייעוץ רגשי רוחני מבוסס בינה מלאכותית.', cta: 'בוא נדבר', type: 'ai', icon: BookOpen, color: 'daily', personas: ['patient'] },
  { id: AppRole.ADAPTIVE_WORKSPACE, title: 'המעסיק המכיל', desc: 'סביבת עבודה תומכת שמתאימה את עצמה למצבך היומי.', practical: 'ניהול משימות תעסוקתיות ותגמול כספי.', cta: 'כנס לעבוד', type: 'tool', icon: Briefcase, color: 'daily', personas: ['patient', 'staff', 'family'], isCritical: true },

  // --- Rights / Bureaucracy ---
  { id: AppRole.MEDICAL_VAULT, title: 'כספת המרפא', desc: 'ניהול מקורות ידע וניתוח קליני מבוסס מקורות.', practical: 'העלאת מסמכים וצ\'אט עם האנליסט המלווה.', cta: 'פתח כספת', type: 'tool', icon: FileText, color: 'rights', personas: ['patient'], isCritical: true },
  { id: AppRole.RIGHTS_BOT, title: 'מימוש זכויות', desc: 'עוזר לך לקבל את מה שמגיע לך מהמדינה.', practical: 'בדיקת זכאות לסל שיקום וקצבאות.', cta: 'בדוק זכויות', type: 'tool', icon: Scale, color: 'rights', personas: ['patient'] },
  { id: AppRole.CONSULTATION, title: 'החלטות משותפות', desc: 'להבין ביחד עם הרופאים את תוכנית הטיפול.', practical: 'פורטל שקיפות בין הריבון לרופא.', cta: 'פתח תוכנית', type: 'tool', icon: ClipboardList, color: 'rights', personas: ['patient', 'staff'] },
  { id: AppRole.SOVEREIGN_BRIEF, title: 'התדרוך הריבוני', desc: 'תמונת מצב יומית מבוססת Bio-Sync לניהול המציאות.', practical: 'מעקב שינה, תרופות ומשימה יומית.', cta: 'קבל תדרוך', type: 'ai', icon: Sparkles, color: 'primary', personas: ['patient'], isCritical: true },
  { id: AppRole.MANAGEMENT, title: 'בקרה מחלקתית', desc: 'שיפור הטיפול דרך הבנת המדדים המרכזיים.', practical: 'דו"ח התקדמות לניהול המחלקה.', cta: 'ראה מדדים', type: 'tool', icon: TrendingUp, color: 'rights', personas: ['staff'] },

  // --- Extras ---
  { id: AppRole.SOVEREIGN_LEDGER, title: 'ספר הניצחונות', desc: 'הפיכת הדיווח היומי לסיפור הצלחה ריבוני.', practical: 'תיעוד ניצחונות ורפלקציה.', cta: 'פתח את הספר', type: 'ai', icon: Book, color: 'daily', personas: ['patient'], isCritical: true },
  { id: AppRole.HOMECOMING, title: 'עוגן אמוני', desc: 'חיזוק הקשר לכוחות הטוב ולבורא דרך אמונה.', practical: 'תפילות וחיזוקים יומיים.', cta: 'מצא עוגן', type: 'ai', icon: Anchor, color: 'daily', personas: ['patient'] },
  { id: AppRole.PERSONALITY_COMPASS, title: 'מצפן האישיות', desc: 'כיול המנוע הרגשי ותמונת מצב קלינית.', practical: 'אבחון עצמי מבוסס DSM-5.', cta: 'התחל כיול', type: 'ai', icon: Radar, color: 'emergency', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.WARD_SCHEDULE, title: 'תכנית מבצעית', desc: 'לו"ז קבוצות, ביקורי רופאים ותפריט תזונה.', practical: 'מעקב אחר סדר היום במחלקה.', cta: 'צפה בלו"ז', type: 'tool', icon: Calendar, color: 'primary', personas: ['patient', 'staff'], isCritical: true },
  { id: AppRole.RESILIENCE_LEDGER, title: 'יומן החוסן', desc: 'מעקב אחר יצירה במלאכה ופעילות גופנית מווסתת.', practical: 'תיעוד נגרייה ואימון מותאם לתדר.', cta: 'הראה לי את החוסן', type: 'tool', icon: Hammer, color: 'daily', personas: ['patient'], isCritical: true },
  { id: AppRole.ADAPTIVE_FLOW, title: 'זרימה אדפטיבית', desc: 'ניהול זמן לא-ליניארי ותרגולי נשימה.', practical: 'סנכרון סדר היום לפי המצב הרגשי.', cta: 'בוא נזרום', type: 'tool', icon: Waves, color: 'emergency', personas: ['patient'], isCritical: true },
  { id: AppRole.DAILY_FUEL, title: 'דלק יומי', desc: 'השראה וחוכמה מספרי ההשראה הגדולים.', practical: 'מסר יומי + 50 סיכומי ספרים ב-5 דקות.', cta: 'תן לי דחיפה', type: 'content', icon: Sparkles, color: 'daily', personas: ['patient'], isCritical: false },
  { id: AppRole.SONIC_ANCHOR, title: 'עוגן סוני', desc: 'מוזיקה וצלילים לויסות רגשי.', practical: 'תדרים בינאורליים, רעש לבן, מוזיקת יוגה.', cta: 'הרגע אותי', type: 'tool', icon: Music, color: 'daily', personas: ['patient'], isCritical: false },
  { id: AppRole.ENERGY_MANAGER, title: 'מנהל אנרגיה', desc: 'שינה ושגרת בוקר ליציבות.', practical: 'מעקב שעות שינה + צ׳ק-ליסט בוקר.', cta: 'טען אותי', type: 'tool', icon: BatteryCharging, color: 'daily', personas: ['patient'], isCritical: true },
  { id: AppRole.NEURO_GROWTH, title: 'נוירון יומי', desc: 'ביס של ידע כל יום.', practical: 'עובדה אחת חדשה ב-2 דקות.', cta: 'תן לי ידע', type: 'content', icon: Brain, color: 'daily', personas: ['patient'], isCritical: false },
  { id: AppRole.EMERGENCY_SUPPORT, title: 'מרחב מגן (SOS)', desc: 'עזרה מיידית כשמשהו לא מרגיש בטוח.', practical: 'קריאה מהירה לער"ן, משטרה או צוות.', cta: 'אני מרגיש בסכנה', type: 'tool', icon: ShieldAlert, color: 'emergency', personas: ['patient'], isCritical: true },
];

const CATEGORIES = [
  { id: 'emergency', title: 'טיפול וחירום בזמן אמת', color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 'daily', title: 'ניהול יום-יום ושגרה', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'rights', title: 'זכויות, מסמכים וניהול', color: 'text-slate-600', bg: 'bg-slate-50' },
];

const AppContent: React.FC = () => {
  const { hasOnboarded, completeOnboarding } = useSettings();
  const [activeIdentity, setActiveIdentity] = useState<AppRole | null>(null);
  const [activePersona, setActivePersona] = useState<Persona | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);
  const [authenticatedRoles, setAuthenticatedRoles] = useState<AppRole[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(() => {
    const saved = localStorage.getItem('sovereign_ledger');
    return saved ? JSON.parse(saved) : [];
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stats, setStats] = useState({ patients: 0, cases: 0, happiness: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);

    // Mock Business Logic for Hybrid Model
    const userSourceIdentified = 'hospital'; // or 'direct'
    if (userSourceIdentified === 'hospital') {
      // In a real app, logic to auto-load HospitalPatientFlow
    }

    // Animate stats when selected persona
    if (activePersona) {
      const interval = setInterval(() => {
        setStats(prev => ({
          patients: Math.min(prev.patients + 45, 12450),
          cases: Math.min(prev.cases + 12, 3840),
          happiness: Math.min(prev.happiness + 1, 98)
        }));
      }, 50);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(interval);
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePersona]);

  useEffect(() => {
    if (!activePersona) {
      // Auto-scroll to persona selector if none selected
    }
  }, [activePersona]);

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
  };

  const addPoints = (amount: number) => {
    setUserPoints(prev => prev + amount);
  };

  const settings: AppSettings = {
    userName: 'הריבון',
    theme: 'light',
    notifications: true,
    soundEnabled: true
  };

  if (!hasOnboarded) {
    return <PersonalityCompass onComplete={() => completeOnboarding()} />;
  }

  const renderActiveApp = () => {
    switch (activeIdentity) {
      case AppRole.PITCH: return <PitchDeck onStart={() => setActiveIdentity(null)} />;
      case AppRole.PATIENT: return <PatientApp settings={settings} onNavigate={setActiveIdentity} userPoints={userPoints} onAddPoints={addPoints} />;
      case AppRole.ER_PATIENT: return <PatientERApp userPoints={userPoints} onAddPoints={addPoints} />;
      case AppRole.STAFF: return <StaffEcosystem onBack={() => setActiveIdentity(null)} onSelect={(role) => setActiveIdentity(role)} />;
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
      case AppRole.MEDICAL_VAULT:
        return <MedicalVault onBack={() => setActiveIdentity(null)} />;
      case AppRole.RESILIENCE_LEDGER:
        return <ResilienceLedger onBack={() => setActiveIdentity(null)} />;
      case AppRole.ADAPTIVE_FLOW:
        return <AdaptiveFlow onBack={() => setActiveIdentity(null)} />;
      case AppRole.DAILY_FUEL:
        return <DailyFuel onBack={() => setActiveIdentity(null)} />;
      case AppRole.SONIC_ANCHOR:
        return <SonicAnchor onBack={() => setActiveIdentity(null)} />;
      case AppRole.ENERGY_MANAGER:
        return <EnergyManager onBack={() => setActiveIdentity(null)} />;
      case AppRole.NEURO_GROWTH:
        return <NeuroGrowth onBack={() => setActiveIdentity(null)} />;
      case AppRole.SOVEREIGNTY_JOY: return <SovereigntyJoyApp onBack={() => setActiveIdentity(null)} userPoints={userPoints} onAddPoints={addPoints} />;
      case AppRole.CONSULTATION:
        return authenticatedRoles.includes(AppRole.CONSULTATION) ? (
          <ConsultationPortal onBack={() => setActiveIdentity(null)} onAddPoints={addPoints} />
        ) : (
          <CyberGuardian
            label="פורטל החלטות מומחים"
            onUnlock={() => setAuthenticatedRoles(prev => [...prev, AppRole.CONSULTATION])}
          />
        );
      case AppRole.CEO: return <HospitalAdminDashboard onBack={() => setActiveIdentity(AppRole.STAFF)} />;
      case AppRole.PSYCHOLOGIST: return <PsychologistPortal onBack={() => setActiveIdentity(AppRole.STAFF)} onAddEntry={(c) => addLedgerEntry('psychologist', c)} />;
      case AppRole.OCCUPATIONAL_THERAPIST: return <OTPortal onBack={() => setActiveIdentity(AppRole.STAFF)} onAddEntry={(c) => addLedgerEntry('ot', c)} />;
      case AppRole.SOCIAL_WORKER_PORTAL: return <SocialWorkerPortal onBack={() => setActiveIdentity(AppRole.STAFF)} onAddEntry={(c) => addLedgerEntry('social_worker', c)} />;
      case AppRole.WARD_SELECTION: return <WardSelection onSelect={(ward) => { setActiveIdentity(null); }} />;
      case AppRole.DIGEST: return <DailyDigest entries={ledgerEntries} onBack={() => setActiveIdentity(null)} />;
      case AppRole.INTAKE: return <IntakeQuestionnaire onComplete={() => { addPoints(100); setActiveIdentity(AppRole.ER_PATIENT); }} />;
      case AppRole.PHARMACY_LOOP: return <PharmacyLoopScreen onComplete={() => { addPoints(50); setActiveIdentity(AppRole.PATIENT); }} />;
      case AppRole.REALITY_CHECK: return <RealityCheck onBack={() => setActiveIdentity(null)} />;
      case AppRole.ZERO_G: return <ZeroGSanctuary onBack={() => setActiveIdentity(null)} />;
      case AppRole.VOICE_PROXY: return <VoiceProxy onBack={() => setActiveIdentity(null)} />;
      case AppRole.BIO_REACTOR: return <BioReactor onBack={() => setActiveIdentity(null)} onComplete={(p) => addPoints(p)} />;
      case AppRole.ALCHEMIST_ORB: return <AlchemistOrb onBack={() => setActiveIdentity(null)} />;
      case AppRole.HOMECOMING: return <Homecoming onBack={() => setActiveIdentity(null)} />;
      case AppRole.AUTO_SCRIBE: return <AutoScribe onBack={() => setActiveIdentity(null)} />;
      case AppRole.SOVEREIGN_LEDGER: return <SovereignLedger onBack={() => setActiveIdentity(null)} />;
      case AppRole.SOVEREIGN_BRIEF: return <SovereignBrief onBack={() => setActiveIdentity(null)} />;
      case AppRole.EMERGENCY_SUPPORT: return <EmergencySupport onBack={() => setActiveIdentity(null)} />;
      case AppRole.PERSONALITY_COMPASS: return <PersonalityCompass onComplete={() => setActiveIdentity(null)} />;
      case AppRole.WARD_SCHEDULE: return <WardSchedule onBack={() => setActiveIdentity(null)} />;
      case AppRole.NURSE_RADAR: return <NurseRadar onBack={() => setActiveIdentity(null)} />;
      case AppRole.SYMPTOM_MAP: return <SymptomMap onBack={() => setActiveIdentity(null)} />;
      case AppRole.BOARDROOM: return <AIBoardroom onBack={() => setActiveIdentity(null)} />;
      case AppRole.ADAPTIVE_WORKSPACE: return <AdaptiveWorkspace onBack={() => setActiveIdentity(null)} userPoints={userPoints} onAddPoints={addPoints} />;
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
          <EcoSystemMap onSelect={(p) => { setActivePersona(p); setShowMap(false); }} />
        </div>
      );
    }

    const filteredModules = activePersona
      ? ALL_MODULES.filter(m => m.personas.includes(activePersona))
      : ALL_MODULES;

    const criticalModules = filteredModules.filter(m => m.isCritical);
    const regularModules = filteredModules.filter(m => !m.isCritical);

    const getModuleColor = (color: string) => {
      switch (color) {
        case 'emergency': return 'from-rose-600 to-orange-500';
        case 'daily': return 'from-indigo-600 to-blue-500';
        case 'rights': return 'from-slate-700 to-slate-500';
        default: return 'from-slate-400 to-slate-600';
      }
    };

    return (
      <div className="min-h-screen bg-slate-50 text-[#1e293b] flex flex-col items-center font-assistant overflow-x-hidden relative scroll-smooth selection:bg-indigo-100 selection:text-indigo-900" dir="rtl">

        {/* Scroll Progress Bar */}
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-rose-500 z-[200] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Chameleon Top Utility Bar */}
        <nav className="w-full bg-slate-900 text-white py-3 px-4 sm:px-8 flex justify-between items-center text-[10px] font-black sticky top-0 z-[100] shadow-xl" aria-label="סרגל כלים מהיר">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-2 text-indigo-400 tracking-tighter"><Layers size={14} aria-hidden="true" /> <span className="hidden sm:inline">Emuna 2.0 |</span> Reality-OS</span>
            <span className="opacity-20 hidden sm:inline">|</span>
            <div className="hidden md:flex gap-4 text-slate-400">
              <span className="flex items-center gap-1 font-bold">שרתים: מחוברים</span>
              <span className="flex items-center gap-1 font-bold">פרטיות: מאובטחת</span>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-6 items-center">
            <button
              onClick={() => setActiveIdentity(AppRole.EMERGENCY_SUPPORT)}
              className="bg-rose-600 hover:bg-rose-700 focus:ring-4 focus:ring-rose-500/50 text-white px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-2 animate-pulse shadow-lg font-black uppercase tracking-widest text-[8px] sm:text-[9px] transition-all outline-none"
              aria-label="קריאת מצוקה מיידית"
            >
              <Siren size={14} aria-hidden="true" /> <span className="hidden xs:inline">מצוקה -</span> SOS
            </button>
            <span className="opacity-20 hidden xs:inline">|</span>
            <button
              onClick={() => setActiveIdentity(AppRole.PITCH)}
              className="text-amber-400 hover:brightness-125 focus:text-white transition-all flex items-center gap-2 font-bold italic text-[8px] sm:text-xs outline-none"
              aria-label="שמיעת חזון המערכת"
            >
              <PlayCircle size={12} aria-hidden="true" /> <span className="hidden sm:inline">שמע את</span> חזון המערכת
            </button>
          </div>
        </nav>

        {/* Dynamic Persona Hero */}
        <header className="w-full max-w-7xl px-8 pt-16 pb-16 flex flex-col items-center text-center relative">
          {/* Visual Feedback based on Persona */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] overflow-hidden pointer-events-none opacity-20 transition-all duration-1000">
            {activePersona === 'patient' && <div className="absolute inset-0 bg-gradient-radial from-indigo-500/40 to-transparent blur-[120px] animate-pulse" />}
            {activePersona === 'family' && <div className="absolute inset-0 bg-gradient-radial from-rose-500/40 to-transparent blur-[120px] animate-pulse" />}
            {activePersona === 'staff' && <div className="absolute inset-0 bg-gradient-radial from-slate-500/40 to-transparent blur-[120px] animate-pulse" />}
          </div>

          <div className="z-10 space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto px-6">
              <div className="inline-flex items-center gap-3 bg-white/50 border border-slate-200 px-6 py-2 rounded-full font-black text-[10px] tracking-[0.4em] uppercase text-indigo-600 mb-4 backdrop-blur-sm">
                <Sparkles size={14} className="animate-pulse" /> Sovereignty is the new care
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-slate-900 leading-[0.8]">
                {activePersona === 'patient' ? 'המסע שלך ' : 'הכרטיס '}
                <span className="text-indigo-600">לחופש.</span>
              </h1>
              <p className="text-2xl font-bold italic text-slate-500 max-w-2xl leading-relaxed">
                {activePersona === 'patient' && "מהיום אתה ריבון. לא עוד 'מטופל' פסיבי, אלא חלוץ שבונה את עתידו בקהילה תומכת ויצרנית."}
                {activePersona === 'family' && "הופכים את חוסר הוודאות לשקט נפשי. ליווי צמוד, דיווחים בזמן אמת וקשר שלא מתנתק."}
                {activePersona === 'staff' && "משנים את כללי המשחק הקליניים. ROI מוכח, הפחתת אשפוזים חוזרים ואינטגרציה מלאה."}
                {!activePersona && "מערכת הפעלה דיגיטלית לניהול מסע החלמה נפשי – ריבונים, צוות ומשפחות."}
              </p>

              <div className="flex flex-wrap justify-center gap-6 pt-8">
                <button
                  onClick={() => !activePersona && setActivePersona('patient')}
                  className="bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group"
                >
                  {activePersona ? 'התחל ניסיון חינם' : 'בוא נתחיל'} <ArrowRight size={24} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
                </button>
                <button className="bg-white border border-slate-200 text-slate-900 px-12 py-5 rounded-full font-black text-xl hover:bg-slate-50 transition-all flex items-center gap-4">
                  צפה בדמו (60 שנ') <PlayCircle size={24} className="text-indigo-600" />
                </button>
              </div>
            </div>

            {/* Persona Selector Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-24 bg-white/60 p-10 rounded-[4rem] border border-white backdrop-blur-xl shadow-[0_50px_100px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              {[
                { id: 'patient', title: 'אני ריבון', subtitle: 'שליטה ביומיום ובחירום', icon: UserCircle2, color: 'indigo', activeClass: 'bg-indigo-600 text-white shadow-2xl scale-105 ring-[12px] ring-indigo-50 border-indigo-400', iconColor: 'text-indigo-600' },
                { id: 'family', title: 'אני משפחה', subtitle: 'ליווי, שקט נפשי ודיווחים', icon: HeartHandshake, color: 'rose', activeClass: 'bg-rose-600 text-white shadow-2xl scale-105 ring-[12px] ring-rose-50 border-rose-400', iconColor: 'text-rose-600' },
                { id: 'staff', title: 'צוות קליני', subtitle: 'ניהול מחלקה ו-ROI מוכח', icon: Stethoscope, color: 'slate', activeClass: 'bg-slate-900 text-white shadow-2xl scale-105 ring-[12px] ring-slate-100 border-slate-400', iconColor: 'text-slate-900' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p.id as Persona)}
                  className={`relative p-12 rounded-[3.5rem] transition-all duration-700 flex flex-col items-center gap-4 group border
                    ${activePersona === p.id
                      ? p.activeClass
                      : 'bg-white/80 text-slate-900 border-white hover:border-indigo-200 hover:bg-white shadow-xl translate-y-2 hover:-translate-y-1'}`}
                >
                  <div className={`${activePersona === p.id ? 'bg-white/20 shadow-inner' : 'bg-slate-100'} w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg`}>
                    <p.icon size={48} className={activePersona === p.id ? 'text-white' : p.iconColor} />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-black italic">{p.title}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${activePersona === p.id ? 'text-white/60' : 'text-slate-400'}`}>{p.subtitle}</span>
                  </div>
                  {activePersona === p.id && (
                    <div className="absolute -top-3 right-8 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce-short">
                      <Check size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Investor Segment (Only on main landing or specific toggle) */}
        {!activePersona && (
          <section className="w-full max-w-7xl px-8 py-32 border-t border-slate-100 animate-in fade-in duration-1000">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 text-right">
                <div className="bg-rose-500/10 text-rose-500 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] w-fit italic">The Urgent Crisis</div>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-slate-900 leading-[0.8]">השוק בוער. <br /><span className="text-indigo-600 underline">הפתרון כאן.</span></h2>
                <p className="text-2xl text-slate-500 font-bold italic leading-relaxed">
                  מערכת בריאות הנפש קורסת. חוסר היעילות, האשפוזים החוזרים והבירוקרטיה יוצרים סבל אנושי וכלכלי חסר תקדים.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "$300B", desc: "עלות גלובלית שנתית של כשלי מערכת.", color: "rose" },
                    { title: "42%", desc: "שיעור אשפוז חוזר - דלת מסתובבת שחייבת להיעצר.", color: "rose" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl group hover:-translate-y-2 transition-all">
                      <div className="text-5xl font-black text-rose-500 mb-4 tracking-tighter">{item.title}</div>
                      <p className="text-sm font-bold text-slate-500 italic leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square rounded-[5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] group bg-indigo-950 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 rounded-full blur-[80px] animate-pulse opacity-60" />
                  <div className="absolute inset-4 bg-gradient-to-bl from-blue-400 to-indigo-600 rounded-full shadow-[0_0_120px_rgba(99,102,241,0.7)] animate-spin-slow border border-white/20" />
                  <div className="absolute inset-24 bg-slate-900/60 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center shadow-inner">
                    <div className="w-16 h-1.5 bg-white/30 rounded-full animate-bounce" />
                  </div>
                </div>
                <div className="absolute bottom-12 right-12 text-white text-right z-10 space-y-2">
                  <h4 className="text-3xl font-black italic tracking-tighter">Emuna 2.0</h4>
                  <p className="text-base font-bold opacity-70 italic">מערכת הפעלה למציאות חדשה.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Live Performance Stats */}
        {activePersona && (
          <section className="w-full max-w-7xl px-8 py-24 flex flex-wrap justify-center gap-16 md:gap-32 border-y border-slate-100 bg-slate-50/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 group">
              <div className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-2 font-assistant">Outcomes</div>
              <span className="text-6xl md:text-8xl font-black text-indigo-600 tracking-tightest group-hover:scale-110 transition-transform italic">-35%</span>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">אירועי חרדה ואי-שקט</span>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em] mb-2 font-assistant">Efficiency</div>
              <span className="text-6xl md:text-8xl font-black text-emerald-500 tracking-tightest group-hover:scale-110 transition-transform italic">2.5</span>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">ימי אשפוז שנחסכו</span>
            </div>
            <div className="flex flex-col items-center gap-4 group text-center">
              <div className="text-xs font-black text-rose-400 uppercase tracking-[0.4em] mb-2 font-assistant">Compliance</div>
              <span className="text-6xl md:text-8xl font-black text-rose-500 tracking-tightest group-hover:scale-110 transition-transform italic">100%</span>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">שקיפות וביטחון במידע</span>
            </div>
          </section>
        )}

        {/* Segmented Value Propositions */}
        {activePersona === 'family' && (
          <section className="w-full max-w-7xl px-8 py-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="text-center mb-24 space-y-6">
              <h3 className="text-5xl md:text-7xl font-black text-rose-600 italic tracking-tighter italic">אל תרגיש חסר אונים יותר.</h3>
              <p className="text-xl text-slate-500 font-bold italic max-w-2xl mx-auto leading-relaxed">דע בדיוק מה קורה עם אמא/אבא/בן/בת שלך ואיך אתה יכול לעזור באמת.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
              {/* Problem Side */}
              <div className="bg-rose-50 p-12 rounded-[4rem] border border-rose-100 space-y-8">
                <h4 className="text-2xl font-black text-rose-600 italic flex items-center gap-3">
                  <ShieldX size={28} /> הבעיות שאתה מכיר:
                </h4>
                <ul className="space-y-6">
                  {[
                    "לא יודע מה קורה שם בפנים",
                    "חושש שהוא לא לוקח תרופות בזמן",
                    "אף אחד לא מתקשר אלי מבית החולים",
                    "מרגיש שאין לי איך להשפיע על המצב"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 font-bold text-rose-900/60 italic text-lg leading-tight">
                      <span className="text-rose-500">❌</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Solution Side */}
              <div className="bg-emerald-50 p-12 rounded-[4rem] border border-emerald-100 space-y-8">
                <h4 className="text-2xl font-black text-emerald-600 italic flex items-center gap-3">
                  <ShieldCheck size={28} /> עם הכרטיס לחופש:
                </h4>
                <ul className="space-y-6">
                  {[
                    "דשבורד בזמן אמת: 'אבא דיווח שהוא מרגיש טוב'",
                    "התראות חכמות: 'לא נלקחה תרופה - תתקשר?'",
                    "מעקב היסטורי: 'בשבוע האחרון שיפור של 20%'",
                    "קשר ישיר: שלח חיזוקים והודעות לאדם יקר"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 font-bold text-emerald-900/60 italic text-lg leading-tight">
                      <span className="text-emerald-500">✅</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-2xl font-black flex items-center gap-2">MINISTRY <span className="text-rose-500">OF HEALTH</span></div>
            </div>

            {/* Economic Vision Section */}
            <div className="mt-32 bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-10" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 bg-indigo-500/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">The Macro Shift</div>
                  <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">עשייה במקום <br /><span className="text-indigo-400">אשפוז חוזר.</span></h3>
                  <p className="text-xl text-slate-400 font-bold italic leading-relaxed">
                    מדינת ישראל משלמת כ-30,000 ש"ח בחודש על אשפוז חוזר בגלל "וואקום שיקומי". במחצית מהשיעור הזה, אנחנו מייצרים למטופל מעטפת תעסוקתית מוגנת ששומרת עליו בחוץ.
                  </p>
                  <button className="bg-white text-slate-950 px-12 py-5 rounded-full font-black text-xl hover:bg-indigo-400 transition-all shadow-2xl">קרא את ה-Whitepaper הכלכלי</button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] flex justify-between items-center group/card hover:bg-white/10 transition-all">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-500 uppercase">Hospitalization Cost</p>
                      <p className="text-3xl font-black italic text-rose-500">₪30,000 <span className="text-sm opacity-50">/ month</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500"><ShieldX size={24} /></div>
                  </div>
                  <div className="flex justify-center -my-4 relative z-20">
                    <div className="bg-indigo-600 text-white px-6 py-2 rounded-full font-black text-sm shadow-xl">SAVINGS: 25,000 NIS</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] flex justify-between items-center group/card hover:bg-white/10 transition-all border-indigo-500/30">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-500 uppercase">Supported Employment (Reality OS)</p>
                      <p className="text-3xl font-black italic text-emerald-400">₪5,000 <span className="text-sm opacity-50">/ month</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400"><CheckCircle2 size={24} /></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Special SOS Highlight for Patients */}
        {activePersona === 'patient' && (
          <section className="w-full max-w-5xl px-8 py-16 -mt-12 mb-24 relative z-20">
            <div className="bg-rose-600 rounded-[4rem] p-12 text-white shadow-[0_50px_100px_rgba(225,29,72,0.3)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl group-hover:scale-110 transition-transform duration-[2000ms]" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                <div className="space-y-6 text-right">
                  <div className="inline-flex items-center gap-3 bg-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                    Diamonds are forever • Safety is first
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black italic leading-tight">מקום בטור - <br /><span className="text-amber-300 underline underline-offset-8">עזרה עכשיו.</span></h3>
                  <p className="text-xl font-bold opacity-90 italic leading-relaxed">
                    אני שומע שקשה לך עכשיו. הכפתור הזה הוא הקו הישיר שלך לביטחון. לחיצה אחת – ואנחנו כאן איתך.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button className="bg-white text-rose-600 px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl">
                      חבר אותי לעזרה מיידית
                    </button>
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20"><Siren size={20} /></div>
                      <span className="text-xs font-black uppercase tracking-widest">Emergency SOS</span>
                    </div>
                  </div>
                </div>
                <div className="aspect-square bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center group-hover:rotate-1 transition-transform">
                  <div className="w-48 h-48 bg-rose-500 rounded-full blur-[60px] animate-pulse opacity-50 absolute" />
                  <Siren size={120} className="text-white animate-bounce-short relative z-10" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Modules Grid */}
        {activePersona && (
          <main className="w-full max-w-7xl px-8 pb-32 space-y-24 animate-in fade-in slide-in-from-bottom duration-700">

            {/* Critical Tools First */}
            {criticalModules.length > 0 && (
              <div className="space-y-12">
                <div className="text-right border-r-4 border-indigo-600 pr-6">
                  <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">כלים קריטיים</h3>
                  <p className="text-slate-500 font-bold italic">הליבה המבצעית של הריבונות והטיפול.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {criticalModules.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveIdentity(item.id)}
                      className="group bg-white border border-slate-200 rounded-[3rem] p-8 text-right transition-all duration-500 hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-2 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getModuleColor(item.color)} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                          <item.icon size={30} className="text-white" />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 mb-2 italic tracking-tighter">{item.title}</h4>
                        <p className="text-slate-500 text-sm font-bold mb-4">{item.desc}</p>
                        <div className="bg-slate-50 p-4 rounded-2xl text-[11px] font-bold text-slate-600 italic leading-snug">
                          {item.practical}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-8">
                        <span className={`px-8 py-3 rounded-full font-black text-xs text-white shadow-lg transition-all ${getModuleColor(item.color)} hover:brightness-110`}>
                          {item.cta}
                        </span>
                        <HelpCircle size={18} className="text-slate-200 hover:text-indigo-400 cursor-help" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Supportive Tools */}
            {regularModules.length > 0 && (
              <div className="space-y-12">
                <div className="text-right border-r-4 border-slate-300 pr-6">
                  <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter opacity-70">כלים תומכים</h3>
                  <p className="text-slate-500 font-bold italic">פתרונות משלימים לניהול יומיום ומשמעות.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {regularModules.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveIdentity(item.id)}
                      className="group bg-white/50 border border-slate-200 rounded-[2.5rem] p-6 text-right transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-indigo-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getModuleColor(item.color)} flex items-center justify-center mb-4 shadow-md opacity-80 group-hover:opacity-100`}>
                          <item.icon size={24} className="text-white" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-1 italic tracking-tighter">{item.title}</h4>
                        <p className="text-slate-500 text-[11px] font-bold mb-4">{item.desc}</p>
                      </div>
                      <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-[-4px] transition-transform">
                        {item.cta} <ArrowRight size={12} className="rotate-180" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </main>
        )}

        {/* How it Works - Diagram Section */}
        <section className="w-full bg-[#050b18] py-32 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter italic">הדרך לשקט (The Journey to Calm)</h2>
              <p className="text-slate-400 font-bold text-lg max-w-2xl mx-auto italic leading-relaxed">
                אנחנו מזהים חוסר שקט לפני שהוא הופך לסערה, כדי שנוכל להיות שם בשבילך ברגע הנכון.
                <span className="block text-[10px] text-indigo-500/50 uppercase tracking-[0.3em] mt-2">TECHNICAL PROTOCOL: REALITY-FLOW v4.0</span>
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
                {[
                  { title: "הקשבה אישית", desc: "המערכת לומדת את הקצב הייחודי שלך.", icon: UserCircle2, tech: "PATIENT-EDGE-SOURCE" },
                  { title: "זיהוי מוקדם", desc: "מרגישים חוסר שקט לפני שהוא מתפרץ.", icon: Activity, tech: "BIOMETRIC-REACTION" },
                  { title: "בינה מבינה", desc: "ניתוח חכם של מה שעוזר לך ביותר.", icon: Brain, tech: "THE ORB - PREDICTIVE AI" },
                  { title: "ליווי היקפי", desc: "סנכרון מיידי בין כל מי שדואג לך.", icon: Radar, tech: "CENTRAL CONTROL TOWER" },
                  { title: "עזרה בזמן", desc: "מתן מענה מדויק שמונע משבר.", icon: Users, tech: "CLINICAL INTERVENTION" }
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-6 group relative">
                      <div className="w-24 h-24 rounded-[2rem] bg-indigo-500/5 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all shadow-2xl duration-500">
                        <Icon size={40} />
                      </div>
                      <div className="text-center transition-transform group-hover:translate-y-1">
                        <h4 className="text-xl font-black italic leading-tight">{step.title}</h4>
                        <p className="text-slate-500 font-bold text-[11px] italic mt-2 px-4 leading-tight">{step.desc}</p>
                        <span className="block text-[8px] font-black text-indigo-500/30 mt-3 tracking-widest uppercase">{step.tech}</span>
                      </div>
                      {i < 4 && <div className="hidden lg:block absolute top-12 -right-12 text-indigo-500/20 group-hover:text-indigo-500 group-hover:translate-x-2 transition-all duration-500">
                        <ArrowRight size={24} />
                      </div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Value Models */}
        <section className="w-full max-w-7xl px-8 py-32">
          <div className="text-center mb-20 space-y-4">
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter italic">השקעה בעתיד של שקט.</h3>
            <p className="text-xl text-slate-500 font-bold italic">אנחנו מנגישים את הטכנולוגיה לכולם, מהפרט ועד למערכת כולה.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl space-y-10 group hover:-translate-y-4 transition-all duration-500">
              <div className="space-y-2 text-center">
                <h4 className="text-2xl font-black text-slate-900 italic underline decoration-slate-200 decoration-8 underline-offset-4">בסיסי (חינם)</h4>
                <p className="text-indigo-600 font-black text-3xl italic">₪0</p>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Always Free for Patients</div>
              </div>
              <ul className="space-y-6">
                {[
                  { label: "יומן רגשות ומסע", icon: PenTool },
                  { label: "ניהול תרופות חכם", icon: Pill },
                  { label: "לחצן SOS מהיר", icon: Siren }
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-4 font-bold text-slate-600 italic group/item">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors"><t.icon size={20} /></div>
                    {t.label}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-slate-100 text-slate-900 py-4 rounded-full font-black hover:bg-slate-200 transition-all">התחל עכשיו</button>
            </div>

            {/* Family Tier */}
            <div className="bg-indigo-600 text-white p-12 rounded-[4rem] shadow-2xl space-y-10 relative overflow-hidden group hover:-translate-y-4 transition-all duration-500 ring-8 ring-indigo-50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="space-y-2 text-center relative">
                <div className="bg-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mx-auto mb-4">Most Popular</div>
                <h4 className="text-2xl font-black italic underline decoration-white/20 decoration-8 underline-offset-4">משפחתי Premium</h4>
                <p className="text-white font-black text-5xl italic">₪79<span className="text-lg opacity-60">/חודש</span></p>
              </div>
              <ul className="space-y-6 relative">
                {[
                  { label: "דשבורד מעקב משפחתי", icon: Heart },
                  { label: "התראות חכמות בזמן אמת", icon: Activity },
                  { label: "תמיכה בצ'אט מורחב", icon: HeartHandshake }
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-4 font-bold text-indigo-100 italic group/item">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-indigo-600 transition-colors"><t.icon size={20} /></div>
                    {t.label}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-indigo-600 py-4 rounded-full font-black hover:bg-amber-400 hover:text-indigo-900 transition-all relative shadow-xl">נסה 14 יום חינם</button>
            </div>

            {/* B2B Tier */}
            <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl space-y-10 group hover:-translate-y-4 transition-all duration-500">
              <div className="space-y-4 text-center">
                <h4 className="text-2xl font-black italic underline decoration-slate-800 decoration-8 underline-offset-4">קליני (B2B)</h4>
                <p className="text-slate-400 font-bold italic leading-tight">מותאם אישית לבתי חולים ומרכזים רפואיים</p>
              </div>
              <ul className="space-y-6">
                {[
                  { label: "אינטגרציה מלאה (EMR)", icon: Server },
                  { label: "ניהול פאנל צוותים", icon: Users },
                  { label: "חיזוי אירועי אלימות", icon: Radar }
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-4 font-bold text-slate-400 italic group/item">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors"><t.icon size={20} /></div>
                    {t.label}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-full font-black hover:bg-indigo-500 transition-all border border-indigo-400">הזמן דמו עכשיו</button>
            </div>
          </div>

          <div className="mt-20 p-12 bg-indigo-50 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 group">
            <div className="space-y-4 text-right">
              <h4 className="text-3xl font-black text-slate-900 italic">ישירות מהמשקיעים שלנו</h4>
              <p className="text-slate-500 font-bold italic max-w-xl leading-relaxed">אנחנו מגייסים סבב Pre-Seed להרחבת הפיילוט לכל מרכזיה "כללית". הצטרף למהפיכה הדיגיטלית בבריאות הנפש.</p>
            </div>
            <button
              onClick={() => setActiveIdentity(AppRole.PITCH)}
              className="bg-slate-900 text-white px-16 py-6 rounded-full font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl flex items-center gap-4"
            >
              View Pitch Deck <ArrowRight size={24} className="rotate-180" />
            </button>
          </div>
        </section>

        {/* Roadmap & Status Section */}
        <section className="w-full max-w-7xl px-8 py-32 border-t border-slate-100">
          <div className="text-center mb-24 space-y-6">
            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] italic mb-4">Visionary Path</div>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter italic">העתיד של בריאות הנפש.</h3>
            <p className="text-xl text-slate-500 font-bold italic max-w-2xl mx-auto leading-relaxed">מ-PoC ראשוני בשלוותה ועד להובלת הסטנדרט הדיגיטלי הגלובלי.</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -translate-y-1/2 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {[
                { date: "Current", title: "PoC בשלוותה", desc: "אינטגרציה מלאה לקמיליון וניסוי פעיל ב-2 מחלקות סגורות.", active: true },
                { date: "Q4 2026", title: "Scale Up", desc: "התרחבות ל-5 מרכזים רפואיים ומרפאות קהילה.", active: false },
                { date: "2027", title: "US Market", desc: "כניסה לשוק האמריקאי ותאימות מלאה ל-FDA.", active: false },
                { date: "2028", title: "Global Standard", desc: "העמקת ה-Reality OS כסטנדרט טיפולי עולמי.", active: false }
              ].map((item, i) => (
                <div key={i} className={`bg-white p-10 rounded-[3.5rem] border-4 transition-all group ${item.active ? 'border-indigo-600 shadow-[0_30px_60px_rgba(0,0,0,0.1)] scale-105 z-10' : 'border-slate-50 opacity-40 hover:opacity-100'}`}>
                  <div className={`text-[10px] font-black mb-4 uppercase tracking-[0.2em] ${item.active ? 'text-indigo-600' : 'text-slate-400'}`}>{item.date}</div>
                  <h4 className="text-2xl font-black italic mb-4 leading-tight">{item.title}</h4>
                  <p className="text-sm font-bold text-slate-500 italic leading-relaxed">{item.desc}</p>
                  {item.active && <div className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-[10px] tracking-widest uppercase"><Activity size={14} className="animate-pulse" /> Live Now</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-4xl px-8 py-24">
          <h3 className="text-3xl font-black text-slate-900 mb-12 text-center italic tracking-tighter underline decoration-indigo-500 decoration-4 underline-offset-8">שאלות נפוצות</h3>
          <div className="space-y-4">
            {[
              { q: "איך שומרים על פרטיות המטופל?", a: "המערכת עומדת בתקני אבטחת מידע מחמירים וכוללת הצפנה מקצה לקצה." },
              { q: "האם זה מחליף את הצוות הקליני?", a: "ממש לא. המערכת נועדה לתת כלים לצוות להבין טוב יותר את המטופל ולמנוע משברים." },
              { q: "מתי אפשר להתחיל להשתמש?", a: "הגרסה הנוכחית (4.0) מוכנה להטמעה מיידית במחלקות ובמרפאות." }
            ].map((item, i) => (
              <details key={i} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <summary className="list-none flex justify-between items-center font-black text-slate-800 italic">
                  <span>{item.q}</span>
                  <ChevronDown size={20} className="text-indigo-500 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-500 font-bold text-sm italic pr-4 border-r-2 border-slate-100 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full bg-[#050b18] py-32 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-8 relative">
            <div className="text-center mb-24 space-y-6">
              <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter italic">הקול של הקהילה</h3>
              <p className="text-slate-400 font-bold text-xl italic max-w-2xl mx-auto leading-relaxed">סיפורים אמיתיים מאנשים שראו את המהפיכה בעיניים.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-right">
              {[
                { name: "ד\"ר אביב לוי", role: "מנהל מחלקה, שלוותה", text: "המערכת שינתה את הדרך שבה אנחנו מתקשרים עם המטופלים. רמת החרדה בימי שגרה ובמצבי קיצון ירדה בצורה משמעותית. זה עתיד הרפואה.", img: "https://i.pravatar.cc/150?u=drlev" },
                { name: "מירי כהן", role: "בת משפחה", text: "סוף סוף אני מרגישה שיש לי דרך לדעת מה קורה עם אמא שלי. זה נתן לי שקט נפשי שלא היה לי שנים, אני מחוברת ומעורבת באמת.", img: "https://i.pravatar.cc/150?u=miyc" },
                { name: "רוני ג.", role: "מטופל", text: "זה נותן לי כוח. אני מרגיש שאני מנהל את החיים שלי ולא רק 'תיק רפואי'. המערכת מזהה כשאני צריך עזרה לפני שאני בכלל מבקש.", img: "https://i.pravatar.cc/150?u=roni" }
              ].map((t, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 group hover:border-indigo-500/50 transition-all duration-700 relative h-full flex flex-col justify-between">
                  <Quote className="text-indigo-500/30 mb-8 absolute top-8 left-8" size={64} />
                  <p className="text-white text-lg font-bold italic mb-12 leading-relaxed relative z-10">"{t.text}"</p>
                  <div className="flex items-center gap-6 mt-auto">
                    <img src={t.img} className="w-16 h-16 rounded-3xl object-cover ring-4 ring-indigo-500/20 group-hover:ring-indigo-500 transition-all" alt={t.name} />
                    <div className="space-y-1">
                      <h5 className="font-black text-xl italic text-white tracking-tight">{t.name}</h5>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Subtle Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] opacity-30 select-none pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[150px] opacity-20 select-none pointer-events-none" />
        </section>

        {/* Institutional Footer */}
        <footer className="w-full py-20 px-8 border-t border-slate-200 bg-white text-right">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-black italic tracking-tighter text-slate-900">שלוותה <span className="text-indigo-600 font-light italic">מערכת הפעלה</span></h2>
              <p className="text-xs font-bold text-slate-400 max-w-xs leading-relaxed italic">
                מערכת דיגיטלית מתקדמת המעניקה שליטה, ריבונות וביטחון למטופלים ובני משפחותיהם.
              </p>
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">© 2026 Emuna 2.0 | שלוותה. כל הזכויות שמורות.</div>
            </div>

            <div className="flex flex-wrap gap-12">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">מיקום השרת</h4>
                <p className="text-sm font-black italic text-slate-700">שרת שלוותה</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">מנוע מרכזי</h4>
                <p className="text-sm font-black italic text-slate-700">בינה מהירה</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">תשתית</h4>
                <p className="text-sm font-black italic text-slate-700">ענן משולב</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Global Overlays */}
        {activeIdentity === AppRole.PHARMACY_LOOP && <MedicationVerifier onClose={() => setActiveIdentity(null)} />}
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
