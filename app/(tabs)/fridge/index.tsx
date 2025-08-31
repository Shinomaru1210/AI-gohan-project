import PremiumFeatureLock from '@/components/ui/PremiumFeatureLock';
import SubscriptionModal from '@/components/ui/SubscriptionModal';
import { AppColors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Animated, Image, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
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
    { id: '4', name: '卵', category: '卵・乳製品', amount: '50', unit: 'g', count: '6', expiry: '2024-01-18', location: '冷蔵' },
    { id: '5', name: '牛乳', category: '卵・乳製品', amount: '1000', unit: 'ml', count: '2', expiry: '2024-01-14', location: 'その他' },
  ]);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('野菜');
  const [newExpiry, setNewExpiry] = useState('');
  const [newImage, setNewImage] = useState<string | undefined>(undefined);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showPremiumLock, setShowPremiumLock] = useState(false);

  // サブスクリプション状態（実際のアプリでは永続化された状態を使用）
  const isPremium = false; // デモ用：falseに設定

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

  const textSecondaryColor = AppColors.text.secondary;

  const categoryColors = {
    '野菜': AppColors.category.vegetable,
    '肉類': AppColors.category.meat,
    '魚介類': AppColors.category.fish,
    '卵・乳製品': AppColors.category.dairy,
    '主食': AppColors.category.grain,
    '調味料': AppColors.category.seasoning,
    'その他': AppColors.category.other,
  };

  const handleDelete = (id: string) => {
    setIngredients(prev => prev.filter(item => item.id !== id));
  };

  // サブスク関連のハンドラー
  const handleUpgrade = () => {
    setShowSubscriptionModal(true);
  };

  const handleSubscribe = (plan: string) => {
    Alert.alert(
      'サブスクリプション登録完了',
      `${plan === 'monthly' ? '月額' : '年額'}プランに登録しました！`,
      [
        {
          text: 'OK',
          onPress: () => {
            // ここで実際のサブスクリプション処理を行う
            console.log('Subscription completed:', plan);
            setShowPremiumLock(false);
          },
        },
      ]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '野菜': return 'food-apple';
      case '肉類': return 'food-steak';
      case '魚介類': return 'fish';
      case '卵・乳製品': return 'food-variant';
      case '主食': return 'rice';
      case '調味料': return 'bottle-tonic';
      default: return 'food';
    }
  };

  const renderItem = ({ item }: { item: typeof ingredients[0] }) => {
    const categoryColor = categoryColors[item.category as keyof typeof categoryColors] || '#607D8B';
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
    } else if (['肉類', '魚介類', '卵・乳製品', '調味料', 'その他'].includes(item.category)) {
      // 肉類・魚介類・卵・乳製品などはg/mlや個数も表示
      if (item.amount && item.unit) {
        detailText = `${item.amount}${item.unit}`;
        if (item.count && Number(item.count) > 1) {
          detailText += ` × ${item.count}`;
        }
      }
    }

    return (
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={() => router.push({ pathname: `/fridge/detail/${item.id}` } as any)}
      >
        <View style={[
          styles.itemCard,
          isExpired && styles.itemCardExpired
        ]}>
          <View style={styles.itemContent}>
            <View style={styles.itemLeft}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              ) : (
                <View style={[styles.iconContainer, { backgroundColor: categoryColor + '15' }]}> 
                  <MaterialCommunityIcons 
                    name={getCategoryIcon(item.category) as any} 
                    size={20} 
                    color={categoryColor} 
                  />
                </View>
              )}
              <View style={styles.itemInfo}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <View style={[styles.categoryChip, { backgroundColor: categoryColor + '15' }]}>
                      <Text style={[styles.categoryText, { color: categoryColor }]}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                  {detailText ? (
                    <Text style={styles.itemAmount}>{detailText}</Text>
                  ) : <View style={styles.itemAmountPlaceholder} />}
                </View>
                <View style={styles.itemMeta}>
                  {item.expiry && (
                    <Text style={[
                      styles.expiryText, 
                      { color: isExpired ? AppColors.status.error : isExpiringSoon ? AppColors.status.warning : textSecondaryColor }
                    ]}> 
                      {isExpired ? '期限切れ ' : isExpiringSoon ? '⚠️ ' : ''}{item.expiry}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="delete-outline" size={20} color={textSecondaryColor} />
            </TouchableOpacity>
          </View>
        </View>
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
    '冷蔵': { color: AppColors.status.info, icon: 'fridge-outline' },
    '冷凍': { color: '#90CAF9', icon: 'snowflake' },
    'その他': { color: AppColors.text.secondary, icon: 'archive-outline' },
  };

  return (
    <SafeAreaView style={styles.container}> 
      {/* ヘッダーグラデーション */}
      <LinearGradient
        colors={AppColors.gradient.header as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="fridge" size={24} color={AppColors.secondary} />
            </View>
            <Text style={styles.headerTitle}>冷蔵庫</Text>
          </View>
          <Text style={styles.headerSubtitle}>{ingredients.length}個の食材</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContent}>
          {/* AI自動推定ボタン */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.aiEstimateButton}
              onPress={isPremium ? () => console.log('AI自動推定実行') : () => setShowPremiumLock(true)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[AppColors.status.success, '#66BB6A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.aiEstimateButtonGradient}
              >
                <MaterialCommunityIcons name="robot" size={24} color="#fff" />
                <Text style={styles.aiEstimateButtonText}>
                  {isPremium ? 'AI自動推定' : 'AI自動推定（プレミアム）'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {grouped.map(section => (
            <View key={section.label} style={styles.section}>
              {/* セクションタイトル */}
              <View style={styles.sectionHeader}>
                <View style={[styles.locationIcon, { backgroundColor: locationMeta[section.label].color }]}>
                  <MaterialCommunityIcons name={locationMeta[section.label].icon as any} size={20} color="#fff" />
                </View>
                <Text style={[styles.sectionTitle, { color: locationMeta[section.label].color }]}>
                  {section.label}
                </Text>
              </View>
              {/* セクション全体をカード風に */}
              <View style={styles.sectionCard}>
                {section.items.length === 0 ? (
                  <View style={styles.emptyState}>
                    <MaterialCommunityIcons name="emoticon-sad-outline" size={32} color="#B0BEC5" />
                    <Text style={styles.emptyText}>食材がありません</Text>
                  </View>
                ) : (
                  section.items.map(item => (
                    <View key={item.id} style={styles.itemWrapper}>
                      {renderItem({ item })}
                    </View>
                  ))
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 追加用FAB */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push({ pathname: '/fridge/add' })}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={AppColors.gradient.secondary as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabGradient}
          >
            <MaterialCommunityIcons name="plus" size={28} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

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
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>食材名</Text>
              <TextInput
                value={newName}
                onChangeText={setNewName}
                placeholder="例：にんじん"
                style={styles.textInput}
                placeholderTextColor="#B0BEC5"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>カテゴリ</Text>
              <View style={styles.chipContainer}>
                {Object.keys(categoryColors).map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.chip,
                      newCategory === cat && styles.chipSelected,
                      { borderColor: categoryColors[cat as keyof typeof categoryColors] }
                    ]}
                    onPress={() => setNewCategory(cat)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.chipText,
                      { color: newCategory === cat ? '#fff' : categoryColors[cat as keyof typeof categoryColors] }
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>賞味期限</Text>
              <TextInput
                value={newExpiry}
                onChangeText={setNewExpiry}
                placeholder="例：2024-01-20"
                style={styles.textInput}
                placeholderTextColor="#B0BEC5"
              />
            </View>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={pickNewImage}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="camera-plus" size={20} color="#6C757D" />
              <Text style={styles.imageButtonText}>写真を追加</Text>
              {newImage && <Text style={styles.imageSelectedText}>選択済み</Text>}
            </TouchableOpacity>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)} 
                style={styles.cancelButton}
              > 
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleAddIngredient} 
                style={styles.addButton}
              > 
                              <LinearGradient
                colors={AppColors.gradient.secondary as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addButtonGradient}
              >
                  <Text style={styles.addButtonText}>追加</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* プレミアム機能ロック */}
      {showPremiumLock && (
        <PremiumFeatureLock
          onUpgrade={handleUpgrade}
          title="AI自動推定機能"
          description="この機能はプレミアムプランでのみ利用できます。AIが食材を自動で認識し、賞味期限を推定します。"
          featureName="AI自動推定"
        />
      )}

      {/* サブスクリプションモーダル */}
      <SubscriptionModal
        visible={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
        title="AI自動推定機能"
        description="AIが食材を自動で認識し、賞味期限を推定します✨"
        features={[
          'AI献立提案機能（無制限）',
          '冷蔵庫のAI自動推定',
          '無制限の料理履歴',
          '詳細な栄養分析',
          'カスタムレシピ作成',
          '広告なし体験',
        ]}
      />
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
  headerSubtitle: {
    fontSize: 12,
    color: AppColors.text.secondary,
    fontFamily: 'NotoSansJP-Regular',
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
    marginBottom: 24,
  },
  aiEstimateButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: AppColors.status.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  aiEstimateButtonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  aiEstimateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    borderRadius: 16,
    padding: 6,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
  },
  sectionCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 12,
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 80,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    color: AppColors.text.light,
    fontSize: 15,
    fontFamily: 'NotoSansJP-Regular',
    marginTop: 6,
  },
  itemWrapper: {
    marginBottom: 8,
  },
  itemCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  itemCardExpired: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FFCDD2',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Medium',
    flexShrink: 1,
  },
  itemAmount: {
    color: AppColors.text.primary,
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    marginLeft: 8,
    textAlign: 'right',
    minWidth: 48,
  },
  itemAmountPlaceholder: {
    minWidth: 48,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryChip: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  categoryText: {
    fontSize: 11,
    fontFamily: 'NotoSansJP-Medium',
  },
  expiryText: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Regular',
  },
  deleteButton: {
    padding: 4,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'ios' ? 36 : 24,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: AppColors.shadow.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: AppColors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 16,
    color: AppColors.text.primary,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    color: AppColors.text.primary,
    backgroundColor: AppColors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'NotoSansJP-Regular',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: AppColors.surface,
  },
  chipSelected: {
    backgroundColor: AppColors.secondary,
    borderColor: AppColors.secondary,
  },
  chipText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  imageButtonText: {
    color: AppColors.text.secondary,
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
  },
  imageSelectedText: {
    color: AppColors.status.success,
    fontSize: 13,
    fontFamily: 'NotoSansJP-Regular',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },
  cancelButtonText: {
    color: '#333',
    fontFamily: 'NotoSansJP-Bold',
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  addButtonText: {
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
});
