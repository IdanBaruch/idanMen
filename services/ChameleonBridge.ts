import { LedgerEntry } from '../types';

export interface ChameleonEvent {
    id: string;
    type: 'ADT_A01' | 'ORU_R01' | 'ORDER'; // Admit, Result, Order
    timestamp: string;
    patientId: string;
    content: any;
}

export interface ClinicalScores {
    readmissionRisk: number; // 0-100
    stabilityIndex: number; // 0-100
    dischargeReadiness: number; // 0-100
}

class ChameleonBridge {
    private static instance: ChameleonBridge;
    private subscribers: ((event: ChameleonEvent) => void)[] = [];

    private constructor() { }

    static getInstance() {
        if (!ChameleonBridge.instance) {
            ChameleonBridge.instance = new ChameleonBridge();
        }
        return ChameleonBridge.instance;
    }

    subscribe(callback: (event: ChameleonEvent) => void) {
        this.subscribers.push(callback);
    }

    // Simulate an HL7/FHIR message from the Hospital Bus
    simulateIncomingEvent(event: ChameleonEvent) {
        console.log(`[ChameleonBridge] Incoming ${event.type} for Patient ${event.patientId}`);
        this.subscribers.forEach(sub => sub(event));
    }

    // AI Logic: Decision Support Layer
    // Calculates risks based on simulated EMR data (Labs, Vitals, ADT history)
    calculateClinicalScores(patientId: string): ClinicalScores {
        // In a real system, this would query the local EMR cache / FHIR Server
        // Here we simulate a high-value predictive model
        return {
            readmissionRisk: 12 + Math.floor(Math.random() * 20),
            stabilityIndex: 78 + Math.floor(Math.random() * 15),
            dischargeReadiness: 65 + Math.floor(Math.random() * 10)
        };
    }

    // Map EMR events to Sovereign Ledger (The Value Layer)
    mapToLedger(event: ChameleonEvent): LedgerEntry | null {
        switch (event.type) {
            case 'ORU_R01': // Lab Results
                if (event.content.isNormal) {
                    return {
                        id: `emr-${event.id}`,
                        type: 'social_worker', // Used for stability tracking
                        date: event.timestamp,
                        content: {
                            anchorNote: `תוצאות מעבדה תקינות - מדדי איזון ביולוגי בנורמה. (סונכרן מקמיליון)`,
                            pillars: []
                        }
                    };
                }
                break;
            case 'ADT_A01': // Admission
                return {
                    id: `emr-${event.id}`,
                    type: 'social_worker',
                    date: event.timestamp,
                    content: {
                        anchorNote: `קליטה מנהלית הושלמה במחלקה א'. (HL7 ADT Sync)`,
                        pillars: []
                    }
                };
        }
        return null;
    }
}

export default ChameleonBridge.getInstance();
