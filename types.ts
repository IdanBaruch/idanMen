
export type StrengthTag = 'Insight' | 'Self-Regulation' | 'Persistence' | 'Honesty' | 'Initiative' | 'Focus' | 'Creativity' | 'Empathy' | 'תובנה' | 'התמדה' | 'כנות' | 'יצירתיות' | 'אמפתיה';

export interface LedgerEntry {
  id: string;
  type: 'psychologist' | 'ot' | 'social_worker';
  date: string;
  content: any;
  isPrivate?: boolean; // If true, only care team sees this
}

export enum AppRole {
  PITCH = 'PITCH',
  PATIENT = 'PATIENT',
  RECOVERY_COCKPIT = 'RECOVERY_COCKPIT',
  ER_PATIENT = 'ER_PATIENT',
  STAFF = 'STAFF',
  SOCIAL_WORKER = 'SOCIAL_WORKER',
  CAREGIVER = 'CAREGIVER',
  MANAGEMENT = 'MANAGEMENT',
  RIKI_ADMIN = 'RIKI_ADMIN',
  PERSONA_LAB = 'PERSONA_LAB',
  PHARMACY_LOOP = 'PHARMACY_LOOP',
  RIGHTS_BOT = 'RIGHTS_BOT',
  HEALING_PATH = 'HEALING_PATH',
  INTAKE = 'INTAKE',
  SPIRITUAL_SUPPORT = 'SPIRITUAL_SUPPORT',
  SMOKE_FREE = 'SMOKE_FREE',
  MED_SAFETY = 'MED_SAFETY',
  SOVEREIGNTY_BRIDGE = 'SOVEREIGNTY_BRIDGE',
  COURSES = 'COURSES',
  LITTLE_PRINCE = 'LITTLE_PRINCE',
  FINANCIAL_SHIELD = 'FINANCIAL_SHIELD',
  DE_ESCALATION = 'DE_ESCALATION',
  COMPASSION_MIRROR = 'COMPASSION_MIRROR',
  LIQUID_CLARITY = 'LIQUID_CLARITY',
  VOLT_KID = 'VOLT_KID',
  VOLT_PARENT = 'VOLT_PARENT',
  REWARDS = 'REWARDS',
  MEDICAL_RECORDS = 'MEDICAL_RECORDS',
  SOVEREIGNTY_JOY = 'SOVEREIGNTY_JOY',
  // Staff Ecosystem Roles
  CLEANER = 'CLEANER',
  SECURITY = 'SECURITY',
  KITCHEN_STAFF = 'KITCHEN_STAFF',
  RABBI = 'RABBI',
  PSYCHOLOGIST = 'PSYCHOLOGIST',
  PSYCHIATRIST = 'PSYCHIATRIST',
  OCCUPATIONAL_THERAPIST = 'OCCUPATIONAL_THERAPIST',
  GARDENER = 'GARDENER',
  CEO = 'CEO',
  SOCIAL_WORKER_PORTAL = 'SOCIAL_WORKER_PORTAL',
  WARD_SELECTION = 'WARD_SELECTION',
  DIGEST = 'DIGEST',
  CONSULTATION = 'CONSULTATION',
  BOARDROOM = 'BOARDROOM',
  REALITY_CHECK = 'REALITY_CHECK',
  ZERO_G = 'ZERO_G',
  VOICE_PROXY = 'VOICE_PROXY',
  BIO_REACTOR = 'BIO_REACTOR',
  ALCHEMIST_ORB = 'ALCHEMIST_ORB',
  NURSE_RADAR = 'NURSE_RADAR',
  SYMPTOM_MAP = 'SYMPTOM_MAP',
  HOMECOMING = 'HOMECOMING',
  AUTO_SCRIBE = 'AUTO_SCRIBE',
  EMERGENCY_SUPPORT = 'EMERGENCY_SUPPORT',
  ADAPTIVE_WORKSPACE = 'ADAPTIVE_WORKSPACE',
  PERSONALITY_COMPASS = 'PERSONALITY_COMPASS',
  WARD_SCHEDULE = 'WARD_SCHEDULE',
  SOVEREIGN_LEDGER = 'SOVEREIGN_LEDGER',
  SOVEREIGN_BRIEF = 'SOVEREIGN_BRIEF',
  MEDICAL_VAULT = 'MEDICAL_VAULT',
  RESILIENCE_LEDGER = 'RESILIENCE_LEDGER',
  ADAPTIVE_FLOW = 'ADAPTIVE_FLOW',
  DAILY_FUEL = 'DAILY_FUEL',
  SONIC_ANCHOR = 'SONIC_ANCHOR',
  ENERGY_MANAGER = 'ENERGY_MANAGER',
  NEURO_GROWTH = 'NEURO_GROWTH'
}

export interface SafetyContact {
  id: string;
  name: string;
  role: string;
  isNotified: boolean;
}

export interface LifePillar {
  id: string;
  title: string;
  icon: string;
  points: number;
  isCompleted: boolean;
  category: 'body' | 'mind' | 'social' | 'meds';
}

export interface AppSettings {
  userName: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  soundEnabled: boolean;
  isAiEnabled?: boolean;
  activeFeatures?: {
    journal: boolean;
    breathing: boolean;
    innerChild: boolean;
    podcasts: boolean;
  };
}

export enum Modality {
  AUDIO = 'AUDIO',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export interface LiveServerMessage {
  serverContent?: {
    modelTurn?: {
      parts: Array<{
        inlineData?: {
          data: string;
          mimeType: string;
        };
        text?: string;
      }>;
    };
    inputTranscription?: {
      text: string;
    };
    outputTranscription?: {
      text: string;
    };
    interrupted?: boolean;
    turnComplete?: boolean;
  };
}

export interface MedicationTask {
  id: string;
  patientName: string;
  medName: string;
  dosage: string;
  doctorApproved: boolean;
  nurseApproved: boolean;
  status: 'pending' | 'completed' | 'cancelled' | 'anomaly';
  timestamp?: string;
  auditNotes?: string;
}

export interface PersonaExpert {
  id: string;
  name: string;
  title: string;
  category: string;
  icon: string;
  prompt: string;
}

// VoltKid - Supply Request System
export type RequestStatus =
  | 'pending'      // Child submitted
  | 'seen'         // Parent viewed
  | 'approved'     // Parent confirmed
  | 'packed'       // Parent packed it
  | 'in_transit'   // Parent on the way
  | 'delivered'    // Child received
  | 'declined';    // Parent/staff rejected

export type CategoryId =
  | 'food_drinks'
  | 'clothing'
  | 'tech'
  | 'hygiene'
  | 'entertainment'
  | 'spiritual';

export interface RequestItem {
  id: string;
  category: CategoryId;
  name: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: RequestStatus;
  requestedAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  notes?: string;
  medicalFlag?: boolean;
}

export interface PredefinedItem {
  id: string;
  name: string;
  emoji?: string;
  restrictions?: string[];
}

export interface VoltCategory {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  items: PredefinedItem[];
  allowCustom: boolean;
  requiresApproval?: boolean;
}
