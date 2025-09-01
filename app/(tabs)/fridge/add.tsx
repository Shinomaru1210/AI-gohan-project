import { AppColors } from '@/constants/Colors';
import { useFridgeData } from '@/hooks/useFirebaseData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, TextInput as RNTextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categoryColors = {
  '野菜': AppColors.category.vegetable,
  '肉類': AppColors.category.meat,
  '魚介類': AppColors.category.fish,
  '卵・乳製品': AppColors.category.dairy,
  '主食': AppColors.category.grain,
  '調味料': AppColors.category.seasoning,
  'その他': AppColors.category.other,
};
const categoryIcons = {
  '野菜': 'food-apple',
  '肉類': 'food-steak',
  '魚介類': 'fish',
  '卵・乳製品': 'food-variant',
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
  const { addItem } = useFridgeData();
  const [category, setCategory] = useState('野菜');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('g');
  const [count, setCount] = useState('');
  const [expiry, setExpiry] = useState('');
  const [location, setLocation] = useState<'冷蔵' | '冷凍' | 'その他'>('冷蔵');
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
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('エラー', '食材名は必須です');
      return;
    }

    console.log('保存開始:', { name, category, amount, unit, count, expiry, location });

    try {
      const itemData = {
        name: name.trim(),
        category,
        amount: amount || undefined,
        unit: amount ? unit : undefined,
        count: count || undefined,
        expiry: expiry || undefined,
        location,
      };
      
      console.log('保存するデータ:', itemData);
      
      const result = await addItem(itemData);
      console.log('保存成功, ID:', result);

      setShowSnackbar(true);
      setTimeout(() => {
        router.back();
      }, 800);
    } catch (error) {
      console.error('保存エラー詳細:', error);
      Alert.alert('エラー', '食材の保存に失敗しました');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* ヘッダーグラデーション */}
        <LinearGradient
          colors={['#E3F2FD', '#BBDEFB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#1976D2" />
            </TouchableOpacity>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="plus" size={20} color="#1976D2" />
              </View>
              <Text style={styles.headerTitle}>食材を追加</Text>
            </View>
            <View style={styles.headerRight} />
          </View>
        </LinearGradient>

        <View style={styles.mainContent}>
          {/* バーコード・写真ボタン */}
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
              <TouchableOpacity onPress={handleBarcode} style={styles.quickActionButton}>
                <MaterialCommunityIcons name="barcode-scan" size={22} color="#FF6B35" />
                <Text style={styles.quickActionText}>バーコード読み取り</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePhoto} style={styles.quickActionButton}>
                <MaterialCommunityIcons name="camera" size={22} color="#2196F3" />
                <Text style={styles.quickActionText}>写真で読み取り</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 食材の種類 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>食材の種類</Text>
            <View style={styles.chipContainer}>
              {Object.keys(categoryColors).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.chip,
                    category === cat && styles.chipSelected,
                    { 
                      borderColor: categoryColors[cat as keyof typeof categoryColors],
                      backgroundColor: category === cat ? categoryColors[cat as keyof typeof categoryColors] : '#fff'
                    }
                  ]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons 
                    name={categoryIcons[cat as keyof typeof categoryIcons] as any} 
                    size={16} 
                    color={category === cat ? '#fff' : categoryColors[cat as keyof typeof categoryColors]} 
                  />
                  <Text style={[
                    styles.chipText,
                    { color: category === cat ? '#fff' : categoryColors[cat as keyof typeof categoryColors] }
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 食材名 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>食材名</Text>
            <View style={styles.inputContainer}>
              <RNTextInput
                value={name}
                onChangeText={setName}
                placeholder="例：にんじん"
                style={styles.textInput}
                placeholderTextColor="#B0BEC5"
              />
            </View>
          </View>

          {/* 食材1個当たりの量 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>食材1個当たりの量</Text>
            <View style={styles.amountContainer}>
              <View style={styles.amountInput}>
                <RNTextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="例：100"
                  style={styles.textInput}
                  placeholderTextColor="#B0BEC5"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.unitContainer}>
                {unitOptions.map((u) => (
                  <TouchableOpacity
                    key={u}
                    style={[
                      styles.unitChip,
                      unit === u && styles.unitChipSelected
                    ]}
                    onPress={() => setUnit(u)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.unitChipText,
                      { color: unit === u ? '#fff' : '#FF6B35' }
                    ]}>
                      {u}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* 食材の数 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>食材の数</Text>
            <View style={styles.inputContainer}>
              <RNTextInput
                value={count}
                onChangeText={setCount}
                placeholder="例：3"
                style={styles.textInput}
                placeholderTextColor="#B0BEC5"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* 保存場所 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>保存場所</Text>
            <View style={styles.chipContainer}>
              {['冷蔵', '冷凍', 'その他'].map((loc) => (
                <TouchableOpacity
                  key={loc}
                  style={[
                    styles.chip,
                    location === loc && styles.chipSelected,
                    { 
                      borderColor: AppColors.secondary,
                      backgroundColor: location === loc ? AppColors.secondary : '#fff'
                    }
                  ]}
                  onPress={() => setLocation(loc as '冷蔵' | '冷凍' | 'その他')}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons 
                    name={loc === '冷蔵' ? 'fridge-outline' : loc === '冷凍' ? 'snowflake' : 'archive-outline'} 
                    size={16} 
                    color={location === loc ? '#fff' : AppColors.secondary} 
                  />
                  <Text style={[
                    styles.chipText,
                    { color: location === loc ? '#fff' : AppColors.secondary }
                  ]}>
                    {loc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 賞味期限 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>賞味期限</Text>
            <View style={styles.expiryContainer}>
              <TouchableOpacity
                style={styles.expiryButton}
                onPress={handleCalendar}
              >
                <Text style={styles.expiryButtonText}>
                  {expiry ? expiry : '未選択'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.autoExpiryButton}
                onPress={handleAutoExpiry}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="calendar-clock" size={16} color="#2196F3" />
                <Text style={styles.autoExpiryButtonText}>AI自動推定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* 保存ボタン */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.saveButton, !name.trim() && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!name.trim()}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={name.trim() ? ['#1976D2', '#42A5F5'] : ['#B0BEC5', '#CFD8DC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButtonGradient}
          >
            <MaterialCommunityIcons name="content-save" size={22} color="white" />
            <Text style={styles.saveButtonText}>保存する</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerRight: {
    width: 32,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chipSelected: {
    // 背景色は動的に設定されるため、ここでは空にする
  },
  chipText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  textInput: {
    fontSize: 16,
    color: '#2C3E50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: 'NotoSansJP-Regular',
    backgroundColor: '#fff',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  unitContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  unitChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  unitChipSelected: {
    backgroundColor: '#FF6B35',
  },
  unitChipText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  expiryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  expiryButtonText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
  },
  autoExpiryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  autoExpiryButtonText: {
    fontSize: 14,
    color: '#2196F3',
    fontFamily: 'NotoSansJP-Bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    shadowOpacity: 0.1,
    elevation: 2,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
}); 