
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
  SOVEREIGNTY_BRIDGE = 'SOVEREIGNTY_BRIDGE'
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
  isAiEnabled: boolean;
  isMvpMode: boolean;
  activeFeatures: {
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
