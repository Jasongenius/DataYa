import { useState } from 'react';
import { PRODUCTION_STEPS } from '../types';

export function IndustrialDashboard() {
  const [query, setQuery] = useState('JY202604172920');
  const items = ['A0232867', 'A0232866'];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Search Header */}
      <div className="bg-white border-b border-border-subtle px-6 py-4 flex justify-center items-center gap-4">
        <span className="text-sm font-bold text-ink-main">请输入JY信息：</span>
        <div className="flex w-full max-w-md">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-border-subtle rounded-l-md focus:outline-none focus:ring-1 ring-accent/30 bg-[#F9FBFF]"
          />
          <button className="bg-[#2EB06F] text-white px-6 py-2 rounded-r-md font-bold text-sm hover:opacity-90 transition-opacity">
            查询
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 mt-8 space-y-4">
        {/* Banner Info */}
        <div className="bg-[#41844B] text-white p-6 rounded-md shadow-sm text-center space-y-2">
          <h2 className="text-lg font-bold tracking-widest">预计完成时间：~</h2>
          <p className="text-sm opacity-90 font-medium tracking-widest">
            {query} 全部货品唯一码信息：{items.join(', ')}
          </p>
        </div>

        {/* Dashboard Table */}
        <div className="bg-white border border-border-subtle rounded-sm overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-[120px_1fr_1fr_120px_180px_150px_120px] bg-[#2EB06F] text-white text-[10px] font-bold py-3 px-4 uppercase tracking-wider text-center items-center">
            <div>货品唯一码</div>
            <div>sku</div>
            <div>sku唯一码</div>
            <div>最后更新工序</div>
            <div>最后更新时间</div>
            <div>所属单号</div>
            <div>预计完成时间</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border-subtle">
            {items.map((itemId) => (
              // @ts-ignore - TS error with key on custom component in this environment
              <ProductionRow key={itemId} itemId={itemId} query={query} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductionRowProps {
  itemId: string;
  query: string;
}

function ProductionRow({ itemId, query }: ProductionRowProps) {
  return (
    <div className="grid grid-cols-[120px_1fr] bg-white">
      {/* Left Col: ID */}
      <div className="flex flex-col items-center justify-center border-r border-border-subtle bg-white py-12">
        <span className="text-[#2EB06F] font-black text-xs">{itemId}</span>
      </div>

      {/* Right Col: Content & Timeline */}
      <div className="flex flex-col">
        {/* Step Info Sub-row */}
        <div className="grid grid-cols-[1fr_1fr_120px_180px_150px_120px] text-[10px] py-3 px-4 font-bold border-b border-border-subtle text-center items-center">
          <div className="text-ink-sub">YLCX-046-AC387-ZH02</div>
          <div className="text-ink-sub">YLCX-046-AC387-ZH02_{query}_002</div>
          <div>包装</div>
          <div>2026-04-18 20:42:31</div>
          <div>{query}</div>
          <div className="text-ink-sub">已完成</div>
        </div>

        {/* Horizontal Timeline */}
        <div className="p-8 pb-12 overflow-x-auto">
          <div className="flex items-center min-w-[1000px] relative px-4">
            {PRODUCTION_STEPS.map((step, idx) => {
              const isLast = idx === PRODUCTION_STEPS.length - 1;
              return (
                <div key={step.id} className="flex-1 flex flex-col items-center relative">
                  {/* Duration Label */}
                  {!isLast && (
                    <div className="absolute left-[50%] -top-4 w-full flex justify-center z-20">
                      <span className="bg-[#2EB06F] text-white text-[8px] px-2 py-0.5 rounded-full font-bold">
                        {step.duration}
                      </span>
                    </div>
                  )}

                  {/* Node & Line */}
                  <div className="flex items-center w-full relative h-10">
                    {!isLast && (
                      <div className="absolute left-[50%] right-[-50%] top-1/2 h-[1px] bg-[#2EB06F] -translate-y-1/2 z-0" />
                    )}
                    <div className="relative z-10 w-full flex justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#2EB06F] border-2 border-white shadow-sm ring-1 ring-[#2EB06F]/50" />
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="mt-4 bg-[#F8F9FA] border border-border-subtle rounded p-3 w-40 shadow-sm space-y-1 text-center">
                    <div className="text-[10px] font-black text-ink-main uppercase tracking-widest">{step.label}</div>
                    <div className="text-[8px] text-ink-sub font-medium">{step.time.split(' ')[0]}</div>
                    <div className="text-[8px] text-ink-sub font-medium">{step.time.split(' ')[1]}</div>
                    <div className="text-[8px] text-ink-sub pt-1 font-bold border-t border-border-subtle/50">{step.operator}</div>
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
