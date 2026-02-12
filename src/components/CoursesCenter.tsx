import React, { useState, useEffect } from 'react';
import {
    Radio, Zap, Sun, Moon, Waves, PlayCircle, PauseCircle, Clock, Star, Heart, BookOpen, Music
} from 'lucide-react';

interface Story {
    id: string;
    title: string;
    description: string;
    image: string;
    feeling: 'happy' | 'sad' | 'scared' | 'calm';
    audioUrl: string;
    script: string;
}

const STORIES: Story[] = [
    {
        id: 's1',
        title: 'איך להיות מלך אמיתי',
        description: 'סיפור על מלך חכם שידע מתי לעצור.',
        image: 'https://images.unsplash.com/photo-1505664063603-23e4620d7607?w=800&auto=format&fit=crop',
        feeling: 'happy',
        audioUrl: '',
        script: 'שלום לך חבר! אתה מרגיש היום חזק מאוד? כמו מלך? זה נהדר. אבל המלך הכי חזק הוא זה שיודע לעצור רגע ולנשום. בוא נלמד איך המלך שלמה ידע להרגיש רגוע גם כשהכל בחוץ היה רועש.'
    },
    {
        id: 's2',
        title: 'האור שבתוך החושך',
        description: 'סיפור על איש שמצא תקווה במקום עצוב.',
        image: 'https://images.unsplash.com/photo-1499209974431-276138d71629?w=800&auto=format&fit=crop',
        feeling: 'sad',
        audioUrl: '',
        script: 'לפעמים מרגיש לנו קצת עצוב וקצת חשוך בלב. זה בסדר. הנשמה שלנו לפעמים צריכה לנוח קצת כדי לאסוף כוחות. כמו הזרע באדמה שצריך להיות בחושך כדי לצמוח אחר כך לפרח יפה.'
    },
    {
        id: 's3',
        title: 'העץ החזק בסופה',
        description: 'איך לעמוד ישר כשיש רוח חזקה.',
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop',
        feeling: 'scared',
        audioUrl: '',
        script: 'הלב דופק חזק? אתה קצת מפחד? תדמיין שאתה עץ גדול עם שורשים עמוקים בתוך האדמה. הרוח אולי מזיזה את הענפים, אבל אתה נשאר עומד חזק ובטוח. אתה אף פעם לא לבד.'
    }
];

const CoursesCenter: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'happy' | 'sad' | 'scared' | 'calm'>('all');
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: any;
        if (isPlaying && progress < 100) {
            interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 1, 100));
            }, 1000);
        } else if (progress >= 100) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, progress]);

    const playStory = (s: Story) => {
        setSelectedStory(s);
        setIsPlaying(true);
        setProgress(0);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6 font-assistant rtl pb-32" dir="rtl">
            <header className="mb-12 text-center">
                <div className="inline-flex items-center gap-3 bg-blue-600/20 px-6 py-3 rounded-full mb-6 border border-blue-500/30">
                    <BookOpen className="text-blue-400" size={24} />
                    <h1 className="text-2xl font-black italic">פינת הסיפורים הטובים</h1>
                </div>
                <p className="text-slate-400 font-bold">איזה סיפור הלב שלך רוצה לשמוע היום?</p>
            </header>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                    { id: 'happy', icon: Zap, label: 'אני חזק מאוד', color: 'bg-amber-500' },
                    { id: 'sad', icon: Moon, label: 'אני קצת עצוב', color: 'bg-indigo-500' },
                    { id: 'scared', icon: Waves, label: 'אני קצת פוחד', color: 'bg-emerald-500' },
                    { id: 'all', icon: Sun, label: 'הכל בסדר', color: 'bg-slate-500' }
                ].map(f => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id as any)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full font-black text-sm transition-all ${filter === f.id ? f.color + ' scale-110 shadow-lg' : 'bg-white/5 border border-white/10'}`}
                    >
                        <f.icon size={18} />
                        {f.label}
                    </button>
                ))}
            </div>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {STORIES.filter(s => filter === 'all' || s.feeling === filter).map(s => (
                    <div
                        key={s.id}
                        onClick={() => playStory(s)}
                        className="group bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden cursor-pointer hover:border-blue-500 transition-all shadow-xl"
                    >
                        <div className="relative aspect-video">
                            <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                <h3 className="text-2xl font-black italic">{s.title}</h3>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <PlayCircle size={64} className="text-white fill-blue-600" />
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="text-slate-400 font-bold italic">{s.description}</p>
                            <div className="flex justify-between items-center text-xs font-black text-slate-500">
                                <div className="flex items-center gap-2"><Clock size={14} /> 5 דקות</div>
                                <div className="px-4 py-1.5 bg-blue-600 text-white rounded-full">להקשיב</div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            {/* Simple Player */}
            {selectedStory && (
                <div className="fixed bottom-0 left-0 right-0 bg-white text-slate-900 p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] z-50 animate-in slide-in-from-bottom">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg"><img src={selectedStory.image} className="w-full h-full object-cover" /></div>
                        <div className="flex-1 space-y-4 w-full text-center md:text-right">
                            <h4 className="text-2xl font-black italic">{selectedStory.title}</h4>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
                            </div>
                            <div className="flex justify-center md:justify-start gap-4">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                                >
                                    {isPlaying ? <PauseCircle /> : <PlayCircle className="ml-1" />}
                                </button>
                                <button onClick={() => setSelectedStory(null)} className="text-slate-400 font-bold">סגור</button>
                            </div>
                        </div>
                        <div className="hidden lg:block w-80 bg-slate-50 p-4 rounded-2xl border italic text-sm font-medium">
                            {selectedStory.script}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursesCenter;
