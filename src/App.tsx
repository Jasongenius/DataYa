import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingView } from './views/LandingView';
import { CreatorView } from './views/CreatorView';
import { MockupView } from './views/MockupView';
import { CheckoutView } from './views/CheckoutView';
import { TrackingView } from './views/TrackingView';
import { Order, TRACKING_STEPS, PRODUCTS, ViewState, Design, Product } from './types';
import { DuckIcon } from './components/DuckIcon';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const handleSelectDesign = (design: Design) => {
    setCurrentDesign(design);
    setView('mockup');
  };

  const handleStartCheckout = (product: Product) => {
    setSelectedProduct(product);
    setView('checkout');
  };

  const handleOrderComplete = (newOrder: Order) => {
    setOrder(newOrder);
    setView('tracking');
  };

  const advanceTracking = () => {
    if (!order) return;
    const currentIdx = TRACKING_STEPS.findIndex(s => s.id === order.status);
    const nextIdx = Math.min(TRACKING_STEPS.length - 1, currentIdx + 1);
    setOrder({ ...order, status: TRACKING_STEPS[nextIdx].id as Order['status'] });
    setView('tracking');
  };

  return (
    <div className="min-h-screen bg-bg-base text-ink-main font-sans tracking-tight selection:bg-accent/10">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-base/80 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => setView('landing')}
          >
            <DuckIcon className="w-6 h-6 text-accent" />
            <span className="font-extrabold text-lg tracking-tighter uppercase">数字鸭<span className="text-accent"> × OPC</span></span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setView('landing')} className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">首页</button>
            <button onClick={() => setView('creator')} className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">工作室</button>
            {order && (
              <button onClick={advanceTracking} className="text-xs font-bold uppercase tracking-widest text-accent hover:opacity-80">追踪订单</button>
            )}
            <div className="h-4 w-[1px] bg-border-subtle mx-2" />
            <button 
              onClick={() => setView('creator')}
              className="bg-accent text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-transform active:scale-95 hover:bg-accent/90 shadow-sm"
            >
              立即创作
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-14 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {view === 'landing' && <LandingView onStart={() => setView('creator')} />}
            {view === 'creator' && <CreatorView onSelectDesign={handleSelectDesign} />}
            {view === 'mockup' && currentDesign && (
              <MockupView 
                design={currentDesign} 
                onSelectProduct={handleStartCheckout}
                onBack={() => setView('creator')}
              />
            )}
            {view === 'checkout' && selectedProduct && currentDesign && (
              <CheckoutView 
                product={selectedProduct} 
                design={currentDesign}
                onComplete={handleOrderComplete}
                onBack={() => setView('mockup')}
              />
            )}
            {view === 'tracking' && order && <TrackingView order={order} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-border-subtle bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DuckIcon className="w-6 h-6 text-accent" />
              <span className="font-extrabold text-lg uppercase tracking-tighter">数字鸭</span>
            </div>
            <p className="text-ink-sub leading-relaxed font-medium">
              Empowering the One-Person Company with industrial-grade AI and automated supply chains.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] opacity-40">平台中心</h4>
            <ul className="space-y-4 font-bold text-xs uppercase tracking-wider opacity-60">
              <li><a href="#" className="hover:text-accent transition-colors">AI 创作中心</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">虚拟商品化预览</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">自动化排产</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">全球化物流</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] opacity-40">设计师资源</h4>
            <ul className="space-y-4 font-bold text-xs uppercase tracking-wider opacity-60">
              <li><a href="#" className="hover:text-accent transition-colors">设计灵感包</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">API 开发者文档</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">商业成功案例</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">供应链常见问题</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] opacity-40">社交与连接</h4>
            <ul className="space-y-4 font-bold text-xs uppercase tracking-wider opacity-60">
              <li><a href="#" className="hover:text-accent transition-colors">小红书</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">抖音</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">微信公众号</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">联系我们</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
