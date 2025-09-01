import { AppColors } from '@/constants/Colors';
import { useBuyListData } from '@/hooks/useFirebaseData';
import { BuyListItem } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Animated, TextInput as RNTextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BuyListScreen() {
  const router = useRouter();
  const { items, loading, error, addItem, updateItem, deleteItem, toggleCheck, clearAllMemos } = useBuyListData();
  const [scaleAnim] = useState(new Animated.Value(1));

  // テーマカラーの取得
  const textSecondaryColor = AppColors.text.secondary;

  const categoryColors = {
    '野菜': AppColors.category.vegetable,
    '肉類': AppColors.category.meat,
    '魚介類': AppColors.category.fish,
    '卵・乳製品': AppColors.category.dairy,
    '調味料': AppColors.category.seasoning,
    '主食': AppColors.category.grain,
    'その他': AppColors.category.other,
  };

  const priorityColors = {
    'high': AppColors.status.error,
    'medium': AppColors.status.warning,
    'low': AppColors.status.success,
  };



  const handleAdd = async () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const newItemId = await addItem({
        name: `新しい食材 ${items.length + 1}`,
        checked: false,
        category: 'その他',
        priority: 'medium',
        amount: '',
        memo: '',
      });
      
      setTimeout(() => {
        router.push({ pathname: `/buy_list/edit`, params: { id: newItemId } } as any);
      }, 100);
    } catch (error) {
      console.error('アイテムの追加に失敗しました:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
    } catch (error) {
      console.error('アイテムの削除に失敗しました:', error);
    }
  };



  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return 'flag';
      case 'medium': return 'flag-outline';
      case 'low': return 'flag-variant-outline';
      default: return 'flag-outline';
    }
  };

  const renderItem = ({ item }: { item: BuyListItem }) => {
    const categoryColor = categoryColors[item.category as keyof typeof categoryColors] || '#607D8B';
    const priorityColor = priorityColors[item.priority as keyof typeof priorityColors] || '#F39C12';

    return (
      <View style={styles.itemCard}>
        <TouchableOpacity
          style={styles.itemContent}
          onPress={() => toggleCheck(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.itemLeft}>
            <View style={styles.checkboxContainer}>
              <MaterialCommunityIcons
                name={item.checked ? 'check-circle' : 'circle-outline'}
                size={24}
                color={item.checked ? AppColors.status.success : textSecondaryColor}
              />
            </View>
            <View style={styles.itemInfo}>
              <View style={styles.itemHeader}>
                <View style={styles.itemNameContainer}>
                  <Text style={[
                    styles.itemName,
                    item.checked && styles.itemChecked
                  ]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={[styles.categoryChip, { backgroundColor: categoryColor + '15' }]}>
                    <Text style={[styles.categoryText, { color: categoryColor }]}>
                      {item.category}
                    </Text>
                  </View>
                  <View style={styles.priorityContainer}>
                    <MaterialCommunityIcons
                      name={getPriorityIcon(item.priority || 'medium')}
                      size={16}
                      color={priorityColor}
                    />
                  </View>
                </View>
                {item.amount ? (
                  <Text style={styles.itemAmount}>{item.amount}</Text>
                ) : <View style={styles.itemAmountPlaceholder} />}
              </View>

              {/* メモ欄 */}
              <RNTextInput
                value={item.memo}
                onChangeText={text => updateItem(item.id, { memo: text })}
                placeholder="メモ"
                style={styles.memoInput}
                placeholderTextColor="#B0BEC5"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="delete-outline" size={20} color={textSecondaryColor} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  // カテゴリごとにグループ化
  const categories = ['野菜', '肉類', '魚介類', '卵・乳製品', '主食', '調味料', 'その他'] as const;
  const grouped = categories.map(cat => ({
    label: cat,
    items: items.filter(i => i.category === cat),
  }));

  const categoryMeta = {
    '野菜': { color: AppColors.category.vegetable, icon: 'food-apple' },
    '肉類': { color: AppColors.category.meat, icon: 'food-steak' },
    '魚介類': { color: AppColors.category.fish, icon: 'fish' },
    '卵・乳製品': { color: AppColors.category.dairy, icon: 'food-variant' },
    '主食': { color: AppColors.category.grain, icon: 'rice' },
    '調味料': { color: AppColors.category.seasoning, icon: 'bottle-tonic' },
    'その他': { color: AppColors.category.other, icon: 'food' },
  };

  // メモ一括削除の確認
  const handleClearMemos = () => {
    Alert.alert(
      '確認',
      '本当に全てのメモを消しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: 'OK', style: 'destructive', onPress: () => clearAllMemos() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダーグラデーション */}
      <LinearGradient
        colors={['#E8F5E8', '#D4EDDA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="shopping" size={24} color={AppColors.status.success} />
            </View>
            <Text style={styles.headerTitle}>買い物リスト</Text>
          </View>
          <Text style={styles.headerSubtitle}>{checkedCount}/{totalCount} 完了</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContent}>
          {/* ローディング状態 */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={AppColors.status.success} />
              <Text style={styles.loadingText}>データを読み込み中...</Text>
            </View>
          )}

          {/* エラー状態 */}
          {error && (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons name="alert-circle" size={32} color={AppColors.status.error} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
                <Text style={styles.retryButtonText}>再試行</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* データ表示 */}
          {!loading && !error && grouped.map(section => (
            <View key={section.label} style={styles.section}>
              {/* セクションタイトル */}
              <View style={styles.sectionHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: categoryMeta[section.label].color }]}>
                  <MaterialCommunityIcons name={categoryMeta[section.label].icon as any} size={20} color="#fff" />
                </View>
                <Text style={[styles.sectionTitle, { color: categoryMeta[section.label].color }]}>
                  {section.label}
                </Text>
              </View>
              {/* セクション全体をカード風に */}
              <View style={styles.sectionCard}>
                {section.items.length === 0 ? (
                  <View style={styles.emptyState}>
                    <MaterialCommunityIcons name="emoticon-sad-outline" size={32} color="#B0BEC5" />
                    <Text style={styles.emptyText}>買うものがありません</Text>
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
      
      {/* 画面下部に固定のボタン */}
      <View style={styles.bottomContainer}>
        <View style={styles.buttonRow}>
          <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAdd}
              activeOpacity={0.88}
            >
              <LinearGradient
                colors={[AppColors.status.success, '#66BB6A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addButtonGradient}
              >
                <MaterialCommunityIcons name="plus" size={22} color="white" />
                <Text style={styles.addButtonText}>食材を追加</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearMemos}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name="notebook-remove-outline" size={20} color="#6C757D" />
            <Text style={styles.clearButtonText}>メモを消す</Text>
          </TouchableOpacity>
        </View>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
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
  checkboxContainer: {
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
  itemChecked: {
    textDecorationLine: 'line-through',
    color: AppColors.text.light,
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
    marginBottom: 4,
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
  priorityContainer: {
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoInput: {
    fontSize: 13,
    color: AppColors.text.secondary,
    backgroundColor: AppColors.background,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 1,
    height: 40,
    fontFamily: 'NotoSansJP-Regular',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: AppColors.status.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  clearButton: {
    flex: 1,
    backgroundColor: AppColors.background,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  clearButtonText: {
    color: AppColors.text.secondary,
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: AppColors.text.secondary,
    fontSize: 16,
    fontFamily: 'NotoSansJP-Regular',
    marginTop: 12,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: AppColors.status.error,
    fontSize: 16,
    fontFamily: 'NotoSansJP-Regular',
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: AppColors.status.success,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
}); 