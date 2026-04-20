import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import { Product, Design, Order } from '../types';

interface CheckoutViewProps {
  product: Product;
  design: Design;
  onComplete: (order: Order) => void;
  onBack: () => void;
}

export function CheckoutView({ product, design, onComplete, onBack }: CheckoutViewProps) {
  const [isPaying, setIsPaying] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handlePay = async () => {
    setIsPaying(true);
    // Simulate payment delay
    await new Promise(r => setTimeout(r, 2000));
    
    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      designId: design.id,
      productId: product.id,
      quantity,
      status: 'ordered',
      timestamp: new Date().toISOString(),
    };
    
    onComplete(newOrder);
  };

  const total = product.price * quantity;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Product Info */}
        <div className="lg:w-1/2 space-y-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent hover:text-white transition-all bg-accent/5 hover:bg-accent px-6 py-3 rounded-full mb-8 inline-flex border border-accent/20"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            <span>返回重新选择商品</span>
          </button>

          <div className="bg-bg-base rounded-card aspect-square overflow-hidden relative border border-border-subtle shadow-bento">
            <img src={product.image} className="w-full h-full object-cover grayscale opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center p-20">
               <img 
                 src={design.url} 
                 className="w-full h-full object-cover shadow-2xl mix-blend-multiply opacity-90 rounded-inner" 
               />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-[0.3em]">{product.name}</h2>
            <p className="text-black/40 font-medium leading-relaxed">
              您的{design.type === 'ai-generated' ? 'AI 二创设计' : '原创作品'}将由我们的柔性工厂通过高精度印花技术，在 24 小时内完成生产排单。
            </p>
          </div>
        </div>

        {/* Right: Checkout Sidebar */}
        <div className="lg:w-1/2 bg-card-surface border border-border-subtle rounded-card p-10 shadow-bento flex flex-col justify-between">
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                结算详情
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between font-bold">
                <span className="opacity-40 uppercase tracking-widest text-[9px]">选择数量</span>
                <div className="flex items-center gap-4 bg-bg-base px-3 py-2 rounded-full border border-border-subtle">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-accent font-bold transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-white active:scale-90">-</button>
                  <span className="w-4 text-center text-xs">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="hover:text-accent font-bold transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-white active:scale-90">+</button>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border-subtle">
                <div className="flex items-center justify-between opacity-60 font-bold text-xs uppercase tracking-widest">
                  <span>商品小计</span>
                  <span>¥{product.price}.00</span>
                </div>
                <div className="flex items-center justify-between opacity-60 font-bold text-xs uppercase tracking-widest">
                  <span>运费 (包邮活动)</span>
                   <span className="text-success">¥0.00</span>
                </div>
                <div className="flex items-center justify-between text-2xl font-black tracking-tighter pt-4">
                  <span>实付款</span>
                  <span className="text-accent italic font-black">¥{total}.00</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-bg-base border border-border-subtle rounded-inner space-y-2">
                <CreditCard className="w-5 h-5 text-accent opacity-50" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-30">支付方式</p>
                <p className="text-xs font-bold uppercase tracking-widest">模拟支付</p>
              </div>
              <div className="p-5 bg-bg-base border border-border-subtle rounded-inner space-y-2">
                <Truck className="w-5 h-5 text-accent opacity-50" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-30">预计发货</p>
                <p className="text-xs font-bold uppercase tracking-widest">24-48 小时</p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={isPaying}
            className="w-full mt-12 py-5 bg-accent text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-accent/20 disabled:opacity-50"
          >
            {isPaying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>支付确认中...</span>
              </>
            ) : (
              <>
                <span>立即下单生产</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
