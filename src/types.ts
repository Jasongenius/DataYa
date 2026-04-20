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

export interface Order {
  id: string;
  designId: string;
  productId: string;
  quantity: number;
  status: 'ordered' | 'printing' | 'cutting' | 'sewing' | 'qc' | 'shipping';
  timestamp: string;
}

export const PRODUCTS: Product[] = [
  { id: 'tote', name: '帆布托特包', price: 49, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', category: '配饰' },
  { id: 'pouch', name: '匠心手拿包', price: 29, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800', category: '配饰' },
  { id: 'tshirt', name: '高级纯棉T恤', price: 89, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', category: '服饰' },
  { id: 'phone', name: '磨砂手机壳', price: 35, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800', category: '数码' },
  { id: 'pillow', name: '柔软丝绒抱枕', price: 45, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800', category: '家居' },
];

export const TRACKING_STEPS = [
  { id: 'ordered', label: '订单已确认', description: '您的订单正在处理中', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400' },
  { id: 'printing', label: 'AI 智能喷绘', description: '正在将您的设计应用于面料', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400' },
  { id: 'cutting', label: '精密激光裁剪', description: '激光精密切割，完美契合', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400' },
  { id: 'sewing', label: '手工缝制', description: '精心打造您的每一件作品', image: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?auto=format&fit=crop&q=80&w=400' },
  { id: 'qc', label: '严格质检', description: '仔细检查每一个细节', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400' },
  { id: 'shipping', label: '极速发货', description: '您的专属定制正在极速派送', image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800' },
];
