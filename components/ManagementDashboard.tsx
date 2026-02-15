
import React, { useState, useEffect } from 'react';
import { 
  Activity, Users, Zap, TrendingUp, BarChart3, 
  ArrowUpRight, Heart, RefreshCw, Database, 
  MessageCircle, Wind, ArrowDown, Clock, ShieldCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const LIVE_TRAFFIC = [
  { time: '08:00', users: 12, ai_sessions: 5 },
  { time: '10:00', users: 24, ai_sessions: 15 },
  { time: '12:00', users: 45, ai_sessions: 32 },
  { time: '14:00', users: 38, ai_sessions: 28 },
  { time: '16:00', users: 55, ai_sessions: 42 },
];

const ManagementDashboard: React.FC = () => {
  const [activeWaiters, setActiveWaiters] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWaiters(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans overflow-hidden" dir="rtl">
      {/* CEO Header */}
      <header className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/50 backdrop-blur-3xl z-50 shadow-2xl">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-blue-600 rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-blue-600/30">
              <BarChart3 size={32} />
           </div>
           <div>
              <h1 className="text-3xl font-black tracking-tight">שלוותה <span className="text-blue-500 font-light italic tracking-normal">ROI Console</span></h1>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">מערכת הוכחת ערך ומעקב טראפיק - שלב MVP</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="bg-emerald-500/10 text-emerald-500 px-6 py-3 rounded-2xl border border-emerald-500/20 flex items-center gap-3">
              <RefreshCw size={14} className="animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Data Sync</span>
           </div>
        </div>
      </header>

      <main className="flex-1 p-10 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 to-slate-950">
        
        {/* The "Money Shots" - Key Metrics for the Hospital Director */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'ממתינים פעילים באפליקציה', value: activeWaiters, trend: '+12%', icon: Users, color: 'blue', desc: 'טראפיק חי במיון' },
            { label: 'ירידה ממוצעת במצוקה', value: '34%', trend: 'Significant', icon: TrendingUp, color: 'emerald', desc: 'שיפור CSAT מדווח' },
            { label: 'שיחות "אמונה AI"', value: '184', trend: '+45%', icon: MessageCircle, color: 'purple', desc: 'פריקת לחץ מנוהלת' },
            { label: 'זמן "המתנה פעילה"', value: '12.4m', trend: '+18%', icon: Clock, color: 'orange', desc: 'זמן מנוצל להרגעה' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all">
               <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`p-4 rounded-3xl bg-${kpi.color}-500/10 text-${kpi.color}-500 shadow-inner`}>
                     <kpi.icon size={32} />
                  </div>
                  <span className="text-emerald-500 text-xs font-black bg-emerald-500/10 px-4 py-1.5 rounded-full flex items-center gap-2">
                     <ArrowUpRight size={14}/> {kpi.trend}
                  </span>
               </div>
               <div className="relative z-10">
                  <h3 className="text-5xl font-black mb-2 tracking-tighter">{kpi.value}</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{kpi.label}</p>
                  <p className="text-[9px] text-slate-500 font-medium italic">{kpi.desc}</p>
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Engagement Trend Chart */}
           <div className="bg-white/5 p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-12 relative z-10">
                 <h3 className="text-2xl font-black flex items-center gap-4"><Activity className="text-blue-500"/> טראפיק יומי במיון (Usage)</h3>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                       <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"/> ממתינים
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                       <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"/> שיחות AI
                    </div>
                 </div>
              </div>
              <div className="h-96 relative z-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={LIVE_TRAFFIC}>
                       <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                       <XAxis dataKey="time" stroke="#475569" fontSize={12} axisLine={false} tickLine={false} tickMargin={15} />
                       <YAxis hide />
                       <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1.5rem', color: '#fff', fontSize: '12px', fontWeight: 'bold' }} />
                       <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorUsers)" />
                       <Area type="monotone" dataKey="ai_sessions" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorAI)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* MVP Specific ROI Tracking */}
           <div className="bg-slate-900 p-12 rounded-[4rem] border border-white/5 shadow-2xl space-y-10">
              <h3 className="text-2xl font-black flex items-center gap-4"><ShieldCheck className="text-emerald-500"/> הוכחת ערך ניהולית (MVP Analytics)</h3>
              <div className="space-y-6">
                 {[
                   { label: 'הורדת "חיכוך" במיון', value: '28%', icon: ArrowDown, color: 'blue' },
                   { label: 'שביעות רצון (Self-Report)', value: '4.8/5', icon: Heart, color: 'red' },
                   { label: 'שימוש חוזר באותה המתנה', value: '62%', icon: RefreshCw, color: 'purple' },
                 ].map((stat, i) => (
                   <div key={i} className="bg-white/5 p-6 rounded-[2.5rem] flex items-center justify-between border border-white/5 group hover:border-emerald-500/20 transition-all">
                      <div className="flex items-center gap-6">
                         <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                            <stat.icon size={24} />
                         </div>
                         <h4 className="text-xl font-black">{stat.label}</h4>
                      </div>
                      <span className="text-2xl font-black text-white">{stat.value}</span>
                   </div>
                 ))}
              </div>
              <div className="p-8 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/20">
                 <p className="text-emerald-400 font-black text-sm mb-2 uppercase tracking-widest">תובנת הנהלה:</p>
                 <p className="text-emerald-100 italic leading-relaxed font-medium">
                   "המערכת מזהה עלייה של 15% במתח המדווח בשעה האחרונה. מומלץ לתגבר את המיון בסטודנטים/מתנדבים לשיחות הרגעה."
                 </p>
              </div>
           </div>
        </div>

        {/* Live Data Feed (Mock) */}
        <div className="mt-12 bg-white/5 rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl">
           <div className="p-10 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-2xl font-black">יומן אירועי שימוש (MVP Data Stream)</h3>
              <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Real-time Capture Active</div>
           </div>
           <div className="p-8 overflow-x-auto">
              <table className="w-full text-right">
                 <thead>
                    <tr className="text-[10px] text-slate-500 font-black uppercase tracking-widest border-b border-white/5">
                       <th className="px-6 py-4">זמן</th>
                       <th className="px-6 py-4">זהות (אנונימי)</th>
                       <th className="px-6 py-4">פעולה</th>
                       <th className="px-6 py-4">דיווח מצוקה</th>
                       <th className="px-6 py-4">סטטוס</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {[
                      { time: '14:22:10', id: 'usr_812', action: 'Emuna AI Session', stress: '9 -> 5', status: 'Active' },
                      { time: '14:20:05', id: 'usr_422', action: 'Breathing Exercise', stress: '7 -> 4', status: 'Completed' },
                      { time: '14:18:30', id: 'usr_109', action: 'ER Guide View', stress: '5 -> 5', status: 'Active' },
                      { time: '14:15:12', id: 'usr_231', action: 'Stress Report', stress: '8', status: 'New' },
                    ].map((log, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-all group cursor-pointer">
                         <td className="px-6 py-6 font-mono text-xs text-slate-400">{log.time}</td>
                         <td className="px-6 py-6 font-mono text-xs text-blue-400">#{log.id}</td>
                         <td className="px-6 py-6 text-sm font-black">{log.action}</td>
                         <td className="px-6 py-6">
                            <span className="text-emerald-500 font-black">{log.stress}</span>
                         </td>
                         <td className="px-6 py-6">
                            <span className="px-4 py-1.5 rounded-full bg-white/5 text-[9px] font-black tracking-widest uppercase">{log.status}</span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ManagementDashboard;
