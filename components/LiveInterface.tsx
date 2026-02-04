
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../constants';
import { SourceFile, SessionSummary } from '../types';
import { decodeBase64, encodeBase64, decodeAudioData, floatToPcm } from '../services/liveUtils';
import { gemini } from '../services/geminiService';

interface LiveInterfaceProps {
  sources: SourceFile[];
  onClose: (summary?: SessionSummary) => void;
}

export const LiveInterface: React.FC<LiveInterfaceProps> = ({ sources, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcription, setTranscription] = useState<{ user: string; model: string }>({ user: '', model: '' });
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const frameIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesSetRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const isMutedRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      await audioContextRef.current.resume();
      await outputAudioContextRef.current.resume();
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              if (isMutedRef.current) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm = floatToPcm(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: { data: encodeBase64(pcm), mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            source.connect(processor);
            processor.connect(audioContextRef.current!.destination);

            frameIntervalRef.current = setInterval(() => {
              if (videoRef.current && canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                canvasRef.current.width = 320;
                canvasRef.current.height = 240;
                ctx?.drawImage(videoRef.current, 0, 0, 320, 240);
                canvasRef.current.toBlob((blob) => {
                  if (blob) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64 = (reader.result as string).split(',')[1];
                      sessionPromise.then(session => {
                        session.sendRealtimeInput({ media: { data: base64, mimeType: 'image/jpeg' } });
                      });
                    };
                    reader.readAsDataURL(blob);
                  }
                }, 'image/jpeg', 0.4);
              }
            }, 1000);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscription(prev => ({ ...prev, user: prev.user + text }));
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscription(prev => ({ ...prev, model: prev.model + text }));
            }
            if (message.serverContent?.turnComplete) {
              setHistory(prev => [...prev, `User: ${transcription.user}`, `Bot: ${transcription.model}`]);
              setTranscription({ user: '', model: '' });
            }

            const parts = message.serverContent?.modelTurn?.parts || [];
            for (const part of parts) {
              if (part.inlineData?.data && outputAudioContextRef.current) {
                const ctx = outputAudioContextRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                const buffer = await decodeAudioData(decodeBase64(part.inlineData.data), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.onended = () => sourcesSetRef.current.delete(source);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesSetRef.current.add(source);
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesSetRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesSetRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error("Live Error", e);
            setError("שגיאת חיבור. וודא שמפתח ה-API תקין.");
            setIsConnecting(false);
          },
          onclose: () => {
            setIsActive(false);
            setIsConnecting(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION + "\n\nLIVE SESSION ENABLED. GATHER FACTS FOR SUMMARY.",
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      setError("גישה למדיה נכשלה.");
      setIsConnecting(false);
    }
  };

  const handleFinish = async () => {
    if (history.length === 0 && !transcription.user) {
        stopSession();
        return;
    }

    setIsSummarizing(true);
    try {
      const finalHistory = [...history];
      if (transcription.user) finalHistory.push(`User: ${transcription.user}`);
      if (transcription.model) finalHistory.push(`Bot: ${transcription.model}`);
      
      const summary = await gemini.generateSummary(finalHistory);
      
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
      if (sessionRef.current) sessionRef.current.close();
      if (audioContextRef.current) audioContextRef.current.close();
      if (outputAudioContextRef.current) outputAudioContextRef.current.close();
      
      onClose(summary);
    } catch (err) {
      console.error(err);
      stopSession();
    } finally {
      setIsSummarizing(false);
    }
  };

  const stopSession = () => {
    if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    if (sessionRef.current) sessionRef.current.close();
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md overflow-hidden">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-3xl border border-white/5 shadow-xl">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-600'}`}></div>
            <h2 className="text-xl font-bold text-white">מפגש ריבונות חי</h2>
          </div>
          
          <div className="flex items-center gap-3">
            {isActive && (
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 px-4 rounded-full font-bold transition-all border ${isMuted ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-200 border-slate-700'}`}
              >
                {isMuted ? '🔇 מושתק' : '🎙️ פעיל'}
              </button>
            )}
            <button 
              onClick={handleFinish}
              disabled={isSummarizing}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all disabled:opacity-50"
            >
              {isSummarizing ? 'מייצר סיכום...' : 'סיים והפק דוח ✨'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[60vh]">
          <div className="bg-black rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
            <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20 blur-xl'}`} />
            <canvas ref={canvasRef} className="hidden" />
            {!isActive && !isConnecting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button onClick={startSession} className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-3xl text-2xl font-black shadow-2xl">
                  התחל שידור 📹
                </button>
              </div>
            )}
            {isConnecting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="bg-slate-900/80 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl flex flex-col gap-6 backdrop-blur-xl">
             <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-white text-sm font-black uppercase tracking-widest">תמלול Gemini 3</span>
             </div>
             <div className="flex-1 overflow-y-auto space-y-4 text-right pr-2 custom-scrollbar">
                {transcription.user && <div className="bg-slate-800/60 p-4 rounded-2xl border-r-4 border-indigo-500">{transcription.user}</div>}
                {transcription.model && <div className="bg-indigo-900/40 p-4 rounded-2xl border-r-4 border-emerald-500">{transcription.model}</div>}
                {!isActive && <p className="text-slate-600 italic text-center py-20">ממתין לתחילת השידור...</p>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
