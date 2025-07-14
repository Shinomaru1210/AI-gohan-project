// app/(tabs)/suggestion.tsx

import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Suggestion = {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  time: string;
  calories: string;
  tags: string[];
};

export default function SuggestionScreen() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  // テーマカラーの取得
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = '#6C757D';

  const difficultyColors = {
    'easy': '#4CAF50',
    'medium': '#FF9800',
    'hard': '#F44336',
  };

  const handleGenerate = () => {
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

    setIsLoading(true);
    
    // シミュレーション用の遅延
    setTimeout(() => {
      const dummySuggestions: Suggestion[] = [
        {
          id: '1',
          name: '豚汁とごはん',
          description: '体が温まる定番の和食',
          difficulty: 'easy',
          time: '30分',
          calories: '450kcal',
          tags: ['和食', '温かい', '簡単'],
        },
        {
          id: '2',
          name: '野菜炒めセット',
          description: '栄養バランス抜群の中華料理',
          difficulty: 'medium',
          time: '20分',
          calories: '380kcal',
          tags: ['中華', '野菜', 'ヘルシー'],
        },
        {
          id: '3',
          name: 'たまねぎとにんじんのスープ',
          description: '優しい味わいの洋風スープ',
          difficulty: 'easy',
          time: '25分',
          calories: '200kcal',
          tags: ['洋食', 'スープ', '低カロリー'],
        },
        {
          id: '4',
          name: '鮭の塩焼き定食',
          description: 'DHA豊富な魚料理',
          difficulty: 'medium',
          time: '35分',
          calories: '520kcal',
          tags: ['和食', '魚', '栄養豊富'],
        },
      ];
      setSuggestions(dummySuggestions);
      setIsLoading(false);
    }, 1500);
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'star';
      case 'medium': return 'star-half';
      case 'hard': return 'star-outline';
      default: return 'star';
    }
  };

  const renderSuggestion = (suggestion: Suggestion) => {
    const difficultyColor = difficultyColors[suggestion.difficulty];

    return (
      <Surface key={suggestion.id} style={[styles.suggestionCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={2}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Text style={[styles.menuName, { color: textColor }]}>{suggestion.name}</Text>
            <View style={styles.difficultyContainer}>
              <MaterialCommunityIcons
                name={getDifficultyIcon(suggestion.difficulty)}
                size={16}
                color={difficultyColor}
              />
              <Text style={[styles.difficultyText, { color: difficultyColor }]}>
                {suggestion.difficulty === 'easy' ? '簡単' : suggestion.difficulty === 'medium' ? '普通' : '難しい'}
              </Text>
            </View>
          </View>
        </View>
        
        <Text style={[styles.description, { color: textSecondaryColor }]}>
          {suggestion.description}
        </Text>
        
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="clock-outline" size={16} color={textSecondaryColor} />
            <Text style={[styles.metaText, { color: textSecondaryColor }]}>{suggestion.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="fire" size={16} color="#F39C12" />
            <Text style={[styles.metaText, { color: textSecondaryColor }]}>{suggestion.calories}</Text>
          </View>
        </View>
        
        <View style={styles.tagsContainer}>
          {suggestion.tags.map((tag, index) => (
            <Chip
              key={index}
              style={[styles.tag, { backgroundColor: '#FF6B35' + '15' }]}
              textStyle={{ color: '#FF6B35', fontSize: 11 }}
              compact
            >
              {tag}
            </Chip>
          ))}
        </View>
      </Surface>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          今日の献立提案
        </Text>
        <Text style={[styles.subtitle, { color: textSecondaryColor }]}>
          AIがあなたに最適な献立を提案します
        </Text>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity 
          style={[styles.generateButton, { backgroundColor: '#FF6B35' }]} 
          onPress={handleGenerate}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <MaterialCommunityIcons 
            name={isLoading ? "loading" : "magic-staff"} 
            size={24} 
            color="white" 
          />
          <Text style={styles.generateButtonText}>
            {isLoading ? '提案中...' : '献立を提案する'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView 
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {suggestions.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="food-variant-off"
              size={64}
              color={textSecondaryColor}
            />
            <Text style={[styles.placeholder, { color: textSecondaryColor }]}>
              「献立を提案する」ボタンを押してください
            </Text>
            <Text style={[styles.placeholderSub, { color: textSecondaryColor }]}>
              AIがあなたの好みに合わせて献立を提案します
            </Text>
          </View>
        ) : (
          suggestions.map(renderSuggestion)
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  placeholder: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  placeholderSub: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
  suggestionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: 8,
  },
});
