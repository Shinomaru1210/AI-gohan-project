import { AppColors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, TextInput as RNTextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categoryMeta = {
  '野菜': { color: AppColors.category.vegetable, icon: 'food-apple' },
  '肉類': { color: AppColors.category.meat, icon: 'food-steak' },
  '魚介類': { color: AppColors.category.fish, icon: 'fish' },
  '卵・乳製品': { color: AppColors.category.dairy, icon: 'food-variant' },
  '主食': { color: AppColors.category.grain, icon: 'rice' },
  '調味料': { color: AppColors.category.seasoning, icon: 'bottle-tonic' },
  'その他': { color: AppColors.category.other, icon: 'food' },
};
const priorityOptions = [
  { key: 'high', label: '高', icon: 'flag', color: AppColors.status.error },
  { key: 'medium', label: '中', icon: 'flag', color: AppColors.status.warning },
  { key: 'low', label: '低', icon: 'flag', color: AppColors.status.success },
];
const categories = ['野菜', '肉類', '魚介類', '卵・乳製品', '主食', '調味料', 'その他'] as const;

// 仮のダミーデータ
const dummyItems = [
  { id: '1', name: '牛乳', category: '卵・乳製品', amount: '2本', priority: 'high', memo: '' },
  { id: '2', name: '卵', category: '卵・乳製品', amount: '10個', priority: 'medium', memo: '' },
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* ヘッダーグラデーション */}
        <LinearGradient
          colors={['#E8F5E8', '#D4EDDA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={AppColors.status.success} />
            </TouchableOpacity>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="pencil" size={20} color={AppColors.status.success} />
              </View>
              <Text style={styles.headerTitle}>食材を編集</Text>
            </View>
            <View style={styles.headerRight} />
          </View>
        </LinearGradient>

        <View style={styles.mainContent}>
          {/* カテゴリ */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>カテゴリ</Text>
            <View style={styles.chipContainer}>
              {categories.map((cat) => (
                                 <TouchableOpacity
                   key={cat}
                   style={[
                     styles.chip,
                     { 
                       borderColor: categoryMeta[cat].color,
                       backgroundColor: category === cat ? categoryMeta[cat].color : '#fff'
                     }
                   ]}
                   onPress={() => setCategory(cat)}
                   activeOpacity={0.7}
                 >
                   <MaterialCommunityIcons 
                     name={categoryMeta[cat].icon as any} 
                     size={16} 
                     color={category === cat ? '#fff' : categoryMeta[cat].color} 
                   />
                   <Text style={[
                     styles.chipText,
                     category === cat && styles.chipTextSelected,
                     { color: category === cat ? '#fff' : categoryMeta[cat].color }
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
                placeholder="例：牛乳"
                style={styles.textInput}
                placeholderTextColor="#B0BEC5"
              />
            </View>
          </View>

          {/* 数量 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>数量</Text>
            <View style={styles.inputContainer}>
              <RNTextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="例：2本"
                style={styles.textInput}
                placeholderTextColor="#B0BEC5"
              />
            </View>
          </View>

          {/* 優先度 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>優先度</Text>
            <View style={styles.chipContainer}>
              {priorityOptions.map(opt => (
                                 <TouchableOpacity
                   key={opt.key}
                   style={[
                     styles.chip,
                     { 
                       borderColor: opt.color,
                       backgroundColor: priority === opt.key ? opt.color : '#fff'
                     }
                   ]}
                   onPress={() => setPriority(opt.key as any)}
                   activeOpacity={0.7}
                 >
                   <MaterialCommunityIcons 
                     name={opt.icon as any} 
                     size={16} 
                     color={priority === opt.key ? '#fff' : opt.color} 
                   />
                   <Text style={[
                     styles.chipText,
                     priority === opt.key && styles.chipTextSelected,
                     { color: priority === opt.key ? '#fff' : opt.color }
                   ]}>
                     {opt.label}
                   </Text>
                 </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* メモ欄 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>メモ</Text>
            <View style={styles.inputContainer}>
              <RNTextInput
                value={memo}
                onChangeText={setMemo}
                placeholder="メモ"
                style={styles.textInput}
                placeholderTextColor="#B0BEC5"
              />
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
            colors={name.trim() ? [AppColors.status.success, '#66BB6A'] : ['#B0BEC5', '#CFD8DC']}
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
    shadowColor: AppColors.status.success,
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

  chipText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
  },
  chipTextSelected: {
    color: '#fff',
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
    shadowColor: AppColors.status.success,
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