import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Animated, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, IconButton, Surface, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FridgeScreen() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<{
    id: string,
    name: string,
    category: string,
    amount?: string,
    unit?: string,
    count?: string,
    expiry?: string,
    image?: string,
    location: '冷蔵' | '冷凍' | 'その他',
  }[]>([
    { id: '1', name: 'にんじん', category: '野菜', amount: '2', unit: '', count: '2', expiry: '2024-01-15', location: '冷蔵' },
    { id: '2', name: 'たまねぎ', category: '野菜', amount: '1', unit: '', count: '1', expiry: '2024-01-20', location: '冷蔵' },
    { id: '3', name: '豚肉', category: '肉類', amount: '200', unit: 'g', count: '1', expiry: '2024-01-12', location: '冷凍' },
    { id: '4', name: '卵', category: '乳製品', amount: '50', unit: 'g', count: '6', expiry: '2024-01-18', location: '冷蔵' },
    { id: '5', name: '牛乳', category: '乳製品', amount: '1000', unit: 'ml', count: '2', expiry: '2024-01-14', location: 'その他' },
  ]);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('野菜');
  const [newExpiry, setNewExpiry] = useState('');
  const [newImage, setNewImage] = useState<string | undefined>(undefined);

  const pickNewImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('許可が必要です', '写真ライブラリへのアクセスを許可してください');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const handleAddIngredient = () => {
    if (!newName.trim()) {
      Alert.alert('食材名を入力してください');
      return;
    }
    setIngredients(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName,
        category: newCategory,
        expiry: newExpiry,
        image: newImage ?? undefined,
        location: '冷蔵', // デフォルトでは冷蔵
      },
    ]);
    setModalVisible(false);
    setNewName('');
    setNewCategory('野菜');
    setNewExpiry('');
    setNewImage(undefined);
  };

  // テーマカラーの取得
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = '#6C757D';

  const categoryColors = {
    '野菜': '#4CAF50',
    '肉類': '#F44336',
    '乳製品': '#616161', // 濃いグレーに統一
    '調味料': '#FF9800',
    'その他': '#9C27B0',
  };

  const handleDelete = (id: string) => {
    setIngredients(prev => prev.filter(item => item.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '野菜': return 'food-apple';
      case '肉類': return 'food-steak';
      case '乳製品': return 'food-variant';
      case '調味料': return 'bottle-tonic';
      default: return 'food';
    }
  };

  const renderItem = ({ item }: { item: typeof ingredients[0] }) => {
    const categoryColor = categoryColors[item.category as keyof typeof categoryColors] || '#9C27B0';
    const isExpiringSoon = item.expiry && new Date(item.expiry) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const isExpired = item.expiry && new Date(item.expiry) < new Date();
    // 表示用テキスト生成
    let detailText = '';
    if (['野菜', '主食'].includes(item.category)) {
      // 野菜・主食は単位省略
      if (item.count && Number(item.count) > 1) {
        detailText = `${item.count}個`;
      } else {
        detailText = '';
      }
    } else if (['肉類', '魚類', '乳製品', '調味料', 'その他'].includes(item.category)) {
      // 肉類・魚類・乳製品などはg/mlや個数も表示
      if (item.amount && item.unit) {
        detailText = `${item.amount}${item.unit}`;
        if (item.count && Number(item.count) > 1) {
          detailText += ` × ${item.count}`;
        }
      }
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({ pathname: `/fridge/detail/${item.id}` } as any)}>
        <Surface style={[styles.itemCard, isExpired ? { backgroundColor: '#FFEBEE' } : {}, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF', marginVertical: 4, borderRadius: 14, elevation: 1 }]} elevation={2}>
          <View style={[styles.itemContent, { borderRadius: 14 }] }>
          <View style={styles.itemLeft}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
            ) : (
              <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}> 
                <MaterialCommunityIcons 
                  name={getCategoryIcon(item.category) as any} 
                  size={20} 
                  color={categoryColor} 
                />
              </View>
            )}
            <View style={styles.itemInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text style={[styles.itemName, { color: textColor, flexShrink: 1 }]} numberOfLines={1}>{item.name}</Text>
                  {detailText ? (
                    <Text style={{ color: '#222', fontSize: 14, marginLeft: 8, textAlign: 'right', minWidth: 48 }}>{detailText}</Text>
                  ) : <View style={{ minWidth: 48 }} />}
                </View>
              <View style={styles.itemMeta}>
                <Chip 
                  style={[styles.categoryChip, { backgroundColor: categoryColor + '15' }]}
                  textStyle={{ color: categoryColor, fontSize: 11 }}
                  compact
                >
                  {item.category}
                </Chip>
                {item.expiry && (
                  <Text style={[styles.expiryText, { color: isExpired ? '#E74C3C' : isExpiringSoon ? '#FF9800' : textSecondaryColor, fontWeight: isExpired ? 'bold' : 'normal' }]}> 
                    {isExpired ? '期限切れ ' : isExpiringSoon ? '⚠️ ' : ''}{item.expiry}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <IconButton
            icon="delete-outline"
            size={20}
            onPress={() => handleDelete(item.id)}
            iconColor={textSecondaryColor}
          />
        </View>
      </Surface>
      </TouchableOpacity>
    );
  };

  // locationごとにグループ化
  const locations = ['冷蔵', '冷凍', 'その他'] as const;
  const grouped = locations.map(loc => ({
    label: loc,
    items: ingredients.filter(i => i.location === loc),
  }));

  const locationMeta = {
    '冷蔵': { color: '#4FC3F7', icon: 'fridge-outline' },
    '冷凍': { color: '#90CAF9', icon: 'snowflake' },
    'その他': { color: '#B0BEC5', icon: 'archive-outline' },
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}> 
      <View style={[styles.header, { alignItems: 'center' }] }>
        <Text style={[styles.title, { color: textColor, textAlign: 'center', letterSpacing: 2 }]}>STOCK</Text>
      </View>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {grouped.map(section => (
          <View key={section.label} style={{ marginBottom: 28 }}>
            {/* セクションタイトル */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{ backgroundColor: locationMeta[section.label].color, borderRadius: 16, padding: 6, marginRight: 8 }}>
                <MaterialCommunityIcons name={locationMeta[section.label].icon as any} size={20} color="#fff" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: locationMeta[section.label].color }}>{section.label}</Text>
            </View>
            {/* セクション全体をカード風に */}
            <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2, minHeight: 80 }}>
              {section.items.length === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 24 }}>
                  <MaterialCommunityIcons name="emoticon-sad-outline" size={32} color="#B0BEC5" style={{ marginBottom: 6 }} />
                  <Text style={{ color: '#B0BEC5', fontSize: 15 }}>食材がありません</Text>
                </View>
              ) : (
                section.items.map(item => (
                  <View key={item.id} style={{ marginBottom: 10 }}>
                    {renderItem({ item })}
                  </View>
                ))
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      {/* 追加用FAB */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={() => router.push({ pathname: '/fridge/add' })}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#fff" />
      </Pressable>
      {/* 追加モーダル */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>食材を追加</Text>
            <TextInput
              mode="outlined"
              label="食材名"
              value={newName}
              onChangeText={setNewName}
              style={{ marginBottom: 12 }}
            />
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
              {Object.keys(categoryColors).map((cat) => (
                <Chip
                  key={cat}
                  style={{ backgroundColor: newCategory === cat ? categoryColors[cat as keyof typeof categoryColors] + '20' : '#F8F9FA' }}
                  textStyle={{ color: categoryColors[cat as keyof typeof categoryColors] }}
                  selected={newCategory === cat}
                  onPress={() => setNewCategory(cat)}
                  compact
                >
                  {cat}
                </Chip>
              ))}
            </View>
            <TextInput
              mode="outlined"
              label="賞味期限 (例: 2024-01-20)"
              value={newExpiry}
              onChangeText={setNewExpiry}
              style={{ marginBottom: 12 }}
            />
            <TouchableOpacity
              style={{ alignSelf: 'flex-start', marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 6 }}
              onPress={pickNewImage}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="camera-plus" size={20} color="#6C757D" />
              <Text style={{ color: '#6C757D', fontSize: 14 }}>写真を追加</Text>
              {newImage && <Text style={{ color: '#4CAF50', fontSize: 13 }}>選択済み</Text>}
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalBtn, { backgroundColor: '#E0E0E0' }]}> 
                <Text style={{ color: '#333', fontWeight: 'bold' }}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddIngredient} style={[styles.modalBtn, { backgroundColor: '#FF6B35' }]}> 
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>追加</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryChip: {
    borderRadius: 8,
  },
  expiryText: {
    fontSize: 12,
  },
  separator: {
    height: 8,
  },
  addButton: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'ios' ? 36 : 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
