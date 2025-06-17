// app/(tabs)/menu_list.tsx

import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function MenuListScreen() {
  const [savedMenus, setSavedMenus] = useState<string[]>([
    '親子丼と味噌汁',
    'カレーライス',
    '焼き魚定食',
  ]);

  const handleRemove = (index: number) => {
    const name = savedMenus[index];
    Alert.alert('削除しますか？', `${name} を献立リストから削除します。`, [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除',
        style: 'destructive',
        onPress: () => {
          setSavedMenus(prev => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>保存した献立</Text>

      {savedMenus.length === 0 ? (
        <Text style={styles.placeholder}>まだ献立が保存されていません。</Text>
      ) : (
        <FlatList
          data={savedMenus}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemBox}>
              <Ionicons name="restaurant" size={20} color="#FF7043" />
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity
                onPress={() => handleRemove(index)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  deleteButton: {
    marginLeft: 12,
    backgroundColor: '#FF5252',
    padding: 6,
    borderRadius: 6,
  },
  placeholder: {
    fontStyle: 'italic',
    color: 'gray',
    fontSize: 16,
  },
});
