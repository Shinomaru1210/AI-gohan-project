import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import DateSelector from '@/components/home/DateSelector';
import { Card, Text, Button, Divider, useTheme } from 'react-native-paper';

const defaultMeals = { 朝ごはん: '', 昼ごはん: '', 夜ごはん: '' };
type MealType = keyof typeof defaultMeals;
type MealsPerDay = Record<string, typeof defaultMeals>;

export default function HomeScreen() {
  const { colors } = useTheme();
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
      <DateSelector onDateSelect={(dateStr) => setSelectedDate(dateStr)} />

      {Object.keys(defaultMeals).map((type) => (
        <Card key={type} style={styles.card} onPress={() => handleMealToggle(type as MealType)}>
          <Card.Title title={type} />
          {currentMeals[type as MealType] ? (
            <Card.Content>
              <Text style={styles.tagText}>{currentMeals[type as MealType]}</Text>
            </Card.Content>
          ) : null}
        </Card>
      ))}

      <Button
        mode="contained"
        style={styles.shareButton}
        labelStyle={{ fontSize: 16 }}
        onPress={() => console.log('共有')}
      >
        みんなと共有する
      </Button>

      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          みんなのごはん
        </Text>
        <Button mode="text" onPress={() => {}} compact>
          もっと見る
        </Button>
      </View>

      <ScrollView style={styles.feed}>
        <Card style={styles.feedCard}>
          <Card.Content>
            <Text>🍚 鮭の塩焼きと味噌汁の朝ごはん！</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const ORANGE = '#FF7043';
const LIGHT_BG = '#FFF7F1';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: LIGHT_BG,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  tagText: {
    marginTop: 4,
    fontSize: 14,
    color: ORANGE,
    fontWeight: '600',
  },
  shareButton: {
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 8,
  },
  sectionHeader: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#BF360C',
    fontWeight: '600',
  },
  feed: {
    marginTop: 16,
  },
  feedCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 8,
  },
});
