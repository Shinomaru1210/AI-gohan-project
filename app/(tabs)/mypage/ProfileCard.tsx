import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ProfileCardProps = {
  avatarUrl?: string;
  name: string;
  email: string;
  onEdit: () => void;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ avatarUrl, name, email, onEdit }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : (
        <MaterialCommunityIcons name="account-circle" size={64} color="#FF6B35" />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.editBtn} onPress={onEdit} activeOpacity={0.85}>
      <MaterialCommunityIcons name="account-edit" size={18} color="#fff" style={{ marginRight: 6 }} />
      <Text style={styles.editText}>プロフィール編集</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderColor: '#FFD6C2',
    borderWidth: 1,
    borderRadius: 20,
    elevation: 2,
    padding: 20,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 18,
    backgroundColor: '#FFE5D0',
  },
  name: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'NotoSansJP-Bold',
  },
  email: {
    color: '#6C757D',
    fontSize: 14,
    marginBottom: 2,
    fontFamily: 'NotoSansJP-Regular',
  },
  editBtn: {
    alignSelf: 'flex-end',
    marginTop: 4,
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'NotoSansJP-Bold',
  },
});

export default ProfileCard; 