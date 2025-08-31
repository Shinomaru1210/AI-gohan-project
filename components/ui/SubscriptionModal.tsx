import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface SubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: (plan: string) => void;
  title?: string;
  description?: string;
  features?: string[];
}

const { width } = Dimensions.get('window');

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  visible,
  onClose,
  onSubscribe,
  title = 'プレミアムプラン',
  description = 'より多くの機能をお楽しみください',
  features = [
    'AI献立提案機能',
    '冷蔵庫のAI自動推定',
    '無制限の料理履歴',
    '詳細な栄養分析',
    'カスタムレシピ作成',
    '広告なし体験',
  ],
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    monthly: {
      price: '¥980',
      period: '月',
      originalPrice: null,
      discount: null,
      savings: null,
    },
    yearly: {
      price: '¥9,800',
      period: '年',
      originalPrice: '¥11,760',
      discount: '17%OFF',
      savings: '¥1,960',
    },
  };

  const benefits = [
    '毎日の献立に悩まない',
    '栄養バランスを自動調整',
    '買い物時間を50%短縮',
    '料理の腕前が向上',
  ];

  const handleSubscribe = () => {
    Alert.alert(
      'サブスクリプション確認',
      `${plans[selectedPlan].price}/${plans[selectedPlan].period}のプランに登録しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '登録する',
          onPress: () => {
            onSubscribe(selectedPlan);
            onClose();
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* ヘッダー */}
          <LinearGradient
            colors={['#FF6B35', '#FF8E53', '#FFB366']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.headerText}>
                <View style={styles.crownContainer}>
                  <MaterialCommunityIcons name="crown" size={28} color="#FFD700" />
                  <View style={styles.sparkle1}>
                    <MaterialCommunityIcons name="star" size={8} color="#FFD700" />
                  </View>
                  <View style={styles.sparkle2}>
                    <MaterialCommunityIcons name="star" size={6} color="#FFD700" />
                  </View>
                </View>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
              <View style={styles.placeholder} />
            </View>
          </LinearGradient>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* ヒーローセクション */}
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>料理ライフを変えませんか？</Text>
              <Text style={styles.heroSubtitle}>{description}</Text>
              <View style={styles.benefitsContainer}>
                {benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <MaterialCommunityIcons name="check-circle" size={16} color="#4CAF50" />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* プラン選択 */}
            <View style={styles.planSection}>
              <Text style={styles.sectionTitle}>お得なプランを選択</Text>
              <View style={styles.planContainer}>
                <TouchableOpacity
                  style={[
                    styles.planCard,
                    selectedPlan === 'monthly' && styles.selectedPlanCard,
                  ]}
                  onPress={() => setSelectedPlan('monthly')}
                  activeOpacity={0.8}
                >
                  <View style={styles.planHeader}>
                    <Text style={styles.planName}>月額プラン</Text>
                    {selectedPlan === 'monthly' && (
                      <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
                    )}
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{plans.monthly.price}</Text>
                    <Text style={styles.period}>/{plans.monthly.period}</Text>
                  </View>
                  <Text style={styles.planDescription}>気軽に始められる</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.planCard,
                    selectedPlan === 'yearly' && styles.selectedPlanCard,
                    styles.yearlyCard,
                  ]}
                  onPress={() => setSelectedPlan('yearly')}
                  activeOpacity={0.8}
                >
                  <View style={styles.planHeader}>
                    <Text style={styles.planName}>年額プラン</Text>
                    <View style={styles.recommendedBadge}>
                      <Text style={styles.recommendedText}>おすすめ</Text>
                    </View>
                    {selectedPlan === 'yearly' && (
                      <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
                    )}
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{plans.yearly.price}</Text>
                    <Text style={styles.period}>/{plans.yearly.period}</Text>
                  </View>
                  {plans.yearly.originalPrice && (
                    <View style={styles.discountContainer}>
                      <Text style={styles.originalPrice}>{plans.yearly.originalPrice}</Text>
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{plans.yearly.discount}</Text>
                      </View>
                    </View>
                  )}
                  {plans.yearly.savings && (
                    <Text style={styles.savingsText}>年間{plans.yearly.savings}お得！</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* 機能一覧 */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>含まれる機能</Text>
              <View style={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.featureIconContainer}>
                      <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 社会的証明 */}
            <View style={styles.socialProofSection}>
              <Text style={styles.sectionTitle}>ユーザーの声</Text>
              <View style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <MaterialCommunityIcons name="account-circle" size={40} color="#FF6B35" />
                  <View style={styles.testimonialInfo}>
                    <Text style={styles.testimonialName}>田中さん</Text>
                    <View style={styles.ratingContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <MaterialCommunityIcons key={star} name="star" size={16} color="#FFD700" />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.testimonialText}>
                  「AI献立提案で毎日の料理が楽しくなりました！栄養バランスも良くなって、家族も喜んでいます。」
                </Text>
              </View>
            </View>

            {/* 注意事項 */}
            <View style={styles.noticeSection}>
              <Text style={styles.noticeTitle}>ご注意</Text>
              <Text style={styles.noticeText}>
                • サブスクリプションは自動更新されます{'\n'}
                • いつでもキャンセル可能です{'\n'}
                • プライバシーポリシーと利用規約に同意したものとみなされます
              </Text>
            </View>
          </ScrollView>

          {/* 登録ボタン */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={handleSubscribe}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FF6B35', '#FF8E53']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.subscribeButtonGradient}
              >
                <MaterialCommunityIcons name="crown" size={20} color="#fff" />
                <Text style={styles.subscribeButtonText}>
                  {plans[selectedPlan].price}/{plans[selectedPlan].period}で登録
                </Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.guaranteeText}>
              💯 7日間の無料トライアル付き
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  headerGradient: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: 4,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  crownContainer: {
    position: 'relative',
  },
  sparkle1: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  sparkle2: {
    position: 'absolute',
    bottom: -2,
    left: -2,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
  placeholder: {
    width: 32,
  },
  content: {
    paddingHorizontal: 20,
  },
  heroSection: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 20,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  benefitsContainer: {
    width: '100%',
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
  },
  planSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 12,
  },
  planContainer: {
    gap: 12,
  },
  planCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlanCard: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF8F2',
  },
  yearlyCard: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  recommendedBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  recommendedText: {
    fontSize: 10,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    color: '#FF6B35',
    fontFamily: 'NotoSansJP-Bold',
  },
  period: {
    fontSize: 16,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  planDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  discountText: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
  savingsText: {
    fontSize: 12,
    color: '#4CAF50',
    fontFamily: 'NotoSansJP-Bold',
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF8F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
    flex: 1,
  },
  socialProofSection: {
    marginBottom: 24,
  },
  testimonialCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  noticeSection: {
    marginBottom: 20,
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
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: '100%',
    marginBottom: 8,
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
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
  },
  guaranteeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontFamily: 'NotoSansJP-Bold',
  },
});

export default SubscriptionModal;
