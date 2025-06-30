// app/(tabs)/home.tsx

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import DateSelector from '@/components/home/DateSelector';

const defaultMeals = { 朝ごはん: '', 昼ごはん: '', 夜ごはん: '' };
type MealType = keyof typeof defaultMeals;
type MealsPerDay = Record<string, typeof defaultMeals>;

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [mealData, setMealData] = useState<MealsPerDay>({});

  const currentMeals = mealData[selectedDate] || defaultMeals;

  const handleMealToggle = (type: MealType) => {
    const prev = currentMeals[type];
    const next = prev === '食べなかった' ? '' : '食べなかった';
    const updated = { ...currentMeals, [type]: next };
    setMealData({ ...mealData, [selectedDate]: updated });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>今日のごはん</Text>

      <DateSelector onDateSelect={(dateStr) => setSelectedDate(dateStr)} />

      {Object.keys(defaultMeals).map((type) => (
        <TouchableOpacity
          key={type}
          style={styles.mealCard}
          onPress={() => handleMealToggle(type as MealType)}
        >
          <Text style={styles.mealLabel}>{type}</Text>
          {currentMeals[type as MealType] && (
            <View style={styles.tag}><Text style={styles.tagText}>{currentMeals[type as MealType]}</Text></View>
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>みんなと共有する</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>みんなのごはん</Text>
        <TouchableOpacity>
          <Text style={styles.detailLink}>もっと見る</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.feed}>
        <View style={styles.feedCard}>
          <Text style={styles.feedText}>🍚 鮭の塩焼きと味噌汁の朝ごはん！</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ORANGE = '#FF7043';
const LIGHT_BG = '#FFF7F1';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: LIGHT_BG },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, textAlign: 'center', color: '#BF360C' },
  mealCard: {
    backgroundColor: '#fff', padding: 16, marginBottom: 12, borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  mealLabel: { fontSize: 18, fontWeight: '600', color: '#333' },
  tag: { backgroundColor: ORANGE, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { color: '#fff', fontSize: 13 },
  shareButton: {
    marginTop: 20, backgroundColor: ORANGE, borderRadius: 12, padding: 14, alignItems: 'center',
  },
  shareButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sectionHeader: {
    marginTop: 28, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#BF360C' },
  detailLink: { color: ORANGE, fontSize: 14, textDecorationLine: 'underline' },
  feed: { marginTop: 16 },
  feedCard: { backgroundColor: '#FFF3E0', borderRadius: 12, padding: 16 },
  feedText: { fontSize: 16, color: '#333' },
});