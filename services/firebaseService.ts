import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { BuyListItem, FridgeItem } from '../types';

// 冷蔵庫サービスクラス
export class FridgeService {
  private collectionName = 'fridge';

  // 食材を追加
  async addItem(item: Omit<FridgeItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('食材の追加に失敗しました:', error);
      throw error;
    }
  }

  // 食材を更新
  async updateItem(id: string, updates: Partial<FridgeItem>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('食材の更新に失敗しました:', error);
      throw error;
    }
  }

  // 食材を削除
  async deleteItem(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('食材の削除に失敗しました:', error);
      throw error;
    }
  }

  // 全食材を取得
  async getAllItems(userId?: string): Promise<FridgeItem[]> {
    try {
      let q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      
      if (userId) {
        q = query(q, where('userId', '==', userId));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as FridgeItem[];
    } catch (error) {
      console.error('食材の取得に失敗しました:', error);
      throw error;
    }
  }

  // カテゴリ別に食材を取得
  async getItemsByCategory(category: string, userId?: string): Promise<FridgeItem[]> {
    try {
      let q = query(
        collection(db, this.collectionName),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      
      if (userId) {
        q = query(q, where('userId', '==', userId));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as FridgeItem[];
    } catch (error) {
      console.error('カテゴリ別食材の取得に失敗しました:', error);
      throw error;
    }
  }
}

// 買い物リストサービスクラス
export class BuyListService {
  private collectionName = 'buyList';

  // アイテムを追加
  async addItem(item: Omit<BuyListItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('買い物リストアイテムの追加に失敗しました:', error);
      throw error;
    }
  }

  // アイテムを更新
  async updateItem(id: string, updates: Partial<BuyListItem>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('買い物リストアイテムの更新に失敗しました:', error);
      throw error;
    }
  }

  // アイテムを削除
  async deleteItem(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('買い物リストアイテムの削除に失敗しました:', error);
      throw error;
    }
  }

  // 全アイテムを取得
  async getAllItems(userId?: string): Promise<BuyListItem[]> {
    try {
      let q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      
      if (userId) {
        q = query(q, where('userId', '==', userId));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as BuyListItem[];
    } catch (error) {
      console.error('買い物リストアイテムの取得に失敗しました:', error);
      throw error;
    }
  }

  // チェック済みアイテムを取得
  async getCheckedItems(userId?: string): Promise<BuyListItem[]> {
    try {
      let q = query(
        collection(db, this.collectionName),
        where('checked', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      if (userId) {
        q = query(q, where('userId', '==', userId));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as BuyListItem[];
    } catch (error) {
      console.error('チェック済みアイテムの取得に失敗しました:', error);
      throw error;
    }
  }

  // 全メモをクリア
  async clearAllMemos(userId?: string): Promise<void> {
    try {
      const items = await this.getAllItems(userId);
      const updatePromises = items.map(item => 
        this.updateItem(item.id, { memo: '' })
      );
      await Promise.all(updatePromises);
    } catch (error) {
      console.error('メモのクリアに失敗しました:', error);
      throw error;
    }
  }
}

// インスタンスをエクスポート
export const fridgeService = new FridgeService();
export const buyListService = new BuyListService();
