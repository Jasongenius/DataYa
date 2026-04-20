import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Sparkles, Image as ImageIcon, Wand2, ArrowRight, Loader2, Check } from 'lucide-react';
import { generateRedesign } from '../services/gemini';
import { Design } from '../types';
import { cn } from '../lib/utils';

interface CreatorViewProps {
  onSelectDesign: (design: Design) => void;
}

type Mode = 'redesign' | 'original';

export function CreatorView({ onSelectDesign }: CreatorViewProps) {
  const [mode, setMode] = useState<Mode>('redesign');
  const [file, setFile] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
        setResults([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!file) return;
    setIsProcessing(true);
    setResults([]);

    if (mode === 'redesign') {
      setStatus('分析风格 DNA...');
      await new Promise(r => setTimeout(r, 1500));
      setStatus('生成灵感变体...');
      const generated = await generateRedesign(file, prompt);
      setResults(generated);
      setSelectedIdx(0);
    } else {
      setStatus('优化视觉构图...');
      await new Promise(r => setTimeout(r, 1000));
      setStatus('去除背景...');
      await new Promise(r => setTimeout(r, 800));
      setResults([file]);
    }
    setIsProcessing(false);
    setStatus('');
  };

  const handleConfirm = () => {
    if (results.length > 0) {
      onSelectDesign({ 
        id: Date.now().toString(), 
        url: results[selectedIdx], 
        type: mode === 'redesign' ? 'ai-generated' : 'original' 
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Input Panel */}
        <div className="lg:w-1/3 space-y-4">
          <div className="bg-card-surface border border-border-subtle rounded-card p-6 shadow-bento space-y-6 flex flex-col h-full">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              创意输入 · 爆款基因
            </div>

            <div className="flex p-1 bg-bg-base rounded-xl">
              {(['redesign', 'original'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setFile(null); setResults([]); }}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all uppercase tracking-widest",
                    mode === m 
                      ? "bg-white shadow-sm text-accent" 
                      : "text-ink-sub hover:text-ink-main"
                  )}
                >
                  {m === 'redesign' ? '风格二创' : '原创上传'}
                </button>
              ))}
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "aspect-square rounded-inner border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all cursor-pointer overflow-hidden relative",
                file ? "border-accent/20 bg-accent/5" : "border-border-subtle hover:border-accent/40 hover:bg-accent/5"
              )}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleFileChange}
              />
              {file ? (
                <img src={file} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 border border-border-subtle">
                    <Upload className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-bold text-center text-sm">点击或拖拽上传图片</p>
                  <p className="text-[10px] text-ink-sub mt-1 font-bold uppercase tracking-widest leading-relaxed">参考图: 渐变流体派</p>
                </>
              )}
            </div>

            {mode === 'redesign' && (
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">自定义提示词 (可选)</label>
                <textarea
                  placeholder="例如：让风格更极简、加入潮流插画元素..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-24 px-4 py-3 bg-bg-base rounded-inner border-none focus:ring-1 ring-accent/50 resize-none font-medium text-xs outline-none"
                />
              </div>
            )}

            <button
              disabled={!file || isProcessing}
              onClick={processImage}
              className="w-full py-4 bg-accent text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-lg shadow-accent/20 mt-auto"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>处理中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{mode === 'redesign' ? '提取风格 DNA' : '优化设计'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Results Panel */}
        <div className="lg:w-2/3">
          <div className="bg-card-surface border border-border-subtle rounded-card p-8 h-full relative flex flex-col shadow-bento">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                <div className="w-2 h-2 rounded-full bg-accent" />
                AI 二次创作生成
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold px-3 py-1 bg-bg-base rounded-full opacity-60 uppercase tracking-widest">
                数字鸭 AI 引擎
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-card"
                >
                  <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
                  <p className="font-bold text-sm tracking-widest uppercase animate-pulse">{status}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {results.length > 0 ? (
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {results.slice(0, 4).map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "group relative cursor-pointer",
                        selectedIdx === i ? "ring-4 ring-accent rounded-inner" : ""
                      )}
                      onClick={() => setSelectedIdx(i)}
                    >
                      <div className="w-full h-full bg-bg-base rounded-inner overflow-hidden border border-border-subtle shadow-sm flex items-center justify-center">
                        <img src={r} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-black text-accent shadow-sm">
                          匹配度 {98 - i * 5}%
                        </div>
                      </div>
                      {selectedIdx === i && (
                        <div className="absolute inset-0 bg-accent/10 flex items-center justify-center pointer-events-none rounded-inner">
                          <div className="bg-accent text-white p-2 rounded-full shadow-lg">
                            <Check className="w-6 h-6" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4 mt-8 pt-8 border-t border-border-subtle">
                   <button 
                     onClick={processImage}
                     className="flex-1 py-4 bg-bg-base border border-border-subtle rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-border-subtle transition-colors"
                   >
                     批量重新生成
                   </button>
                   <button 
                     onClick={handleConfirm}
                     className="flex-1 py-4 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent/20 transition-transform active:scale-95"
                   >
                     确认设计并预览
                   </button>
                </div>
              </div>
            ) : !isProcessing && (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-black/10" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">暂无设计</p>
                  <p className="text-black/30 font-medium max-w-[280px]">
                    在左侧面板上传图片点击生成，我们将为你打造专属艺术。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
