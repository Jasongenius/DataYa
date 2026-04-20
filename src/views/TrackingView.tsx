import { motion } from 'motion/react';
import { Package, MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Order, TRACKING_STEPS, PRODUCTS } from '../types';

interface TrackingViewProps {
  order: Order;
}

export function TrackingView({ order }: TrackingViewProps) {
  const currentStepIndex = TRACKING_STEPS.findIndex(s => s.id === order.status);
  const product = PRODUCTS.find(p => p.id === order.productId);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div className="bg-card-surface border border-border-subtle rounded-card p-8 md:p-12 shadow-bento">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pb-8 border-b border-border-subtle">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-success">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              自动化工厂生产中
            </div>
            <h2 className="text-3xl font-black tracking-[0.3em]">订单编号: {order.id}</h2>
            <p className="text-ink-sub font-bold text-xs uppercase tracking-widest">{product?.name} · {order.quantity} 件</p>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block mb-1">预计送达</span>
              <div className="flex items-center gap-2 font-bold whitespace-nowrap text-xs uppercase tracking-widest text-accent">
                <Calendar className="w-3 h-3" />
                2026年4月21日
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block mb-1">已用耗时</span>
              <div className="flex items-center gap-2 font-bold whitespace-nowrap text-xs uppercase tracking-widest text-accent">
                <Clock className="w-3 h-3" />
                12 小时 45 分
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-12 px-4 md:px-12 relative">
          {/* Tracking Line */}
          <div className="absolute left-[2.5rem] md:left-[5.5rem] top-8 bottom-8 w-[2px] bg-border-subtle z-0" />
          
          {TRACKING_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isFuture = idx > currentStepIndex;

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative z-10 flex gap-8 md:gap-16 items-start ${isFuture ? 'opacity-30 grayscale' : ''}`}
              >
                {/* Status Dot */}
                <div className="relative">
                  <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl ${
                    isCompleted ? 'bg-accent text-white' : 
                    isCurrent ? 'bg-accent outline outline-4 outline-accent/10 pulse-animation text-white' : 'bg-bg-base text-ink-sub/20'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8" /> : <span className="font-black text-xs md:text-xl">{(idx + 1).toString().padStart(2, '0')}</span>}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-transparent">
                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-black tracking-tighter uppercase">{step.label}</h4>
                    <p className="font-medium text-ink-sub text-sm leading-relaxed">{step.description}</p>
                    {isCurrent && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/5 text-accent rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">
                        OPC 实时连接中
                      </div>
                    )}
                  </div>
                  
                  {/* Step Image */}
                  <div className="relative group">
                    <div className="aspect-video rounded-inner overflow-hidden border border-border-subtle shadow-lg">
                      <img 
                        src={step.image} 
                        alt={step.label} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {isCurrent && (
                      <div className="absolute top-4 right-4 animate-ping w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_#2D62FF]" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
        <div className="p-10 bg-[#1D1D1F] rounded-card space-y-6 shadow-bento">
          <MapPin className="w-10 h-10 text-accent" />
          <h3 className="text-3xl font-black tracking-tighter leading-tight uppercase">智能排产系统</h3>
          <p className="text-white/40 font-medium leading-relaxed">您的订单已进入 OPC 自动化供应链网络。从数字化设计到物理生产，每一个原子都经过精准排列。</p>
        </div>
        <div className="p-10 bg-accent rounded-card space-y-6 shadow-bento">
          <Package className="w-10 h-10 text-white" />
          <h3 className="text-3xl font-black tracking-tighter leading-tight uppercase">柔性交付体系</h3>
          <p className="text-white/80 font-medium leading-relaxed">预计 48h 内发货。工厂顺丰速运直发。您可以在此处实时追踪每一道工序，感受数字化制造的力量。</p>
        </div>
      </div>
    </div>
  );
}
