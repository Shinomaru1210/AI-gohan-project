// app/(tabs)/buy_list.tsx

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Item = {
  name: string;
  checked: boolean;
};

export default function BuyListScreen() {
  const [items, setItems] = useState<Item[]>([
    { name: '牛乳', checked: false },
    { name: '卵', checked: false },
    { name: 'にんじん', checked: true },
  ]);

  const toggleCheck = (index: number) => {
    setItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAdd = () => {
    const newItem = { name: `新しい食材 ${items.length + 1}`, checked: false };
    setItems(prev => [...prev, newItem]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>買い物リスト</Text>

      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.itemBox, item.checked && styles.itemChecked]}
            onPress={() => toggleCheck(index)}
          >
            <Ionicons
              name={item.checked ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.checked ? '#4CAF50' : 'gray'}
            />
            <Text
              style={[
                styles.itemText,
                item.checked && { textDecorationLine: 'line-through', color: 'gray' },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Ionicons name="add-circle" size={28} color="white" />
        <Text style={styles.addButtonText}>食材を追加</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 18,
  },
  itemChecked: {
    backgroundColor: '#f1f8e9',
  },
  addButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
