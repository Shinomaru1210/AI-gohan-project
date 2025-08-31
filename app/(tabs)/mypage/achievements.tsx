import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ダミーデータ
const dummyAchievements = [
  {
    id: '1',
    title: '料理初心者',
    description: '初めての料理を作りました',
    icon: 'chef-hat',
    color: '#FF9800',
    unlocked: true,
    unlockedDate: '2024-01-10',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: '2',
    title: '料理マスター',
    description: '10種類の料理を作りました',
    icon: 'trophy',
    color: '#FFC107',
    unlocked: true,
    unlockedDate: '2024-01-15',
    progress: 10,
    maxProgress: 10,
  },
  {
    id: '3',
    title: '朝食名人',
    description: '朝食を30回作りました',
    icon: 'weather-sunny',
    color: '#4CAF50',
    unlocked: false,
    progress: 15,
    maxProgress: 30,
  },
  {
    id: '4',
    title: '世界の料理人',
    description: '5カ国の料理を作りました',
    icon: 'earth',
    color: '#2196F3',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
  },
  {
    id: '5',
    title: '完璧主義者',
    description: '5つ星評価を10回獲得しました',
    icon: 'star',
    color: '#9C27B0',
    unlocked: false,
    progress: 3,
    maxProgress: 10,
  },
  {
    id: '6',
    title: '料理の達人',
    description: '100回料理を作りました',
    icon: 'crown',
    color: '#E91E63',
    unlocked: false,
    progress: 45,
    maxProgress: 100,
  },
];

const stats = {
  totalAchievements: dummyAchievements.length,
  unlockedAchievements: dummyAchievements.filter(a => a.unlocked).length,
  totalProgress: dummyAchievements.reduce((sum, a) => sum + a.progress, 0),
  maxProgress: dummyAchievements.reduce((sum, a) => sum + a.maxProgress, 0),
};

export default function AchievementsScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleAchievementPress = (achievement: any) => {
    console.log('達成をタップ:', achievement);
  };

  const getProgressPercentage = (progress: number, maxProgress: number) => {
    return Math.min((progress / maxProgress) * 100, 100);
  };

  const getOverallProgress = () => {
    return Math.round((stats.unlockedAchievements / stats.totalAchievements) * 100);
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
          <Text style={styles.headerTitle}>達成記録</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 全体進捗セクション */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>全体進捗</Text>
              <Text style={styles.progressPercentage}>{getOverallProgress()}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${getOverallProgress()}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {stats.unlockedAchievements} / {stats.totalAchievements} 達成
            </Text>
          </View>
        </View>

        {/* 統計セクション */}
        <View style={styles.statsSection}>
          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <MaterialCommunityIcons name="trophy" size={24} color="#FFC107" />
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.statsNumber}>{stats.unlockedAchievements}</Text>
              <Text style={styles.statsLabel}>獲得済み</Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <MaterialCommunityIcons name="target" size={24} color="#4CAF50" />
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.statsNumber}>{stats.totalProgress}</Text>
              <Text style={styles.statsLabel}>総進捗</Text>
            </View>
          </View>
        </View>

        {/* 達成一覧 */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>達成一覧</Text>
          
          <View style={styles.achievementsGrid}>
            {dummyAchievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementCardLocked
                ]}
                onPress={() => handleAchievementPress(achievement)}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.color + '20' },
                  !achievement.unlocked && styles.achievementIconLocked
                ]}>
                  <MaterialCommunityIcons
                    name={achievement.icon as any}
                    size={32}
                    color={achievement.unlocked ? achievement.color : '#B0BEC5'}
                  />
                  {!achievement.unlocked && (
                    <View style={styles.lockOverlay}>
                      <MaterialCommunityIcons name="lock" size={16} color="#B0BEC5" />
                    </View>
                  )}
                </View>
                
                <View style={styles.achievementContent}>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTitleLocked
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.unlocked && styles.achievementDescriptionLocked
                  ]}>
                    {achievement.description}
                  </Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBarSmall}>
                      <View 
                        style={[
                          styles.progressFillSmall, 
                          { 
                            width: `${getProgressPercentage(achievement.progress, achievement.maxProgress)}%`,
                            backgroundColor: achievement.unlocked ? achievement.color : '#B0BEC5'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[
                      styles.progressTextSmall,
                      !achievement.unlocked && styles.progressTextSmallLocked
                    ]}>
                      {achievement.progress} / {achievement.maxProgress}
                    </Text>
                  </View>
                  
                  {achievement.unlocked && (
                    <Text style={styles.unlockedDate}>
                      獲得日: {achievement.unlockedDate}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
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
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  progressPercentage: {
    fontSize: 24,
    color: '#FF6B35',
    fontFamily: 'NotoSansJP-Bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statsContent: {
    flex: 1,
  },
  statsNumber: {
    fontSize: 20,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 2,
  },
  statsLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  achievementsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  achievementsGrid: {
    gap: 16,
  },
  achievementCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  achievementIconLocked: {
    backgroundColor: '#F5F5F5',
  },
  lockOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 2,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 4,
    fontFamily: 'NotoSansJP-Bold',
  },
  achievementTitleLocked: {
    color: '#B0BEC5',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
    fontFamily: 'NotoSansJP-Regular',
  },
  achievementDescriptionLocked: {
    color: '#B0BEC5',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarSmall: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFillSmall: {
    height: '100%',
    borderRadius: 2,
  },
  progressTextSmall: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    minWidth: 40,
  },
  progressTextSmallLocked: {
    color: '#B0BEC5',
  },
  unlockedDate: {
    fontSize: 12,
    color: '#4CAF50',
    fontFamily: 'NotoSansJP-Regular',
  },
});

