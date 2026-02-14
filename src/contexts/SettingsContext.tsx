import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserPersona = 'private' | 'community' | 'post_hospital' | null;
export type ReligiousLevel = 'secular' | 'traditional' | 'ultra_orthodox' | null;

interface SettingsContextType {
    userPersona: UserPersona;
    setUserPersona: (persona: UserPersona) => void;
    religiousLevel: ReligiousLevel;
    setReligiousLevel: (level: ReligiousLevel) => void;
    hasOnboarded: boolean;
    completeOnboarding: () => void;
    points: number;
    addPoints: (amount: number) => void;
    releaseTimeReduction: number; // In hours, derived from points
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userPersona, setUserPersona] = useState<UserPersona>(() => {
        return (localStorage.getItem('shalvata_persona') as UserPersona) || null;
    });

    const [religiousLevel, setReligiousLevel] = useState<ReligiousLevel>(() => {
        return (localStorage.getItem('shalvata_religious') as ReligiousLevel) || null;
    });

    const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
        return localStorage.getItem('shalvata_onboarded') === 'true';
    });

    const [points, setPoints] = useState<number>(() => {
        return parseInt(localStorage.getItem('shalvata_points') || '0', 10);
    });

    useEffect(() => {
        if (userPersona) localStorage.setItem('shalvata_persona', userPersona);
    }, [userPersona]);

    useEffect(() => {
        if (religiousLevel) localStorage.setItem('shalvata_religious', religiousLevel);
    }, [religiousLevel]);

    useEffect(() => {
        localStorage.setItem('shalvata_onboarded', String(hasOnboarded));
    }, [hasOnboarded]);

    useEffect(() => {
        localStorage.setItem('shalvata_points', String(points));
    }, [points]);

    const completeOnboarding = () => {
        setHasOnboarded(true);
    };

    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount);
    };

    // 100 points = 1 hour reduction simulation
    const releaseTimeReduction = Math.floor(points / 100);

    return (
        <SettingsContext.Provider value={{
            userPersona,
            setUserPersona,
            religiousLevel,
            setReligiousLevel,
            hasOnboarded,
            completeOnboarding,
            points,
            addPoints,
            releaseTimeReduction
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
