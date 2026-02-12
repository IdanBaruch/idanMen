
import React, { useState } from 'react';
import { SessionSummary, DrawerType } from '../types';
import { DRAWERS } from '../constants';
import { gemini } from '../services/geminiService';
import { decodeBase64, decodeAudioData } from '../services/liveUtils';
import { GoogleGenAI } from '@google/genai';

interface SummaryReportProps {
  summary: SessionSummary;
  onClose: () => void;
}

export const SummaryReport: React.FC<SummaryReportProps> = ({ summary, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const playVoiceSummary = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      const audioText = `סיכום ריבוני: ${summary.medicalObservation}. הנחיות פעולה: ${summary.actionPlan.map(p => p.task).join('. ')}. תובנה חסידית: ${summary.spiritualInsight}`;
      const base64Audio = await gemini.generateAudioSummary(audioText);
      
      if (base64Audio) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const buffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
      }
    } catch (err) {
      console.error(err);
      setIsPlaying(false);
    }
  };

  const generateVideoSummary = async () => {
    setIsVideoLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `A professional, authoritative Jewish mentor standing in a library, calmly delivering a medical consciousness summary. High quality, realistic cinematic video.`;
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await videoResponse.blob();
      setVideoUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Video Generation Error", err);
    } finally {
      setIsVideoLoading(false);
    }
  };

  const getDrawerIcon = (id: DrawerType) => DRAWERS.find(d => d.id === id)?.icon || '📁';

  return (
    <div className="fixed inset-0 bg-slate-950/90 z-[60] flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-5xl rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-indigo-900/40 via-slate-900 to-emerald-900/40">
          <div className="text-right">
            <h2 className="text-3xl font-black text-white tracking-tight">פרוטוקול סיכום ריבוני</h2>
            <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.3em]">Consciousness Diagnostics & Action Plan</p>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={generateVideoSummary}
              disabled={isVideoLoading || !!videoUrl}
              className="bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-full font-black text-xs transition-all flex items-center gap-2 shadow-xl disabled:opacity-50"
            >
              {isVideoLoading ? '🧬 משבט וידאו...' : videoUrl ? '✅ וידאו מוכן' : '🎥 הפק סיכום וידאו'}
            </button>
            <button 
              onClick={playVoiceSummary}
              disabled={isPlaying}
              className={`px-6 py-3 rounded-full font-black text-xs transition-all shadow-xl ${isPlaying ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
            >
              {isPlaying ? '🔊 מושמע' : '🎙️ השמע קול'}
            </button>
            <button onClick={onClose} className="bg-slate-800 text-white p-3 rounded-full hover:bg-slate-700 transition-all">✕</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Side */}
            <div className="lg:col-span-7 space-y-10 text-right dir-rtl">
              
              {videoUrl && (
                <div className="rounded-[2rem] overflow-hidden border-4 border-indigo-500/20 shadow-2xl animate-in fade-in zoom-in-95">
                  <video src={videoUrl} controls autoPlay className="w-full aspect-video object-cover" />
                </div>
              )}

              {isVideoLoading && (
                <div className="aspect-video rounded-[2rem] bg-black/40 border-2 border-dashed border-indigo-500/30 flex flex-col items-center justify-center gap-4 text-center p-8 animate-pulse">
                  <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-indigo-300 font-bold">מעבד נתונים ומחולל סיכום וידאו משובט...<br/><span className="text-[10px] opacity-50 font-medium">זה עשוי לקחת כדקה, אנא המתן לריבון</span></p>
                </div>
              )}

              <section>
                <h3 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">אבחון תודעתי (Observation)</h3>
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-inner leading-relaxed text-xl text-slate-100">
                  {summary.medicalObservation}
                </div>
              </section>

              <section>
                <h3 className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">תוכנית פעולה אופרטיבית</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {summary.actionPlan.map((item, idx) => (
                    <div key={idx} className="bg-slate-800/40 p-5 rounded-2xl border border-white/5 flex flex-row-reverse gap-4 items-center group hover:bg-slate-800/60 transition-all">
                      <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">{getDrawerIcon(item.drawer)}</div>
                      <div className="flex-1">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full mb-1 inline-block ${item.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400'}`}>
                          {item.priority === 'high' ? 'מיידי' : 'שגרה'}
                        </span>
                        <p className="text-slate-200 text-sm font-bold leading-snug">{item.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Spiritual Side Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-indigo-600/10 p-8 rounded-[2.5rem] border border-indigo-500/20 sticky top-0">
                <div className="text-6xl opacity-20 mb-6 text-indigo-400">📜</div>
                <h3 className="text-indigo-300 text-xs font-black uppercase tracking-widest mb-6">תובנה מתוך ספר התניא</h3>
                <p className="text-2xl italic text-indigo-50 font-serif leading-relaxed text-right dir-rtl">
                  "{summary.spiritualInsight}"
                </p>
                <div className="mt-8 pt-6 border-t border-indigo-500/20 text-right">
                  <span className="text-[10px] text-indigo-400/60 font-black uppercase tracking-widest">Sovereign Insight OS</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="p-6 bg-black/40 text-center text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] border-t border-white/5">
          SYSTEM OS v3.0 • SECURE CONSCIOUSNESS DIAGNOSTICS • GEMINI 3 PRO ENGINE
        </div>
      </div>
    </div>
  );
};
