import { motion } from 'motion/react';
import { ArrowLeft, Package, CheckCircle2, Clock, MapPin, Truck } from 'lucide-react';
import { Order, TRACKING_STEPS, PRODUCTS } from '../types';
import { cn } from '../lib/utils';

interface TrackingViewProps {
  order: Order;
  onBack: () => void;
}

export function TrackingView({ order, onBack }: TrackingViewProps) {
  const currentStepIdx = TRACKING_STEPS.findIndex(s => s.id === order.status);
  const product = PRODUCTS.find(p => p.id === order.productId);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent hover:text-white transition-all bg-accent/5 hover:bg-accent px-6 py-3 rounded-full mb-8 border border-accent/20"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
        <span>返回上一页继续挑选商品</span>
      </button>

      <div className="bg-card-surface border border-border-subtle rounded-card p-12 shadow-bento space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full text-[10px] font-black text-green-600 uppercase tracking-widest border border-green-100">
              <CheckCircle2 className="w-3 h-3" /> 订单已启动排产
            </div>
            <h2 className="text-4xl font-black tracking-tighter">订单编号: {order.id}</h2>
            <div className="flex items-center gap-4 text-xs font-bold text-ink-sub uppercase tracking-wider">
              <span>下单时间: {new Date(order.timestamp).toLocaleString()}</span>
              <span>•</span>
              <span>货品: {product?.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-bg-base p-4 rounded-xl border border-border-subtle">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase opacity-40">急速发货</p>
              <p className="text-xs font-bold">预计 24 小时内出库</p>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-border-subtle" />

          <div className="space-y-12">
            {TRACKING_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              const isPending = idx > currentStepIdx;

              return (
                <div key={step.id} className="relative pl-14 group">
                  {/* Status Dot */}
                  <div className={cn(
                    "absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-all",
                    isCompleted ? "bg-accent text-white" : "",
                    isCurrent ? "bg-white text-accent border-accent animate-pulse" : "",
                    isPending ? "bg-bg-base text-ink-sub border-border-subtle" : ""
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className={cn(
                          "text-lg font-black tracking-tight",
                          isPending ? "opacity-30" : "opacity-100"
                        )}>
                          {step.label}
                        </h4>
                        {isCurrent && (
                          <span className="px-2 py-0.5 bg-accent text-white text-[8px] font-black rounded uppercase tracking-widest">
                            正在进行
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        "text-sm font-medium leading-relaxed max-w-md",
                        isPending ? "opacity-20" : "text-ink-sub"
                      )}>
                        {step.description}
                      </p>
                      
                      {!isPending && (
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase tracking-widest">
                            <Clock className="w-3 h-3" /> {isCompleted ? '已完成' : '预估耗时: 2h'}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-ink-sub uppercase tracking-widest opacity-40">
                            <MapPin className="w-3 h-3" /> OPC-自动化工厂-01
                          </div>
                        </div>
                      )}
                    </div>

                    {!isPending && (
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full md:w-48 aspect-video rounded-xl overflow-hidden border border-border-subtle shadow-sm grayscale-[0.5] group-hover:grayscale-0 transition-all"
                       >
                         <img src={step.image} className="w-full h-full object-cover" />
                       </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
