import React, { useState } from 'react';
import {
    ShoppingBag, Star, Zap, CreditCard, ChevronRight,
    Search, TrendingUp, Heart, Trophy, ArrowRight,
    Pill, Sun, BookOpen
} from 'lucide-react';

interface RewardItem {
    id: string;
    name: string;
    brand: string;
    points: number;
    image: string;
    category: string;
    description: string;
}

const REWARDS_DATA: RewardItem[] = [
    {
        id: 'nike-1',
        name: 'Air Jordan 1 Retro',
        brand: 'Nike',
        points: 2500,
        image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400',
        category: 'נעליים',
        description: 'סמל של ריבונות וסטייל. עמידות מנצחת.'
    },
    {
        id: 'sony-xm5',
        name: 'Sony WH-1000XM5',
        brand: 'Sony',
        points: 1800,
        image: 'https://images.unsplash.com/photo-1618366712277-74092b37659b?w=400',
        category: 'טכנולוגיה',
        description: 'סינון רעשים אקטיבי מוחלט. השקט שלך מובטח.'
    },
    {
        id: 'adidas-fit',
        name: 'Dry-Fit Training Kit',
        brand: 'Adidas',
        points: 850,
        image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400',
        category: 'ביגוד',
        description: 'נוחות מקסימלית לתנועה וצמיחה.'
    },
    {
        id: 'iphone-15',
        name: 'iPhone 15 Pro',
        brand: 'Apple',
        points: 5000,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
        category: 'טכנולוגיה',
        description: 'הכלי החזק ביותר לניהול החיים שלך.'
    }
];

const VictoryStore: React.FC<{ onBack: () => void; userPoints?: number }> = ({ onBack, userPoints = 1250 }) => {
    const [filter, setFilter] = useState('הכל');

    return (
        <div className="min-h-screen bg-slate-50 font-assistant" dir="rtl">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-6 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors ml-2">
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter text-slate-800">החנות שלי</h1>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Victory Rewards Store</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-3xl text-white shadow-lg flex items-center gap-4">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Trophy size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-80 leading-none mb-1">הנקודות שלך</p>
                                <p className="text-2xl font-black leading-none">{userPoints.toLocaleString()}</p>
                            </div>
                        </div>
                        <a href="#how-to-earn" className="bg-blue-50 text-blue-600 px-6 py-4 rounded-2xl font-black text-xs hover:bg-blue-100 transition-all uppercase tracking-widest">
                            איך מקבלים עוד נקודות?
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-8 space-y-12">
                {/* Banner */}
                <div className="bg-[#1e3a8a] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 max-w-xl space-y-6">
                        <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                            קולקציית 2026
                        </div>
                        <h2 className="text-6xl font-black tracking-tighter leading-[0.9]">הפרסים של <br /><span className="text-blue-400 italic">הריבונות.</span></h2>
                        <p className="text-xl text-blue-200 font-medium italic">התמדה בטיפול היא לא חובה - היא הדרך שלך לנצח את המשחק ולזכות בכלים הכי חזקים שיש.</p>
                    </div>
                    <ShoppingBag size={280} className="absolute -left-10 -bottom-10 text-white/5 rotate-12" />
                </div>

                {/* How to Earn Section */}
                <div id="how-to-earn" className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 animate-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">איך להשיג נקודות?</h3>
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Mastering the Treatment Journey</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: 'לקחת תרופה', pts: '+50', icon: Pill, color: 'text-orange-500', bg: 'bg-orange-50' },
                            { title: 'לספר איך אני מרגיש', pts: '+10', icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50' },
                            { title: 'לכתוב ביומן', pts: '+20', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { title: 'שאלון קבלה', pts: '+100', icon: Star, color: 'text-blue-500', bg: 'bg-blue-50' }
                        ].map(rule => (
                            <div key={rule.title} className="p-6 rounded-3xl border border-slate-50 bg-slate-50/30 flex flex-col items-center text-center gap-3">
                                <div className={`${rule.bg} ${rule.color} p-4 rounded-2xl`}>
                                    <rule.icon size={24} />
                                </div>
                                <p className="font-black text-slate-700 leading-tight">{rule.title}</p>
                                <span className="text-2xl font-black text-slate-900 tracking-tighter">{rule.pts} נ'</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                    {['הכל', 'נעליים', 'טכנולוגיה', 'ביגוד'].map(c => (
                        <button
                            key={c}
                            onClick={() => setFilter(c)}
                            className={`px-8 py-3 rounded-full text-sm font-black transition-all ${filter === c ? 'bg-[#1e40af] text-white shadow-xl' : 'bg-white text-slate-500 hover:border-blue-300 border border-slate-200'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {REWARDS_DATA.filter(item => filter === 'הכל' || item.category === filter).map(item => (
                        <div key={item.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-black text-sm shadow-lg text-slate-800 flex items-center gap-2">
                                    <Zap size={14} className="text-amber-500" />
                                    {item.points.toLocaleString()}
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1">{item.brand}</p>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">{item.name}</h3>
                                </div>
                                <p className="text-slate-500 text-sm font-medium italic leading-relaxed">{item.description}</p>
                                <button
                                    disabled={userPoints < item.points}
                                    className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${userPoints >= item.points ? 'bg-slate-900 text-white hover:bg-black shadow-lg active:scale-95' : 'bg-slate-100 text-slate-300'}`}
                                >
                                    {userPoints >= item.points ? 'לקנות עכשיו' : `חסרות ${item.points - userPoints} נקודות`}
                                    <ArrowRight size={18} className="rotate-180" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VictoryStore;
