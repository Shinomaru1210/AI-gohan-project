import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type BasicInfoCardProps = {
  phone: string;
  gender: string;
  birth: string;
  area: string;
};

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ phone, gender, birth, area }) => (
  <View style={styles.card}>
    <Text style={styles.title}>基本情報</Text>
    <View style={styles.row}>
      <MaterialCommunityIcons name="phone" size={20} color="#FF9800" style={styles.icon} />
      <Text style={styles.label}>電話番号：</Text>
      <Text style={styles.value}>{phone}</Text>
    </View>
    <View style={styles.row}>
      <MaterialCommunityIcons name="gender-male-female" size={20} color="#4CAF50" style={styles.icon} />
      <Text style={styles.label}>性別：</Text>
      <Text style={styles.value}>{gender}</Text>
    </View>
    <View style={styles.row}>
      <MaterialCommunityIcons name="cake-variant" size={20} color="#E57373" style={styles.icon} />
      <Text style={styles.label}>生年月日：</Text>
      <Text style={styles.value}>{birth}</Text>
    </View>
    <View style={styles.row}>
      <MaterialCommunityIcons name="map-marker" size={20} color="#2196F3" style={styles.icon} />
      <Text style={styles.label}>居住エリア：</Text>
      <Text style={styles.value}>{area}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderColor: '#FFD6C2',
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
    color: '#FF6B35',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: '#888',
    fontSize: 15,
    marginRight: 4,
  },
  value: {
    color: '#333',
    fontSize: 15,
  },
});

export default BasicInfoCard; 