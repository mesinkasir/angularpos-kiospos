export interface CartItem {
  id: string;
  category: string;
  delete: any;
  product: string;
  quantity: number;
  price: number;
  total_price: number;
  discountsApplied?: string;
  appliedTo?: string;
  applyTo: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  available: string;
  applyTo?: string;
}

export interface Promotion {
  id: string;
  name: string;
  category: string;
  price: string;
  available: string;
  applyTo?: string;
}

export interface ConfigJson {
  products: Product[];
  promotions: Promotion[];
}
