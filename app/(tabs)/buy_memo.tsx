import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Item = {
  id: string;
  name: string;
  checked: boolean;
};

export default function BuyMemo() {
  const [text, setText] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const handleAdd = () => {
    if (!text.trim()) return;
    const newItem: Item = {
      id: Date.now().toString(),
      name: text.trim(),
      checked: false,
    };
    setItems([...items, newItem]);
    setText('');
  };

  const toggleCheck = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>買い物メモ</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="例：たまねぎ、牛乳..."
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>追加</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleCheck(item.id)}
            onLongPress={() => handleDelete(item.id)}
            style={styles.item}
          >
            <Text style={[styles.itemText, item.checked && styles.checked]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  checked: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});