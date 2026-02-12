import React, { useState } from 'react';
import {
    Book,
    Sparkles,
    Search,
    ChevronRight,
    MessageCircle,
    Clock,
    Heart,
    TrendingUp,
    Brain,
    Target,
    Lightbulb,
    Quote
} from 'lucide-react';

interface BookSummary {
    id: string;
    title: string;
    author: string;
    category: 'growth' | 'mental-health' | 'motivation' | 'spirituality' | 'success';
    readTime: number;
    tagline: string;
    summary: string;
    keyTakeaways: string[];
}

const BOOK_LIBRARY: BookSummary[] = [
    {
        id: '1',
        title: 'הרגלים אטומיים',
        author: 'ג\'יימס קליר',
        category: 'growth',
        readTime: 5,
        tagline: 'איך שינויים קטנים יוצרים תוצאות מדהימות',
        summary: 'הספר מסביר איך הרגלים קטנים, כשהם מצטברים לאורך זמן, יוצרים שינויים עצומים. המפתח הוא לא לשאוף לשינוי דרמטי, אלא להתמקד בשיפור של 1% כל יום.',
        keyTakeaways: [
            'הצעד הראשון לא צריך להיות מושלם, הוא רק צריך להיות צעד',
            'אתה לא עולה לרמת המטרות שלך, אתה יורד לרמת המערכות שלך',
            'כל פעולה היא הצבעה על מי שאתה רוצה להיות'
        ]
    },
    {
        id: '2',
        title: 'האדם מחפש משמעות',
        author: 'ויקטור פרנקל',
        category: 'mental-health',
        readTime: 5,
        tagline: 'איך למצוא משמעות גם בסבל',
        summary: 'פרנקל, שרד את השואה ופיתח גישה טיפולית שמתמקדת במציאת משמעות. הוא מלמד שאפילו במצבים הקשים ביותר, אנחנו יכולים לבחור את היחס שלנו למציאות.',
        keyTakeaways: [
            'בין גירוי לתגובה יש רווח. ברווח הזה נמצא הכוח שלנו לבחור',
            'מי שיש לו למה לחיות, יכול לשאת כמעט כל איך',
            'הסבל חדל להיות סבל ברגע שמוצאים בו משמעות'
        ]
    },
    {
        id: '3',
        title: 'התחל עם למה',
        author: 'סיימון סינק',
        category: 'motivation',
        readTime: 5,
        tagline: 'איך מנהיגים גדולים מעוררים פעולה',
        summary: 'סינק מסביר שאנשים לא קונים מה אתה עושה, הם קונים למה אתה עושה את זה. כשאתה מתחיל עם ה"למה" שלך (המטרה, האמונה), אתה מעורר השראה.',
        keyTakeaways: [
            'אנשים לא קונים מה אתה עושה, הם קונים למה אתה עושה את זה',
            'המטרה היא לעשות עסקים עם אנשים שמאמינים במה שאתה מאמין',
            'כשה"למה" ברור, ה"איך" יבוא מאליו'
        ]
    },
    {
        id: '4',
        title: 'הכימאי',
        author: 'פאולו קואלו',
        category: 'spirituality',
        readTime: 5,
        tagline: 'מסע לגילוי האוצר הפנימי',
        summary: 'סיפור על רועה צעיר שיוצא למסע לחפש אוצר, ומגלה שהאוצר האמיתי הוא בתוכו. הספר מלמד על האזנה לליבך ועל אומץ לעקוב אחרי החלומות.',
        keyTakeaways: [
            'כשאתה רוצה משהו, כל היקום קושר קשר כדי לעזור לך להשיג את זה',
            'האוצר נמצא היכן שליבך נמצא',
            'הפחד מלסבול גרוע יותר מהסבל עצמו'
        ]
    },
    {
        id: '5',
        title: 'חשוב והתעשר',
        author: 'נפוליאון היל',
        category: 'success',
        readTime: 5,
        tagline: '13 עקרונות להצלחה',
        summary: 'היל חקר את האנשים המצליחים ביותר בעולם וזיהה 13 עקרונות משותפים. העיקרון המרכזי: המחשבות שלך הופכות למציאות.',
        keyTakeaways: [
            'כל מה שהמוח יכול להעלות על הדעת ולהאמין בו, הוא יכול להשיג',
            'הכישלון הוא רק הזדמנות להתחיל שוב, הפעם בצורה חכמה יותר',
            'החלטה + תוכנית + פעולה = הצלחה'
        ]
    }
];

const DAILY_MESSAGES = [
    { text: 'הצעד הראשון לא צריך להיות מושלם, הוא רק צריך להיות צעד.', author: 'ג\'יימס קליר' },
    { text: 'בין גירוי לתגובה יש רווח. ברווח הזה נמצא הכוח שלנו לבחור.', author: 'ויקטור פרנקל' },
    { text: 'אתה לא צריך להיות נהדר כדי להתחיל, אבל אתה צריך להתחיל כדי להיות נהדר.', author: 'זיג זיגלר' },
    { text: 'כשאתה רוצה משהו, כל היקום קושר קשר כדי לעזור לך להשיג את זה.', author: 'פאולו קואלו' },
    { text: 'הדרך היחידה לעשות עבודה נהדרת היא לאהוב את מה שאתה עושה.', author: 'סטיב ג\'ובס' }
];

const CATEGORY_ICONS = {
    growth: TrendingUp,
    'mental-health': Brain,
    motivation: Target,
    spirituality: Heart,
    success: Sparkles
};

const CATEGORY_LABELS = {
    growth: 'צמיחה אישית',
    'mental-health': 'בריאות נפשית',
    motivation: 'מוטיבציה',
    spirituality: 'רוחניות',
    success: 'הצלחה'
};

const DailyFuel: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<BookSummary | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const todayMessage = DAILY_MESSAGES[new Date().getDate() % DAILY_MESSAGES.length];

    const filteredBooks = BOOK_LIBRARY.filter(book =>
        book.title.includes(searchQuery) || book.author.includes(searchQuery)
    );

    if (selectedBook) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] font-assistant p-6 lg:p-12" dir="rtl">
                <div className="max-w-4xl mx-auto space-y-8">
                    <button
                        onClick={() => setSelectedBook(null)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
                    >
                        <ChevronRight size={20} /> חזרה לספרייה
                    </button>

                    <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border border-slate-100">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                                    <Book size={32} />
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-4xl font-black italic tracking-tighter mb-2">{selectedBook.title}</h1>
                                    <p className="text-xl text-slate-500 font-bold">{selectedBook.author}</p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-xs font-black uppercase">
                                            {CATEGORY_LABELS[selectedBook.category]}
                                        </span>
                                        <span className="flex items-center gap-1 text-slate-400 text-sm font-bold">
                                            <Clock size={14} /> {selectedBook.readTime} דקות קריאה
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100">
                                <h3 className="text-xl font-black italic mb-3 text-indigo-900">התמצית</h3>
                                <p className="text-lg font-bold text-slate-700 leading-relaxed italic">{selectedBook.tagline}</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black italic mb-4">הסיפור</h3>
                                <p className="text-lg font-bold text-slate-600 leading-relaxed">{selectedBook.summary}</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black italic mb-4 flex items-center gap-2">
                                    <Lightbulb className="text-amber-500" size={28} /> תובנות מפתח
                                </h3>
                                <div className="space-y-4">
                                    {selectedBook.keyTakeaways.map((takeaway, i) => (
                                        <div key={i} className="flex gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black shrink-0">
                                                {i + 1}
                                            </div>
                                            <p className="text-lg font-bold text-slate-700 italic leading-relaxed">{takeaway}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-assistant p-6 lg:p-12" dir="rtl">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-amber-200">
                            <Sparkles size={14} /> Daily Fuel
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mt-2 text-slate-900">
                            דלק <span className="text-amber-600">יומי.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-bold italic mt-2">השראה וחוכמה לכל יום</p>
                    </div>
                </div>

                {/* Daily Message */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[4rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <Quote size={32} className="opacity-50" />
                            <span className="text-sm font-black uppercase tracking-widest opacity-70">המסר של היום</span>
                        </div>
                        <p className="text-3xl md:text-4xl font-black italic leading-tight">{todayMessage.text}</p>
                        <p className="text-xl font-bold opacity-80">— {todayMessage.author}</p>
                    </div>
                </div>

                {/* WhatsApp Group CTA */}
                <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-200 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0">
                        <MessageCircle size={40} />
                    </div>
                    <div className="flex-1 text-center md:text-right">
                        <h3 className="text-2xl font-black italic mb-2">קבוצת ההשראה השקטה</h3>
                        <p className="text-lg font-bold text-slate-600">מסר אחד ביום בווטסאפ. אסור לכתוב, רק לקרוא ולהתחזק.</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-black text-lg transition-all shadow-lg">
                        הצטרף לקבוצה
                    </button>
                </div>

                {/* Book Library */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h2 className="text-3xl font-black italic">ספריית החוכמה</h2>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="חיפוש ספר או מחבר..."
                                className="w-full pr-12 pl-6 py-4 rounded-2xl border border-slate-200 font-bold focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredBooks.map((book) => {
                            const CategoryIcon = CATEGORY_ICONS[book.category];
                            return (
                                <div
                                    key={book.id}
                                    onClick={() => setSelectedBook(book)}
                                    className="bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                                            <CategoryIcon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-black italic mb-1">{book.title}</h3>
                                            <p className="text-sm font-bold text-slate-400 mb-3">{book.author}</p>
                                            <p className="text-md font-bold text-slate-600 leading-snug italic mb-4">{book.tagline}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase text-slate-400 flex items-center gap-1">
                                                    <Clock size={12} /> {book.readTime} דקות
                                                </span>
                                                <span className="text-indigo-600 font-black text-sm group-hover:translate-x-[-4px] transition-transform">
                                                    קרא עכשיו →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyFuel;
