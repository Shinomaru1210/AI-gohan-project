import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyFeed = [
  {
    id: 1,
    user: 'さくら',
    time: '5分前',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    content: '🍚 鮭の塩焼きと味噌汁の朝ごはん！',
    tags: ['和食', 'ヘルシー'],
  },
  {
    id: 2,
    user: 'たろう',
    time: '10分前',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    content: '🥗 サラダとパンのランチ',
    tags: ['洋食', 'サラダ'],
  },
  {
    id: 3,
    user: 'みき',
    time: '30分前',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    content: '🍛 カレーライスとサラダ',
    tags: ['カレー', '野菜'],
  },
];

export default function FeedListScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>みんなのごはん一覧</Text>
      <ScrollView contentContainerStyle={styles.listContent}>
        {dummyFeed.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => router.push(`/home/feed-detail/${item.id}`)}
            style={{ borderRadius: 16, marginBottom: 16 }}
          >
            <Surface style={styles.card} elevation={2}>
              <View style={styles.header}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.user}>{item.user}</Text>
                  <View style={styles.metaRow}>
                    <MaterialCommunityIcons name="clock-outline" size={12} color="#6C757D" />
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.content}>{item.content}</Text>
              <View style={styles.tagsRow}>
                {item.tags.map((tag, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </Surface>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#FFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eee',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  user: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 12,
    color: '#6C757D',
    marginLeft: 2,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
}); 