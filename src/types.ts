export type ViewState = 'landing' | 'creator' | 'mockup' | 'checkout' | 'tracking';

export interface Design {
  id: string;
  url: string;
  type: 'original' | 'ai-generated';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // The white mould/product image
  category: string;
}

export interface ProductionStep {
  id: string;
  label: string;
  time: string;
  operator: string;
  duration?: string;
  status: 'completed' | 'processing' | 'pending';
}

export interface TrackingStep {
  id: string;
  label: string;
  description: string;
  image: string;
}

export interface Order {
  id: string;
  designId: string;
  productId: string;
  quantity: number;
  status: string; // Production step ID
  timestamp: string;
}

export const PRODUCTS: Product[] = [
  { id: 'storage-box', name: '文物收纳篮', price: 45, image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=800', category: '文创生活' },
  { id: 'tissue-retro', name: '复古手作纸巾盒', price: 35, image: 'https://images.unsplash.com/photo-1610450532272-9426f0bc6223?auto=format&fit=crop&q=80&w=800', category: '文创生活' },
  { id: 'tote-bucket', name: '联名抽绳水桶包', price: 129, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800', category: '包袋系列' },
  { id: 'pencil-case', name: '极简多功能笔袋', price: 25, image: 'https://images.unsplash.com/photo-1590333746438-28310c804e5d?auto=format&fit=crop&q=80&w=800', category: '办公文具' },
  { id: 'bag-bucket', name: '极简圆筒包', price: 129, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', category: '包袋系列' },
  { id: 'bag-tote', name: '托特随身包', price: 89, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800', category: '包袋系列' },
];

export const TRACKING_STEPS: TrackingStep[] = [
  { id: 'drag', label: '设计订单已确认', description: '您的原创设计已成功上传并进入自动化生产队列', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400' },
  { id: 'transfer', label: 'AI 智能喷绘转印', description: '正在将设计通过纳米技术精确还原至产品面料', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400' },
  { id: 'cut', label: '精密激光裁剪', description: '激光精密切割，确保每一个边缘都契合完美', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400' },
  { id: 'outsource', label: '手工缝制与外协', description: '经验丰富的匠人正在完成最后的组装工作', image: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?auto=format&fit=crop&q=80&w=400' },
  { id: 'pack', label: '质检与包装', description: '严格的产品质量检查，确保您的唯一作品完美送达', image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800' },
];

export const PRODUCTION_STEPS: ProductionStep[] = [
  { id: 'drag', label: '拖图', time: '2026-04-17 22:17:59', operator: '系统自动', duration: '10.22小时', status: 'completed' },
  { id: 'transfer', label: '转印', time: '2026-04-18 08:31:15', operator: '张师傅', duration: '1.16小时', status: 'completed' },
  { id: 'cut', label: '裁剪', time: '2026-04-18 09:40:37', operator: '汪俊', duration: '0.72小时', status: 'completed' },
  { id: 'sort', label: '分拣', time: '2026-04-18 10:23:32', operator: '刘露静', duration: '0.41小时', status: 'completed' },
  { id: 'outsource', label: '外发', time: '2026-04-18 10:47:53', operator: '刘志翠', duration: '3.78小时', status: 'completed' },
  { id: 'receipt', label: '外协收货', time: '2026-04-18 14:34:35', operator: '小芳', duration: '0.04小时', status: 'completed' },
  { id: 'report', label: '外协报工', time: '2026-04-18 14:36:59', operator: '小芳', duration: '1.5小时', status: 'completed' },
  { id: 'hang', label: '外发挂片', time: '2026-04-18 16:06:54', operator: '1108员工4', duration: '4.59小时', status: 'completed' },
  { id: 'pack', label: '包装', time: '2026-04-18 20:42:21', operator: '1102员工5', status: 'processing' },
];
