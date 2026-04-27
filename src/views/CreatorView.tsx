import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Sparkles, Image as ImageIcon, Wand2, ArrowRight, Loader2, Check, AlertCircle } from 'lucide-react';
import { Design, PRODUCTS, Product } from '../types';
import { cn } from '../lib/utils';

type Mode = 'series' | 'select';

interface CreatorViewProps {
  onOrder: (product: Product, designUrl: string) => void;
  files: string[];
  setFiles: (files: string[]) => void;
  results: {url: string, productId?: string}[];
  setResults: (results: {url: string, productId?: string}[]) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export function CreatorView({ 
  onOrder, 
  files, 
  setFiles, 
  results, 
  setResults, 
  mode, 
  setMode, 
  prompt, 
  setPrompt 
}: CreatorViewProps) {
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    if (selectedFiles.length > 0) {
      setRawFiles(selectedFiles);
      setError(null);
      const newFiles: string[] = [];
      let loaded = 0;

      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newFiles.push(reader.result as string);
          loaded++;
          if (loaded === selectedFiles.length) {
            setFiles(newFiles);
            setResults([]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const processImage = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setResults([]);

    try {
      if (mode === 'series') {
        setStatus('正在生成全系列文创周边预览...');
        await new Promise(r => setTimeout(r, 2000));
        // Apply 1st image to TOP 4 products (the series items from types.ts)
        const mockups = PRODUCTS.slice(0, 4).map(p => ({
          url: files[0], 
          productId: p.id
        }));
        setResults(mockups);
      } else {
        setStatus('正在将多图方案同步至目标产品...');
        await new Promise(r => setTimeout(r, 1500));
        // Apply ALL uploaded images to ONE specific product (the first in the list)
        const targetProduct = PRODUCTS[2]; // Using '联名手提袋' as the target
        const mockups = files.slice(0, 4).map(f => ({
          url: f,
          productId: targetProduct.id
        }));
        setResults(mockups);
      }
    } catch (err) {
      setError("生成失败，请重试");
    } finally {
      setIsProcessing(false);
      setStatus('');
    }
  };

  const handleManualOrder = (product: Product, url: string) => {
    onOrder(product, url);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Input Panel */}
        <div className="lg:w-1/3 space-y-4">
          <div className="bg-card-surface border border-border-subtle rounded-card p-6 shadow-bento space-y-6 flex flex-col h-full">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              上传作品 · 开启定制
            </div>

            <div className="flex p-1 bg-bg-base rounded-xl">
              {(['series', 'select'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setFiles([]); setResults([]); }}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all uppercase tracking-widest leading-tight",
                    mode === m 
                      ? "bg-white shadow-sm text-accent" 
                      : "text-ink-sub hover:text-ink-main"
                  )}
                >
                  {m === 'series' ? '一图多模 (全系展示)' : '多图一选 (精细对比)'}
                </button>
              ))}
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "aspect-square rounded-inner border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all cursor-pointer overflow-hidden relative",
                files.length > 0 ? "border-accent/20 bg-accent/5" : "border-border-subtle hover:border-accent/40 hover:bg-accent/5"
              )}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                multiple={mode === 'select'}
                onChange={handleFileChange}
              />
              {files.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 w-full h-full">
                  {files.slice(0, 4).map((f, i) => (
                    <img key={i} src={f} className="w-full h-full object-cover rounded-sm" />
                  ))}
                  {files.length > 4 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold">
                      +{files.length - 4}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 border border-border-subtle">
                    <Upload className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-bold text-center text-sm">
                    {mode === 'series' ? '点去上传您的原创作品' : '点击上传多张灵感底稿'}
                  </p>
                  <p className="text-[10px] text-ink-sub mt-2 font-bold uppercase tracking-widest text-center leading-relaxed">
                    支持 JPG, PNG, WEBP (最大 10MB)
                  </p>
                </>
              )}
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">设计需求备注 (可选)</label>
              <textarea
                placeholder="例如：保持色彩鲜艳、放大主体图案..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-24 px-4 py-3 bg-bg-base rounded-inner border-none focus:ring-1 ring-accent/50 resize-none font-medium text-xs outline-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-inner flex items-start gap-2 text-red-600">
                <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold leading-tight">{error}</p>
              </div>
            )}

            <button
              disabled={files.length === 0 || isProcessing}
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
                  <span>{mode === 'series' ? '生成全系预览' : '开启多图对比'}</span>
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
                文创商品虚拟展示
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold px-3 py-1 bg-bg-base rounded-full opacity-60 uppercase tracking-widest">
                OPC 渲染引擎 v2.0
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
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((r, i) => {
                    const product = PRODUCTS.find(p => p.id === r.productId);
                    if (!product) return null;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-white rounded-inner overflow-hidden border border-border-subtle shadow-sm hover:shadow-xl hover:border-accent/40 transition-all flex flex-col"
                      >
                        <div className="aspect-square relative flex items-center justify-center p-4 bg-white">
                          {/* Mould Image - Pure White Background Look */}
                          <img 
                            src={product.image} 
                            className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300" 
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* User Design Overlay - Precisely centered print effect */}
                          <div className="absolute inset-0 flex items-center justify-center p-[25%] pointer-events-none">
                            <img 
                              src={r.url} 
                              className="w-full h-full object-contain mix-blend-multiply opacity-90 drop-shadow-sm group-hover:scale-110 transition-transform duration-500" 
                            />
                          </div>

                          {/* Hover Action: Order Button */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-[1px]">
                            <button
                              onClick={() => handleManualOrder(product, r.url)}
                              className="bg-accent text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 active:scale-90"
                            >
                              立即下单该款
                            </button>
                          </div>
                        </div>

                        <div className="p-4 bg-white flex items-center justify-between border-t border-border-subtle">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent opacity-60">
                              {product.category}
                            </p>
                            <p className="font-black text-sm uppercase tracking-wider mt-0.5">
                              {product.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-medium opacity-40 uppercase tracking-widest">单价</p>
                            <p className="font-black text-accent italic">¥{product.price}.00</p>
                          </div>
                        </div>
                        
                        {/* Always visible buy small button for mobile */}
                        <button 
                          onClick={() => handleManualOrder(product, r.url)}
                          className="md:hidden absolute top-4 right-4 bg-accent text-white p-2 rounded-full shadow-lg"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={processImage}
                    className="flex items-center gap-2 px-10 py-4 bg-bg-base border border-border-subtle rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:border-accent transition-all animate-bounce"
                  >
                    <ArrowRight className="w-3 h-3 rotate-180" />
                    <span>重新渲染全系预览</span>
                  </button>
                </div>
              </div>
            ) : !isProcessing && (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-black/10" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg text-ink-main">待生成作品预览</p>
                  <p className="text-ink-sub font-medium max-w-[320px] text-sm">
                    {mode === 'series' 
                      ? '上传一张您的原创大作，我们将全自动适配多款爆款文创周边。' 
                      : '上传多张灵感草图，我们将统一应用至同一款高精底胚中供您对比。'
                    }
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
