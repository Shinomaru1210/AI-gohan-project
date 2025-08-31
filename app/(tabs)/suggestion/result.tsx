import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Modal, TextInput as RNTextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 型定義
interface Recipe {
  ingredients: string[];
  steps: string[];
  time: string;
  difficulty: string;
  servings: string;
}

interface SingleMealProposal {
  style?: string;
  main: string;
  side: string;
  soup?: string;
  recipe: Recipe;
}

interface WeeklyAllProposal {
  day: string;
  breakfast: { main: string; side: string; soup: string };
  lunch: { main: string; side: string; soup: string };
  dinner: { main: string; side: string; soup: string };
  recipe: Recipe;
}

interface WeeklySevenMealProposal {
  day: string;
  style?: string;
  main: string;
  side: string;
  soup?: string;
  recipe: Recipe;
}

// ダミーの献立提案データ
const dummyProposals = {
  weekly: {
    all: [
      { 
        day: '月曜日', 
        breakfast: { main: '食パン', side: 'コーヒー', soup: 'なし' },
        lunch: { main: 'カレーライス', side: '福神漬け', soup: 'なし' },
        dinner: { main: '鶏の照り焼き', side: '野菜炒め', soup: '味噌汁' },
        recipe: {
          ingredients: ['鶏もも肉 2枚', '醤油 大さじ2', 'みりん 大さじ2', '砂糖 大さじ1', 'キャベツ 1/4個', 'にんじん 1本'],
          steps: [
            '鶏もも肉を一口大に切る',
            '醤油、みりん、砂糖で下味をつける',
            'フライパンで両面を焼く',
            '野菜を炒めて完成'
          ],
          time: '30分',
          difficulty: '簡単',
          servings: '2人前'
        }
      },
      { 
        day: '火曜日', 
        breakfast: { main: 'ごはん', side: '納豆', soup: '味噌汁' },
        lunch: { main: 'パスタ', side: 'サラダ', soup: 'なし' },
        dinner: { main: '鮭の塩焼き', side: 'ポテトサラダ', soup: 'コンソメスープ' },
        recipe: {
          ingredients: ['鮭 2切れ', '塩 少々', 'じゃがいも 2個', 'マヨネーズ 大さじ2', 'コンソメ 1個'],
          steps: [
            '鮭に塩を振る',
            'オーブンで15分焼く',
            'じゃがいもを茹でてマヨネーズで和える',
            'コンソメスープを作る'
          ],
          time: '25分',
          difficulty: '簡単',
          servings: '2人前'
        }
      }
    ] as WeeklyAllProposal[],
    sevenMeals: {
      breakfast: [
        {
          day: '月曜日',
          style: 'light',
          main: '食パン',
          side: 'コーヒー',
          soup: 'なし',
          recipe: {
            ingredients: ['食パン 2枚', 'バター 適量', 'コーヒー豆 適量'],
            steps: [
              '食パンをトーストする',
              'バターを塗る',
              'コーヒーを入れる'
            ],
            time: '5分',
            difficulty: '簡単',
            servings: '1人前'
          }
        },
        {
          day: '火曜日',
          style: 'normal',
          main: 'ごはん',
          side: '納豆',
          soup: '味噌汁',
          recipe: {
            ingredients: ['ごはん 1杯', '納豆 1パック', '味噌 大さじ1', '豆腐 1/2丁', 'わかめ 適量'],
            steps: [
              'ごはんを炊く',
              '納豆を準備する',
              '味噌汁を作る'
            ],
            time: '15分',
            difficulty: '簡単',
            servings: '1人前'
          }
        }
      ] as WeeklySevenMealProposal[],
      lunch: [
        {
          day: '月曜日',
          style: 'normal',
          main: 'カレーライス',
          side: '福神漬け',
          soup: 'なし',
          recipe: {
            ingredients: ['カレールー 1箱', '豚肉 300g', 'にんじん 2本', 'じゃがいも 2個', '玉ねぎ 1個'],
            steps: [
              '野菜を一口大に切る',
              '豚肉を炒める',
              '野菜を加えて炒める',
              '水を加えて煮込む',
              'カレールーを溶かす'
            ],
            time: '50分',
            difficulty: '普通',
            servings: '4人前'
          }
        },
        {
          day: '火曜日',
          style: 'quick',
          main: 'パスタ',
          side: 'サラダ',
          soup: 'なし',
          recipe: {
            ingredients: ['スパゲッティ 200g', 'トマト 2個', 'ベーコン 100g', 'レタス 1/2個'],
            steps: [
              'パスタを茹でる',
              'ベーコンを炒める',
              'トマトを加えてソースを作る',
              'パスタと和える'
            ],
            time: '25分',
            difficulty: '簡単',
            servings: '2人前'
          }
        }
      ] as WeeklySevenMealProposal[],
      dinner: [
        {
          day: '月曜日',
          style: 'japanese',
          main: '鶏の照り焼き',
          side: '野菜炒め',
          soup: '味噌汁',
          recipe: {
            ingredients: ['鶏もも肉 2枚', '醤油 大さじ2', 'みりん 大さじ2', '砂糖 大さじ1', 'キャベツ 1/4個', 'にんじん 1本'],
            steps: [
              '鶏もも肉を一口大に切る',
              '醤油、みりん、砂糖で下味をつける',
              'フライパンで両面を焼く',
              '野菜を炒めて完成'
            ],
            time: '30分',
            difficulty: '簡単',
            servings: '2人前'
          }
        },
        {
          day: '火曜日',
          style: 'western',
          main: '鮭の塩焼き',
          side: 'ポテトサラダ',
          soup: 'コンソメスープ',
          recipe: {
            ingredients: ['鮭 2切れ', '塩 少々', 'じゃがいも 2個', 'マヨネーズ 大さじ2', 'コンソメ 1個'],
            steps: [
              '鮭に塩を振る',
              'オーブンで15分焼く',
              'じゃがいもを茹でてマヨネーズで和える',
              'コンソメスープを作る'
            ],
            time: '25分',
            difficulty: '簡単',
            servings: '2人前'
          }
        }
      ] as WeeklySevenMealProposal[]
    }
  },
  breakfast: [
    {
      style: 'light',
      main: '食パン',
      side: 'コーヒー',
      soup: 'なし',
      recipe: {
        ingredients: ['食パン 2枚', 'バター 適量', 'コーヒー豆 適量'],
        steps: [
          '食パンをトーストする',
          'バターを塗る',
          'コーヒーを入れる'
        ],
        time: '5分',
        difficulty: '簡単',
        servings: '1人前'
      }
    }
  ] as SingleMealProposal[],
  lunch: [
    {
      style: 'normal',
      main: 'カレーライス',
      side: '福神漬け',
      soup: 'なし',
      recipe: {
        ingredients: ['カレールー 1箱', '豚肉 300g', 'にんじん 2本', 'じゃがいも 2個', '玉ねぎ 1個'],
        steps: [
          '野菜を一口大に切る',
          '豚肉を炒める',
          '野菜を加えて炒める',
          '水を加えて煮込む',
          'カレールーを溶かす'
        ],
        time: '50分',
        difficulty: '普通',
        servings: '4人前'
      }
    }
  ] as SingleMealProposal[],
  dinner: [
    {
      style: 'japanese',
      main: '鶏の照り焼き',
      side: '野菜炒め',
      soup: '味噌汁',
      recipe: {
        ingredients: ['鶏もも肉 2枚', '醤油 大さじ2', 'みりん 大さじ2', '砂糖 大さじ1', 'キャベツ 1/4個', 'にんじん 1本'],
        steps: [
          '鶏もも肉を一口大に切る',
          '醤油、みりん、砂糖で下味をつける',
          'フライパンで両面を焼く',
          '野菜を炒めて完成'
        ],
        time: '30分',
        difficulty: '簡単',
        servings: '2人前'
      }
    }
  ] as SingleMealProposal[]
};

// 昼食スタイルの定義
const lunchStyles = [
  { id: 'normal', label: '普通', icon: 'food', color: '#4CAF50', description: '定食スタイル' },
  { id: 'quick', label: '簡単', icon: 'clock-fast', color: '#FF9800', description: '15分以内' },
  { id: 'healthy', label: 'ヘルシー', icon: 'leaf', color: '#4CAF50', description: '低カロリー' },
  { id: 'western', label: '洋食', icon: 'food-steak', color: '#2196F3', description: 'パスタ・サラダ' },
  { id: 'japanese', label: '和食', icon: 'rice', color: '#9C27B0', description: 'ごはん・味噌汁' }
];

// 朝食スタイルの定義
const breakfastStyles = [
  { id: 'light', label: '軽食', icon: 'bread-slice', color: '#FF9800', description: '食パン、コーヒーなど' },
  { id: 'normal', label: '普通', icon: 'food', color: '#4CAF50', description: 'ごはん、味噌汁、おかず' },
  { id: 'hearty', label: 'しっかり', icon: 'food-steak', color: '#F44336', description: 'ボリュームたっぷり' },
  { id: 'western', label: '洋食', icon: 'food-variant', color: '#2196F3', description: 'パン、卵料理など' },
  { id: 'healthy', label: 'ヘルシー', icon: 'leaf', color: '#4CAF50', description: 'サラダ、スムージーなど' }
];

// 夕食スタイルの定義
const dinnerStyles = [
  { id: 'japanese', label: '和食', icon: 'rice', color: '#9C27B0', description: 'ごはん、味噌汁、おかず' },
  { id: 'western', label: '洋食', icon: 'food-steak', color: '#2196F3', description: 'パスタ、サラダなど' },
  { id: 'quick', label: '簡単', icon: 'clock-fast', color: '#FF9800', description: '30分以内' },
  { id: 'healthy', label: 'ヘルシー', icon: 'leaf', color: '#4CAF50', description: '低カロリー' },
  { id: 'luxury', label: '贅沢', icon: 'food-variant', color: '#F44336', description: '特別な料理' }
];

export default function SuggestionResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { type, mealType, style, weeklyType } = params;
  
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isRecipeModalVisible, setIsRecipeModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // 提案データを取得
  const getProposals = () => {
    if (type === 'weekly') {
      if (weeklyType === 'all') {
        return dummyProposals.weekly.all;
      } else if (weeklyType === 'sevenMeals') {
        if (mealType === 'breakfast') {
          return dummyProposals.weekly.sevenMeals.breakfast.filter(item => !style || item.style === style);
        } else if (mealType === 'lunch') {
          return dummyProposals.weekly.sevenMeals.lunch.filter(item => !style || item.style === style);
        } else if (mealType === 'dinner') {
          return dummyProposals.weekly.sevenMeals.dinner.filter(item => !style || item.style === style);
        }
      }
    } else if (type === 'single') {
      if (mealType === 'breakfast') {
        return dummyProposals.breakfast.filter(item => !style || item.style === style);
      } else if (mealType === 'lunch') {
        return dummyProposals.lunch.filter(item => !style || item.style === style);
      } else if (mealType === 'dinner') {
        return dummyProposals.dinner.filter(item => !style || item.style === style);
      }
    }
    return [];
  };

  const proposals = getProposals();

  // 自動スクロール
  useEffect(() => {
    if (proposals.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }, 100);
    }
  }, [proposals]);

  // レシピ詳細を表示
  const showRecipeDetail = (proposal: any) => {
    setSelectedRecipe(proposal);
    setEditedRecipe(proposal);
    setIsEditing(false);
    setIsRecipeModalVisible(true);
  };

  // レシピを承諾
  const acceptRecipe = () => {
    Alert.alert(
      '献立を承諾',
      'この献立を承諾しますか？\n不足している食材は買い物リストに追加されます。',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: '承諾', 
          onPress: () => {
            Alert.alert('承諾完了', '献立を承諾しました！\n不足食材を買い物リストに追加しました。');
            setIsRecipeModalVisible(false);
          }
        }
      ]
    );
  };

  // 編集モードを切り替え
  const toggleEditMode = () => {
    if (isEditing) {
      setSelectedRecipe(editedRecipe);
      setIsEditing(false);
      Alert.alert('保存完了', 'レシピを保存しました！');
    } else {
      setIsEditing(true);
    }
  };

  // 編集内容を更新
  const updateEditedRecipe = (field: string, value: string) => {
    setEditedRecipe((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // レシピの材料を更新
  const updateIngredients = (index: number, value: string) => {
    const newIngredients = [...(editedRecipe.recipe?.ingredients || [])];
    newIngredients[index] = value;
    setEditedRecipe((prev: any) => ({
      ...prev,
      recipe: {
        ...prev.recipe,
        ingredients: newIngredients
      }
    }));
  };

  // レシピの手順を更新
  const updateSteps = (index: number, value: string) => {
    const newSteps = [...(editedRecipe.recipe?.steps || [])];
    newSteps[index] = value;
    setEditedRecipe((prev: any) => ({
      ...prev,
      recipe: {
        ...prev.recipe,
        steps: newSteps
      }
    }));
  };

  // タイトルを取得
  const getTitle = () => {
    if (type === 'weekly') {
      if (weeklyType === 'all') {
        return '1週間の献立（朝昼夜21食）';
      } else if (weeklyType === 'sevenMeals') {
        if (mealType === 'breakfast') {
          const styleLabel = breakfastStyles.find(s => s.id === style)?.label || '';
          return `7食の朝食提案${styleLabel ? ` - ${styleLabel}` : ''}`;
        } else if (mealType === 'lunch') {
          const styleLabel = lunchStyles.find(s => s.id === style)?.label || '';
          return `7食の昼食提案${styleLabel ? ` - ${styleLabel}` : ''}`;
        } else if (mealType === 'dinner') {
          const styleLabel = dinnerStyles.find(s => s.id === style)?.label || '';
          return `7食の夕食提案${styleLabel ? ` - ${styleLabel}` : ''}`;
        }
      }
    } else if (type === 'single') {
      if (mealType === 'breakfast') {
        const styleLabel = breakfastStyles.find(s => s.id === style)?.label || '';
        return `朝食提案${styleLabel ? ` - ${styleLabel}` : ''}`;
      } else if (mealType === 'lunch') {
        const styleLabel = lunchStyles.find(s => s.id === style)?.label || '';
        return `昼食提案${styleLabel ? ` - ${styleLabel}` : ''}`;
      } else if (mealType === 'dinner') {
        const styleLabel = dinnerStyles.find(s => s.id === style)?.label || '';
        return `夕食提案${styleLabel ? ` - ${styleLabel}` : ''}`;
      }
    }
    return '献立提案';
  };

  // 提案カードのレンダリング
  const renderProposalCard = (proposal: any, index: number) => {
    const isWeeklyAll = type === 'weekly' && weeklyType === 'all';
    const isWeeklySevenMeals = type === 'weekly' && weeklyType === 'sevenMeals';
    
    return (
      <TouchableOpacity
        key={index}
        style={styles.proposalCard}
        onPress={() => showRecipeDetail(proposal)}
        activeOpacity={0.8}
      >
        <View style={styles.proposalHeader}>
          {(isWeeklyAll || isWeeklySevenMeals) && proposal.day && (
            <Text style={styles.dayText}>{proposal.day}</Text>
          )}
          <View style={styles.recipeInfo}>
            <MaterialCommunityIcons name="book-open-variant" size={16} color="#FF6B9D" />
            <Text style={styles.recipeInfoText}>レシピを見る</Text>
          </View>
        </View>
        
        {isWeeklyAll ? (
          <View style={styles.weeklyContent}>
            <View style={styles.mealSection}>
              <Text style={styles.mealTitle}>朝食</Text>
              <View style={styles.dishItem}>
                <MaterialCommunityIcons name="weather-sunny" size={16} color="#FFC107" />
                <Text style={styles.dishText}>{proposal.breakfast.main}</Text>
              </View>
              <View style={styles.dishItem}>
                <MaterialCommunityIcons name="food-variant" size={16} color="#FF9800" />
                <Text style={styles.dishText}>{proposal.breakfast.side}</Text>
              </View>
            </View>
            <View style={styles.mealSection}>
              <Text style={styles.mealTitle}>昼食</Text>
              <View style={styles.dishItem}>
                <MaterialCommunityIcons name="food" size={16} color="#FF6B9D" />
                <Text style={styles.dishText}>{proposal.lunch.main}</Text>
              </View>
              <View style={styles.dishItem}>
                <MaterialCommunityIcons name="food-variant" size={16} color="#FF9800" />
                <Text style={styles.dishText}>{proposal.lunch.side}</Text>
              </View>
            </View>
            <View style={styles.mealSection}>
              <Text style={styles.mealTitle}>夕食</Text>
              <View style={styles.dishItem}>
                <MaterialCommunityIcons name="food" size={16} color="#FF6B9D" />
                <Text style={styles.dishText}>{proposal.dinner.main}</Text>
              </View>
              <View style={styles.dishItem}>
                <MaterialCommunityIcons name="food-variant" size={16} color="#FF9800" />
                <Text style={styles.dishText}>{proposal.dinner.side}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.proposalContent}>
            <View style={styles.dishItem}>
              <MaterialCommunityIcons name="food" size={16} color="#FF6B9D" />
              <Text style={styles.dishText}>{proposal.main}</Text>
            </View>
            <View style={styles.dishItem}>
              <MaterialCommunityIcons name="food-variant" size={16} color="#FF9800" />
              <Text style={styles.dishText}>{proposal.side}</Text>
            </View>
            {proposal.soup && proposal.soup !== 'なし' && (
              <View style={styles.dishItem}>
                <MaterialCommunityIcons name="cup" size={16} color="#2196F3" />
                <Text style={styles.dishText}>{proposal.soup}</Text>
              </View>
            )}
          </View>
        )}
        
        {proposal.recipe?.time && (
          <View style={styles.proposalMeta}>
            <Text style={styles.metaText}>調理時間: {proposal.recipe.time}</Text>
            <Text style={styles.metaText}>難易度: {proposal.recipe.difficulty}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* ヘッダーグラデーション */}
        <LinearGradient
          colors={['#FF6B9D', '#C44569']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>{getTitle()}</Text>
              <Text style={styles.headerSubtitle}>あなたにぴったりの料理を提案します</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.mainContent}>
          {/* 提案結果表示 */}
          {proposals.length > 0 ? (
            <View style={styles.section}>
              {proposals.map((proposal, index) => renderProposalCard(proposal, index))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="food-off" size={64} color="#B0BEC5" />
              <Text style={styles.emptyText}>提案が見つかりませんでした</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* レシピ詳細モーダル */}
      <Modal
        visible={isRecipeModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsRecipeModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" size={24} color="#2C3E50" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {isEditing ? 'レシピを編集' : 'レシピ詳細'}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={toggleEditMode}
            >
              <MaterialCommunityIcons 
                name={isEditing ? "content-save" : "pencil"} 
                size={24} 
                color="#FF6B9D" 
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedRecipe && (
              <View>
                {/* 献立概要 */}
                <View style={styles.recipeOverview}>
                  {(type === 'weekly' && (weeklyType === 'all' || weeklyType === 'sevenMeals')) && selectedRecipe.day && (
                    <Text style={styles.recipeDay}>{selectedRecipe.day}</Text>
                  )}
                  {type === 'weekly' && weeklyType === 'all' ? (
                    <>
                      <Text style={styles.recipeMain}>朝食: {selectedRecipe.breakfast?.main}</Text>
                      <Text style={styles.recipeSide}>昼食: {selectedRecipe.lunch?.main}</Text>
                      <Text style={styles.recipeSoup}>夕食: {selectedRecipe.dinner?.main}</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.recipeMain}>{selectedRecipe.main}</Text>
                      <Text style={styles.recipeSide}>{selectedRecipe.side}</Text>
                      {selectedRecipe.soup && selectedRecipe.soup !== 'なし' && (
                        <Text style={styles.recipeSoup}>{selectedRecipe.soup}</Text>
                      )}
                    </>
                  )}
                </View>

                {/* レシピ情報 */}
                {selectedRecipe.recipe && (
                  <View style={styles.recipeDetails}>
                    <View style={styles.recipeMeta}>
                      <View style={styles.metaItem}>
                        <MaterialCommunityIcons name="clock" size={20} color="#FF6B9D" />
                        <Text style={styles.metaText}>
                          {isEditing ? (
                            <RNTextInput
                              value={editedRecipe.recipe.time}
                              onChangeText={(value) => updateEditedRecipe('recipe', { ...editedRecipe.recipe, time: value })}
                              style={styles.editInput}
                            />
                          ) : (
                            selectedRecipe.recipe.time
                          )}
                        </Text>
                      </View>
                      <View style={styles.metaItem}>
                        <MaterialCommunityIcons name="star" size={20} color="#FF9800" />
                        <Text style={styles.metaText}>
                          {isEditing ? (
                            <RNTextInput
                              value={editedRecipe.recipe.difficulty}
                              onChangeText={(value) => updateEditedRecipe('recipe', { ...editedRecipe.recipe, difficulty: value })}
                              style={styles.editInput}
                            />
                          ) : (
                            selectedRecipe.recipe.difficulty
                          )}
                        </Text>
                      </View>
                      <View style={styles.metaItem}>
                        <MaterialCommunityIcons name="account-group" size={20} color="#2196F3" />
                        <Text style={styles.metaText}>
                          {isEditing ? (
                            <RNTextInput
                              value={editedRecipe.recipe.servings}
                              onChangeText={(value) => updateEditedRecipe('recipe', { ...editedRecipe.recipe, servings: value })}
                              style={styles.editInput}
                            />
                          ) : (
                            selectedRecipe.recipe.servings
                          )}
                        </Text>
                      </View>
                    </View>

                    {/* 材料 */}
                    <View style={styles.ingredientsSection}>
                      <Text style={styles.sectionTitle}>材料</Text>
                      {(isEditing ? editedRecipe.recipe.ingredients : selectedRecipe.recipe.ingredients).map((ingredient: string, index: number) => (
                        <View key={index} style={styles.ingredientItem}>
                          <MaterialCommunityIcons name="circle-small" size={24} color="#FF6B9D" />
                          {isEditing ? (
                            <RNTextInput
                              value={ingredient}
                              onChangeText={(value) => updateIngredients(index, value)}
                              style={styles.editInput}
                              placeholder="材料を入力"
                            />
                          ) : (
                            <Text style={styles.ingredientText}>{ingredient}</Text>
                          )}
                        </View>
                      ))}
                    </View>

                    {/* 手順 */}
                    <View style={styles.stepsSection}>
                      <Text style={styles.sectionTitle}>作り方</Text>
                      {(isEditing ? editedRecipe.recipe.steps : selectedRecipe.recipe.steps).map((step: string, index: number) => (
                        <View key={index} style={styles.stepItem}>
                          <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>{index + 1}</Text>
                          </View>
                          {isEditing ? (
                            <RNTextInput
                              value={step}
                              onChangeText={(value) => updateSteps(index, value)}
                              style={[styles.editInput, styles.stepInput]}
                              placeholder="手順を入力"
                              multiline
                            />
                          ) : (
                            <Text style={styles.stepText}>{step}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* 承諾ボタン */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.acceptRecipeButton}
              onPress={acceptRecipe}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4CAF50', '#45A049']}
                style={styles.acceptButtonGradient}
              >
                <MaterialCommunityIcons name="check" size={24} color="white" />
                <Text style={styles.acceptButtonText}>この献立を承諾</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'NotoSansJP-Regular',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  proposalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  proposalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  recipeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recipeInfoText: {
    fontSize: 12,
    color: '#FF6B9D',
    fontFamily: 'NotoSansJP-Medium',
  },
  weeklyContent: {
    gap: 16,
  },
  mealSection: {
    gap: 8,
  },
  mealTitle: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 4,
  },
  proposalContent: {
    gap: 8,
  },
  dishItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dishText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
  },
  proposalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  metaText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#B0BEC5',
    fontFamily: 'NotoSansJP-Regular',
    marginTop: 16,
  },
  // モーダル関連のスタイル
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    flex: 1,
    textAlign: 'center',
  },
  editButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  recipeOverview: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  recipeDay: {
    fontSize: 16,
    color: '#FF6B9D',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 8,
  },
  recipeMain: {
    fontSize: 20,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 4,
  },
  recipeSide: {
    fontSize: 16,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    marginBottom: 4,
  },
  recipeSoup: {
    fontSize: 16,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  recipeDetails: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  recipeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  metaItem: {
    alignItems: 'center',
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 16,
  },
  ingredientsSection: {
    marginBottom: 24,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
    flex: 1,
  },
  stepsSection: {
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    backgroundColor: '#FF6B9D',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'NotoSansJP-Bold',
  },
  stepText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
    flex: 1,
    lineHeight: 24,
  },
  editInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flex: 1,
  },
  stepInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  acceptRecipeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  acceptButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  acceptButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
}); 