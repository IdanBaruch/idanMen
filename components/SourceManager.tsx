
import React, { useRef, useState, useMemo } from 'react';
import { SourceFile } from '../types';
import JSZip from 'jszip';

interface SourceManagerProps {
  sources: SourceFile[];
  onSourcesChange: (sources: SourceFile[]) => void;
}

export const SourceManager: React.FC<SourceManagerProps> = ({ sources, onSourcesChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, label: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const skipPatterns = [/node_modules/, /\.git/, /\.DS_Store/, /\.exe$/, /\.bin$/, /\.zip$/, /\.pyc$/, /__pycache__/];

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setProgress({ current: 0, total: files.length, label: 'מעבד קבצים...' });
    
    const newSources: SourceFile[] = [...sources];
    const batchSize = 25;

    for (let i = 0; i < files.length; i += batchSize) {
      const batch = Array.from(files).slice(i, i + batchSize);
      
      const results = await Promise.all(batch.map(async (file) => {
        if (skipPatterns.some(pattern => pattern.test(file.webkitRelativePath || file.name))) return null;

        try {
          if (file.size > 5 * 1024 * 1024) return null; // Increased to 5MB for larger docs
          const content = await file.text();
          if (!content.trim()) return null;

          return {
            id: Math.random().toString(36).substr(2, 9),
            name: file.webkitRelativePath || file.name,
            content: content,
            type: file.type
          };
        } catch (err) {
          return null;
        }
      }));

      const validFiles = results.filter((s): s is SourceFile => s !== null);
      newSources.push(...validFiles);
      setProgress(prev => ({ ...prev, current: Math.min(i + batchSize, files.length) }));
      await new Promise(resolve => setTimeout(resolve, 5));
    }

    onSourcesChange(newSources);
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (folderInputRef.current) folderInputRef.current.value = '';
  };

  const processZip = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProgress({ current: 0, total: 100, label: 'קורא ארכיון ZIP...' });

    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      const allFiles = Object.keys(contents.files).filter(path => !contents.files[path].dir);
      
      setProgress({ current: 0, total: allFiles.length, label: 'מחלץ קבצים מהארכיון...' });
      
      const newSources: SourceFile[] = [...sources];
      const batchSize = 20;

      for (let i = 0; i < allFiles.length; i += batchSize) {
        const batchKeys = allFiles.slice(i, i + batchSize);
        
        const results = await Promise.all(batchKeys.map(async (key) => {
          if (skipPatterns.some(pattern => pattern.test(key))) return null;
          
          try {
            const zipEntry = contents.files[key];
            const content = await zipEntry.async("text");
            if (!content.trim() || content.length > 1000000) return null; // 1MB limit per file inside ZIP

            return {
              id: Math.random().toString(36).substr(2, 9),
              name: key,
              content: content,
              type: 'text/plain'
            };
          } catch (err) {
            return null;
          }
        }));

        const validFiles = results.filter((s): s is SourceFile => s !== null);
        newSources.push(...validFiles);
        setProgress(prev => ({ ...prev, current: Math.min(i + batchSize, allFiles.length) }));
        await new Promise(resolve => setTimeout(resolve, 5));
      }

      onSourcesChange(newSources);
    } catch (err) {
      console.error("ZIP Processing Error", err);
      alert("שגיאה בעיבוד קובץ ה-ZIP. וודא שהקובץ תקין.");
    } finally {
      setIsProcessing(false);
      if (zipInputRef.current) zipInputRef.current.value = '';
    }
  };

  const filteredSources = useMemo(() => {
    if (!searchTerm) return sources;
    const lower = searchTerm.toLowerCase();
    return sources.filter(s => s.name.toLowerCase().includes(lower));
  }, [sources, searchTerm]);

  return (
    <div className="bg-slate-900/60 p-5 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col gap-4 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-right">
          <h3 className="text-lg font-black text-white">ספריית ידע ענקית</h3>
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
            {sources.length} מקורות מאוחסנים
          </span>
        </div>
        <button
          onClick={() => onSourcesChange([])}
          className="text-red-400 hover:bg-red-500/10 p-2 rounded-xl text-xs font-bold transition-all"
          title="נקה הכל"
        >
          🗑️
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 transition-all shadow-lg"
        >
          <span className="text-lg">📄</span> קבצים
        </button>
        <button
          onClick={() => folderInputRef.current?.click()}
          disabled={isProcessing}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 transition-all border border-slate-700"
        >
          <span className="text-lg">📁</span> תיקייה
        </button>
        <button
          onClick={() => zipInputRef.current?.click()}
          disabled={isProcessing}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl text-[10px] font-black flex flex-col items-center gap-1 transition-all shadow-lg"
        >
          <span className="text-lg">🗜️</span> ספריה (ZIP)
        </button>
      </div>

      <input type="file" ref={fileInputRef} onChange={(e) => processFiles(e.target.files)} multiple className="hidden" />
      <input type="file" ref={folderInputRef} onChange={(e) => processFiles(e.target.files)} {...({ webkitdirectory: "", directory: "" } as any)} className="hidden" />
      <input type="file" ref={zipInputRef} onChange={processZip} accept=".zip" className="hidden" />

      {isProcessing && (
        <div className="space-y-2 p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 animate-pulse">
          <div className="flex justify-between text-[10px] text-indigo-300 font-black uppercase">
            <span>{progress.label}</span>
            <span>{Math.round((progress.current / progress.total) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-300" 
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="relative">
        <input 
          type="text"
          placeholder="חפש בקבצים..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all text-right"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 text-xs">🔍</span>
      </div>

      <div className="flex-1 max-h-40 overflow-y-auto custom-scrollbar space-y-1 dir-rtl">
        {filteredSources.length === 0 ? (
          <div className="text-center py-8 opacity-20 text-xs italic">
            הספרייה ממתינה לידע...
          </div>
        ) : (
          filteredSources.map(source => (
            <div key={source.id} className="group flex justify-between items-center bg-white/5 p-2 px-3 rounded-xl border border-transparent hover:border-indigo-500/30 transition-all">
              <span className="text-[10px] font-medium text-slate-400 truncate max-w-[180px]" title={source.name}>
                {source.name}
              </span>
              <button 
                onClick={() => onSourcesChange(sources.filter(s => s.id !== source.id))}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 text-[10px] transition-all font-bold"
              >
                מחק
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
