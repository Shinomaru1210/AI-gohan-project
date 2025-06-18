// app/(tabs)/suggestion.tsx

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function SuggestionScreen() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGenerate = () => {
    const dummySuggestions = [
      '豚汁とごはん',
      '野菜炒めセット',
      'たまねぎとにんじんのスープ',
    ];
    setSuggestions(dummySuggestions);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>今日の献立提案</Text>

      <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
        <Ionicons name="sparkles" size={24} color="white" />
        <Text style={styles.generateButtonText}>献立を提案する</Text>
      </TouchableOpacity>

      <ScrollView style={styles.list}>
        {suggestions.length === 0 ? (
          <Text style={styles.placeholder}>「献立を提案する」ボタンを押してください。</Text>
        ) : (
          suggestions.map((menu, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.menuText}>🍽 {menu}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 15 },
  generateButton: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FF7043', padding: 12, borderRadius: 8,
    justifyContent: 'center', marginBottom: 20,
  },
  generateButtonText: { color: '#fff', fontSize: 16, marginLeft: 8 },
  list: { flex: 1 },
  card: {
    backgroundColor: '#FFF3E0', padding: 16,
    borderRadius: 10, marginBottom: 12,
  },
  menuText: { fontSize: 18 },
  placeholder: { fontStyle: 'italic', color: 'gray', fontSize: 16 },
});
