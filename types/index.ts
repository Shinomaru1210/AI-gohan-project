// 冷蔵庫の食材データ型
export interface FridgeItem {
  id: string;
  name: string;
  category: string;
  amount?: string;
  unit?: string;
  count?: string;
  expiry?: string;
  image?: string;
  location: '冷蔵' | '冷凍' | 'その他';
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

// 買い物リストのアイテム型
export interface BuyListItem {
  id: string;
  name: string;
  checked: boolean;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  amount?: string;
  memo?: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

// カテゴリの型定義
export type Category = '野菜' | '肉類' | '魚介類' | '卵・乳製品' | '主食' | '調味料' | 'その他';

// 優先度の型定義
export type Priority = 'high' | 'medium' | 'low';

// 保存場所の型定義
export type Location = '冷蔵' | '冷凍' | 'その他';
