import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const categoryMeta = {
  '野菜': { color: '#4CAF50', icon: 'food-apple' },
  '肉類': { color: '#F44336', icon: 'food-steak' },
  '乳製品': { color: '#616161', icon: 'food-variant' },
  '主食': { color: '#9C27B0', icon: 'rice' },
  '調味料': { color: '#FF9800', icon: 'bottle-tonic' },
  'その他': { color: '#607D8B', icon: 'food' },
};
const priorityOptions = [
  { key: 'high', label: '高', icon: 'flag', color: '#E74C3C' },
  { key: 'medium', label: '中', icon: 'flag-outline', color: '#F39C12' },
  { key: 'low', label: '低', icon: 'flag-variant-outline', color: '#27AE60' },
];
const categories = ['野菜', '肉類', '乳製品', '主食', '調味料', 'その他'] as const;

// 仮のダミーデータ
const dummyItems = [
  { id: '1', name: '牛乳', category: '乳製品', amount: '2本', priority: 'high', memo: '' },
  { id: '2', name: '卵', category: '乳製品', amount: '10個', priority: 'medium', memo: '' },
  { id: '3', name: 'にんじん', category: '野菜', amount: '3本', priority: 'low', memo: '' },
  { id: '4', name: '豚肉', category: '肉類', amount: '200g', priority: 'high', memo: '' },
  { id: '5', name: '米', category: '主食', amount: '5kg', priority: 'medium', memo: '' },
];

export default function BuyListEditScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const item = dummyItems.find((i) => i.id === id) ?? dummyItems[0];

  const [category, setCategory] = useState(item.category);
  const [name, setName] = useState(item.name);
  const [amount, setAmount] = useState(item.amount);
  const [priority, setPriority] = useState(item.priority);
  const [memo, setMemo] = useState(item.memo);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('エラー', '食材名は必須です');
      return;
    }
    Alert.alert('保存', '（ダミー）保存しました！');
    setTimeout(() => {
      router.back();
    }, 800);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* ヘッダー */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 4, marginRight: 8 }}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center', marginRight: 32 }}>買い物リスト編集</Text>
        </View>
        {/* カテゴリ */}
        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 8 }}>カテゴリ</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              style={{ backgroundColor: category === cat ? categoryMeta[cat].color + '30' : '#F8F9FA', borderRadius: 16, paddingHorizontal: 6, marginBottom: 6 }}
              textStyle={{ color: categoryMeta[cat].color, fontWeight: 'bold' }}
              selected={category === cat}
              onPress={() => setCategory(cat)}
              icon={categoryMeta[cat].icon as any}
              compact
            >
              {cat}
            </Chip>
          ))}
        </View>
        {/* 食材名 */}
        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 4 }}>食材名</Text>
        <RNTextInput
          value={name}
          onChangeText={setName}
          placeholder="例：牛乳"
          style={{ marginBottom: 16, borderRadius: 12, backgroundColor: '#FAFAFA', fontSize: 16, paddingHorizontal: 12, height: 40 }}
        />
        {/* 数量 */}
        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 4 }}>数量</Text>
        <RNTextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="例：2本"
          style={{ marginBottom: 16, borderRadius: 12, backgroundColor: '#FAFAFA', fontSize: 16, paddingHorizontal: 12, height: 40 }}
        />
        {/* 優先度 */}
        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 8 }}>優先度</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          {priorityOptions.map(opt => (
            <Chip
              key={opt.key}
              style={{ backgroundColor: priority === opt.key ? opt.color + '30' : '#F8F9FA', borderRadius: 16, paddingHorizontal: 6 }}
              textStyle={{ color: opt.color, fontWeight: 'bold' }}
              selected={priority === opt.key}
              onPress={() => setPriority(opt.key as any)}
              icon={opt.icon as any}
              compact
            >
              {opt.label}
            </Chip>
          ))}
        </View>
        {/* メモ欄 */}
        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 4 }}>メモ</Text>
        <RNTextInput
          value={memo}
          onChangeText={setMemo}
          placeholder="メモ"
          style={{ marginBottom: 24, borderRadius: 12, backgroundColor: '#FAFAFA', fontSize: 15, paddingHorizontal: 12, height: 40 }}
        />
        <Button
          mode="contained"
          onPress={handleSave}
          style={{ marginTop: 8, borderRadius: 16, backgroundColor: '#FF6B35' }}
          contentStyle={{ paddingVertical: 12 }}
          labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
          disabled={!name.trim()}
          icon="content-save"
        >
          保存する
        </Button>
      </View>
    </SafeAreaView>
  );
} 