
import React, { useState } from 'react';
import { DRAWERS } from './constants';
import { SourceManager } from './components/SourceManager';
import { ChatInterface } from './components/ChatInterface';
import { LiveInterface } from './components/LiveInterface';
import { SummaryReport } from './components/SummaryReport';
import { SourceFile, SessionSummary } from './types';

const App: React.FC = () => {
  const [sources, setSources] = useState<SourceFile[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [activeSummary, setActiveSummary] = useState<SessionSummary | null>(null);

  const handleLiveClose = (summary?: SessionSummary) => {
    setIsLiveMode(false);
    if (summary) {
      setActiveSummary(summary);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex flex-col gap-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 blur-[120px] -z-10 rounded-full"></div>

      {/* Overlays */}
      {isLiveMode && (
        <LiveInterface sources={sources} onClose={handleLiveClose} />
      )}
      
      {activeSummary && (
        <SummaryReport summary={activeSummary} onClose={() => setActiveSummary(null)} />
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black bg-gradient-to-l from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              הרב מנחם ברוך
            </h1>
            <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-lg shadow-indigo-600/30">V3.5 HUMAN</span>
          </div>
          <p className="text-slate-400 font-medium text-right md:text-left">מורה דרך לניהול תודעה וריבונות פנימית</p>
        </div>
        <div className="flex gap-4 items-center">
           <button 
             onClick={() => setIsLiveMode(true)}
             className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-full font-black shadow-2xl shadow-indigo-600/40 transition-all hover:scale-105 flex items-center gap-4 border border-indigo-400/20"
           >
             <span className="animate-pulse text-2xl">🎙️</span>
             <span>שיחת וידאו חיה</span>
           </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 relative z-10">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {DRAWERS.map((drawer) => (
              <div 
                key={drawer.id}
                className={`drawer-card p-5 rounded-[2rem] border-2 ${drawer.color} relative overflow-hidden group cursor-default shadow-2xl backdrop-blur-sm`}
              >
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <span className="text-3xl filter drop-shadow-md">{drawer.icon}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-30">Diagnostic Drawer</span>
                </div>
                <h3 className="font-black text-xl mb-1 relative z-10 text-right text-white">{drawer.label}</h3>
                <p className="text-sm text-slate-400 relative z-10 text-right leading-relaxed font-medium">{drawer.description}</p>
              </div>
            ))}
          </section>
          <SourceManager sources={sources} onSourcesChange={setSources} />
        </div>

        <div className="lg:col-span-8 flex flex-col h-[85vh] lg:h-auto">
          <ChatInterface sources={sources} />
        </div>
      </main>
    </div>
  );
};

export default App;
