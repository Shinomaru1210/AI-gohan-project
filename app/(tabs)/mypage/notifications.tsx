import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
  type: 'switch' | 'time';
  time?: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'プッシュ通知',
      description: 'アプリからの通知を受け取る',
      icon: 'bell',
      color: '#FF9800',
      enabled: true,
      type: 'switch',
    },
    {
      id: '2',
      title: '献立提案',
      description: '新しい献立提案があるとき',
      icon: 'chef-hat',
      color: '#4CAF50',
      enabled: true,
      type: 'switch',
    },
    {
      id: '3',
      title: '料理リマインダー',
      description: '食事時間のリマインダー',
      icon: 'clock',
      color: '#2196F3',
      enabled: false,
      type: 'time',
      time: '18:00',
    },
    {
      id: '4',
      title: 'お気に入り更新',
      description: 'お気に入り料理の更新情報',
      icon: 'heart',
      color: '#E91E63',
      enabled: true,
      type: 'switch',
    },
    {
      id: '5',
      title: '達成通知',
      description: '新しい達成を獲得したとき',
      icon: 'trophy',
      color: '#FFC107',
      enabled: true,
      type: 'switch',
    },
    {
      id: '6',
      title: '週間レポート',
      description: '週間の料理レポート',
      icon: 'chart-line',
      color: '#9C27B0',
      enabled: false,
      type: 'switch',
    },
  ]);

  const handleBack = () => {
    router.back();
  };

  const toggleNotification = (id: string) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleTimePress = (id: string) => {
    console.log('時間設定をタップ:', id);
    // ここで時間選択モーダルを表示
  };

  const getEnabledCount = () => {
    return notificationSettings.filter(setting => setting.enabled).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <LinearGradient
        colors={['#FFF8F2', '#FFE8D6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FF9800" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>通知設定</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 概要セクション */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              <MaterialCommunityIcons name="bell-ring" size={32} color="#FF9800" />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>通知設定</Text>
              <Text style={styles.summaryText}>
                {getEnabledCount()} / {notificationSettings.length} の通知が有効
              </Text>
            </View>
          </View>
        </View>

        {/* 通知設定一覧 */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>通知の種類</Text>
          
          <View style={styles.settingsList}>
            {notificationSettings.map((setting) => (
              <View key={setting.id} style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={[
                    styles.settingIcon,
                    { backgroundColor: setting.color + '20' }
                  ]}>
                    <MaterialCommunityIcons
                      name={setting.icon as any}
                      size={24}
                      color={setting.color}
                    />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{setting.title}</Text>
                    <Text style={styles.settingDescription}>{setting.description}</Text>
                  </View>
                </View>
                
                <View style={styles.settingRight}>
                  {setting.type === 'switch' ? (
                    <Switch
                      value={setting.enabled}
                      onValueChange={() => toggleNotification(setting.id)}
                      trackColor={{ false: '#E0E0E0', true: setting.color }}
                      thumbColor={setting.enabled ? '#fff' : '#f4f3f4'}
                      ios_backgroundColor="#E0E0E0"
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => handleTimePress(setting.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.timeText}>{setting.time}</Text>
                      <MaterialCommunityIcons name="clock-outline" size={16} color="#7F8C8D" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 通知の詳細設定 */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>詳細設定</Text>
          
          <View style={styles.detailList}>
            <TouchableOpacity style={styles.detailItem} activeOpacity={0.8}>
              <View style={styles.detailLeft}>
                <MaterialCommunityIcons name="volume-high" size={24} color="#7F8C8D" />
                <Text style={styles.detailTitle}>通知音</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.detailValue}>デフォルト</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#B0BEC5" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.detailItem} activeOpacity={0.8}>
              <View style={styles.detailLeft}>
                <MaterialCommunityIcons name="vibrate" size={24} color="#7F8C8D" />
                <Text style={styles.detailTitle}>バイブレーション</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.detailValue}>ON</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#B0BEC5" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.detailItem} activeOpacity={0.8}>
              <View style={styles.detailLeft}>
                <MaterialCommunityIcons name="eye" size={24} color="#7F8C8D" />
                <Text style={styles.detailTitle}>ロック画面表示</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.detailValue}>ON</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#B0BEC5" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 通知履歴 */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>通知履歴</Text>
            <TouchableOpacity style={styles.clearButton} activeOpacity={0.8}>
              <Text style={styles.clearButtonText}>クリア</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.historyCard}>
            <MaterialCommunityIcons name="history" size={48} color="#B0BEC5" />
            <Text style={styles.historyText}>通知履歴がありません</Text>
            <Text style={styles.historySubtext}>
              通知を受け取ると、ここに履歴が表示されます
            </Text>
          </View>
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
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 4,
    fontFamily: 'NotoSansJP-Bold',
  },
  summaryText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 2,
    fontFamily: 'NotoSansJP-Bold',
  },
  settingDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  settingRight: {
    marginLeft: 12,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#2C3E50',
    marginRight: 4,
    fontFamily: 'NotoSansJP-Regular',
  },
  detailSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  detailList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailTitle: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 12,
    fontFamily: 'NotoSansJP-Regular',
  },
  detailRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 14,
    color: '#7F8C8D',
    marginRight: 8,
    fontFamily: 'NotoSansJP-Regular',
  },
  historySection: {
    paddingHorizontal: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  clearButtonText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  historyText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'NotoSansJP-Bold',
  },
  historySubtext: {
    fontSize: 14,
    color: '#B0BEC5',
    textAlign: 'center',
    fontFamily: 'NotoSansJP-Regular',
  },
});

