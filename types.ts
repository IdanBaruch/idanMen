
export type DrawerType = 'sovereign' | 'partnership' | 'fatherhood' | 'noise';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  drawer?: DrawerType;
  timestamp: number;
}

export interface SourceFile {
  id: string;
  name: string;
  content: string;
  type: string;
}

export interface SessionSummary {
  medicalObservation: string;
  actionPlan: {
    drawer: DrawerType;
    task: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  spiritualInsight: string;
}

export interface DrawerState {
  id: DrawerType;
  label: string;
  description: string;
  icon: string;
  color: string;
  items: string[];
}
