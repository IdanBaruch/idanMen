import React, { useState, useRef, useEffect } from 'react';
import {
    Music,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Waves,
    Wind,
    Sparkles,
    Heart,
    Brain,
    Shield,
    Activity,
    Zap
} from 'lucide-react';

type MoodMode = 'reset' | 'flow' | 'focus' | null;

interface SoundTrack {
    id: string;
    name: string;
    description: string;
    duration: string;
    frequency?: string;
    benefits: string[];
    audioUrl?: string; // In production, this would be actual audio files
}

const SOUND_LIBRARY: Record<MoodMode, SoundTrack[]> = {
    reset: [
        {
            id: 'binaural-theta',
            name: 'גלי תטא (Theta Waves)',
            description: 'תדרים בינאורליים להרגעה עמוקה ומדיטציה',
            duration: '15 דקות',
            frequency: '4-8 Hz',
            benefits: ['הפחתת חרדה', 'שיפור שינה', 'הרגעת מערכת העצבים']
        },
        {
            id: 'ocean-waves',
            name: 'גלי אוקיינוס',
            description: 'צלילי טבע מרגיעים של גלים',
            duration: '20 דקות',
            benefits: ['הרגעה מיידית', 'שחרור מתח', 'חיבור לטבע']
        },
        {
            id: 'rain-forest',
            name: 'גשם ביער',
            description: 'גשם עדין עם צלילי יער',
            duration: '30 דקות',
            benefits: ['ריכוז פנימי', 'שקט נפשי', 'איפוס מחשבות']
        }
    ],
    flow: [
        {
            id: 'yoga-flow',
            name: 'זרימת יוגה',
            description: 'מוזיקה קצבית עדינה לתנועה',
            duration: '25 דקות',
            benefits: ['עידוד תנועה', 'שחרור אנרגיה', 'חיבור גוף-נפש']
        },
        {
            id: 'tibetan-bowls',
            name: 'קערות טיבטיות',
            description: 'רטט מרפא של קערות שירה',
            duration: '18 דקות',
            benefits: ['איזון צ\'אקרות', 'שחרור חסימות', 'ריפוי רגשי']
        },
        {
            id: 'gentle-piano',
            name: 'פסנתר עדין',
            description: 'מנגינות פסנתר זורמות',
            duration: '22 דקות',
            benefits: ['השראה', 'יצירתיות', 'זרימה רגשית']
        }
    ],
    focus: [
        {
            id: 'white-noise',
            name: 'רעש לבן',
            description: 'רעש לבן טהור לנטרול הסחות דעת',
            duration: 'אינסופי',
            benefits: ['חסימת רעשי רקע', 'שיפור ריכוז', 'יצירת בועה']
        },
        {
            id: 'brown-noise',
            name: 'רעש חום',
            description: 'תדרים נמוכים יותר, מרגיעים יותר',
            duration: 'אינסופי',
            benefits: ['הרגעה + ריכוז', 'מתאים ל-ADHD', 'עוצמה נמוכה']
        },
        {
            id: 'alpha-waves',
            name: 'גלי אלפא',
            description: 'תדרים לריכוז רגוע',
            duration: '40 דקות',
            frequency: '8-12 Hz',
            benefits: ['ריכוז ללא מתח', 'למידה משופרת', 'יצירתיות']
        }
    ]
};

const SonicAnchor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedMode, setSelectedMode] = useState<MoodMode>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<SoundTrack | null>(null);
    const [playbackTime, setPlaybackTime] = useState(0);

    // Simulate audio playback
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && selectedTrack) {
            interval = setInterval(() => {
                setPlaybackTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, selectedTrack]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTrackSelect = (track: SoundTrack) => {
        setSelectedTrack(track);
        setPlaybackTime(0);
        setIsPlaying(true);
    };

    if (selectedMode && selectedTrack) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 font-assistant p-6 lg:p-12" dir="rtl">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => setSelectedTrack(null)}
                        className="text-white/70 hover:text-white font-bold mb-8 transition-colors"
                    >
                        ← חזרה לרשימה
                    </button>

                    <div className="bg-white/10 backdrop-blur-xl rounded-[4rem] p-12 md:p-16 border border-white/20 shadow-2xl">
                        <div className="text-center space-y-8">
                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                                <Waves size={64} className="text-white" />
                            </div>

                            <div>
                                <h1 className="text-4xl md:text-5xl font-black italic text-white mb-3">{selectedTrack.name}</h1>
                                <p className="text-xl text-white/70 font-bold">{selectedTrack.description}</p>
                                {selectedTrack.frequency && (
                                    <p className="text-cyan-300 font-bold mt-2">תדר: {selectedTrack.frequency}</p>
                                )}
                            </div>

                            {/* Playback Controls */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-center gap-6">
                                    <button
                                        onClick={handlePlayPause}
                                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                                    >
                                        {isPlaying ? (
                                            <Pause size={36} className="text-indigo-600" />
                                        ) : (
                                            <Play size={36} className="text-indigo-600 mr-[-4px]" />
                                        )}
                                    </button>
                                </div>

                                <div className="text-white/50 font-bold text-lg">
                                    {formatTime(playbackTime)} / {selectedTrack.duration}
                                </div>

                                {/* Volume Control */}
                                <div className="flex items-center gap-4 max-w-md mx-auto">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => {
                                            setVolume(parseInt(e.target.value));
                                            setIsMuted(false);
                                        }}
                                        className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                                    />
                                    <span className="text-white/70 font-bold w-12 text-center">{isMuted ? 0 : volume}%</span>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                                <h3 className="text-xl font-black italic text-white mb-4">יתרונות</h3>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {selectedTrack.benefits.map((benefit, i) => (
                                        <span
                                            key={i}
                                            className="bg-cyan-500/20 text-cyan-200 px-4 py-2 rounded-full text-sm font-bold border border-cyan-400/30"
                                        >
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedMode) {
        const tracks = SOUND_LIBRARY[selectedMode];
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 font-assistant p-6 lg:p-12" dir="rtl">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => setSelectedMode(null)}
                        className="text-white/70 hover:text-white font-bold mb-8 transition-colors"
                    >
                        ← חזרה למצבים
                    </button>

                    <div className="space-y-6">
                        {tracks.map((track) => (
                            <div
                                key={track.id}
                                onClick={() => handleTrackSelect(track)}
                                className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-8 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Music size={32} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black italic text-white mb-2">{track.name}</h3>
                                        <p className="text-lg text-white/70 font-bold mb-4">{track.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {track.benefits.map((benefit, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold"
                                                >
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-white/50 font-bold text-sm shrink-0">
                                        {track.duration}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-assistant p-6 lg:p-12" dir="rtl">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-purple-200">
                        <Waves size={14} /> Sonic Anchor
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mt-2 text-slate-900">
                        העוגן <span className="text-purple-600">הסוני.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-bold italic mt-2">מוזיקה וצלילים לויסות רגשי</p>
                </div>

                {/* Mood Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Reset/Meditate */}
                    <div
                        onClick={() => setSelectedMode('reset')}
                        className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-[3rem] p-10 text-white cursor-pointer hover:scale-105 transition-transform shadow-2xl group"
                    >
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                                <Brain size={40} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black italic mb-2">איפוס</h3>
                                <p className="text-lg font-bold opacity-90">מדיטציה והרגעה עמוקה</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">גלי תטא</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">צלילי טבע</span>
                            </div>
                        </div>
                    </div>

                    {/* Flow/Yoga */}
                    <div
                        onClick={() => setSelectedMode('flow')}
                        className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-[3rem] p-10 text-white cursor-pointer hover:scale-105 transition-transform shadow-2xl group"
                    >
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                                <Activity size={40} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black italic mb-2">זרימה</h3>
                                <p className="text-lg font-bold opacity-90">יוגה ותנועה עדינה</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">קערות טיבטיות</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">פסנתר</span>
                            </div>
                        </div>
                    </div>

                    {/* Focus/Bubble */}
                    <div
                        onClick={() => setSelectedMode('focus')}
                        className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-[3rem] p-10 text-white cursor-pointer hover:scale-105 transition-transform shadow-2xl group"
                    >
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                                <Shield size={40} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black italic mb-2">בועה</h3>
                                <p className="text-lg font-bold opacity-90">ריכוז וחסימת רעשים</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">רעש לבן</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">גלי אלפא</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-black italic mb-6">איך זה עובד?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-lg font-black">ויסות חושי</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                צלילים ותדרים שמרגיעים את מערכת העצבים ומורידים חרדה
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-lg font-black">תדרים בינאורליים</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                גלי מוח שמסנכרנים את ההמיספרות ומשפרים מצב רוח
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-lg font-black">בועה אקוסטית</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                רעש לבן שחוסם הסחות דעת ויוצר מרחב מוגן
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SonicAnchor;
