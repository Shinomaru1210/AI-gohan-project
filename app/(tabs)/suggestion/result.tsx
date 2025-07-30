import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Chip, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuggestionResultScreen() {
  const router = useRouter();
  // 仮：パラメータからsuggestionsを取得（本来はstate管理やcontext推奨）
  // const { suggestions } = useLocalSearchParams();
  // ダミーデータで表示
  const suggestions = [
    {
      id: '1', name: '豚汁とごはん', description: '体が温まる定番の和食', difficulty: 'easy', time: '30分', calories: '450kcal', tags: ['和食', '温かい', '簡単'],
    },
    {
      id: '2', name: '野菜炒めセット', description: '栄養バランス抜群の中華料理', difficulty: 'medium', time: '20分', calories: '380kcal', tags: ['中華', '野菜', 'ヘルシー'],
    },
  ];
  const difficultyColors = {
    'easy': '#4CAF50',
    'medium': '#FF9800',
    'hard': '#F44336',
  };
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'star';
      case 'medium': return 'star-half';
      case 'hard': return 'star-outline';
      default: return 'star';
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F2' }}>
      <View style={{ alignItems: 'center', marginTop: 18, marginBottom: 10 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 10, top: 0, zIndex: 10, padding: 8 }}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#FF6B35" />
        </TouchableOpacity>
        <View style={{ backgroundColor: '#FFF3E6', borderRadius: 32, padding: 10, marginBottom: 8, shadowColor: '#FF6B35', shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 }}>
          <MaterialCommunityIcons name="lightbulb-on" size={44} color="#FF6B35" />
        </View>
        <Text style={{ color: '#FF6B35', fontSize: 22, fontFamily: 'NotoSansJP-Bold', letterSpacing: 2 }}>提案結果</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        {suggestions.map((suggestion) => (
          <Surface key={suggestion.id} style={{
            backgroundColor: '#fff',
            borderRadius: 26,
            borderColor: '#FFD6C2',
            borderWidth: 1,
            marginBottom: 24,
            padding: 24,
            shadowColor: '#FF6B35',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.13,
            shadowRadius: 16,
            elevation: 6,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={26} color="#FF6B35" style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 21, color: '#222', flex: 1, letterSpacing: 1, fontFamily: 'NotoSansJP-Bold' }}>{suggestion.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: difficultyColors[suggestion.difficulty] + '22', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3, marginLeft: 10 }}>
                <MaterialCommunityIcons name={getDifficultyIcon(suggestion.difficulty)} size={16} color={difficultyColors[suggestion.difficulty]} />
                <Text style={{ color: difficultyColors[suggestion.difficulty], fontSize: 15, marginLeft: 3, fontFamily: 'NotoSansJP-Bold' }}>{suggestion.difficulty === 'easy' ? '簡単' : suggestion.difficulty === 'medium' ? '普通' : '難しい'}</Text>
              </View>
            </View>
            <Text style={{ color: '#888', fontSize: 16, marginBottom: 14, lineHeight: 22, fontFamily: 'NotoSansJP-Regular' }}>{suggestion.description}</Text>
            <View style={{ flexDirection: 'row', gap: 20, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <MaterialCommunityIcons name="clock-outline" size={18} color="#888" />
                <Text style={{ color: '#888', fontSize: 15, fontFamily: 'NotoSansJP-Regular' }}>{suggestion.time}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <MaterialCommunityIcons name="fire" size={18} color="#F39C12" />
                <Text style={{ color: '#888', fontSize: 15, fontFamily: 'NotoSansJP-Regular' }}>{suggestion.calories}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {suggestion.tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  style={{ backgroundColor: '#FF6B35' + '18', borderRadius: 12, marginRight: 6, marginBottom: 6, paddingHorizontal: 0, elevation: 0 }}
                  textStyle={{ color: '#FF6B35', fontSize: 13, fontFamily: 'NotoSansJP-Medium', letterSpacing: 1 }}
                  compact
                >
                  {tag}
                </Chip>
              ))}
            </View>
          </Surface>
        ))}
      </ScrollView>
      <View style={{ padding: 16, backgroundColor: 'rgba(255,255,255,0.97)', borderTopLeftRadius: 18, borderTopRightRadius: 18, shadowColor: '#FF6B35', shadowOpacity: 0.10, shadowRadius: 8, elevation: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF6B35',
            borderRadius: 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            gap: 8,
            shadowColor: '#FF6B35',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.13,
            shadowRadius: 8,
            elevation: 6,
          }}
          onPress={() => router.back()}
          activeOpacity={0.88}
        >
          <MaterialCommunityIcons name="refresh" size={22} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'NotoSansJP-Bold', letterSpacing: 1 }}>もう一度提案する</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 