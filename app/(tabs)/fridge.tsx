// app/(tabs)/fridge.tsx

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function FridgeScreen() {
  const [ingredients, setIngredients] = useState<string[]>([
    'にんじん',
    'たまねぎ',
    '豚肉',
  ]);

  const handleAdd = () => {
    const newItem = `新しい食材 ${ingredients.length + 1}`;
    setIngredients(prev => [...prev, newItem]);
    Alert.alert('追加しました', `${newItem} を冷蔵庫に追加しました`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>冷蔵庫の中身</Text>

      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Ionicons name="leaf" size={20} color="#4CAF50" />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Ionicons name="add-circle" size={28} color="white" />
        <Text style={styles.addButtonText}>食材を追加</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 15 },
  itemBox: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomColor: '#eee', borderBottomWidth: 1,
  },
  itemText: { marginLeft: 10, fontSize: 18 },
  addButton: {
    marginTop: 20, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, justifyContent: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, marginLeft: 8 },
});
