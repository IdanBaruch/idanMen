import React, { useState } from 'react';
import {
    BookOpen, Brain, Activity, Clock, ChevronRight, PlayCircle,
    Users, Coffee, Zap, Dumbbell, Heart, CheckCircle2,
    GraduationCap, Lock, Star
} from 'lucide-react';
import { AppRole } from '../types';

interface Course {
    id: string;
    title: string;
    author: string;
    duration: string;
    lessons: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    tags: string[];
    image: string;
    isLocked?: boolean;
    url?: string; // External link for podcasts
}

interface Category {
    id: string;
    name: string;
    icon: React.FC<any>;
    color: string;
    courses: Course[];
}

const COURSES_DATA: Category[] = [
    {
        id: 'resilience',
        name: 'חוסן נפשי ואיזון',
        icon: Brain,
        color: 'from-violet-500 to-purple-600',
        courses: [
            {
                id: 'c1',
                title: 'מאימפולסיביות לשליטה',
                author: 'ד"ר שלמה מנדלוביץ\'',
                duration: '45 דק\'',
                lessons: 6,
                level: 'Beginner',
                tags: ['שליטה עצמית', 'ויסות רגשי'],
                image: 'https://images.unsplash.com/photo-1499209974431-276138d71629?w=800&auto=format&fit=crop&q=60'
            },
            {
                id: 'c2',
                title: 'מתמודדים עם המאניה',
                author: 'פרופ\' חיים בלמקר',
                duration: '60 דק\'',
                lessons: 8,
                level: 'Intermediate',
                tags: ['ביפולארי', 'איזון'],
                image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=800&auto=format&fit=crop&q=60'
            },
            {
                id: 'c3',
                title: 'לחיות עם סכיזופרניה',
                author: 'צוות שלוותה',
                duration: '90 דק\'',
                lessons: 12,
                level: 'Advanced',
                tags: ['שיקום', 'תובנה'],
                image: 'https://images.unsplash.com/photo-1555355653-a5c70752538c?w=800&auto=format&fit=crop&q=60'
            },
            {
                id: 'c4',
                title: 'להרגיע את הטיקים',
                author: 'ד"ר שרון צימרמן',
                duration: '30 דק\'',
                lessons: 4,
                level: 'Beginner',
                tags: ['חרדה', 'גוף-נפש'],
                image: 'https://images.unsplash.com/photo-1544367563-12123d8966bf?w=800&auto=format&fit=crop&q=60'
            }
        ]
    },
    {
        id: 'addiction',
        name: 'גמילה והתמכרויות',
        icon: Zap,
        color: 'from-orange-500 to-red-600',
        courses: [
            {
                id: 'c5',
                title: 'חופש מעישון - המסע',
                author: 'אלן קאר & רבני שלוותה',
                duration: '3 שעות',
                lessons: 21,
                level: 'Advanced',
                tags: ['הפסקת עישון', 'בריאות'],
                image: 'https://images.unsplash.com/photo-1527266675317-063a890a597a?w=800&auto=format&fit=crop&q=60'
            },
            {
                id: 'c6',
                title: 'נקיים מסמים',
                author: 'היועץ הרוחני ברוך',
                duration: '5 שעות',
                lessons: 30,
                level: 'Advanced',
                tags: ['NA', 'צעדים'],
                image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=800&auto=format&fit=crop&q=60'
            }
        ]
    },
    {
        id: 'wellness',
        name: 'גוף, נפש ונשימה',
        icon: Heart,
        color: 'from-emerald-500 to-teal-600',
        courses: [
            {
                id: 'c7',
                title: 'יוגה למתחילים',
                author: 'מאיה גרוס',
                duration: '20 דק\' / אימון',
                lessons: 10,
                level: 'Beginner',
                tags: ['יוגה', 'גמישות'],
                image: 'https://images.unsplash.com/photo-1544367563-12123d8966bf?w=800&auto=format&fit=crop&q=60'
            },
            {
                id: 'c8',
                title: 'מדיטציית בוקר',
                author: 'הרב דניאל',
                duration: '10 דק\' / אימון',
                lessons: 30,
                level: 'Beginner',
                tags: ['מיינדפולנס', 'רוגע'],
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60'
            },
            {
                id: 'c9',
                title: 'ספורט על הדופק',
                author: 'קובי המאמן',
                duration: '45 דק\'',
                lessons: 15,
                level: 'Intermediate',
                tags: ['אירובי', 'אנרגיה'],
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60'
            },
            {
                id: 'c10',
                title: 'רצים לחיים',
                author: 'מועדון הריצה',
                duration: 'תוכנית 8 שבועות',
                lessons: 24,
                level: 'Advanced',
                tags: ['ריצה', 'סיבולת'],
                image: 'https://images.unsplash.com/photo-1452626038306-369663ca05bb?w=800&auto=format&fit=crop&q=60'
            }
        ]
    },
    {
        id: 'skills',
        name: 'ניהול חיים ופרודוקטיביות',
        icon: Clock,
        color: 'from-blue-500 to-cyan-600',
        courses: [
            {
                id: 'c11',
                title: 'מאסטר סדר היום',
                author: 'צוות הריפוי בעיסוק',
                duration: 'שעתיים',
                lessons: 8,
                level: 'Beginner',
                tags: ['שגרה', 'ארגון'],
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60'
            },
            {
                id: 'c12',
                title: 'ניהול משימות אפקטיבי',
                author: 'גלית יועצת ארגונית',
                duration: '40 דק\'',
                lessons: 5,
                level: 'Intermediate',
                tags: ['GTD', 'פוקוס'],
                image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&auto=format&fit=crop&q=60'
            }
        ]
    },
    {
        id: 'podcasts',
        name: 'פודקאסטים וידע מעמיק',
        icon: PlayCircle,
        color: 'from-pink-500 to-rose-600',
        courses: [
            {
                id: 'p1',
                title: 'הפרעת אישיות גבולית (BPD)',
                author: 'NotebookLM - מדריך קליני',
                duration: 'פודקאסט AI',
                lessons: 1,
                level: 'Advanced',
                tags: ['BPD', 'אישיות גבולית', 'פודקאסט'],
                image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=60',
                url: 'https://notebooklm.google.com/notebook/f80d6e4b-b8d2-41cb-8067-89b96e9afd73?artifactId=3aa42048-613b-4ad6-8bb4-aee2fbf6007c'
            },
            {
                id: 'p2',
                title: 'סכיזופרניה - בין המפה הקלינית למצפן הרוחני',
                author: 'NotebookLM - מדריך מעמיק',
                duration: 'פודקאסט AI',
                lessons: 1,
                level: 'Advanced',
                tags: ['סכיזופרניה', 'פסיכוזה', 'פודקאסט'],
                image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60',
                url: 'https://notebooklm.google.com/notebook/f80d6e4b-b8d2-41cb-8067-89b96e9afd73?artifactId=0a9dec0f-f817-4c1e-96f7-8466015803d7'
            },
            {
                id: 'p3',
                title: 'מערכת הפעלה לחילוץ אנשים מגיהנום נפשי',
                author: 'NotebookLM - חזון שלוותה',
                duration: 'פודקאסט AI',
                lessons: 1,
                level: 'Advanced',
                tags: ['חזון', 'מערכת הפעלה', 'חילוץ'],
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
                url: 'https://notebooklm.google.com/notebook/f80d6e4b-b8d2-41cb-8067-89b96e9afd73?artifactId=99f4a116-8d87-46e5-9ccd-1aa2335681aa'
            },
            {
                id: 'p4',
                title: 'לחיות ללא עור - הפרעת אישיות גבולית',
                author: 'NotebookLM - עומק הכאב',
                duration: 'פודקאסט AI',
                lessons: 1,
                level: 'Advanced',
                tags: ['BPD', 'רגישות', 'תובנה'],
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
                url: 'https://notebooklm.google.com/notebook/f80d6e4b-b8d2-41cb-8067-89b96e9afd73?artifactId=12282a5a-de2d-4f6d-ae3f-5eb00c679f15'
            },
            {
                id: 'p5',
                title: 'החובה ההלכתית לטיפול תרופתי בסכיזופרניה',
                author: 'NotebookLM - הלכה ורפואה',
                duration: 'פודקאסט AI',
                lessons: 1,
                level: 'Advanced',
                tags: ['הלכה', 'סכיזופרניה', 'טיפול תרופתי'],
                image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop&q=60',
                url: 'https://notebooklm.google.com/notebook/f80d6e4b-b8d2-41cb-8067-89b96e9afd73?artifactId=8727cc8d-d681-4259-ae76-beb4aa949f22'
            }
        ]
    }
];

const CoursesCenter: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = activeCategory === 'all'
        ? COURSES_DATA
        : COURSES_DATA.filter(cat => cat.id === activeCategory);

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24 font-assistant" dir="rtl">

            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 p-2 rounded-xl">
                            <GraduationCap className="text-indigo-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-800">אקדמיית שלוותה</h1>
                            <p className="text-xs text-slate-500 font-bold">לומדים, צומחים, מבריאים</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 w-64 md:w-96 focus-within:ring-2 ring-indigo-500/20 transition-all">
                        <input
                            type="text"
                            placeholder="חפש קורס, מדריך או נושא..."
                            className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="max-w-7xl mx-auto px-6 pb-0 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-6 border-b border-transparent">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeCategory === 'all' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            הכל
                            {activeCategory === 'all' && <span className="absolute bottom-0 right-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
                        </button>
                        {COURSES_DATA.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap flex items-center gap-2 ${activeCategory === cat.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <cat.icon size={16} />
                                {cat.name}
                                {activeCategory === cat.id && <span className="absolute bottom-0 right-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">

                {filteredCategories.map(cat => (
                    <section key={cat.id} className="animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                                <cat.icon size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800">{cat.name}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cat.courses
                                .filter(c => c.title.includes(searchTerm) || c.author.includes(searchTerm) || c.tags.some(t => t.includes(searchTerm)))
                                .map(course => (
                                    <div
                                        key={course.id}
                                        onClick={() => course.url && window.open(course.url, '_blank')}
                                        className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${course.url ? 'cursor-pointer' : 'cursor-default'}`}
                                    >
                                        <div className="relative h-40 overflow-hidden">
                                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1 shadow-sm">
                                                <PlayCircle size={10} className="text-indigo-600" />
                                                {course.lessons} שיעורים
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                {course.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{tag}</span>
                                                ))}
                                            </div>

                                            <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                                            <p className="text-xs text-slate-500 font-medium mb-4">{course.author}</p>

                                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                                                <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                                                <span className="flex items-center gap-1"><Activity size={12} /> {course.level === 'Beginner' ? 'מתחילים' : course.level === 'Intermediate' ? 'מתקדמים' : 'מאסטר'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>
                ))}

                {filteredCategories.every(cat => cat.courses.filter(c => c.title.includes(searchTerm)).length === 0) && (
                    <div className="text-center py-20 text-slate-400">
                        <Brain size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-bold text-lg">לא נמצאו קורסים התואמים את החיפוש.</p>
                    </div>
                )}

            </div>

        </div>
    );
};

export default CoursesCenter;
