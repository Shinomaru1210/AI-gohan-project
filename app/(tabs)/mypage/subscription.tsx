import SubscriptionModal from '@/components/ui/SubscriptionModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const currentPlan = {
  type: 'free',
  name: '無料プラン',
  features: [
    '基本的な料理記録',
    '限定的な献立提案',
    '基本的な冷蔵庫管理',
  ],
  limitations: [
    'AI献立提案は1日1回まで',
    '冷蔵庫のAI自動推定は利用不可',
    '料理履歴は30件まで',
    '広告が表示されます',
  ],
};

const premiumFeatures = [
  'AI献立提案機能（無制限）',
  '冷蔵庫のAI自動推定',
  '無制限の料理履歴',
  '詳細な栄養分析',
  'カスタムレシピ作成',
  '広告なし体験',
  '優先サポート',
  '早期アクセス機能',
];

const stats = {
  users: '50,000+',
  rating: '4.8',
  reviews: '2,500+',
  savings: '¥15,000',
};

export default function SubscriptionScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSubscribe = (plan: string) => {
    Alert.alert(
      'サブスクリプション登録完了',
      `${plan === 'monthly' ? '月額' : '年額'}プランに登録しました！`,
      [
        {
          text: 'OK',
          onPress: () => {
            // ここで実際のサブスクリプション処理を行う
            console.log('Subscription completed:', plan);
          },
        },
      ]
    );
  };

  const handleRestore = () => {
    Alert.alert(
      '購入復元',
      '以前の購入を復元しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '復元する',
          onPress: () => {
            console.log('Restore purchases');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
          <Text style={styles.headerTitle}>プレミアム</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* ヒーローセクション */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#FF6B35', '#FF8E53', '#FFB366']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <View style={styles.crownContainer}>
                <MaterialCommunityIcons name="crown" size={48} color="#FFD700" />
                <View style={styles.sparkle1}>
                  <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                </View>
                <View style={styles.sparkle2}>
                  <MaterialCommunityIcons name="star" size={12} color="#FFD700" />
                </View>
              </View>
              <Text style={styles.heroTitle}>料理をもっと楽しく✨</Text>
              <Text style={styles.heroSubtitle}>
                AIがあなたの料理ライフを変えます
              </Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{stats.users}</Text>
                  <Text style={styles.statLabel}>ユーザー</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{stats.rating}</Text>
                  <Text style={styles.statLabel}>評価</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{stats.reviews}</Text>
                  <Text style={styles.statLabel}>レビュー</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* 上部CTAボタン */}
        <View style={styles.topCTASection}>
          <TouchableOpacity
            style={styles.topCTAButton}
            onPress={() => setShowModal(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8E53']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.topCTAGradient}
            >
              <MaterialCommunityIcons name="crown" size={20} color="#fff" />
              <Text style={styles.topCTAText}>今すぐプレミアムにアップグレード</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.topCTASubtext}>7日間の無料トライアル付き</Text>
        </View>

        {/* 価値提案セクション */}
        <View style={styles.valueSection}>
          <Text style={styles.sectionTitle}>プレミアムで得られる価値</Text>
          <View style={styles.valueCards}>
            <View style={styles.valueCard}>
              <View style={styles.valueIconContainer}>
                <MaterialCommunityIcons name="brain" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.valueCardTitle}>AI献立提案</Text>
              <Text style={styles.valueCardText}>
                あなた好みの料理をAIが提案。毎日の献立に悩まない
              </Text>
            </View>
            <View style={styles.valueCard}>
              <View style={styles.valueIconContainer}>
                <MaterialCommunityIcons name="food-apple" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.valueCardTitle}>栄養管理</Text>
              <Text style={styles.valueCardText}>
                詳細な栄養分析で健康的な食生活をサポート
              </Text>
            </View>
            <View style={styles.valueCard}>
              <View style={styles.valueIconContainer}>
                <MaterialCommunityIcons name="clock-outline" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.valueCardTitle}>時間短縮</Text>
              <Text style={styles.valueCardText}>
                買い物リスト自動作成で調理時間を大幅短縮
              </Text>
            </View>
          </View>
        </View>

        {/* 現在のプラン */}
        <View style={styles.currentPlanSection}>
          <Text style={styles.sectionTitle}>現在のプラン</Text>
          <View style={styles.currentPlanCard}>
            <View style={styles.planHeader}>
              <MaterialCommunityIcons name="account" size={24} color="#7F8C8D" />
              <Text style={styles.planName}>{currentPlan.name}</Text>
            </View>
            <Text style={styles.planDescription}>
              基本的な機能をお使いいただけます
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '30%' }]} />
              </View>
              <Text style={styles.progressText}>30% の機能を利用中</Text>
            </View>
          </View>
        </View>

        {/* プレミアムプラン紹介 */}
        <View style={styles.premiumSection}>
          <View style={styles.premiumCard}>
            <LinearGradient
              colors={['#FF6B35', '#FF8E53']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.premiumGradient}
            >
              <View style={styles.premiumContent}>
                <MaterialCommunityIcons name="crown" size={32} color="#FFD700" />
                <View style={styles.premiumText}>
                  <Text style={styles.premiumTitle}>プレミアムプラン</Text>
                  <Text style={styles.premiumSubtitle}>
                    すべての機能を無制限でお楽しみください
                  </Text>
                  <View style={styles.savingsBadge}>
                    <MaterialCommunityIcons name="piggy-bank" size={16} color="#FFD700" />
                    <Text style={styles.savingsText}>年間{stats.savings}節約</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.sectionTitle}>プレミアム機能</Text>
          {premiumFeatures.map((feature, index) => (
            <View key={index} style={styles.premiumFeatureItem}>
              <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.premiumFeatureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* アクションボタン */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => setShowModal(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF8E53']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.subscribeButtonGradient}
            >
              <MaterialCommunityIcons name="crown" size={20} color="#fff" />
              <Text style={styles.subscribeButtonText}>プレミアムプランにアップグレード</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restoreButton}
            onPress={handleRestore}
            activeOpacity={0.8}
          >
            <Text style={styles.restoreButtonText}>購入を復元</Text>
          </TouchableOpacity>
        </View>

        {/* 注意事項 */}
        <View style={styles.noticeSection}>
          <Text style={styles.noticeTitle}>ご注意</Text>
          <Text style={styles.noticeText}>
            • サブスクリプションは自動更新されます{'\n'}
            • いつでもキャンセル可能です{'\n'}
            • プライバシーポリシーと利用規約に同意したものとみなされます{'\n'}
            • アプリ内課金はApp Store/Google Playを通じて処理されます
          </Text>
        </View>

        {/* フッタースペース */}
        <View style={styles.footerSpace} />
      </ScrollView>

      {/* サブスクリプションモーダル */}
      <SubscriptionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubscribe={handleSubscribe}
        title="プレミアムプラン"
        description="すべての機能を無制限でお楽しみください✨"
        features={premiumFeatures}
      />
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
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroGradient: {
    padding: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  crownContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  sparkle1: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  sparkle2: {
    position: 'absolute',
    bottom: -4,
    left: -4,
  },
  heroTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFE5D0',
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFE5D0',
    fontFamily: 'NotoSansJP-Regular',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  valueSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 16,
  },
  valueCards: {
    gap: 12,
  },
  valueCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  valueIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  valueCardTitle: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 8,
  },
  valueCardText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    lineHeight: 20,
  },
  currentPlanSection: {
    marginBottom: 24,
  },
  currentPlanCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  planName: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  planDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  premiumSection: {
    marginBottom: 24,
  },
  premiumCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  premiumGradient: {
    padding: 16,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#FFE5D0',
    fontFamily: 'NotoSansJP-Regular',
    marginBottom: 8,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  savingsText: {
    fontSize: 12,
    color: '#FFD700',
    fontFamily: 'NotoSansJP-Bold',
  },
  premiumFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  premiumFeatureText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
    flex: 1,
  },
  actionSection: {
    marginBottom: 24,
    gap: 12,
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  subscribeButtonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  restoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  restoreButtonText: {
    color: '#7F8C8D',
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    textDecorationLine: 'underline',
  },
  noticeSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  noticeTitle: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    lineHeight: 18,
  },
  footerSpace: {
    height: 100,
  },
  topCTASection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  topCTAButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: '100%',
  },
  topCTAGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  topCTAText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  topCTASubtext: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    marginTop: 8,
  },
});
