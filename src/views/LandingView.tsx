import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Box, TrendingUp } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="flex flex-col bg-bg-base">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center md:justify-end overflow-hidden px-6 md:px-[10%]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=2000" 
              alt="Designer Workspace"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-5xl text-center md:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-3 h-3 text-orange-400" />
            赋能设计师“一人公司” · 全流程 AI POD
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-[0.4em]"
          >
            AI让设计师<br />成为一台<span className="text-accent italic">工厂</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-white/80 max-w-2xl mx-auto md:mx-0 font-medium"
          >
            数字鸭 × OPC: 演示“一人公司”如何通过AI完成从设计 → 展示 → 销售 → 生产的完整闭环
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <button 
              onClick={onStart}
              className="group bg-accent hover:bg-accent/90 text-white px-10 py-5 rounded-full text-lg font-bold flex items-center gap-3 transition-all active:scale-95 shadow-2xl shadow-accent/20"
            >
              立即开启创作
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 rounded-full text-lg font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
              查看 Demo 案例
            </button>
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-[0.3em] leading-none">
                完整闭环全链路闭幕
              </h2>
              <p className="text-black/40 text-lg font-medium">
                从创意产生到最终交付，AI 辅助你完成每一步。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Sparkles, 
                title: 'AI 创意共建', 
                desc: '利用爆款基因进行二创，或者上传你的原创作品。AI 自动优化构图，风格迁移。',
                step: '01'
              },
              { 
                icon: Box, 
                title: '智能商品化', 
                desc: '自动生成 5+ 种品类的 3D 贴图预览，包含生活方式场景化展示。',
                step: '02'
              },
              { 
                icon: TrendingUp, 
                title: '柔性生产交付', 
                desc: '对接自动化供应链，实时监测生产进度。下单即排产，单件起订。',
                step: '03'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 border border-black/5 rounded-[40px] hover:border-orange-500/20 transition-colors"
              >
                <div className="absolute top-8 right-8 text-6xl font-black opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-accent/5 rounded-2xl flex items-center justify-center mb-8">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-black/50 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios Split Section */}
      <section className="py-32 bg-[#F9F9F8]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#1D1D1F] rounded-[48px] p-12 overflow-hidden relative group">
            <div className="relative z-10 space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-500 rounded-full text-[10px] font-black text-white uppercase tracking-widest">场景 01</div>
              <h3 className="text-4xl font-black text-white tracking-[0.3em]">爆款风格二创</h3>
              <p className="text-white/40 font-medium">借鉴参考图的设计基因，通过 AI 生成具有相似美感但具备原创性的设计方案。</p>
              <button onClick={onStart} className="flex items-center gap-2 text-white font-bold group">
                开始体验 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800" 
              className="absolute -bottom-20 -right-20 w-80 h-80 object-cover rounded-full opacity-50 blur-2xl group-hover:scale-110 transition-transform duration-1000"
              alt="Scenario 1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="bg-white border border-border-subtle rounded-[48px] p-12 overflow-hidden relative group shadow-bento">
            <div className="relative z-10 space-y-6">
              <div className="inline-block px-3 py-1 bg-accent rounded-full text-[10px] font-black text-white uppercase tracking-widest">场景 02</div>
              <h3 className="text-4xl font-black tracking-[0.3em]">原创商品化</h3>
              <p className="text-black/40 font-medium">快速将你的个人作品应用到全新品类的实物模型上，一键生成电商详情图。</p>
              <button onClick={onStart} className="flex items-center gap-2 text-black font-bold group">
                上传作品 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800" 
              className="absolute -bottom-20 -right-20 w-80 h-80 object-cover rounded-full opacity-10 blur-2xl group-hover:scale-110 transition-transform duration-1000"
              alt="Scenario 2"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
