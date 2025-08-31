import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type SettingItemProps = {
  icon: any;
  label: string;
  onPress?: () => void;
  right?: React.ReactNode;
  description?: string;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, onPress, right, description }) => (
  <TouchableOpacity 
    style={styles.container} 
    onPress={onPress} 
    activeOpacity={0.8}
    hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
  >
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name={icon} size={24} color="#FF6B35" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
    <View style={styles.rightContainer}>
      {right}
      <MaterialCommunityIcons name="chevron-right" size={20} color="#BDC3C7" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F8F9FA',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF8F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Medium',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default SettingItem;