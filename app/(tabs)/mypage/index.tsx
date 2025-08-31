import SettingItem from '@/components/ui/SettingItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyUser = {
  name: '田中太郎',
  email: 'tanaka@example.com',
  avatarUrl: '',
  favoriteCount: 24,
  cookingDays: 128,
  totalMeals: 156,
};

// かわいいアイコン付きの統計カード
const StatsCard = ({ icon, count, label, color }: { icon: any; count: number; label: string; color: string }) => (
  <View style={[styles.statsCard, { borderLeftColor: color }]}>
    <View style={[styles.statsIconContainer, { backgroundColor: color + '20' }]}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
    </View>
    <View style={styles.statsContent}>
      <Text style={styles.statsNumber}>{count}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  </View>
);

// プレミアム機能カード
const PremiumCard = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity 
    style={styles.premiumCard} 
    onPress={onPress} 
    activeOpacity={0.8}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  >
    <LinearGradient
      colors={['#FF6B35', '#FF8E53']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.premiumGradient}
    >
      <View style={styles.premiumContent}>
        <MaterialCommunityIcons name="crown" size={28} color="#FFD700" />
        <View style={styles.premiumText}>
          <Text style={styles.premiumTitle}>プレミアムプラン</Text>
          <Text style={styles.premiumSubtitle}>より多くの機能をお楽しみください✨</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default function MyPageScreen() {
  const router = useRouter();

  const handleProfileEdit = () => {
    console.log('プロフィール編集ボタンがタップされました');
    // 少し遅延させてからナビゲーションを実行
    setTimeout(() => {
      try {
        router.push('/mypage/profile-edit');
        console.log('ナビゲーション実行完了');
      } catch (error) {
        console.error('ナビゲーションエラー:', error);
      }
    }, 100);
  };

  const handleFavorites = () => {
    console.log('お気に入りボタンがタップされました');
    setTimeout(() => {
      try {
        router.push('/mypage/favorites');
        console.log('お気に入りナビゲーション実行完了');
      } catch (error) {
        console.error('お気に入りナビゲーションエラー:', error);
      }
    }, 100);
  };

  const handleSubscription = () => {
    console.log('プレミアムカードがタップされました');
    setTimeout(() => {
      try {
        router.push('/mypage/subscription');
        console.log('プレミアムナビゲーション実行完了');
      } catch (error) {
        console.error('プレミアムナビゲーションエラー:', error);
      }
    }, 100);
  };

  const handleNotifications = () => {
    router.push('/mypage/notifications');
  };

  const handleFeedback = () => {
    router.push('/mypage/feedback');
  };

  const handlePrivacyPolicy = () => {
    router.push('/mypage/privacy-policy');
  };

  const handleTerms = () => {
    router.push('/mypage/terms');
  };

  const handleHistory = () => {
    router.push('/mypage/history');
  };

  const handleAchievements = () => {
    router.push('/mypage/achievements');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダーグラデーション */}
      <LinearGradient
        colors={['#FFF8F2', '#FFE8D6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account" size={24} color="#FF9800" />
            </View>
            <Text style={styles.headerTitle}>マイページ</Text>
          </View>
          <Text style={styles.headerSubtitle}>プロフィールと設定</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* プロフィールセクション */}
        <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarShadow}>
                {dummyUser.avatarUrl ? (
                  <Image source={{ uri: dummyUser.avatarUrl }} style={styles.avatar} />
                ) : (
                  <View style={styles.defaultAvatar}>
                    <MaterialCommunityIcons name="account-circle" size={90} color="#FF6B35" />
                  </View>
                )}
              </View>
            </View>
            <Text style={styles.userName}>{dummyUser.name}</Text>
            <Text style={styles.userEmail}>{dummyUser.email}</Text>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={handleProfileEdit} 
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <LinearGradient
                colors={['#FF6B35', '#FF8E53']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.editButtonGradient}
              >
                <MaterialCommunityIcons name="account-edit" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.editButtonText}>プロフィール編集</Text>
              </LinearGradient>
            </TouchableOpacity>
           </View>

         {/* 統計セクション */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>あなたの記録</Text>
          <View style={styles.statsContainer}>
            <StatsCard icon="heart" count={dummyUser.favoriteCount} label="お気に入り" color="#E91E63" />
            <StatsCard icon="calendar-check" count={dummyUser.cookingDays} label="料理日数" color="#4CAF50" />
            <StatsCard icon="food" count={dummyUser.totalMeals} label="総食事数" color="#FF9800" />
          </View>
        </View>

        {/* プレミアムカード */}
        <PremiumCard onPress={handleSubscription} />

        {/* メイン機能セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>メイン機能</Text>
          <View style={styles.menuGrid}>
            <SettingItem
              icon="heart-multiple"
              label="お気に入りのごはん"
              onPress={handleFavorites}
            />
            <SettingItem
              icon="history"
              label="料理履歴"
              onPress={handleHistory}
            />
            <SettingItem
              icon="trophy"
              label="達成記録"
              onPress={handleAchievements}
            />
          </View>
        </View>

        {/* 設定セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>設定</Text>
          <View style={styles.menuGrid}>
            <SettingItem
              icon="bell-ring"
              label="通知設定"
              onPress={handleNotifications}
            />
          </View>
        </View>

        {/* サポートセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>サポート</Text>
          <View style={styles.menuGrid}>
            <SettingItem
              icon="message-star"
              label="フィードバック送信"
              onPress={handleFeedback}
            />
          </View>
        </View>

        {/* 法的情報セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>法的情報</Text>
          <View style={styles.menuGrid}>
            <SettingItem
              icon="shield-check"
              label="プライバシーポリシー"
              onPress={handlePrivacyPolicy}
            />
            <SettingItem
              icon="file-document-outline"
              label="利用規約"
              onPress={handleTerms}
            />
          </View>
        </View>

        {/* フッタースペース */}
        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 10,
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    marginRight: 8,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  avatarContainer: {
    marginBottom: 8,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFE5D0',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 28,
    color: '#2C3E50',
    marginBottom: 4,
    fontFamily: 'NotoSansJP-Bold',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 6,
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
  },
  editButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  editButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
  },
  statsSection: {
    padding: 12,
    paddingTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  statsIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statsContent: {
    alignItems: 'flex-start',
  },
  statsNumber: {
    fontSize: 20,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 2,
  },
  statsLabel: {
    fontSize: 10,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  premiumCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  premiumGradient: {
    padding: 12,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumText: {
    flex: 1,
    marginLeft: 16,
  },
  premiumTitle: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 2,
  },
  premiumSubtitle: {
    fontSize: 12,
    color: '#FFE5D0',
    fontFamily: 'NotoSansJP-Regular',
  },
  section: {
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 8,
    fontFamily: 'NotoSansJP-Bold',
  },
  menuGrid: {
    gap: 6,
  },
  footerSpace: {
    height: 120,
  },
});
