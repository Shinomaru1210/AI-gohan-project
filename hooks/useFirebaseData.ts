import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { buyListService, fridgeService } from '../services/firebaseService';
import { BuyListItem, FridgeItem } from '../types';

// 冷蔵庫データ用のフック
export const useFridgeData = (userId?: string) => {
  const [items, setItems] = useState<FridgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // データを取得
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fridgeService.getAllItems(userId);
      setItems(data);
    } catch (err) {
      setError('データの取得に失敗しました');
      console.error('データ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // アイテムを追加
  const addItem = useCallback(async (item: Omit<FridgeItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const id = await fridgeService.addItem(item);
      const newItem: FridgeItem = {
        ...item,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setItems(prev => [newItem, ...prev]);
      return id;
    } catch (err) {
      Alert.alert('エラー', '食材の追加に失敗しました');
      throw err;
    }
  }, []);

  // アイテムを更新
  const updateItem = useCallback(async (id: string, updates: Partial<FridgeItem>) => {
    try {
      await fridgeService.updateItem(id, updates);
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date() }
          : item
      ));
    } catch (err) {
      Alert.alert('エラー', '食材の更新に失敗しました');
      throw err;
    }
  }, []);

  // アイテムを削除
  const deleteItem = useCallback(async (id: string) => {
    try {
      await fridgeService.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      Alert.alert('エラー', '食材の削除に失敗しました');
      throw err;
    }
  }, []);

  // 初回読み込み
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    refresh: fetchItems,
  };
};

// 買い物リストデータ用のフック
export const useBuyListData = (userId?: string) => {
  const [items, setItems] = useState<BuyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // データを取得
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await buyListService.getAllItems(userId);
      setItems(data);
    } catch (err) {
      setError('データの取得に失敗しました');
      console.error('データ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // アイテムを追加
  const addItem = useCallback(async (item: Omit<BuyListItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const id = await buyListService.addItem(item);
      const newItem: BuyListItem = {
        ...item,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setItems(prev => [newItem, ...prev]);
      return id;
    } catch (err) {
      Alert.alert('エラー', 'アイテムの追加に失敗しました');
      throw err;
    }
  }, []);

  // アイテムを更新
  const updateItem = useCallback(async (id: string, updates: Partial<BuyListItem>) => {
    try {
      await buyListService.updateItem(id, updates);
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date() }
          : item
      ));
    } catch (err) {
      Alert.alert('エラー', 'アイテムの更新に失敗しました');
      throw err;
    }
  }, []);

  // アイテムを削除
  const deleteItem = useCallback(async (id: string) => {
    try {
      await buyListService.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      Alert.alert('エラー', 'アイテムの削除に失敗しました');
      throw err;
    }
  }, []);

  // チェック状態を切り替え
  const toggleCheck = useCallback(async (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      await updateItem(id, { checked: !item.checked });
    }
  }, [items, updateItem]);

  // 全メモをクリア
  const clearAllMemos = useCallback(async () => {
    try {
      await buyListService.clearAllMemos(userId);
      setItems(prev => prev.map(item => ({ ...item, memo: '' })));
    } catch (err) {
      Alert.alert('エラー', 'メモのクリアに失敗しました');
      throw err;
    }
  }, [userId]);

  // 初回読み込み
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    toggleCheck,
    clearAllMemos,
    refresh: fetchItems,
  };
};
