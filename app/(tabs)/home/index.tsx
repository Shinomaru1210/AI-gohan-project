import DateSelector from '@/components/home/DateSelector';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const defaultMeals = { 朝ごはん: null, 昼ごはん: null, 夜ごはん: null };
type MealType = keyof typeof defaultMeals;

type MealEntry = {
  content: string;
  kind: string;
  calories?: string;
};

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;
const mealTypeToIcon: Record<MealType, MaterialCommunityIconName> = {
  '朝ごはん': 'weather-sunset',
  '昼ごはん': 'white-balance-sunny',
  '夜ごはん': 'weather-night',
};

const mealTypeToColor: Record<MealType, string> = {
  '朝ごはん': '#FFB74D',
  '昼ごはん': '#4FC3F7',
  '夜ごはん': '#9575CD',
};

const feedData = [
  {
    id: 1,
    user: 'さくら',
    age: 28,
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png',
    date: '2025年07月14日(月)',
    time: '5分前',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    content: '🍚 鮭の塩焼きと味噌汁の朝ごはん！',
    likes: 12,
    liked: false,
  },
  {
    id: 2,
    user: 'たろう',
    age: 35,
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png',
    date: '2025年07月13日(日)',
    time: '10分前',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    content: '🥗 サラダとパンのランチ',
    likes: 8,
    liked: true,
  },
];

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const router = useRouter();
  const [feed, setFeed] = useState(feedData);
  const [scaleAnim] = useState(new Animated.Value(1));

  const currentMeals = defaultMeals as Record<MealType, MealEntry | null>;
  
  // テーマカラーの取得
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = '#6C757D';

  const handleRegister = (type: MealType) => {
    if (!selectedDate) return;
    
    // ボタンアニメーション
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

    router.push({
      pathname: '/home/register',
      params: { date: selectedDate, type },
    });
  };

  const handleLike = (id: number) => {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <DateSelector onDateSelect={(dateStr) => setSelectedDate(dateStr)} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mealsContainer}>
          {(Object.keys(defaultMeals) as MealType[]).map((type, index) => {
          const entry = currentMeals[type];
            const iconColor = mealTypeToColor[type];

          return (
              <Animated.View
                key={type}
                style={[
                  styles.mealCardContainer,
                  { transform: [{ scale: scaleAnim }] }
                ]}
              >
                <Surface style={[styles.mealCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={2}>
                  <View style={styles.mealHeader}>
                    <View style={styles.mealIconContainer}>
                      <View style={[styles.iconBackground, { backgroundColor: iconColor + '20' }]}>
                  <MaterialCommunityIcons
                    name={mealTypeToIcon[type]}
                          size={24}
                          color={iconColor}
                        />
                      </View>
                      <Text style={[styles.mealTitle, { color: textColor, fontFamily: 'NotoSansJP-Bold' }]}>{type}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.addButton, { backgroundColor: iconColor }]}
                    onPress={() => handleRegister(type)}
                      activeOpacity={0.8}
                    >
                      <MaterialCommunityIcons name="plus" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.mealContent}>
                {entry ? (
                  <>
                        <Text style={[styles.contentText, { color: textColor, fontFamily: 'NotoSansJP-Regular' }]}>{entry.content}</Text>
                    <View style={styles.chipRow}>
                          {entry.kind && (
                            <Chip 
                              style={[styles.chip, { backgroundColor: iconColor + '15' }]}
                              textStyle={{ color: iconColor, fontFamily: 'NotoSansJP-Medium' }}
                            >
                              {entry.kind}
                            </Chip>
                          )}
                      {entry.calories && (
                            <Chip 
                              style={[styles.chip, { backgroundColor: '#4CAF50' + '15' }]}
                              textStyle={{ color: '#4CAF50', fontFamily: 'NotoSansJP-Medium' }}
                            >
                              {entry.calories} kcal
                            </Chip>
                      )}
                    </View>
                  </>
                ) : (
                      <View style={styles.emptyState}>
                        <MaterialCommunityIcons
                          name="food-variant-off"
                          size={32}
                          color={textSecondaryColor}
                        />
                        <Text style={[styles.placeholder, { color: textSecondaryColor, fontFamily: 'NotoSansJP-Regular' }]}>
                          まだ記録がありません
                        </Text>
                      </View>
                )}
                  </View>
                </Surface>
              </Animated.View>
          );
        })}
        </View>

        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: '#FF6B35' }]}
          activeOpacity={0.8}
          onPress={() => {
            // 今後: 共有機能へ
          }}
        >
          <MaterialCommunityIcons name="share-variant" size={14} color="white" />
          <Text style={[styles.shareButtonText, { fontFamily: 'NotoSansJP-Bold' }]}>みんなと共有する</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <View style={[styles.sectionIcon, { backgroundColor: '#FF6B35' + '20' }]}> 
              <MaterialCommunityIcons name="account-group" size={20} color="#FF6B35" />
            </View>
            <Text style={[styles.sectionTitle, { color: textColor, fontFamily: 'NotoSansJP-Bold' }]}>みんなのごはん</Text>
          </View>
          <TouchableOpacity
            style={styles.moreButton}
            activeOpacity={0.7}
            onPress={() => router.push('/home/feed-list')}
          >
            <Text style={[styles.moreButtonText, { color: '#FF6B35', fontFamily: 'NotoSansJP-Bold' }]}>もっと見る</Text>
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={16}
              color="#FF6B35" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.feed}>
          {feed.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.feedCardContainer,
                {
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push({ pathname: '/home/feed-detail/[id]', params: { id: item.id } })}
                style={{ borderRadius: 16 }}
              >
                <Surface style={[styles.feedCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={2}>
              <View style={styles.feedHeader}>
                    <View style={styles.userSection}>
                      <Image source={{ uri: item.icon }} style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8, backgroundColor: '#eee' }} />
                      <View style={styles.feedUserInfo}>
                        <Text style={[styles.feedUser, { color: textColor, fontFamily: 'NotoSansJP-Bold' }]}>{item.user} <Text style={{ fontSize: 13, color: '#888', fontFamily: 'NotoSansJP-Regular' }}>{item.age}歳</Text></Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <MaterialCommunityIcons name="calendar" size={12} color={textSecondaryColor} />
                          <Text style={[styles.feedTime, { color: textSecondaryColor, fontFamily: 'NotoSansJP-Regular' }]}>{item.date}</Text>
                          <MaterialCommunityIcons name="clock-outline" size={12} color={textSecondaryColor} style={{ marginLeft: 8 }} />
                          <Text style={[styles.feedTime, { color: textSecondaryColor, fontFamily: 'NotoSansJP-Regular' }]}>{item.time}</Text>
                        </View>
                      </View>
                </View>
                    <TouchableOpacity 
                      style={[styles.likeButton, { backgroundColor: item.liked ? '#E74C3C' + '15' : 'transparent' }]}
                      onPress={() => handleLike(item.id)}
                      activeOpacity={0.7}
                    >
                    <MaterialCommunityIcons
                      name={item.liked ? 'heart' : 'heart-outline'}
                        size={18}
                        color={item.liked ? '#E74C3C' : textSecondaryColor}
                    />
                      <Text style={[styles.likeCount, { color: item.liked ? '#E74C3C' : textSecondaryColor, fontFamily: 'NotoSansJP-Medium' }]}>
                        {item.likes}
                      </Text>
                  </TouchableOpacity>
                  </View>
                  <View style={styles.feedContent}>
                    <Text style={[styles.feedContentText, { color: textColor, fontFamily: 'NotoSansJP-Regular' }]}>{item.content}</Text>
                    <View style={styles.feedTags}>
                      <View style={[styles.tag, { backgroundColor: '#4CAF50' + '15' }]}>
                        <Text style={[styles.tagText, { color: '#4CAF50', fontFamily: 'NotoSansJP-Medium' }]}>和食</Text>
                      </View>
                      <View style={[styles.tag, { backgroundColor: '#2196F3' + '15' }]}>
                        <Text style={[styles.tagText, { color: '#2196F3', fontFamily: 'NotoSansJP-Medium' }]}>ヘルシー</Text>
                      </View>
                </View>
              </View>
                </Surface>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 12, // 20→12
    paddingBottom: 16, // 32→16
  },
  mealsContainer: {
    gap: 8, // 16→8
    marginBottom: 12, // 24→12
  },
  mealCardContainer: {
    borderRadius: 10, // 16→10
    overflow: 'hidden',
  },
  mealCard: {
    borderRadius: 10, // 16→10
    borderWidth: 1,
    overflow: 'hidden',
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10, // 16→10
    paddingBottom: 6, // 12→6
  },
  mealIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // 12→6
  },
  iconBackground: {
    width: 32, // 40→32
    height: 32, // 40→32
    borderRadius: 16, // 20→16
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 16, // 18→16
  },
  addButton: {
    width: 22, // 28→22
    height: 22, // 28→22
    borderRadius: 11, // 14→11
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealContent: {
    padding: 10, // 16→10
    paddingTop: 0,
  },
  contentText: {
    fontSize: 15, // 16→15
    marginBottom: 6, // 12→6
    lineHeight: 20, // 22→20
  },
  chipRow: {
    flexDirection: 'row',
    gap: 4, // 8→4
    flexWrap: 'wrap',
  },
  chip: {
    borderRadius: 8, // 12→8
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 10, // 20→10
    gap: 4, // 8→4
  },
  placeholder: {
    fontSize: 13, // 14→13
    opacity: 0.7,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6, // 8→6
    borderRadius: 6, // 8→6
    gap: 2, // 4→2
    marginBottom: 12, // 16→12
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16, // 13→16
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 追加
    marginBottom: 0,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 0,
  },
  sectionSubtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 0, // alignSelf, marginLeft, marginBottom削除
    marginBottom: 0,
  },
  moreButtonText: {
    fontSize: 15, // 11→15
    fontFamily: 'NotoSansJP-Bold',
  },
  feed: {
    gap: 4, // 8→4
  },
  feedCardContainer: {
    borderRadius: 6, // 10→6
    overflow: 'hidden',
  },
  feedCard: {
    borderRadius: 6, // 10→6
    borderWidth: 1,
    overflow: 'hidden',
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6, // 10→6
    paddingBottom: 2, // 6→2
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  feedImage: {
    width: 28, // 36→28
    height: 28, // 36→28
    borderRadius: 14, // 18→14
    backgroundColor: '#f0f0f0',
    marginRight: 4, // 追加
  },
  feedUserInfo: {
    marginLeft: 4, // 6→4
    flex: 1,
  },
  feedUser: {
    fontSize: 13, // 15→13
    marginBottom: 0, // 2→0
  },
  feedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1, // 2→1
  },
  feedTime: {
    fontSize: 10, // 11→10
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1, // 2→1
    paddingHorizontal: 2, // 6→2
    paddingVertical: 2, // 4→2
    borderRadius: 8, // 12→8
  },
  likeCount: {
    fontSize: 10, // 12→10
  },
  feedContent: {
    paddingHorizontal: 6, // 10→6
    paddingBottom: 6, // 10→6
  },
  feedContentText: {
    fontSize: 13, // 14→13
    lineHeight: 16, // 18→16
    marginBottom: 4, // 6→4
  },
  feedTags: {
    flexDirection: 'row',
    gap: 2, // 4→2
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 4, // 6→4
    paddingVertical: 1, // 2→1
    borderRadius: 6, // 8→6
  },
  tagText: {
    fontSize: 9, // 10→9
  },
});
