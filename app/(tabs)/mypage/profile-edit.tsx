import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileEditScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [name, setName] = useState('田中太郎');
  const [email, setEmail] = useState('tanaka@example.com');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} style={{ marginRight: 16 }}>
          <Text style={{ color: '#FF6B35', fontSize: 16, fontFamily: 'NotoSansJP-Bold' }}>保存</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, name, email, avatarUrl]);

  const handleSave = () => {
    console.log('プロフィール保存:', { name, email, avatarUrl });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* カスタムヘッダー（ヘッダーが表示される場合は不要） */}
      {/* <LinearGradient
        colors={['#FFF8F2', '#FFE8D6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FF9800" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>プロフィール編集</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient> */}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* アバター編集セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>プロフィール画像</Text>
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarShadow}>
                {avatarUrl ? (
                  <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                ) : (
                  <View style={styles.defaultAvatar}>
                    <MaterialCommunityIcons name="account-circle" size={70} color="#FF6B35" />
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.changeAvatarButton} activeOpacity={0.8}>
              <LinearGradient
                colors={['#FF6B35', '#FF8E53']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.changeAvatarGradient}
              >
                <MaterialCommunityIcons name="camera" size={18} color="#fff" />
                <Text style={styles.changeAvatarText}>画像を変更</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* 基本情報編集セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基本情報</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ユーザー名</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="account" size={20} color="#7F8C8D" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="ユーザー名を入力"
                placeholderTextColor="#B0BEC5"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>メールアドレス</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email" size={20} color="#7F8C8D" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="メールアドレスを入力"
                placeholderTextColor="#B0BEC5"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        {/* 削除セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アカウント</Text>
          <TouchableOpacity style={styles.deleteButton} activeOpacity={0.8}>
            <MaterialCommunityIcons name="delete" size={20} color="#E74C3C" />
            <Text style={styles.deleteButtonText}>アカウントを削除</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  avatarSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarShadow: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  defaultAvatar: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE5D0',
    borderWidth: 3,
    borderColor: '#fff',
  },
  changeAvatarButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  changeAvatarGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
    fontFamily: 'NotoSansJP-Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#E74C3C',
    fontFamily: 'NotoSansJP-Bold',
    marginLeft: 12,
  },
});

