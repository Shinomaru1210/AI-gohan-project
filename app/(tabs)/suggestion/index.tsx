import PremiumFeatureLock from '@/components/ui/PremiumFeatureLock';
import SubscriptionModal from '@/components/ui/SubscriptionModal';
import { AppColors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// メイン提案タイプの定義
const mainProposalTypes = [
  {
    id: 'single',
    title: '1食分の提案',
    subtitle: '朝食・昼食・夕食から選択',
    icon: 'food-fork-drink',
    color: AppColors.status.warning,
    gradient: ['#FFF3E0', '#FFE0B2']
  },
  {
    id: 'weekly',
    title: '1週間分の献立',
    subtitle: '7日間の献立を提案',
    icon: 'calendar-week',
    color: AppColors.status.success,
    gradient: ['#E8F5E8', '#D4EDDA']
  }
];

// 食事タイプの定義
const mealTypes = [
  {
    id: 'breakfast',
    title: '朝食',
    subtitle: '朝食を提案',
    icon: 'weather-sunny',
    color: AppColors.status.warning,
    gradient: ['#FFF8E1', '#FFECB3']
  },
  {
    id: 'lunch',
    title: '昼食',
    subtitle: '昼食を提案',
    icon: 'food',
    color: AppColors.primary,
    gradient: ['#FBE9E7', '#FFCCBC']
  },
  {
    id: 'dinner',
    title: '夕食',
    subtitle: '夕食を提案',
    icon: 'food-variant',
    color: AppColors.category.dairy,
    gradient: ['#F3E5F5', '#E1BEE7']
  }
];

// 朝食スタイルの定義
const breakfastStyles = [
  { id: 'light', label: '軽食', icon: 'bread-slice', color: AppColors.status.warning, description: '食パン、コーヒーなど' },
  { id: 'normal', label: '普通', icon: 'food', color: AppColors.status.success, description: 'ごはん、味噌汁、おかず' },
  { id: 'hearty', label: 'しっかり', icon: 'food-steak', color: AppColors.status.error, description: 'ボリュームたっぷり' },
  { id: 'western', label: '洋食', icon: 'food-variant', color: AppColors.status.info, description: 'パン、卵料理など' },
  { id: 'healthy', label: 'ヘルシー', icon: 'leaf', color: AppColors.status.success, description: 'サラダ、スムージーなど' }
];

// 昼食スタイルの定義
const lunchStyles = [
  { id: 'normal', label: '普通', icon: 'food', color: AppColors.status.success, description: '定食スタイル' },
  { id: 'quick', label: '簡単', icon: 'clock-fast', color: AppColors.status.warning, description: '15分以内' },
  { id: 'healthy', label: 'ヘルシー', icon: 'leaf', color: AppColors.status.success, description: '低カロリー' },
  { id: 'western', label: '洋食', icon: 'food-steak', color: AppColors.status.info, description: 'パスタ・サラダ' },
  { id: 'japanese', label: '和食', icon: 'rice', color: AppColors.category.dairy, description: 'ごはん・味噌汁' }
];

// 夕食スタイルの定義
const dinnerStyles = [
  { id: 'japanese', label: '和食', icon: 'rice', color: AppColors.category.dairy, description: 'ごはん、味噌汁、おかず' },
  { id: 'western', label: '洋食', icon: 'food-steak', color: AppColors.status.info, description: 'パスタ、サラダなど' },
  { id: 'quick', label: '簡単', icon: 'clock-fast', color: AppColors.status.warning, description: '30分以内' },
  { id: 'healthy', label: 'ヘルシー', icon: 'leaf', color: AppColors.status.success, description: '低カロリー' },
  { id: 'luxury', label: '贅沢', icon: 'food-variant', color: AppColors.status.error, description: '特別な料理' }
];

// 1週間分の献立タイプの定義
const weeklyTypes = [
  {
    id: 'all',
    title: '21食分',
    subtitle: '1週間の朝昼夜全て',
    icon: 'calendar-multiple',
    color: AppColors.status.success,
    gradient: ['#E8F5E8', '#D4EDDA']
  },
  {
    id: 'sevenMeals',
    title: '7食分',
    subtitle: '朝昼夜から7食選択',
    icon: 'food',
    color: AppColors.primary,
    gradient: ['#FBE9E7', '#FFCCBC']
  }
];

// 7食選択用の食事タイプの定義
const sevenMealTypes = [
  {
    id: 'breakfast',
    title: '朝食',
    subtitle: '朝食を提案',
    icon: 'weather-sunny',
    color: AppColors.status.warning,
    gradient: ['#FFF8E1', '#FFECB3']
  },
  {
    id: 'lunch',
    title: '昼食',
    subtitle: '昼食を提案',
    icon: 'food',
    color: AppColors.primary,
    gradient: ['#FBE9E7', '#FFCCBC']
  },
  {
    id: 'dinner',
    title: '夕食',
    subtitle: '夕食を提案',
    icon: 'food-variant',
    color: AppColors.category.dairy,
    gradient: ['#F3E5F5', '#E1BEE7']
  }
];

export default function SuggestionScreen() {
  const [selectedMainType, setSelectedMainType] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedWeeklyType, setSelectedWeeklyType] = useState<string | null>(null);
  const [selectedSevenMealType, setSelectedSevenMealType] = useState<string | null>(null);
  const [selectedSevenStyle, setSelectedSevenStyle] = useState<string | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showPremiumLock, setShowPremiumLock] = useState(false);
  const router = useRouter();

  // サブスクリプション状態（実際のアプリでは永続化された状態を使用）
  const isPremium = false; // デモ用：falseに設定

  // メイン提案タイプを選択
  const handleMainTypeSelect = (typeId: string) => {
    setSelectedMainType(typeId);
    setSelectedMealType(null);
    setSelectedStyle(null);
    setSelectedWeeklyType(null);
    setSelectedSevenMealType(null);
    setSelectedSevenStyle(null);
  };

  // 食事タイプを選択
  const handleMealTypeSelect = (mealId: string) => {
    setSelectedMealType(mealId);
    setSelectedStyle(null);
  };

  // を提案
  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  // 1週間分の献立タイプを選択
  const handleWeeklyTypeSelect = (weeklyId: string) => {
    setSelectedWeeklyType(weeklyId);
    setSelectedSevenMealType(null);
    setSelectedSevenStyle(null);
  };

  // 7食選択用の食事タイプを選択
  const handleSevenMealTypeSelect = (mealId: string) => {
    setSelectedSevenMealType(mealId);
    setSelectedSevenStyle(null);
  };

  // 7食選択用のを提案
  const handleSevenStyleSelect = (styleId: string) => {
    setSelectedSevenStyle(styleId);
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

  // 提案を生成（画面遷移）
  const generateProposal = () => {
    if (selectedMainType === 'single') {
      if (!selectedMealType) {
        Alert.alert('エラー', '食事タイプを選択してください');
        return;
      }
      
      if ((selectedMealType === 'breakfast' || selectedMealType === 'lunch' || selectedMealType === 'dinner') && !selectedStyle) {
        Alert.alert('エラー', 'スタイルを選択してください');
        return;
      }
      
      router.push({
        pathname: '/suggestion/result',
        params: {
          type: 'single',
          mealType: selectedMealType,
          style: selectedStyle || ''
        }
      });
    } else if (selectedMainType === 'weekly') {
      if (!selectedWeeklyType) {
        Alert.alert('エラー', '1週間分の献立タイプを選択してください');
        return;
      }
      
      if (selectedWeeklyType === 'sevenMeals') {
        if (!selectedSevenMealType) {
          Alert.alert('エラー', '食事タイプを選択してください');
          return;
        }
        
        if ((selectedSevenMealType === 'breakfast' || selectedSevenMealType === 'lunch' || selectedSevenMealType === 'dinner') && !selectedSevenStyle) {
          Alert.alert('エラー', 'スタイルを選択してください');
          return;
        }
        
        router.push({
          pathname: '/suggestion/result',
          params: {
            type: 'weekly',
            weeklyType: 'sevenMeals',
            mealType: selectedSevenMealType,
            style: selectedSevenStyle || ''
          }
        });
      } else {
        router.push({
          pathname: '/suggestion/result',
          params: {
            type: 'weekly',
            weeklyType: selectedWeeklyType
          }
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダーグラデーション */}
      <LinearGradient
        colors={[AppColors.primary, '#C44569']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="chef-hat" size={24} color={AppColors.primary} />
            </View>
            <Text style={styles.headerTitle}>献立提案</Text>
          </View>
          <Text style={styles.headerSubtitle}>あなたにぴったりの料理を提案します</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContent}>
          {/* メイン提案タイプ選択 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>提案タイプを選択</Text>
            <View style={styles.typeContainer}>
              {mainProposalTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeCard,
                    selectedMainType === type.id && styles.typeCardSelected
                  ]}
                  onPress={() => handleMainTypeSelect(type.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={type.gradient as [string, string]}
                    style={styles.typeCardGradient}
                  >
                    <MaterialCommunityIcons 
                      name={type.icon as any} 
                      size={32} 
                      color={type.color} 
                    />
                    <Text style={styles.typeTitle}>{type.title}</Text>
                    <Text style={styles.typeSubtitle}>{type.subtitle}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 食事タイプ選択（1食分の提案の場合） */}
          {selectedMainType === 'single' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>食事タイプを選択</Text>
              <View style={styles.mealTypeContainer}>
                {mealTypes.map((meal) => (
                  <TouchableOpacity
                    key={meal.id}
                    style={[
                      styles.mealTypeCard,
                      selectedMealType === meal.id && styles.mealTypeCardSelected
                    ]}
                    onPress={() => handleMealTypeSelect(meal.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={meal.gradient as [string, string]}
                      style={styles.mealTypeCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={meal.icon as any} 
                        size={28} 
                        color={meal.color} 
                      />
                      <Text style={styles.mealTypeTitle}>{meal.title}</Text>
                      <Text style={styles.mealTypeSubtitle}>{meal.subtitle}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 朝食スタイル選択（1食分の提案の場合） */}
          {selectedMainType === 'single' && selectedMealType === 'breakfast' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>朝食を提案</Text>
              <View style={styles.styleContainer}>
                {breakfastStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.styleCard,
                      selectedStyle === style.id && styles.styleCardSelected
                    ]}
                    onPress={() => handleStyleSelect(style.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#FFF8E1', '#FFECB3']}
                      style={styles.styleCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={style.icon as any} 
                        size={24} 
                        color={style.color} 
                      />
                      <Text style={styles.styleTitle}>{style.label}</Text>
                      <Text style={styles.styleDescription}>{style.description}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 昼食スタイル選択（1食分の提案の場合） */}
          {selectedMainType === 'single' && selectedMealType === 'lunch' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>昼食を提案</Text>
              <View style={styles.styleContainer}>
                {lunchStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.styleCard,
                      selectedStyle === style.id && styles.styleCardSelected
                    ]}
                    onPress={() => handleStyleSelect(style.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#FBE9E7', '#FFCCBC']}
                      style={styles.styleCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={style.icon as any} 
                        size={24} 
                        color={style.color} 
                      />
                      <Text style={styles.styleTitle}>{style.label}</Text>
                      <Text style={styles.styleDescription}>{style.description}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 夕食スタイル選択（1食分の提案の場合） */}
          {selectedMainType === 'single' && selectedMealType === 'dinner' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>夕食を提案</Text>
              <View style={styles.styleContainer}>
                {dinnerStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.styleCard,
                      selectedStyle === style.id && styles.styleCardSelected
                    ]}
                    onPress={() => handleStyleSelect(style.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#F3E5F5', '#E1BEE7']}
                      style={styles.styleCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={style.icon as any} 
                        size={24} 
                        color={style.color} 
                      />
                      <Text style={styles.styleTitle}>{style.label}</Text>
                      <Text style={styles.styleDescription}>{style.description}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 1週間分の献立タイプ選択 */}
          {selectedMainType === 'weekly' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1週間分の献立タイプを選択</Text>
              <View style={styles.typeContainer}>
                {weeklyTypes.map((weekly) => (
                  <TouchableOpacity
                    key={weekly.id}
                    style={[
                      styles.typeCard,
                      selectedWeeklyType === weekly.id && styles.typeCardSelected
                    ]}
                    onPress={() => handleWeeklyTypeSelect(weekly.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={weekly.gradient as [string, string]}
                      style={styles.typeCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={weekly.icon as any} 
                        size={28} 
                        color={weekly.color} 
                      />
                      <Text style={styles.typeTitle}>{weekly.title}</Text>
                      <Text style={styles.typeSubtitle}>{weekly.subtitle}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 7食選択用の食事タイプ選択 */}
          {selectedMainType === 'weekly' && selectedWeeklyType === 'sevenMeals' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7食の食事タイプを選択</Text>
              <View style={styles.mealTypeContainer}>
                {sevenMealTypes.map((meal) => (
                  <TouchableOpacity
                    key={meal.id}
                    style={[
                      styles.mealTypeCard,
                      selectedSevenMealType === meal.id && styles.mealTypeCardSelected
                    ]}
                    onPress={() => handleSevenMealTypeSelect(meal.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={meal.gradient as [string, string]}
                      style={styles.mealTypeCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={meal.icon as any} 
                        size={28} 
                        color={meal.color} 
                      />
                      <Text style={styles.mealTypeTitle}>{meal.title}</Text>
                      <Text style={styles.mealTypeSubtitle}>{meal.subtitle}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 7食選択用の朝食スタイル選択 */}
          {selectedMainType === 'weekly' && selectedWeeklyType === 'sevenMeals' && selectedSevenMealType === 'breakfast' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>朝食を提案</Text>
              <View style={styles.styleContainer}>
                {breakfastStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.styleCard,
                      selectedSevenStyle === style.id && styles.styleCardSelected
                    ]}
                    onPress={() => handleSevenStyleSelect(style.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#FFF8E1', '#FFECB3']}
                      style={styles.styleCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={style.icon as any} 
                        size={24} 
                        color={style.color} 
                      />
                      <Text style={styles.styleTitle}>{style.label}</Text>
                      <Text style={styles.styleDescription}>{style.description}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 7食選択用の昼食スタイル選択 */}
          {selectedMainType === 'weekly' && selectedWeeklyType === 'sevenMeals' && selectedSevenMealType === 'lunch' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>昼食を提案</Text>
              <View style={styles.styleContainer}>
                {lunchStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.styleCard,
                      selectedSevenStyle === style.id && styles.styleCardSelected
                    ]}
                    onPress={() => handleSevenStyleSelect(style.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#FBE9E7', '#FFCCBC']}
                      style={styles.styleCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={style.icon as any} 
                        size={24} 
                        color={style.color} 
                      />
                      <Text style={styles.styleTitle}>{style.label}</Text>
                      <Text style={styles.styleDescription}>{style.description}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 7食選択用の夕食スタイル選択 */}
          {selectedMainType === 'weekly' && selectedWeeklyType === 'sevenMeals' && selectedSevenMealType === 'dinner' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>夕食を提案</Text>
              <View style={styles.styleContainer}>
                {dinnerStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.styleCard,
                      selectedSevenStyle === style.id && styles.styleCardSelected
                    ]}
                    onPress={() => handleSevenStyleSelect(style.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#F3E5F5', '#E1BEE7']}
                      style={styles.styleCardGradient}
                    >
                      <MaterialCommunityIcons 
                        name={style.icon as any} 
                        size={24} 
                        color={style.color} 
                      />
                      <Text style={styles.styleTitle}>{style.label}</Text>
                      <Text style={styles.styleDescription}>{style.description}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* 提案生成ボタン */}
          {((selectedMainType === 'single' && selectedMealType && selectedStyle) ||
            (selectedMainType === 'weekly' && selectedWeeklyType === 'all') ||
            (selectedMainType === 'weekly' && selectedWeeklyType === 'sevenMeals' && selectedSevenMealType && selectedSevenStyle)) && (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.generateButton}
                onPress={isPremium ? generateProposal : () => setShowPremiumLock(true)}
                activeOpacity={0.8}
              >
                              <LinearGradient
                colors={[AppColors.primary, '#C44569']}
                style={styles.generateButtonGradient}
              >
                  <MaterialCommunityIcons name="magic-staff" size={24} color="white" />
                  <Text style={styles.generateButtonText}>
                    {isPremium ? '献立を生成' : 'プレミアムで利用'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* プレミアム機能ロック */}
      {showPremiumLock && (
        <PremiumFeatureLock
          onUpgrade={handleUpgrade}
          title="AI献立提案機能"
          description="この機能はプレミアムプランでのみ利用できます。AIがあなたにぴったりの献立を提案します。"
          featureName="AI献立提案"
        />
      )}

      {/* サブスクリプションモーダル */}
      <SubscriptionModal
        visible={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
        title="AI献立提案機能"
        description="AIがあなたにぴったりの献立を提案します✨"
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
  iconContainer: {
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 8,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'NotoSansJP-Regular',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  typeCardSelected: {
    shadowOpacity: 0.2,
    elevation: 8,
  },
  typeCardGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
  },
  typeTitle: {
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  typeSubtitle: {
    fontSize: 12,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
    opacity: 0.8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  mealTypeCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  mealTypeCardSelected: {
    shadowOpacity: 0.2,
    elevation: 8,
  },
  mealTypeCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
  },
  mealTypeTitle: {
    fontSize: 14,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  mealTypeSubtitle: {
    fontSize: 10,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
    opacity: 0.8,
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  styleCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  styleCardSelected: {
    shadowOpacity: 0.2,
    elevation: 8,
  },
  styleCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
  },
  styleTitle: {
    fontSize: 14,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  styleDescription: {
    fontSize: 10,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
    opacity: 0.8,
  },
  weeklyTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  weeklyTypeCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  weeklyTypeCardSelected: {
    shadowOpacity: 0.2,
    elevation: 8,
  },
  weeklyTypeCardGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
  },
  weeklyTypeTitle: {
    fontSize: 15,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  weeklyTypeSubtitle: {
    fontSize: 11,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
    opacity: 0.8,
  },
  generateButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  generateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  generateButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
});
