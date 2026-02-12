import React, { useState } from 'react';
import {
    ShoppingBag, Utensils, Shirt, Smartphone, Droplet,
    Gamepad2, Heart, Plus, Clock, Check, Package,
    Truck, XCircle, ChevronRight, Search, Filter,
    AlertCircle
} from 'lucide-react';
import { RequestItem, CategoryId, RequestStatus } from '../types';
import { VOLT_CATEGORIES, MOCK_REQUESTS } from '../../data/voltKidMockData';

interface Props {
    onBack?: () => void;
}

const VoltKidPatient: React.FC<Props> = ({ onBack }) => {
    const [activeView, setActiveView] = useState<'categories' | 'requests' | 'browse'>('categories');
    const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
    const [requests, setRequests] = useState<RequestItem[]>(MOCK_REQUESTS);

    const iconMap: Record<string, React.FC<any>> = {
        Utensils, Shirt, Smartphone, Droplet, Gamepad2, Heart
    };

    const statusConfig: Record<RequestStatus, { label: string; color: string; icon: React.FC<any> }> = {
        pending: { label: 'ממתין', color: 'text-slate-500 bg-slate-100', icon: Clock },
        seen: { label: 'נצפה', color: 'text-blue-500 bg-blue-100', icon: Package },
        approved: { label: 'אושר', color: 'text-green-500 bg-green-100', icon: Check },
        packed: { label: 'ארוז', color: 'text-purple-500 bg-purple-100', icon: Package },
        in_transit: { label: 'בדרך', color: 'text-orange-500 bg-orange-100', icon: Truck },
        delivered: { label: 'נמסר', color: 'text-emerald-600 bg-emerald-100', icon: Check },
        declined: { label: 'נדחה', color: 'text-red-500 bg-red-100', icon: XCircle },
    };

    const handleCategorySelect = (categoryId: CategoryId) => {
        setSelectedCategory(categoryId);
        setActiveView('browse');
    };

    const handleRequestItem = (categoryId: CategoryId, itemName: string) => {
        const newRequest: RequestItem = {
            id: `r${Date.now()}`,
            category: categoryId,
            name: itemName,
            priority: 'medium',
            status: 'pending',
            requestedAt: new Date(),
            updatedAt: new Date(),
        };
        setRequests([newRequest, ...requests]);
        setActiveView('requests');
    };

    const renderCategories = () => (
        <div className="space-y-8">
            <div className="text-center space-y-3">
                <h2 className="text-4xl font-black tracking-tighter text-slate-800">מה אתה צריך?</h2>
                <p className="text-slate-500 font-medium">בחר קטגוריה ותבקש מה שחשוב לך</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {VOLT_CATEGORIES.map((cat) => {
                    const Icon = iconMap[cat.icon];
                    return (
                        <button
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat.id)}
                            className="group relative p-6 bg-white rounded-3xl border-2 border-slate-200 hover:border-purple-400 transition-all flex flex-col items-center gap-4 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                {Icon && <Icon size={32} />}
                            </div>
                            <h3 className="text-lg font-black text-slate-800 text-center">{cat.name}</h3>
                            <ChevronRight className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" size={20} />
                        </button>
                    );
                })}
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center space-y-3">
                <ShoppingBag size={48} className="mx-auto opacity-90" />
                <h3 className="text-2xl font-black">יש לך {requests.filter(r => r.status !== 'delivered').length} בקשות פעילות</h3>
                <button
                    onClick={() => setActiveView('requests')}
                    className="bg-white text-purple-600 px-6 py-3 rounded-full font-black hover:scale-105 transition-transform"
                >
                    צפה בבקשות שלי
                </button>
            </div>
        </div>
    );

    const renderBrowser = () => {
        if (!selectedCategory) return null;
        const category = VOLT_CATEGORIES.find(c => c.id === selectedCategory);
        if (!category) return null;

        const Icon = iconMap[category.icon];

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setActiveView('categories')}
                        className="text-slate-600 hover:text-slate-800 font-bold flex items-center gap-2"
                    >
                        ← חזרה
                    </button>
                    <div className={`flex items-center gap-3 px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-full`}>
                        {Icon && <Icon size={20} />}
                        <span className="font-black">{category.name}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleRequestItem(category.id, item.name)}
                            className="group p-6 bg-white rounded-2xl border-2 border-slate-200 hover:border-purple-400 transition-all flex flex-col items-center gap-3 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="text-5xl">{item.emoji}</div>
                            <p className="text-sm font-bold text-slate-700 text-center">{item.name}</p>
                            <Plus className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => {
                        const customName = prompt('מה תרצה לבקש?');
                        if (customName) handleRequestItem(category.id, customName);
                    }}
                    className="w-full p-6 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 hover:border-purple-400 hover:text-purple-600 transition-all flex items-center justify-center gap-3 font-bold"
                >
                    <Plus size={24} />
                    בקש משהו אחר...
                </button>
            </div>
        );
    };

    const renderRequests = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-800">הבקשות שלי</h2>
                <button
                    onClick={() => setActiveView('categories')}
                    className="bg-purple-500 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    בקשה חדשה
                </button>
            </div>

            <div className="space-y-4">
                {requests.map((req) => {
                    const StatusIcon = statusConfig[req.status].icon;
                    return (
                        <div key={req.id} className="bg-white p-6 rounded-2xl border-2 border-slate-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-xl font-black text-slate-800 mb-1">{req.name}</h3>
                                    {req.notes && (
                                        <p className="text-sm text-slate-500 italic">💭 {req.notes}</p>
                                    )}
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusConfig[req.status].color}`}>
                                    <StatusIcon size={14} />
                                    {statusConfig[req.status].label}
                                </div>
                            </div>

                            {/* Status Timeline */}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between relative mt-2">
                                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-slate-200">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                                            style={{
                                                width: req.status === 'pending' ? '0%' :
                                                    req.status === 'seen' ? '20%' :
                                                        req.status === 'approved' ? '40%' :
                                                            req.status === 'packed' ? '60%' :
                                                                req.status === 'in_transit' ? '80%' :
                                                                    req.status === 'delivered' ? '100%' : '0%'
                                            }}
                                        />
                                    </div>
                                    {['pending', 'seen', 'approved', 'packed', 'in_transit', 'delivered'].map((s, idx) => {
                                        const isActive = req.status === s || (['pending', 'seen', 'approved', 'packed', 'in_transit', 'delivered'].indexOf(req.status) >= idx);
                                        return (
                                            <div
                                                key={s}
                                                className={`w-4 h-4 rounded-full z-10 transition-colors ${isActive ? 'bg-purple-500' : 'bg-slate-200'}`}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] text-slate-400 font-bold">הוזמן</span>
                                    <span className="text-[10px] text-slate-400 font-bold">נמסר</span>
                                </div>
                            </div>

                            <p className="text-xs text-slate-400 mt-3">
                                התבקש {new Date(req.requestedAt).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    );
                })}
            </div>

            {requests.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                    <ShoppingBag size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-bold">עדיין לא ביקשת כלום</p>
                    <p className="text-sm">לחץ על "בקשה חדשה" כדי להתחיל</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-assistant" dir="rtl">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors ml-2">
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl text-white">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">וולט-קיד</h1>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">מערכת בקשת ציוד</p>
                        </div>
                    </div>

                    <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-black">
                        {requests.filter(r => r.status !== 'delivered' && r.status !== 'declined').length} הזמנות פעילות
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="max-w-7xl mx-auto px-6 flex gap-6 border-t border-slate-100">
                    {[
                        { id: 'categories', label: 'קטגוריות', icon: Utensils },
                        { id: 'requests', label: 'הבקשות שלי', icon: Package },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveView(tab.id as any)}
                            className={`pb-3 pt-3 text-xs font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${activeView === tab.id ? 'text-purple-600' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                            {activeView === tab.id && (
                                <span className="absolute bottom-0 right-0 w-full h-0.5 bg-purple-600 rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-6 py-8">
                {activeView === 'categories' && renderCategories()}
                {activeView === 'browse' && renderBrowser()}
                {activeView === 'requests' && renderRequests()}
            </div>
        </div>
    );
};

export default VoltKidPatient;
