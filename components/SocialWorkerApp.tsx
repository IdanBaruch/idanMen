
import React, { useState } from 'react';
import { 
  Users, Briefcase, FileText, Link, Home, Heart, 
  Search, Plus, Bell, Calendar, ExternalLink, 
  CheckCircle2, AlertCircle, Clock, Filter, 
  Building2, Wallet, Share2, Download, MoreVertical,
  ClipboardList, Landmark, ShieldCheck, ChevronRight,
  Scale, Sparkles, Soup, Utensils
} from 'lucide-react';

interface Case {
  id: string;
  name: string;
  room: string;
  status: 'intake' | 'rehab' | 'discharge_prep';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  lastUpdate: string;
  nutritionStatus?: 'stable' | 'alert' | 'none';
}

const MOCK_CASES: Case[] = [
  { id: '1', name: 'יוסי אביב', room: '302', status: 'discharge_prep', priority: 'high', assignedTo: 'ענת לוי', lastUpdate: 'לפני שעה', nutritionStatus: 'stable' },
  { id: '2', name: 'שרה מנדל', room: '105', status: 'rehab', priority: 'medium', assignedTo: 'ענת לוי', lastUpdate: 'אתמול', nutritionStatus: 'alert' },
  { id: '3', name: 'דניאל כהן', room: '204', status: 'intake', priority: 'low', assignedTo: 'ענת לוי', lastUpdate: 'לפני 3 ימים' },
  { id: '4', name: 'רחל אגסי', room: '411', status: 'discharge_prep', priority: 'medium', assignedTo: 'ענת לוי', lastUpdate: 'לפני שעתיים', nutritionStatus: 'stable' },
];

const EXTERNAL_INTEGRATIONS = [
  { name: 'ביטוח לאומי', status: 'connected', icon: Landmark, color: 'blue' },
  { name: 'משרד הרווחה', status: 'pending', icon: Building2, color: 'teal' },
  { name: 'עיריית ירושלים', status: 'connected', icon: Building2, color: 'amber' },
];

const SocialWorkerApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'integrations' | 'resources' | 'reports'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" dir="rtl">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 p-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
                <Users size={24} />
             </div>
             <div>
                <h1 className="text-2xl font-black italic tracking-tight">שלוותה <span className="text-teal-600">Social Care</span></h1>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">ניהול ושיקום בקהילה</p>
             </div>
          </div>

          <nav className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {[
              { id: 'dashboard', label: 'ניהול מקרים', icon: ClipboardList },
              { id: 'integrations', label: 'גורמי חוץ', icon: Link },
              { id: 'resources', label: 'מאגר משאבים', icon: Home },
              { id: 'reports', label: 'דוחות', icon: FileText },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === tab.id ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <tab.icon size={16} />
                <span className="hidden md:block">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
             <button className="p-3 bg-slate-100 rounded-full text-slate-400 relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
             </button>
             <div className="w-10 h-10 rounded-full bg-teal-100 border-2 border-teal-200 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anat" alt="Social Worker" />
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8 space-y-8">
        
        {/* Zchut-Bot Pro & HealingPath Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-amber-600 to-yellow-500 rounded-[3rem] p-8 text-white flex flex-col items-start justify-between shadow-2xl relative overflow-hidden group min-h-[220px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[60px] rounded-full" />
            <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3">
                  <Scale size={28} />
                  <h2 className="text-2xl font-black italic tracking-tighter">Zchut-Bot <span className="font-light">Pro</span></h2>
                </div>
                <p className="text-amber-50 text-xs font-medium italic opacity-80">סיוע בבירוקרטיה ומיצוי זכויות.</p>
            </div>
            <button className="relative z-10 bg-white text-amber-600 px-8 py-3 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all mt-4">הפעל סוכן</button>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-[3rem] p-8 text-white flex flex-col items-start justify-between shadow-2xl relative overflow-hidden group min-h-[220px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[60px] rounded-full" />
            <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-3">
                  <Soup size={28} />
                  <h2 className="text-2xl font-black italic tracking-tighter">HealingPath <span className="font-light">Sync</span></h2>
                </div>
                <p className="text-emerald-50 text-xs font-medium italic opacity-80">ניטור החלמה מהפרעות אכילה (ED).</p>
            </div>
            <button className="relative z-10 bg-white text-emerald-600 px-8 py-3 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all mt-4">נתוני הזנה</button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm">
           <div className="relative w-full md:max-w-md">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="חיפוש מטופל או מספר מקרה..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pr-12 pl-4 text-sm font-bold outline-none focus:border-teal-500"
              />
           </div>
           <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2">
                 <Filter size={14} /> סינון מתקדם
              </button>
              <button className="flex-1 md:flex-none bg-teal-600 text-white px-8 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 active:scale-95 transition-all">
                 <Plus size={16} /> מקרה חדש
              </button>
           </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             {/* Stats Strip */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'מקרים פעילים', value: '24', icon: Users, color: 'teal' },
                  { label: 'ממתינים לשחרור', value: '6', icon: Home, color: 'blue' },
                  { label: 'ביקורי בית השבוע', value: '3', icon: Calendar, color: 'amber' },
                  { label: 'דוחות פתוחים', value: '9', icon: FileText, color: 'red' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5">
                     <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}><stat.icon size={24}/></div>
                     <div>
                        <p className="text-2xl font-black leading-none">{stat.value}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{stat.label}</p>
                     </div>
                  </div>
                ))}
             </div>

             {/* Case List */}
             <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-right border-collapse">
                   <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
                         <th className="px-8 py-6">מטופל / חדר</th>
                         <th className="px-8 py-6">סטטוס טיפולי</th>
                         <th className="px-8 py-6">מדד הזנה (ED)</th>
                         <th className="px-8 py-6">עדיפות</th>
                         <th className="px-8 py-6">עדכון אחרון</th>
                         <th className="px-8 py-6">פעולות</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {MOCK_CASES.map((caseItem) => (
                        <tr key={caseItem.id} className="hover:bg-slate-50 transition-all group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">{caseItem.name[0]}</div>
                                 <div>
                                    <p className="font-black text-slate-800">{caseItem.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">חדר {caseItem.room}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                 <div className={`w-2 h-2 rounded-full ${
                                   caseItem.status === 'discharge_prep' ? 'bg-blue-500' :
                                   caseItem.status === 'rehab' ? 'bg-teal-500' : 'bg-slate-400'
                                 }`} />
                                 <span className="text-xs font-black italic">
                                   {caseItem.status === 'discharge_prep' ? 'תכנון שחרור' :
                                    caseItem.status === 'rehab' ? 'תהליך שיקומי' : 'אינטייק ראשוני'}
                                 </span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              {caseItem.nutritionStatus && (
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                                  caseItem.nutritionStatus === 'alert' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                }`}>
                                   {caseItem.nutritionStatus === 'alert' ? <AlertCircle size={14}/> : <Utensils size={14}/>}
                                   <span className="text-[10px] font-black uppercase tracking-widest italic">{caseItem.nutritionStatus}</span>
                                </div>
                              )}
                              {!caseItem.nutritionStatus && <span className="text-slate-300 text-xs">-</span>}
                           </td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                caseItem.priority === 'high' ? 'bg-red-100 text-red-600' :
                                caseItem.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                              }`}>{caseItem.priority}</span>
                           </td>
                           <td className="px-8 py-6 text-xs text-slate-400 font-bold italic">{caseItem.lastUpdate}</td>
                           <td className="px-8 py-6">
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                 <button className="p-2 hover:bg-teal-50 text-teal-600 rounded-lg transition-all" title="ניהול תיק"><Briefcase size={16}/></button>
                                 <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all" title="תכנון שחרור"><Home size={16}/></button>
                                 <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-all"><MoreVertical size={16}/></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom duration-500">
             {EXTERNAL_INTEGRATIONS.map((int, i) => (
               <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 left-0 h-1.5 ${int.status === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <div className="flex justify-between items-start mb-8">
                     <div className={`p-4 rounded-2xl bg-${int.color}-50 text-${int.color}-600`}><int.icon size={32}/></div>
                     <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                       int.status === 'connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                     }`}>{int.status}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-2">{int.name}</h3>
                  <p className="text-xs text-slate-400 font-bold italic mb-6">סנכרון נתונים וזכויות מטופל בזמן אמת.</p>
                  <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 group-hover:bg-teal-600 transition-all">
                     כניסה למערכת <ExternalLink size={14} />
                  </button>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8 animate-in zoom-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'דיור מוגן', icon: Home },
                  { label: 'מרכזי יום', icon: Clock },
                  { label: 'עמותות סיוע', icon: Heart },
                  { label: 'ליווי תעסוקתי', icon: Briefcase },
                ].map((cat, i) => (
                  <button key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center gap-4 hover:border-teal-500 transition-all group">
                     <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-all"><cat.icon size={24}/></div>
                     <span className="font-black text-sm italic">{cat.label}</span>
                  </button>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
             <h3 className="text-2xl font-black italic mb-4">תבניות דוחות ומעקבים</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'סיכום סוציאלי לשחרור', type: 'PDF / DOC', icon: FileText },
                  { title: 'בקשה לסל שיקום', type: 'External Sync', icon: Share2 },
                  { title: 'תסקיר לבית משפט', type: 'Encrypted', icon: ShieldCheck },
                  { title: 'טופס סיוע כלכלי', type: 'Internal Only', icon: Download },
                ].map((report, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-teal-500 transition-all cursor-pointer">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-all"><report.icon size={24}/></div>
                        <div>
                           <h4 className="font-black text-slate-800">{report.title}</h4>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{report.type}</p>
                        </div>
                     </div>
                     <ChevronRight className="text-slate-300 group-hover:text-teal-600 group-hover:translate-x-[-4px] transition-all" size={20} />
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>

      {/* Floating Task Bar */}
      <div className="fixed bottom-8 left-8 z-[100] flex gap-3">
         <div className="bg-slate-900/90 backdrop-blur-3xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl">
            <div className="flex items-center gap-3 text-white font-black italic text-xs uppercase">
               <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
               3 משימות פתוחות להיום
            </div>
            <div className="w-px h-6 bg-white/10" />
            <button className="text-teal-400 font-black text-xs uppercase tracking-widest hover:text-white transition-all">הצג לו"ז</button>
         </div>
      </div>
    </div>
  );
};

export default SocialWorkerApp;
