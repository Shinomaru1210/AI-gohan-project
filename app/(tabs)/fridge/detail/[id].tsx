import { AppColors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

// 仮のダミーデータ
const dummyIngredients = [
  { id: '1', name: 'にんじん', category: '野菜', amount: '100', unit: 'g', count: '2', expiry: '2024-01-15' },
  { id: '2', name: 'たまねぎ', category: '野菜', amount: '150', unit: 'g', count: '1', expiry: '2024-01-20' },
  { id: '3', name: '豚肉', category: '肉類', amount: '200', unit: 'g', count: '1', expiry: '2024-01-12' },
  { id: '4', name: '卵', category: '卵・乳製品', amount: '50', unit: 'g', count: '6', expiry: '2024-01-18' },
  { id: '5', name: '牛乳', category: '卵・乳製品', amount: '1000', unit: 'ml', count: '1', expiry: '2024-01-14' },
];

export default function FridgeEditScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const ingredient = dummyIngredients.find((item) => item.id === id) ?? dummyIngredients[0];

  // 編集用state
  const [category, setCategory] = useState(ingredient.category);
  const [name, setName] = useState(ingredient.name);
  const [amount, setAmount] = useState(ingredient.amount);
  const [unit, setUnit] = useState(ingredient.unit);
  const [count, setCount] = useState(ingredient.count);
  const [expiry, setExpiry] = useState(ingredient.expiry);
  const [showSnackbar, setShowSnackbar] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* ヘッダーグラデーション */}
        <LinearGradient
          colors={AppColors.gradient.header as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={AppColors.secondary} />
            </TouchableOpacity>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="pencil" size={20} color={AppColors.secondary} />
              </View>
              <Text style={styles.headerTitle}>食材を編集</Text>
            </View>
            <View style={styles.headerRight} />
          </View>
        </LinearGradient>

        <View style={styles.mainContent}>
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
                      backgroundColor: category === cat ? categoryColors[cat as keyof typeof categoryColors] : AppColors.surface
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
                placeholderTextColor={AppColors.text.light}
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
                  placeholderTextColor={AppColors.text.light}
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
                      { color: unit === u ? '#fff' : AppColors.primary }
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
                placeholderTextColor={AppColors.text.light}
                keyboardType="numeric"
              />
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
                <MaterialCommunityIcons name="calendar-clock" size={16} color={AppColors.secondary} />
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
            colors={name.trim() ? AppColors.gradient.secondary as [string, string] : ['#B0BEC5', '#CFD8DC']}
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
    backgroundColor: AppColors.background,
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
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 8,
    shadowColor: AppColors.shadow.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    color: AppColors.text.primary,
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
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: AppColors.text.primary,
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
    backgroundColor: AppColors.surface,
    shadowColor: AppColors.shadow.light,
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
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  textInput: {
    fontSize: 16,
    color: AppColors.text.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: 'NotoSansJP-Regular',
    backgroundColor: AppColors.surface,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountInput: {
    flex: 1,
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: AppColors.shadow.light,
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
    backgroundColor: AppColors.background,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  unitChipSelected: {
    backgroundColor: AppColors.primary,
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
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  expiryButtonText: {
    fontSize: 16,
    color: AppColors.text.primary,
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
    borderColor: AppColors.secondary,
  },
  autoExpiryButtonText: {
    fontSize: 14,
    color: AppColors.secondary,
    fontFamily: 'NotoSansJP-Bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: AppColors.surface,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: AppColors.shadow.secondary,
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