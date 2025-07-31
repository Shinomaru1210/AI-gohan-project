import SettingItem from '@/components/ui/SettingItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dummyUser = {
  name: '田中太郎',
  email: 'tanaka@example.com',
  avatarUrl: '',
};

export default function MyPageScreen() {
  const handleProfileEdit = () => {
    // プロフィール編集画面への遷移
    console.log('プロフィール編集');
  };

  const handleFavorites = () => {
    // お気に入りのごはん画面への遷移
    console.log('お気に入りのごはん');
  };

  const handleSubscription = () => {
    // サブスク登録画面への遷移
    console.log('サブスク登録');
  };

  const handleNotifications = () => {
    // 通知設定画面への遷移
    console.log('通知設定');
  };

  const handleFeedback = () => {
    // フィードバック送信画面への遷移
    console.log('フィードバック送信');
  };

  const handlePrivacyPolicy = () => {
    // プライバシーポリシー画面への遷移
    console.log('プライバシーポリシー');
  };

  const handleTerms = () => {
    // 利用規約画面への遷移
    console.log('利用規約');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* プロフィールセクション */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {dummyUser.avatarUrl ? (
              <Image source={{ uri: dummyUser.avatarUrl }} style={styles.avatar} />
            ) : (
              <MaterialCommunityIcons name="account-circle" size={80} color="#FF6B35" />
            )}
          </View>
          <Text style={styles.userName}>{dummyUser.name}</Text>
          <Text style={styles.userEmail}>{dummyUser.email}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleProfileEdit} activeOpacity={0.8}>
            <MaterialCommunityIcons name="account-edit" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', fontFamily: 'NotoSansJP-Bold' }}>プロフィール編集</Text>
          </TouchableOpacity>
        </View>

        {/* メイン機能セクション */}
        <View style={styles.section}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6B35', marginBottom: 12, marginLeft: 4, fontFamily: 'NotoSansJP-Bold' }}>メイン機能</Text>
          <SettingItem
            icon="heart"
            label="お気に入りのごはん"
            onPress={handleFavorites}
          />
          <SettingItem
            icon="crown"
            label="サブスク登録"
            onPress={handleSubscription}
          />
        </View>

        {/* 設定セクション */}
        <View style={styles.section}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6B35', marginBottom: 12, marginLeft: 4, fontFamily: 'NotoSansJP-Bold' }}>設定</Text>
          <SettingItem
            icon="bell"
            label="通知設定"
            onPress={handleNotifications}
          />
        </View>

        {/* サポートセクション */}
        <View style={styles.section}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6B35', marginBottom: 12, marginLeft: 4, fontFamily: 'NotoSansJP-Bold' }}>サポート</Text>
          <SettingItem
            icon="message-text"
            label="フィードバック送信"
            onPress={handleFeedback}
          />
        </View>

        {/* 法的情報セクション */}
        <View style={styles.section}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF6B35', marginBottom: 12, marginLeft: 4, fontFamily: 'NotoSansJP-Bold' }}>法的情報</Text>
          <SettingItem
            icon="shield-check"
            label="プライバシーポリシー"
            onPress={handlePrivacyPolicy}
          />
          <SettingItem
            icon="file-document"
            label="利用規約"
            onPress={handleTerms}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FF6B35',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE5D0',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'NotoSansJP-Bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontFamily: 'NotoSansJP-Regular',
  },
  editButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'NotoSansJP-Bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: 'NotoSansJP-Bold',
  },
});
