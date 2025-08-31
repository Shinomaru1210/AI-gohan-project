import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ダミーデータ
const dummyHistory = [
  {
    id: '1',
    date: '2024-01-15',
    meals: [
      {
        id: '1',
        name: 'カレーライス',
        image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=カレー',
        mealType: 'dinner',
        rating: 5,
      },
      {
        id: '2',
        name: '味噌汁',
        image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=味噌汁',
        mealType: 'dinner',
        rating: 4,
      },
    ],
  },
  {
    id: '2',
    date: '2024-01-14',
    meals: [
      {
        id: '3',
        name: 'オムライス',
        image: 'https://via.placeholder.com/300x200/FFC107/FFFFFF?text=オムライス',
        mealType: 'lunch',
        rating: 5,
      },
      {
        id: '4',
        name: 'サラダ',
        image: 'https://via.placeholder.com/300x200/8BC34A/FFFFFF?text=サラダ',
        mealType: 'lunch',
        rating: 3,
      },
    ],
  },
  {
    id: '3',
    date: '2024-01-13',
    meals: [
      {
        id: '5',
        name: 'パスタ',
        image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=パスタ',
        mealType: 'dinner',
        rating: 4,
      },
    ],
  },
];

const mealTypeConfig = {
  breakfast: { label: '朝食', color: '#FF9800', icon: 'weather-sunny' },
  lunch: { label: '昼食', color: '#4CAF50', icon: 'weather-partly-cloudy' },
  dinner: { label: '夕食', color: '#2196F3', icon: 'weather-night' },
};

export default function HistoryScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleMealPress = (meal: any) => {
    console.log('料理をタップ:', meal);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return '今日';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨日';
    } else {
      return date.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
    }
  };

  const getTotalMeals = () => {
    return dummyHistory.reduce((total, day) => total + day.meals.length, 0);
  };

  const getAverageRating = () => {
    const allRatings = dummyHistory.flatMap(day => day.meals.map(meal => meal.rating));
    const average = allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
    return average.toFixed(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <LinearGradient
        colors={['#FFF8F2', '#FFE8D6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FF9800" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>料理履歴</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 統計セクション */}
        <View style={styles.statsSection}>
          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <MaterialCommunityIcons name="food" size={24} color="#FF9800" />
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.statsNumber}>{getTotalMeals()}</Text>
              <Text style={styles.statsLabel}>総料理数</Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <MaterialCommunityIcons name="star" size={24} color="#FFC107" />
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.statsNumber}>{getAverageRating()}</Text>
              <Text style={styles.statsLabel}>平均評価</Text>
            </View>
          </View>
        </View>

        {/* 履歴一覧 */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>最近の料理</Text>
          
          {dummyHistory.map((day) => (
            <View key={day.id} style={styles.dayContainer}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayDate}>{formatDate(day.date)}</Text>
                <Text style={styles.dayCount}>{day.meals.length}品</Text>
              </View>
              
              <View style={styles.mealsContainer}>
                {day.meals.map((meal) => (
                  <TouchableOpacity
                    key={meal.id}
                    style={styles.mealCard}
                    onPress={() => handleMealPress(meal)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: meal.image }} style={styles.mealImage} />
                    <View style={styles.mealContent}>
                      <View style={styles.mealHeader}>
                        <View style={styles.mealTypeContainer}>
                          <MaterialCommunityIcons
                            name={mealTypeConfig[meal.mealType as keyof typeof mealTypeConfig].icon as any}
                            size={16}
                            color={mealTypeConfig[meal.mealType as keyof typeof mealTypeConfig].color}
                          />
                          <Text style={[
                            styles.mealTypeText,
                            { color: mealTypeConfig[meal.mealType as keyof typeof mealTypeConfig].color }
                          ]}>
                            {mealTypeConfig[meal.mealType as keyof typeof mealTypeConfig].label}
                          </Text>
                        </View>
                        <View style={styles.ratingContainer}>
                          <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
                          <Text style={styles.ratingText}>{meal.rating}</Text>
                        </View>
                      </View>
                      <Text style={styles.mealName}>{meal.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {dummyHistory.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="history" size={64} color="#B0BEC5" />
              <Text style={styles.emptyStateText}>料理履歴がありません</Text>
              <Text style={styles.emptyStateSubtext}>
                料理を作ると、ここに履歴が表示されます
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statsContent: {
    flex: 1,
  },
  statsNumber: {
    fontSize: 20,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 2,
  },
  statsLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  historySection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayDate: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  dayCount: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  mealsContainer: {
    gap: 12,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  mealImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  mealContent: {
    padding: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealTypeText: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Regular',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#FFC107',
    fontFamily: 'NotoSansJP-Regular',
    marginLeft: 4,
  },
  mealName: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#7F8C8D',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'NotoSansJP-Bold',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#B0BEC5',
    textAlign: 'center',
    fontFamily: 'NotoSansJP-Regular',
  },
});

