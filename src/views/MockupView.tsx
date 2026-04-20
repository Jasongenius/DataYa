import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Design, Product, PRODUCTS } from '../types';
import { cn } from '../lib/utils';

interface MockupViewProps {
  design: Design;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
}

export function MockupView({ design, onSelectProduct, onBack }: MockupViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:opacity-100 transition-opacity bg-accent/5 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" /> 返回编辑器
        </button>
        <div className="text-right space-y-2">
          <div className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            全流程适配预览
          </div>
          <h2 className="text-3xl font-black tracking-tighter">商品化实验室</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full">
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "group bg-card-surface border border-border-subtle rounded-card overflow-hidden flex flex-col shadow-bento hover:border-accent/40 transition-all",
              i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
            )}
          >
            {/* Mockup Display */}
            <div className={cn(
              "relative bg-bg-base overflow-hidden flex-1",
              i === 0 ? "aspect-square md:aspect-auto" : "aspect-square"
            )}>
              <img 
                src={product.image} 
                className="w-full h-full object-cover grayscale opacity-80" 
                alt={product.name}
              />
              
              {/* The "Print" Overlay - Simulated positioning per product */}
              <div className={cn(
                "absolute inset-0 flex items-center justify-center pointer-events-none",
                i === 0 ? "p-32" : "p-12"
              )}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="w-full h-full shadow-2xl overflow-hidden rounded-inner border border-white/20"
                  style={{ 
                    transform: i === 0 
                      ? 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' 
                      : 'perspective(500px) rotateX(1deg) rotateY(-1deg)' 
                  }}
                >
                  <img 
                    src={design.url} 
                    className="w-full h-full object-cover opacity-85 mix-blend-multiply" 
                    alt="Design Preview"
                  />
                </motion.div>
              </div>

              <div className="absolute top-4 left-4">
                <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[8px] font-black text-ink-main uppercase tracking-[0.2em] border border-border-subtle">
                  {product.category}
                </div>
              </div>

              <div className="absolute inset-0 bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => onSelectProduct(product)}
                  className="bg-white text-accent px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-transform shadow-xl"
                >
                  立即下单 <ShoppingCart className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className={cn("p-4 flex items-center justify-between border-t border-border-subtle", i === 0 ? "md:p-8" : "md:p-4")}>
              <div className="space-y-1">
                <h3 className={cn("font-black tracking-[0.3em] uppercase", i === 0 ? "text-xl" : "text-xs")}>{product.name}</h3>
                <p className="text-ink-sub text-[8px] font-bold uppercase tracking-widest">OPC 柔性供应 · 指定工厂</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-30 block">单价</span>
                <span className={cn("font-black text-accent italic tracking-tighter", i === 0 ? "text-2xl" : "text-sm")}>¥{product.price}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaign Section */}
      <div className="bg-[#1D1D1F] rounded-card p-12 overflow-hidden relative shadow-bento">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent rounded-full text-[10px] font-black text-white uppercase tracking-widest">Premium Collection</div>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
              全渠道覆盖，<br />多场景自动适配。
            </h3>
            <p className="text-white/40 font-medium max-w-sm">
              数字鸭 智能排版算法会根据产品形态自动优化图案比例与透视，确保每一件产品都具备设计师级别的审美标准。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-inner bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white/60 space-y-2">
              <Eye className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest">电商主图</span>
            </div>
            <div className="aspect-square rounded-inner bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white/60 space-y-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest">详情物料</span>
            </div>
            <div className="aspect-square rounded-inner bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white/60 space-y-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest">一键上架</span>
            </div>
            <div className="aspect-square rounded-inner bg-accent flex flex-col items-center justify-center text-white space-y-2">
              <Box className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">柔性供应</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Box({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
