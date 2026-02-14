import React, { useState, useRef, useEffect } from 'react';
import { AudioManager } from '../services/geminiService';
import '../styles/whispering-interface.css';

interface WhisperingButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    whisperingText: string;
    className?: string;
    highlight?: boolean;
    haloColor?: string;
}

const WhisperingButton: React.FC<WhisperingButtonProps> = ({
    children,
    onClick,
    whisperingText,
    className = "",
    highlight = false,
    haloColor = "rgba(99, 102, 241, 0.5)"
}) => {
    const [isLongPress, setIsLongPress] = useState(false);
    const timerRef = useRef<any>(null);

    const speak = (text: string) => {
        if (!text || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'he-IL';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const startPress = () => {
        timerRef.current = setTimeout(() => {
            setIsLongPress(true);
            speak(whisperingText);
            // Simulated Haptic Vibration
            if ('vibrate' in navigator) navigator.vibrate(50);
        }, 600); // Trigger after 600ms
    };

    const endPress = (e: React.MouseEvent | React.TouchEvent) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (!isLongPress) {
            // It was a short tap
            onClick();
        }

        setIsLongPress(false);
    };

    return (
        <div className="relative inline-block w-full h-full">
            {highlight && <div className="whispering-halo" style={{ '--halo-color': haloColor } as any} />}

            <button
                onMouseDown={startPress}
                onMouseUp={endPress}
                onMouseLeave={() => {
                    if (timerRef.current) clearTimeout(timerRef.current);
                    setIsLongPress(false);
                }}
                onTouchStart={startPress}
                onTouchEnd={endPress}
                className={`relative z-10 w-full h-full transition-all duration-300 active:scale-95 ${className} ${isLongPress ? 'scale-110' : ''}`}
            >
                {children}
            </button>

            {/* Liquid Guidance Bubble */}
            <div className={`liquid-bubble ${isLongPress ? 'active' : ''} font-assistant`}>
                <p className="leading-tight">{whisperingText}</p>
            </div>
        </div>
    );
};

export default WhisperingButton;
