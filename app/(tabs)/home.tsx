// app/(tabs)/home.tsx

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState } from 'react';

const days = ['月', '火', '水', '木', '金', '土', '日'];

type MealType = '朝ごはん' | '昼ごはん' | '夜ごはん';

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [meals, setMeals] = useState<Record<MealType, string>>({
    朝ごはん: '',
    昼ごはん: '',
    夜ごはん: '',
  });

  const handleMealEdit = (type: MealType) => {
    const prev = meals[type];
    const next =
      prev === '食べなかった' ? '' : prev === '' ? '食べなかった' : '';
    setMeals({ ...meals, [type]: next });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HOME</Text>

      {/* 曜日ボタン */}
      <View style={styles.dayRow}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              selectedDay === index && styles.dayButtonSelected,
            ]}
            onPress={() => setSelectedDay(index)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === index && styles.dayTextSelected,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ごはんセクション */}
      {(['朝ごはん', '昼ごはん', '夜ごはん'] as MealType[]).map((type) => (
        <TouchableOpacity
          key={type}
          style={styles.mealBox}
          onPress={() => handleMealEdit(type)}
        >
          <Text style={styles.mealLabel}>{type}</Text>
          {meals[type] !== '' && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{meals[type]}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}

      {/* 共有ボタン */}
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>
          この日のご飯をみんなに共有
        </Text>
      </TouchableOpacity>

      {/* みんなのご飯一覧 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>みんなのご飯一覧</Text>
        <TouchableOpacity>
          <Text style={styles.detailLink}>詳しく見る</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.feed}>
        {/* 仮の投稿1つ */}
        <View style={styles.feedCard}>
          <Text style={styles.feedText}>🍚 写真とコメントが入ります</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E8F5E9' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10, textAlign: 'center' },

  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    backgroundColor: '#A5D6A7',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonSelected: {
    backgroundColor: '#388E3C',
  },
  dayText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  dayTextSelected: {
    color: 'white',
  },

  mealBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  tag: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: 'white',
    fontSize: 13,
  },

  shareButton: {
    marginTop: 20,
    backgroundColor: '#1E88E5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  sectionHeader: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  detailLink: {
    color: '#1E88E5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  feed: {
    marginTop: 12,
  },
  feedCard: {
    backgroundColor: '#388E3C',
    padding: 16,
    borderRadius: 10,
  },
  feedText: {
    color: 'white',
    fontSize: 16,
  },
});
