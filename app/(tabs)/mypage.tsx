// app/(tabs)/mypage.tsx

import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Surface, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyPageScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [scaleAnim] = useState(new Animated.Value(1));

  // テーマカラーの取得
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = '#6C757D';

  const handleLogout = () => {
    // ボタンアニメーション
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // ログアウト処理
    console.log('ログアウトしました');
  };

  const menuItems = [
    {
      id: '1',
      title: 'プロフィール編集',
      icon: 'account-edit',
      color: '#4CAF50',
      onPress: () => console.log('プロフィール編集'),
    },
    {
      id: '2',
      title: '食事履歴',
      icon: 'food-fork-drink',
      color: '#2196F3',
      onPress: () => console.log('食事履歴'),
    },
    {
      id: '3',
      title: '栄養分析',
      icon: 'chart-line',
      color: '#FF9800',
      onPress: () => console.log('栄養分析'),
    },
    {
      id: '4',
      title: 'お気に入りレシピ',
      icon: 'heart',
      color: '#E91E63',
      onPress: () => console.log('お気に入りレシピ'),
    },
    {
      id: '5',
      title: '設定',
      icon: 'cog',
      color: '#607D8B',
      onPress: () => console.log('設定'),
    },
  ];

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <MaterialCommunityIcons
            name={item.icon as any}
            size={20}
            color={item.color}
          />
        </View>
        <Text style={[styles.menuItemText, { color: textColor }]}>{item.title}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={textSecondaryColor}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          マイページ
        </Text>
        <Text style={[styles.subtitle, { color: textSecondaryColor }]}>
          アカウントとアプリの設定
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ユーザー情報 */}
        <Surface style={[styles.userCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={2}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons
                name="account-circle"
                size={60}
                color="#FF6B35"
              />
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: textColor }]}>田中太郎</Text>
              <Text style={[styles.userEmail, { color: textSecondaryColor }]}>tanaka@example.com</Text>
              <View style={styles.userStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: '#FF6B35' }]}>127</Text>
                  <Text style={[styles.statLabel, { color: textSecondaryColor }]}>記録日数</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: '#FF6B35' }]}>45</Text>
                  <Text style={[styles.statLabel, { color: textSecondaryColor }]}>レシピ数</Text>
                </View>
              </View>
            </View>
          </View>
        </Surface>

        {/* 設定項目 */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>設定</Text>
          
          <Surface style={[styles.settingsCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={1}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={20}
                  color="#FF9800"
                />
                <Text style={[styles.settingText, { color: textColor }]}>ダークモード</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                color="#FF6B35"
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialCommunityIcons
                  name="bell"
                  size={20}
                  color="#2196F3"
                />
                <Text style={[styles.settingText, { color: textColor }]}>通知</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color="#FF6B35"
              />
            </View>
          </Surface>
        </View>

        {/* メニュー項目 */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>メニュー</Text>
          
          <Surface style={[styles.menuCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={1}>
            {menuItems.map(renderMenuItem)}
          </Surface>
        </View>

        {/* ログアウトボタン */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: '#E74C3C' }]}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="logout" size={20} color="white" />
            <Text style={styles.logoutButtonText}>ログアウト</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  userCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 16,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingsCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 16,
  },
  menuSection: {
    marginBottom: 24,
  },
  menuCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
