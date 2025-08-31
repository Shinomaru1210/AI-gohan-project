import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
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
          <Text style={styles.headerTitle}>プライバシーポリシー</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 更新日 */}
        <View style={styles.updateSection}>
          <Text style={styles.updateText}>最終更新日: 2024年1月15日</Text>
        </View>

        {/* プライバシーポリシー内容 */}
        <View style={styles.contentSection}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. 個人情報の収集について</Text>
            <Text style={styles.sectionText}>
              当アプリでは、サービス提供のために以下の個人情報を収集いたします：
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• ユーザー名</Text>
              <Text style={styles.listItem}>• メールアドレス</Text>
              <Text style={styles.listItem}>• プロフィール画像</Text>
              <Text style={styles.listItem}>• 料理履歴・お気に入り情報</Text>
              <Text style={styles.listItem}>• アプリの利用状況データ</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. 個人情報の利用目的</Text>
            <Text style={styles.sectionText}>
              収集した個人情報は、以下の目的で利用いたします：
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• アプリサービスの提供・運営</Text>
              <Text style={styles.listItem}>• ユーザー認証・アカウント管理</Text>
              <Text style={styles.listItem}>• 献立提案・レコメンデーション機能</Text>
              <Text style={styles.listItem}>• お気に入り・履歴機能の提供</Text>
              <Text style={styles.listItem}>• サービス改善・新機能開発</Text>
              <Text style={styles.listItem}>• お客様サポート・お問い合わせ対応</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. 個人情報の管理・保護</Text>
            <Text style={styles.sectionText}>
              当アプリでは、お客様の個人情報を適切に管理し、以下の理由による場合を除き、個人情報を第三者に開示いたしません。
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• お客様の同意がある場合</Text>
              <Text style={styles.listItem}>• 法令に基づき開示することが必要である場合</Text>
              <Text style={styles.listItem}>• 人の生命、身体または財産の保護のために必要な場合</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. 個人情報の共有について</Text>
            <Text style={styles.sectionText}>
              当アプリでは、以下の場合を除き、個人情報を第三者と共有いたしません：
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• 事前に明示的な同意をいただいた場合</Text>
              <Text style={styles.listItem}>• 法令に基づく要請がある場合</Text>
              <Text style={styles.listItem}>• 当アプリの権利・財産・安全を保護する必要がある場合</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. データの保存・削除</Text>
            <Text style={styles.sectionText}>
              お客様の個人情報は、サービス提供に必要な期間保存いたします。アカウント削除をご希望の場合は、アプリ内の設定から削除いただけます。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. お客様の権利</Text>
            <Text style={styles.sectionText}>
              お客様は、ご自身の個人情報について以下の権利をお持ちです：
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• 個人情報の開示・訂正・削除の請求</Text>
              <Text style={styles.listItem}>• 利用停止・消去の請求</Text>
              <Text style={styles.listItem}>• データの可搬性の要求</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. お問い合わせ</Text>
            <Text style={styles.sectionText}>
              プライバシーポリシーに関するお問い合わせは、アプリ内のフィードバック機能または以下の連絡先までお願いいたします。
            </Text>
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>メール: privacy@aigohan.com</Text>
              <Text style={styles.contactText}>受付時間: 平日 9:00-18:00</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. プライバシーポリシーの変更</Text>
            <Text style={styles.sectionText}>
              当アプリは、必要に応じてこのプライバシーポリシーを変更することがあります。重要な変更がある場合は、アプリ内でお知らせいたします。
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
  updateSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  updateText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    fontFamily: 'NotoSansJP-Regular',
  },
  contentSection: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 12,
    fontFamily: 'NotoSansJP-Bold',
  },
  sectionText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: 'NotoSansJP-Regular',
  },
  listContainer: {
    marginLeft: 16,
  },
  listItem: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: 'NotoSansJP-Regular',
  },
  contactContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  contactText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    fontFamily: 'NotoSansJP-Regular',
  },
});

