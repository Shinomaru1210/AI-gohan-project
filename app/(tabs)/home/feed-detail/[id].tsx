import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyFeed = [
  {
    id: 1,
    user: 'papiko',
    age: 49,
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png',
    date: '2025年07月14日(月)',
    updated: '2025年07月14日(月) 11:54',
    content: 'こんにちは♪\nおはようございます♡',
    hashtags: ['#ズボラ飯', '#ハッピーダイエッター', '#ワーママの逆襲', '#健康度80点以上', '#栄養バランス'],
    health: '-',
    intake: 0,
    burned: 116,
    likes: 54,
    liked: false,
    ganbatte: 16,
    nutritionBalance: {
      protein: 25,      // タンパク質（%）
      carbs: 55,        // 炭水化物（%）
      fat: 20,          // 脂質（%）
      score: 85,        // バランススコア（100点満点）
      vitamins: ['A', 'B1', 'C'],  // 豊富なビタミン
      minerals: ['鉄', 'カルシウム']  // 豊富なミネラル
    },
    comments: [
      {
        id: 1,
        user: 'なふぃ',
        icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png',
        text: 'おはようございます٩(｡•ω•｡)و 体に良さそう (＊´∀｀)ノ♡',
        time: '2025年07月14日(月) 09:25',
      },
      {
        id: 2,
        user: 'papiko',
        icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png',
        text: 'なふぃさん\nはい♡\n私の考える最強形態の朝ごはんと思ってます♪\n味、コスパ、タイパ全てにおいて最強ご飯♪',
        time: '2025年07月14日(月) 11:58',
      },
    ],
    meals: [
      {
        type: '朝ごはん',
        kcal: 0,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
        desc: '納豆・卵・小松菜・しらすのごはん',
      },
      {
        type: '昼ごはん',
        kcal: 0,
        image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
        desc: 'トマト・小松菜・ごはん・カツオ',
      },
      {
        type: '夜ごはん',
        kcal: 0,
        image: '',
        desc: '',
      },
    ],
    steps: 3652,
  },
];

const mealTypeToIcon = {
  '朝ごはん': 'weather-sunset',
  '昼ごはん': 'white-balance-sunny',
  '夜ごはん': 'weather-night',
};
const mealTypeToColor = {
  '朝ごはん': '#FFB74D',
  '昼ごはん': '#4FC3F7',
  '夜ごはん': '#9575CD',
};

export default function FeedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [commentInput, setCommentInput] = useState('');
  const [liked, setLiked] = useState(false);
  const [ganbatte, setGanbatte] = useState(false);
  const feed = dummyFeed.find(f => String(f.id) === String(id));
  const scrollRef = useRef<ScrollView>(null);
  const commentSectionRef = useRef<View>(null);

  if (!feed) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginTop: 60, marginBottom: 16, textAlign: 'center', fontFamily: 'NotoSansJP-Bold' }}>ごはん詳細</Text>
        <Text style={{ fontFamily: 'NotoSansJP-Regular' }}>データが見つかりません</Text>
      </SafeAreaView>
    );
  }

  // コメント欄までスクロールする関数
  const scrollToComments = () => {
    if (commentSectionRef.current && scrollRef.current) {
      commentSectionRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current?.scrollTo({ y: pageY - 80, animated: true }); // 80はヘッダー分のオフセット
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
      </TouchableOpacity>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
        {/* ユーザー情報・日付 */}
        <View style={[styles.userRow, {marginHorizontal: 16, marginTop: 40, marginBottom: 4}]}>
          <Image source={{ uri: feed.icon }} style={styles.userIcon} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.userName, { fontFamily: 'NotoSansJP-Bold' }]}>{feed.user} <Text style={[styles.userAge, { fontFamily: 'NotoSansJP-Regular' }]}>{feed.age}歳</Text></Text>
            <Text style={[styles.date, { fontFamily: 'NotoSansJP-Regular' }]}>{feed.date}</Text>
            <Text style={[styles.updated, { fontFamily: 'NotoSansJP-Regular' }]}>更新: {feed.updated}</Text>
          </View>
        </View>
        {/* 本文・ハッシュタグ */}
        <View style={[{marginHorizontal: 16, marginTop: 0, marginBottom: 0, padding: 0}]}>
          <Text style={[styles.content, { fontFamily: 'NotoSansJP-Regular' }]}>{feed.content}</Text>
          <View style={styles.hashtags}>
            {feed.hashtags.map((tag, idx) => (
              <Text key={idx} style={[styles.hashtag, { fontFamily: 'NotoSansJP-Medium' }]}>{tag}</Text>
            ))}
          </View>
        </View>
        {/* サマリー */}
        <Surface style={styles.summarySurface} elevation={1}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryBox}>
              <Text style={[styles.summaryLabel, { fontFamily: 'NotoSansJP-Regular' }]}>栄養バランス</Text>
              <Text style={[styles.summaryValue, { fontFamily: 'NotoSansJP-Bold' }]}>{feed.nutritionBalance.score}点</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={[styles.summaryLabel, { fontFamily: 'NotoSansJP-Regular' }]}>摂取カロリー</Text>
              <Text style={[styles.summaryValue, { fontFamily: 'NotoSansJP-Bold' }]}>{feed.intake}kcal</Text>
            </View>
          </View>
        </Surface>
        {/* アクション */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => setLiked(l => !l)}>
            <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? '#E74C3C' : '#6C757D'} />
            <Text style={[styles.actionText, { fontFamily: 'NotoSansJP-Bold' }]}>{feed.likes}</Text>
            <Text style={[styles.actionLabel, { fontFamily: 'NotoSansJP-Regular' }]}>いいね！</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={scrollToComments}>
            <MaterialCommunityIcons name="comment-outline" size={20} color="#6C757D" />
            <Text style={[styles.actionText, { fontFamily: 'NotoSansJP-Bold' }]}>{feed.comments.length}</Text>
            <Text style={[styles.actionLabel, { fontFamily: 'NotoSansJP-Regular' }]}>コメント</Text>
          </TouchableOpacity>
        </View>
        {/* 食事ごとの写真・説明 */}
        <View style={styles.mealSectionWrapper}>
          {feed.meals.map((meal, idx) => {
            const iconColor = mealTypeToColor[meal.type as keyof typeof mealTypeToColor] || '#BCAAA4';
            return (
              <View key={idx} style={styles.mealSection}>
                <View style={styles.mealHeader}>
                  <MaterialCommunityIcons name={mealTypeToIcon[meal.type as keyof typeof mealTypeToIcon] as any || 'food'} size={20} color={iconColor} />
                  <Text style={[styles.mealType, { fontFamily: 'NotoSansJP-Bold' }]}>{meal.type}</Text>
                  <Text style={[styles.mealKcal, { fontFamily: 'NotoSansJP-Regular' }]}>{meal.kcal} kcal</Text>
                </View>
                {meal.image ? <Image source={{ uri: meal.image }} style={styles.mealImage} /> : null}
                {meal.desc ? <Text style={[styles.mealDesc, { fontFamily: 'NotoSansJP-Regular' }]}>{meal.desc}</Text> : null}
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 4, padding: 6, borderRadius: 12 }}
                  onPress={() => router.push({ pathname: '/home/register', params: { type: meal.type, desc: meal.desc, image: meal.image } })}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons name="content-copy" size={18} color={iconColor} />
                  <Text style={{ color: iconColor, marginLeft: 4, fontSize: 13, fontFamily: 'NotoSansJP-Bold' }}>マネする</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* コメント欄 */}
        <View ref={commentSectionRef} />
        <Surface style={styles.commentSurface} elevation={1}>
          <Text style={[styles.commentTitle, { fontFamily: 'NotoSansJP-Bold' }]}>コメント</Text>
          <View style={styles.commentList}>
            {feed.comments.map((c) => (
              <View key={c.id} style={styles.commentItem}>
                <Image source={{ uri: c.icon }} style={styles.commentIcon} />
                <View style={styles.commentBody}>
                  <Text style={[styles.commentUser, { fontFamily: 'NotoSansJP-Bold' }]}>{c.user}</Text>
                  <Text style={[styles.commentText, { fontFamily: 'NotoSansJP-Regular' }]}>{c.text}</Text>
                  <Text style={[styles.commentTime, { fontFamily: 'NotoSansJP-Regular' }]}>{c.time}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.commentInput}
              value={commentInput}
              onChangeText={setCommentInput}
              placeholder="コメントを書く..."
            />
            <TouchableOpacity style={styles.commentSendBtn}>
              <MaterialCommunityIcons name="send" size={22} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 0 },
  scrollContent: { paddingHorizontal: 0, paddingBottom: 32, gap: 16 },
  userSurface: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  userRow: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingBottom: 0 },
  userIcon: { width: 48, height: 48, borderRadius: 24, marginRight: 12, backgroundColor: '#eee' },
  userName: { fontSize: 17 },
  userAge: { fontSize: 15, color: '#888' },
  date: { fontSize: 13, color: '#888', marginTop: 2 },
  updated: { fontSize: 11, color: '#BDBDBD', marginTop: 2 },
  contentSurface: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#FFF',
    padding: 16,
  },
  content: { fontSize: 15, lineHeight: 22, marginBottom: 0 },
  hashtags: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  hashtag: { color: '#8BC34A', fontSize: 13, marginRight: 8, marginBottom: 2 },
  summarySurface: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#FFF',
    padding: 0,
    overflow: 'hidden',
  },
  summaryRow: { flexDirection: 'row', borderRadius: 10, overflow: 'hidden' },
  summaryBox: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#E0E0E0' },
  summaryLabel: { fontSize: 13, color: '#888', marginBottom: 2 },
  summaryValue: { fontSize: 16, color: '#4CAF50' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 8, marginBottom: 0, marginHorizontal: 8 },
  actionBtn: { alignItems: 'center', flex: 1, paddingVertical: 8 },
  actionText: { fontSize: 14, marginTop: 2 },
  actionLabel: { fontSize: 12, color: '#888' },
  mealSurface: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#FFF',
    padding: 0,
    overflow: 'hidden',
  },
  mealHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, padding: 16, paddingBottom: 0 },
  mealType: { fontSize: 15, marginLeft: 8, flex: 1 },
  mealKcal: { fontSize: 13, color: '#888' },
  mealImage: { width: '100%', height: 120, borderRadius: 8, marginTop: 8, marginBottom: 4, marginHorizontal: 16 },
  mealDesc: { fontSize: 13, color: '#555', marginTop: 2, marginHorizontal: 16, marginBottom: 12 },
  commentSurface: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#FFF',
    padding: 0,
    overflow: 'hidden',
    marginBottom: 24,
  },
  commentTitle: { fontSize: 16, marginHorizontal: 20, marginTop: 16, marginBottom: 8 },
  commentList: { marginHorizontal: 12, marginBottom: 8 },
  commentItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  commentIcon: { width: 32, height: 32, borderRadius: 16, marginRight: 8, backgroundColor: '#eee' },
  commentBody: { flex: 1 },
  commentUser: { fontSize: 13 },
  commentText: { fontSize: 13, marginTop: 2 },
  commentTime: { fontSize: 11, color: '#BDBDBD', marginTop: 2 },
  commentInputRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12, marginBottom: 16 },
  commentInput: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 },
  commentSendBtn: { marginLeft: 8, padding: 6 },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  mealSectionWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 0,
    gap: 12,
  },
  mealSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
}); 