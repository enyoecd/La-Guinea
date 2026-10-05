export interface TableInfo {
  id: string;
  name: string;
  area: string;
  status?: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface Dish {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  tag?: string;
  tagType?: 'primary' | 'secondary' | 'spicy' | 'deal' | 'neutral';
  spicyLevel?: number; // 0 to 3
  isVeggie?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  hasCustomMeatPoint?: boolean;
  sidesOptions?: CustomizationOption[];
  extraDipsOptions?: CustomizationOption[];
  servesCount?: string;
}

export interface OrderItem {
  cartId: string;
  dishId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  selectedMeatPoint?: string;
  selectedSide?: string;
  selectedDips?: string[];
  notes?: string;
}

export type OrderStatus = 'none' | 'received' | 'cooking' | 'ready' | 'served';

export interface ActiveOrder {
  orderNumber: string;
  table: string;
  timestamp: string;
  items: OrderItem[];
  subtotal: number;
  tipAmount: number;
  tipPercent: number;
  total: number;
  status: OrderStatus;
  statusProgress: number; // 0 to 100
  notes: string;
}
