import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Animated, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 型定義
interface MealEntry {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  main: string;
  side: string;
  soup?: string;
  recipe?: {
    ingredients: string[];
    steps: string[];
    time: string;
    difficulty: string;
    servings: string;
  };
  isAccepted: boolean;
  isCustom: boolean;
  image?: string;
  memo?: string;
}

interface SharedMeal {
  id: string;
  user: {
    name: string;
    country: string;
    avatar: string;
  };
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  main: string;
  side: string;
  soup?: string;
  image?: string;
  likes: number;
  liked: boolean;
  tags: string[];
}

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [meals, setMeals] = useState<MealEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      mealType: 'breakfast',
      main: '食パン',
      side: 'コーヒー',
      isAccepted: true,
      isCustom: false,
      recipe: {
        ingredients: ['食パン 2枚', 'バター 適量', 'コーヒー豆 適量'],
        steps: ['食パンをトーストする', 'バターを塗る', 'コーヒーを入れる'],
        time: '5分',
        difficulty: '簡単',
        servings: '1人前'
      }
    },
    {
      id: '2',
      date: '2024-01-15',
      mealType: 'lunch',
      main: 'カレーライス',
      side: '福神漬け',
      isAccepted: true,
      isCustom: false,
      recipe: {
        ingredients: ['カレールー 1箱', '豚肉 300g', 'にんじん 2本', 'じゃがいも 2個', '玉ねぎ 1個'],
        steps: ['野菜を一口大に切る', '豚肉を炒める', '野菜を加えて炒める', '水を加えて煮込む', 'カレールーを溶かす'],
        time: '50分',
        difficulty: '普通',
        servings: '4人前'
      }
    },
    {
      id: '3',
      date: '2024-01-15',
      mealType: 'dinner',
      main: '鶏の照り焼き',
      side: '野菜炒め',
      soup: '味噌汁',
      isAccepted: true,
      isCustom: false,
      recipe: {
        ingredients: ['鶏もも肉 2枚', '醤油 大さじ2', 'みりん 大さじ2', '砂糖 大さじ1', 'キャベツ 1/4個', 'にんじん 1本'],
        steps: ['鶏もも肉を一口大に切る', '醤油、みりん、砂糖で下味をつける', 'フライパンで両面を焼く', '野菜を炒めて完成'],
        time: '30分',
        difficulty: '簡単',
        servings: '2人前'
      }
    }
  ]);

  const [sharedMeals, setSharedMeals] = useState<SharedMeal[]>([
    {
      id: '1',
      user: {
        name: 'さくら',
        country: '🇯🇵 日本',
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png'
      },
      date: '2024-01-15',
      mealType: 'breakfast',
      main: '鮭の塩焼き',
      side: '味噌汁',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      likes: 12,
      liked: false,
      tags: ['和食', 'ヘルシー']
    },
    {
      id: '2',
      user: {
        name: 'Marco',
        country: '🇮🇹 イタリア',
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png'
      },
      date: '2024-01-15',
      mealType: 'lunch',
      main: 'パスタカルボナーラ',
      side: 'サラダ',
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
      likes: 8,
      liked: true,
      tags: ['イタリアン', '本格']
    }
  ]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MealEntry | null>(null);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  // 指定した週の開始日から1週間の日付を生成
  const generateWeekDates = (weekStart: Date) => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      weekDates.push(date);
    }
    setCurrentWeek(weekDates);
    if (weekDates.length > 0) {
      setSelectedDate(weekDates[0].toISOString().split('T')[0]);
    }
  };

  // 前週に移動
  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
    generateWeekDates(newWeekStart);
  };

  // 次週に移動
  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
    generateWeekDates(newWeekStart);
  };

  // 今週に戻る
  const goToCurrentWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    setCurrentWeekStart(startOfWeek);
    generateWeekDates(startOfWeek);
  };

  // 週の表示テキストを取得
  const getWeekDisplayText = () => {
    if (currentWeek.length === 0) return '';
    
    const startDate = currentWeek[0];
    const endDate = currentWeek[6];
    
    const isCurrentWeek = startDate <= new Date() && endDate >= new Date();
    
    if (isCurrentWeek) {
      return '今週';
    } else {
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth() + 1;
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth() + 1;
      
      if (startYear === endYear && startMonth === endMonth) {
        return `${startYear}年${startMonth}月`;
      } else if (startYear === endYear) {
        return `${startYear}年${startMonth}月〜${endMonth}月`;
      } else {
        return `${startYear}年${startMonth}月〜${endYear}年${endMonth}月`;
      }
    }
  };

  // 日付を選択
  const selectDate = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  // 指定日の食事を取得
  const getMealsForDate = (date: string) => {
    return meals.filter(meal => meal.date === date);
  };

  // 食事タイプのアイコンとカラー
  const mealTypeConfig = {
    breakfast: { icon: 'weather-sunny', color: '#FFC107', label: '朝食' },
    lunch: { icon: 'food', color: '#FF6B9D', label: '昼食' },
    dinner: { icon: 'food-variant', color: '#9C27B0', label: '夕食' }
  };

  // 食事を編集
  const editMeal = (meal: MealEntry) => {
    setEditingMeal(meal);
    setIsEditModalVisible(true);
  };

  // 食事を保存
  const saveMeal = () => {
    if (editingMeal) {
      setMeals(prev => prev.map(meal => 
        meal.id === editingMeal.id ? { ...editingMeal, isCustom: true } : meal
      ));
      setIsEditModalVisible(false);
      setEditingMeal(null);
      Alert.alert('保存完了', '食事を保存しました！');
    }
  };

  // 食事を削除
  const deleteMeal = (mealId: string) => {
    Alert.alert(
      '削除確認',
      'この食事を削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: '削除', 
          style: 'destructive',
          onPress: () => {
            setMeals(prev => prev.filter(meal => meal.id !== mealId));
          }
        }
      ]
    );
  };

  // いいねを切り替え
  const toggleLike = (mealId: string) => {
    setSharedMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, liked: !meal.liked, likes: meal.liked ? meal.likes - 1 : meal.likes + 1 }
        : meal
    ));
  };

  // 食事を共有
  const shareMeal = (meal: MealEntry) => {
    Alert.alert(
      '共有確認',
      'この食事を世界中の人と共有しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: '共有', 
          onPress: () => {
            setIsShareModalVisible(true);
            Alert.alert('共有完了', '食事を共有しました！');
          }
        }
      ]
    );
  };

  // 初期化
  useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    setCurrentWeekStart(startOfWeek);
    generateWeekDates(startOfWeek);
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダーグラデーション */}
      <LinearGradient
        colors={['#FFF3E0', '#FFE0B2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="home" size={24} color="#FF9800" />
            </View>
            <Text style={styles.headerTitle}>ホーム</Text>
          </View>
          <Text style={styles.headerSubtitle}>今日の食事を記録</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContent}>
          {/* 1週間カレンダー */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIcon, { backgroundColor: '#FF9800' }]}>
                <MaterialCommunityIcons name="calendar-week" size={20} color="#fff" />
              </View>
              <Text style={[styles.sectionTitle, { color: '#FF9800' }]}>わたしのごはん</Text>
            </View>
            
            <View style={styles.sectionCard}>
              {/* 週ナビゲーション */}
              <View style={styles.weekNavigation}>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={goToPreviousWeek}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="chevron-left" size={24} color="#FF9800" />
                </TouchableOpacity>
                
                <View style={styles.weekDisplay}>
                  <Text style={styles.weekDisplayText}>{getWeekDisplayText()}</Text>
                </View>
                
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={goToNextWeek}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#FF9800" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.calendarContainer}>
                {currentWeek.map((date, index) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const dayMeals = getMealsForDate(dateStr);
                  const isSelected = selectedDate === dateStr;
                  const isToday = date.toDateString() === new Date().toDateString();
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.calendarDay,
                        isSelected && styles.calendarDaySelected,
                        isToday && styles.calendarDayToday
                      ]}
                      onPress={() => selectDate(date)}
                      activeOpacity={0.8}
                    >
                      <Text style={[
                        styles.calendarDayText,
                        isSelected && styles.calendarDayTextSelected,
                        isToday && styles.calendarDayTextToday
                      ]}>
                        {date.getDate()}
                      </Text>
                      <Text style={[
                        styles.calendarWeekText,
                        isSelected && styles.calendarWeekTextSelected
                      ]}>
                        {['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
                      </Text>
                      {dayMeals.length > 0 && (
                        <View style={styles.mealIndicator}>
                          <Text style={styles.mealIndicatorText}>{dayMeals.length}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* 選択日の食事 */}
              {selectedDate && (
                <View style={styles.selectedDateMeals}>
                  <View style={styles.selectedDateHeader}>
                    <Text style={styles.selectedDateTitle}>
                      {new Date(selectedDate).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}の食事
                    </Text>
                  </View>
                  
                  {['breakfast', 'lunch', 'dinner'].map(mealType => {
                    const meal = getMealsForDate(selectedDate).find(m => m.mealType === mealType);
                    const config = mealTypeConfig[mealType as keyof typeof mealTypeConfig];
                    
                    return (
                      <View key={mealType} style={styles.mealCard}>
                        <View style={styles.mealHeader}>
                          <View style={styles.mealIconContainer}>
                            <View style={[styles.mealIcon, { backgroundColor: config.color + '15' }]}>
                              <MaterialCommunityIcons name={config.icon as any} size={18} color={config.color} />
                            </View>
                            <Text style={styles.mealTitle}>{config.label}</Text>
                          </View>
                          <View style={styles.mealActions}>
                            {meal ? (
                              <>
                                <TouchableOpacity
                                  style={styles.actionButton}
                                  onPress={() => editMeal(meal)}
                                  activeOpacity={0.7}
                                >
                                  <MaterialCommunityIcons name="pencil" size={14} color="#2196F3" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={styles.actionButton}
                                  onPress={() => shareMeal(meal)}
                                  activeOpacity={0.7}
                                >
                                  <MaterialCommunityIcons name="share-variant" size={14} color="#FF9800" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={styles.actionButton}
                                  onPress={() => deleteMeal(meal.id)}
                                  activeOpacity={0.7}
                                >
                                  <MaterialCommunityIcons name="delete" size={14} color="#F44336" />
                                </TouchableOpacity>
                              </>
                            ) : (
                              <TouchableOpacity
                                style={[styles.addMealButton, { backgroundColor: config.color }]}
                                onPress={() => {
                                  // 食事記録画面に遷移
                                  router.push({
                                    pathname: '/home/register',
                                    params: {
                                      date: selectedDate || dayjs().format('YYYY-MM-DD'),
                                      type: mealType
                                    }
                                  });
                                }}
                                activeOpacity={0.8}
                              >
                                <MaterialCommunityIcons name="plus" size={14} color="white" />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                        
                        {meal ? (
                          <View style={styles.mealContent}>
                            <Text style={styles.mealMain}>{meal.main}</Text>
                            <Text style={styles.mealSide}>{meal.side}</Text>
                            {meal.soup && <Text style={styles.mealSoup}>{meal.soup}</Text>}
                            {meal.memo && <Text style={styles.mealMemo}>{meal.memo}</Text>}
                            <View style={styles.mealTags}>
                              {meal.isAccepted && (
                                <View style={[styles.tag, { backgroundColor: '#4CAF50' + '15' }]}>
                                  <Text style={[styles.tagText, { color: '#4CAF50' }]}>承認済み</Text>
                                </View>
                              )}
                              {meal.isCustom && (
                                <View style={[styles.tag, { backgroundColor: '#2196F3' + '15' }]}>
                                  <Text style={[styles.tagText, { color: '#2196F3' }]}>カスタム</Text>
                                </View>
                              )}
                            </View>
                          </View>
                        ) : (
                          <View style={styles.emptyMeal}>
                            <MaterialCommunityIcons name="food-variant-off" size={20} color="#B0BEC5" />
                            <Text style={styles.emptyMealText}>まだ記録がありません</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>

          {/* 世界中の食事 */}
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { justifyContent: 'space-between' }]}>
              <View style={styles.sectionHeaderLeft}>
                <View style={[styles.sectionIcon, { backgroundColor: '#FF6B35' }]}>
                  <MaterialCommunityIcons name="earth" size={20} color="#fff" />
                </View>
                <Text style={[styles.sectionTitle, { color: '#FF6B35' }]}>みんなのごはん</Text>
              </View>
              <TouchableOpacity
                style={styles.moreButton}
                activeOpacity={0.7}
                onPress={() => {
                  router.push('/home/feed-list');
                }}
              >
                <Text style={[styles.moreButtonText, { color: '#FF6B35' }]}>もっと見る</Text>
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={18}
                  color="#FF6B35" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sharedMealsContainer}>
                {sharedMeals.map(meal => (
                  <View key={meal.id} style={styles.sharedMealCard}>
                    <View style={styles.sharedMealHeader}>
                      <View style={styles.userInfo}>
                        <View style={styles.avatarContainer}>
                          <Image source={{ uri: meal.user.avatar }} style={styles.userAvatar} />
                          <View style={styles.onlineIndicator} />
                        </View>
                        <View style={styles.userDetails}>
                          <Text style={styles.userName}>{meal.user.name}</Text>
                          <Text style={styles.mealTime}>
                            {dayjs(meal.date).format('M月D日')} • {mealTypeConfig[meal.mealType].label}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={styles.likeButton}
                        onPress={() => toggleLike(meal.id)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.likeButtonInner}>
                          <MaterialCommunityIcons
                            name={meal.liked ? 'heart' : 'heart-outline'}
                            size={16}
                            color={meal.liked ? '#E74C3C' : '#FF6B35'}
                          />
                          <Text style={[styles.likeCount, { color: meal.liked ? '#E74C3C' : '#FF6B35' }]}>
                            {meal.likes}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    
                    {meal.image && (
                      <View style={styles.imageContainer}>
                        <Image source={{ uri: meal.image }} style={styles.sharedMealImage} />
                        <View style={styles.imageOverlay} />
                      </View>
                    )}
                    
                    <View style={styles.sharedMealContent}>
                      <View style={styles.mealDetails}>
                        <Text style={styles.sharedMealMain}>{meal.main}</Text>
                        <Text style={styles.sharedMealSide}>{meal.side}</Text>
                        {meal.soup && <Text style={styles.sharedMealSoup}>{meal.soup}</Text>}
                      </View>
                      
                      <View style={styles.sharedMealTags}>
                        {meal.tags.map((tag, index) => (
                          <View key={index} style={styles.globalTag}>
                            <Text style={styles.globalTagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              
              {/* 新しい投稿を促すカード */}
              <View style={styles.encourageCard}>
                <LinearGradient
                  colors={['#FF6B35', '#FF8A65']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.encourageGradient}
                >
                  <MaterialCommunityIcons name="camera-plus" size={32} color="white" />
                  <Text style={styles.encourageTitle}>あなたのごはんを共有</Text>
                  <Text style={styles.encourageSubtitle}>世界中の人と料理の楽しさを分かち合いましょう</Text>
                  <TouchableOpacity 
                    style={styles.encourageButton} 
                    activeOpacity={0.8}
                    onPress={() => router.push('/home/post')}
                  >
                    <Text style={styles.encourageButtonText}>投稿する</Text>
                    <MaterialCommunityIcons name="arrow-right" size={16} color="white" />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 編集モーダル */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsEditModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" size={24} color="#2C3E50" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>食事を編集</Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveMeal}
            >
              <MaterialCommunityIcons name="content-save" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {editingMeal && (
              <View>
                <View style={styles.editSection}>
                  <Text style={styles.editLabel}>メイン料理</Text>
                  <TextInput
                    value={editingMeal.main}
                    onChangeText={(text) => setEditingMeal({ ...editingMeal, main: text })}
                    style={styles.editInput}
                    placeholder="メイン料理を入力"
                  />
                </View>
                
                <View style={styles.editSection}>
                  <Text style={styles.editLabel}>サイド料理</Text>
                  <TextInput
                    value={editingMeal.side}
                    onChangeText={(text) => setEditingMeal({ ...editingMeal, side: text })}
                    style={styles.editInput}
                    placeholder="サイド料理を入力"
                  />
                </View>
                
                <View style={styles.editSection}>
                  <Text style={styles.editLabel}>スープ</Text>
                  <TextInput
                    value={editingMeal.soup || ''}
                    onChangeText={(text) => setEditingMeal({ ...editingMeal, soup: text })}
                    style={styles.editInput}
                    placeholder="スープを入力（任意）"
                  />
                </View>
                
                <View style={styles.editSection}>
                  <Text style={styles.editLabel}>メモ</Text>
                  <TextInput
                    value={editingMeal.memo || ''}
                    onChangeText={(text) => setEditingMeal({ ...editingMeal, memo: text })}
                    style={[styles.editInput, styles.memoInput]}
                    placeholder="メモを入力（任意）"
                    multiline
                  />
                </View>
              </View>
            )}
          </ScrollView>
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#FF9800',
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
  headerSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIcon: {
    borderRadius: 16,
    padding: 6,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  weekDisplay: {
    alignItems: 'center',
    flex: 1,
  },
  weekDisplayText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarDay: {
    alignItems: 'center',
    padding: 6,
    borderRadius: 12,
    minWidth: 36,
  },
  calendarDaySelected: {
    backgroundColor: '#FF9800',
  },
  calendarDayToday: {
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  calendarDayText: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  calendarDayTextSelected: {
    color: '#fff',
  },
  calendarDayTextToday: {
    color: '#FF9800',
  },
  calendarWeekText: {
    fontSize: 9,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    marginTop: 1,
  },
  calendarWeekTextSelected: {
    color: '#fff',
  },
  mealIndicator: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  mealIndicatorText: {
    fontSize: 7,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
  mealCard: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mealIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealTitle: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  mealActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  addMealButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealContent: {
    gap: 4,
  },
  mealMain: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Medium',
  },
  mealSide: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  mealSoup: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  mealMemo: {
    fontSize: 12,
    color: '#95A5A6',
    fontFamily: 'NotoSansJP-Regular',
    fontStyle: 'italic',
  },
  mealTags: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontFamily: 'NotoSansJP-Medium',
  },
  emptyMeal: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  emptyMealText: {
    fontSize: 12,
    color: '#B0BEC5',
    fontFamily: 'NotoSansJP-Regular',
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  moreButtonText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
  },
  sharedMealsContainer: {
    gap: 12,
  },
  sharedMealCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FFF5F0',
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 15,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  userCountry: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  likeCount: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'NotoSansJP-Bold',
  },
  sharedMealImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  sharedMealContent: {
    padding: 16,
    gap: 8,
    backgroundColor: '#FFF',
  },
  sharedMealMain: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 4,
  },
  sharedMealSide: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    marginBottom: 2,
  },
  sharedMealSoup: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    marginBottom: 4,
  },
  sharedMealTags: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    flexWrap: 'wrap',
  },
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
  saveButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  editSection: {
    marginBottom: 16,
  },
  editLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 8,
  },
  editInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  memoInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  selectedDateMeals: {
    marginTop: 12,
  },
  selectedDateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDateTitle: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  // 新しいみんなのごはんスタイル
  sharedMealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: 'white',
  },
  userDetails: {
    flex: 1,
    marginRight: 4,
  },
  mealTime: {
    fontSize: 10,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    marginTop: 2,
  },
  likeButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  mealDetails: {
    marginBottom: 2,
  },
  globalTag: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0D0',
  },
  globalTagText: {
    fontSize: 10,
    color: '#FF6B35',
    fontFamily: 'NotoSansJP-Medium',
  },
  encourageCard: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  encourageGradient: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  encourageTitle: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'NotoSansJP-Bold',
    textAlign: 'center',
  },
  encourageSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
    lineHeight: 16,
  },
  encourageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4,
  },
  encourageButtonText: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'NotoSansJP-Bold',
  },
});


