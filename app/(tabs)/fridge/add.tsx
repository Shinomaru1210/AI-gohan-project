import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Chip, Snackbar, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const categoryColors = {
  '野菜': '#4CAF50',
  '肉類': '#F44336',
  '魚類': '#039BE5',
  '乳製品': '#616161', // 濃いグレーに変更
  '主食': '#FFD600',
  '調味料': '#FF9800',
  'その他': '#9C27B0',
};
const categoryIcons = {
  '野菜': 'food-apple',
  '肉類': 'food-steak',
  '魚類': 'fish',
  '乳製品': 'food-variant',
  '主食': 'rice',
  '調味料': 'bottle-tonic',
  'その他': 'food',
};
const unitOptions = ['g', 'ml'];
const inputTabs = [
  { key: 'barcode', label: 'バーコード', icon: 'barcode-scan' },
  { key: 'photo', label: '写真', icon: 'camera' },
  { key: 'manual', label: '手動入力', icon: 'pencil' },
];

export default function FridgeAddScreen() {
  const [category, setCategory] = useState('野菜');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('g');
  const [count, setCount] = useState('');
  const [expiry, setExpiry] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();

  // バーコード読み取りダミー
  const handleBarcode = () => {
    Alert.alert('バーコード読み取り', 'バーコード読み取りUI（ダミー）');
  };
  // 写真で読み取りダミー
  const handlePhoto = () => {
    Alert.alert('写真で読み取り', '写真からAI推定UI（ダミー）');
  };
  // カレンダーはダミー
  const handleCalendar = () => {
    Alert.alert('カレンダー', 'ここでカレンダーを開く（実装例）');
  };
  // ダミー: 賞味期限自動入力
  const handleAutoExpiry = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    setExpiry(d.toISOString().slice(0, 10));
    Alert.alert('推定賞味期限', '（ダミー）推定賞味期限を自動入力しました！');
  };
  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('エラー', '食材名は必須です');
      return;
    }
    setShowSnackbar(true);
    setTimeout(() => {
      router.back();
    }, 800);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
      {/* ヘッダー */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 4, marginRight: 8 }}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', marginRight: 32, fontFamily: 'NotoSansJP-Bold' }}>食材を追加</Text>
      </View>
      {/* バーコード・写真ボタン */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
        <TouchableOpacity onPress={handleBarcode} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#F8F9FA', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 16, marginRight: 8 }}>
          <MaterialCommunityIcons name="barcode-scan" size={22} color="#FF6B35" style={{ marginRight: 6 }} />
          <Text style={{ color: '#FF6B35', fontSize: 15, fontFamily: 'NotoSansJP-Bold' }}>バーコード読み取り</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePhoto} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#F8F9FA', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 16 }}>
          <MaterialCommunityIcons name="camera" size={22} color="#2196F3" style={{ marginRight: 6 }} />
          <Text style={{ color: '#2196F3', fontSize: 15, fontFamily: 'NotoSansJP-Bold' }}>写真で読み取り</Text>
        </TouchableOpacity>
      </View>
      {/* 食材の種類 */}
      <Text style={{ fontSize: 15, marginBottom: 8, fontFamily: 'NotoSansJP-Bold' }}>食材の種類</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        {Object.keys(categoryColors).map((cat) => (
          <Chip
            key={cat}
            style={{ backgroundColor: category === cat ? categoryColors[cat as keyof typeof categoryColors] + '30' : '#F8F9FA', borderRadius: 16, paddingHorizontal: 6, marginBottom: 6 }}
            textStyle={{ color: category === cat ? categoryColors[cat as keyof typeof categoryColors] : '#FF6B35', fontFamily: 'NotoSansJP-Bold' }}
            selected={category === cat}
            onPress={() => setCategory(cat)}
            icon={categoryIcons[cat as keyof typeof categoryIcons]}
            compact
          >
            {cat}
          </Chip>
        ))}
      </View>
      {/* 食材名 */}
      <Text style={{ fontSize: 15, marginBottom: 4, fontFamily: 'NotoSansJP-Bold' }}>食材名</Text>
      <TextInput
        mode="outlined"
        value={name}
        onChangeText={setName}
        placeholder="例：にんじん"
        style={{ marginBottom: 16, borderRadius: 12, backgroundColor: '#FAFAFA' }}
        outlineColor="#E9ECEF"
        activeOutlineColor="#FF6B35"
      />
      {/* 食材1個当たりの量 */}
      <Text style={{ fontSize: 15, marginBottom: 4, fontFamily: 'NotoSansJP-Bold' }}>食材1個当たりの量</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 }}>
        <TextInput
          mode="outlined"
          value={amount}
          onChangeText={setAmount}
          placeholder="例：100"
          style={{ flex: 1, borderRadius: 12, backgroundColor: '#FAFAFA' }}
          outlineColor="#E9ECEF"
          activeOutlineColor="#FF6B35"
          keyboardType="numeric"
        />
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {unitOptions.map((u) => (
            <Chip
              key={u}
              style={{ backgroundColor: unit === u ? '#FF6B35' : '#F8F9FA', borderRadius: 12, marginLeft: 4 }}
              textStyle={{ color: unit === u ? '#fff' : '#FF6B35', fontFamily: 'NotoSansJP-Bold' }}
              selected={unit === u}
              onPress={() => setUnit(u)}
              compact
            >
              {u}
            </Chip>
          ))}
        </View>
      </View>
      {/* 食材の数 */}
      <Text style={{ fontSize: 15, marginBottom: 4, fontFamily: 'NotoSansJP-Bold' }}>食材の数</Text>
      <TextInput
        mode="outlined"
        value={count}
        onChangeText={setCount}
        placeholder="例：3"
        style={{ marginBottom: 16, borderRadius: 12, backgroundColor: '#FAFAFA' }}
        outlineColor="#E9ECEF"
        activeOutlineColor="#FF6B35"
        keyboardType="numeric"
      />
      {/* 賞味期限 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <Text style={{ fontSize: 15, marginRight: 8, fontFamily: 'NotoSansJP-Bold' }}>賞味期限</Text>
        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: '#E9ECEF', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#FAFAFA' }}
          onPress={handleCalendar}
        >
          <Text style={{ fontSize: 15, fontFamily: 'NotoSansJP-Regular' }}>{expiry ? expiry : '未選択'}</Text>
        </TouchableOpacity>
        <Button
          mode="outlined"
          icon="calendar-clock"
          onPress={handleAutoExpiry}
          style={{ borderRadius: 16, borderColor: '#2196F3' }}
          labelStyle={{ fontFamily: 'NotoSansJP-Bold', color: '#2196F3' }}
        >
          AI自動推定
        </Button>
      </View>
      <Button
        mode="contained"
        onPress={handleSave}
        style={{ marginTop: 8, borderRadius: 16, backgroundColor: '#FF6B35' }}
        contentStyle={{ paddingVertical: 12 }}
        labelStyle={{ fontFamily: 'NotoSansJP-Bold', fontSize: 16 }}
        disabled={!name.trim()}
        icon="content-save"
      >
        保存する
      </Button>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={1000}
        style={{ backgroundColor: '#4CAF50' }}
      >
        保存しました
      </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
} 