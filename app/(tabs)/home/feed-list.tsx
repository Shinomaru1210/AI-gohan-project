import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// みんなのごはんのサンプルデータ
const sharedMeals = [
  {
    id: '1',
    user: {
      name: '田中花子',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    date: '2024-01-15',
    mealType: 'breakfast',
    main: 'アボカドトースト',
    side: 'スクランブルエッグ',
    soup: 'ミネストローネ',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    likes: 24,
    liked: false,
    tags: ['朝食', 'ヘルシー', '簡単'],
  },
  {
    id: '2',
    user: {
      name: '佐藤太郎',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    date: '2024-01-15',
    mealType: 'lunch',
    main: 'カレーライス',
    side: '福神漬け',
    soup: '味噌汁',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop',
    likes: 18,
    liked: true,
    tags: ['和食', '定食', '人気'],
  },
  {
    id: '3',
    user: {
      name: '山田美咲',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    date: '2024-01-15',
    mealType: 'dinner',
    main: 'パスタカルボナーラ',
    side: 'サラダ',
    soup: 'トマトスープ',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    likes: 31,
    liked: false,
    tags: ['イタリアン', 'パスタ', '本格'],
  },
  {
    id: '4',
    user: {
      name: '鈴木健太',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    date: '2024-01-14',
    mealType: 'breakfast',
    main: 'パンケーキ',
    side: 'フルーツ',
    soup: 'オレンジジュース',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    likes: 42,
    liked: true,
    tags: ['朝食', 'スイーツ', 'インスタ映え'],
  },
  {
    id: '5',
    user: {
      name: '高橋愛',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    },
    date: '2024-01-14',
    mealType: 'lunch',
    main: 'ラーメン',
    side: '餃子',
    soup: 'スープ',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    likes: 28,
    liked: false,
    tags: ['中華', '麺類', '定番'],
  },
  {
    id: '6',
    user: {
      name: '伊藤大輔',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    },
    date: '2024-01-14',
    mealType: 'dinner',
    main: 'ステーキ',
    side: 'ポテト',
    soup: 'コーンスープ',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    likes: 35,
    liked: true,
    tags: ['洋食', '肉料理', '高級'],
  },
];

const mealTypeConfig = {
  breakfast: { label: '朝食', color: '#4CAF50' },
  lunch: { label: '昼食', color: '#FF9800' },
  dinner: { label: '夕食', color: '#9C27B0' },
};

export default function FeedListScreen() {
  const router = useRouter();
  const [likedMeals, setLikedMeals] = useState<Set<string>>(new Set());

  const toggleLike = (mealId: string) => {
    setLikedMeals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(mealId)) {
        newSet.delete(mealId);
      } else {
        newSet.add(mealId);
      }
      return newSet;
    });
  };

  const getMealWithLikeStatus = (meal: any) => ({
    ...meal,
    liked: likedMeals.has(meal.id),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>みんなのごはん</Text>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      {/* フィルタータブ */}
      <View style={styles.filterTabs}>
        <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]} activeOpacity={0.7}>
          <Text style={[styles.filterTabText, styles.filterTabTextActive]}>すべて</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab} activeOpacity={0.7}>
          <Text style={styles.filterTabText}>朝食</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab} activeOpacity={0.7}>
          <Text style={styles.filterTabText}>昼食</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab} activeOpacity={0.7}>
          <Text style={styles.filterTabText}>夕食</Text>
        </TouchableOpacity>
      </View>

      {/* 投稿一覧 */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.mealsContainer}>
          {sharedMeals.map(meal => {
            const mealWithLike = getMealWithLikeStatus(meal);
            return (
              <View key={meal.id} style={styles.mealCard}>
                <View style={styles.mealHeader}>
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
                        name={mealWithLike.liked ? 'heart' : 'heart-outline'}
                        size={16}
                        color={mealWithLike.liked ? '#E74C3C' : '#FF6B35'}
                      />
                      <Text style={[styles.likeCount, { color: mealWithLike.liked ? '#E74C3C' : '#FF6B35' }]}>
                        {meal.likes}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                
                {meal.image && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: meal.image }} style={styles.mealImage} />
                    <View style={styles.imageOverlay} />
                  </View>
                )}
                
                <View style={styles.mealContent}>
                  <View style={styles.mealDetails}>
                    <Text style={styles.mealMain}>{meal.main}</Text>
                    <Text style={styles.mealSide}>{meal.side}</Text>
                    {meal.soup && <Text style={styles.mealSoup}>{meal.soup}</Text>}
                  </View>
                  
                  <View style={styles.mealTags}>
                    {meal.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 投稿ボタン */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <LinearGradient
          colors={['#FF6B35', '#FF8A65']}
          style={styles.fabGradient}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
    color: '#2C3E50',
  },
  filterButton: {
    padding: 8,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  filterTabActive: {
    backgroundColor: '#FF6B35',
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
    color: '#7F8C8D',
  },
  filterTabTextActive: {
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  mealsContainer: {
    padding: 20,
    gap: 16,
  },
  mealCard: {
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
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'transparent',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  mealTime: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Regular',
    color: '#7F8C8D',
  },
  likeButton: {
    // スタイルは既存のものを使用
  },
  likeButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  likeCount: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Bold',
  },
  imageContainer: {
    position: 'relative',
  },
  mealImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  mealContent: {
    padding: 16,
    gap: 12,
  },
  mealDetails: {
    gap: 4,
  },
  mealMain: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  mealSide: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#7F8C8D',
    marginBottom: 2,
  },
  mealSoup: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#7F8C8D',
    marginBottom: 4,
  },
  mealTags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFE0D0',
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Medium',
    color: '#FF6B35',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 28,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 