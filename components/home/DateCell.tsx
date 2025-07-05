import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  label: string; // 日付（例："02"）
  weekday: string; // 曜日（例："Wed"）
  isSelected: boolean;
  onPress: () => void;
};

export default function DateCell({ label, weekday, isSelected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
        // 横間隔を小さく調整
        { marginHorizontal: 2 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.dateText, isSelected && styles.selectedText]}>{label}</Text>
      <Text style={[styles.weekText, isSelected && styles.selectedText]}>{weekday}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFECE2',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#FF7043',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  weekText: {
    fontSize: 12,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
});
