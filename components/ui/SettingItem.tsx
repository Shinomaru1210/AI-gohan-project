import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type SettingItemProps = {
  icon: string;
  label: string;
  onPress?: () => void;
  right?: React.ReactNode;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, onPress, right }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
    <MaterialCommunityIcons name={icon} size={24} color="#FF6B35" style={{ marginRight: 16 }} />
    <Text style={styles.label}>{label}</Text>
    <View style={{ flex: 1 }} />
    {right}
    <MaterialCommunityIcons name="chevron-right" size={24} color="#bbb" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'NotoSansJP-Regular',
  },
});

export default SettingItem;