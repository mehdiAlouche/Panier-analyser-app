export interface Product {
  ProductID: number;
  ProductName: string;
  Category: string;
  Price: number;
  totalSales: number;
  totalQuantity: number;
}

export interface SalesByCategory {
  category: string;
  totalSales: number;
  totalQuantity: number
  percentage: number;
}

export interface SalesByProducts {
  ProductName: string;
  totalSales: number;
  totalQuantity: number
}

export interface TopProduct {
  productID: number;
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
}

export interface User {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export type TimePeriod = '7days' | '30days' | '12months' | 'all';