import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsScreen() {
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
          <Text style={styles.headerTitle}>利用規約</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 更新日 */}
        <View style={styles.updateSection}>
          <Text style={styles.updateText}>最終更新日: 2024年1月15日</Text>
        </View>

        {/* 利用規約内容 */}
        <View style={styles.contentSection}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第1条（適用）</Text>
            <Text style={styles.sectionText}>
              本規約は、当アプリの利用に関して適用されます。ユーザーは、本規約に従って当アプリを利用するものとします。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第2条（利用登録）</Text>
            <Text style={styles.sectionText}>
              1. 当アプリの利用を希望する者は、本規約に同意の上、当アプリの定める方法によって利用登録を申請するものとします。
            </Text>
            <Text style={styles.sectionText}>
              2. 当アプリは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• 虚偽の事項を届け出た場合</Text>
              <Text style={styles.listItem}>• 本規約に違反したことがある者からの申請である場合</Text>
              <Text style={styles.listItem}>• その他、当アプリが利用登録を相当でないと判断した場合</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第3条（ユーザーIDおよびパスワードの管理）</Text>
            <Text style={styles.sectionText}>
              1. ユーザーは、自己の責任において、当アプリのユーザーIDおよびパスワードを適切に管理するものとします。
            </Text>
            <Text style={styles.sectionText}>
              2. ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第4条（利用料金および支払方法）</Text>
            <Text style={styles.sectionText}>
              1. ユーザーは、当アプリの有料サービスを利用する場合、当アプリが別途定める利用料金を支払うものとします。
            </Text>
            <Text style={styles.sectionText}>
              2. ユーザーが利用料金の支払を遅滞した場合には、年14.6%の割合による遅延損害金を支払うものとします。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第5条（禁止事項）</Text>
            <Text style={styles.sectionText}>
              ユーザーは、当アプリの利用にあたり、以下の行為をしてはなりません。
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• 法令または公序良俗に違反する行為</Text>
              <Text style={styles.listItem}>• 犯罪行為に関連する行為</Text>
              <Text style={styles.listItem}>• 当アプリのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</Text>
              <Text style={styles.listItem}>• 当アプリのサービスの運営を妨害するおそれのある行為</Text>
              <Text style={styles.listItem}>• 他のユーザーに関する個人情報等を収集または蓄積する行為</Text>
              <Text style={styles.listItem}>• 他のユーザーに成りすます行為</Text>
              <Text style={styles.listItem}>• 当アプリのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</Text>
              <Text style={styles.listItem}>• その他、当アプリが不適切と判断する行為</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第6条（当アプリの提供するサービスの内容）</Text>
            <Text style={styles.sectionText}>
              当アプリは、以下のサービスを提供します：
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• 献立提案サービス</Text>
              <Text style={styles.listItem}>• 料理レシピ管理サービス</Text>
              <Text style={styles.listItem}>• お気に入り料理管理サービス</Text>
              <Text style={styles.listItem}>• 料理履歴管理サービス</Text>
              <Text style={styles.listItem}>• その他当アプリが定めるサービス</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第7条（利用制限および登録抹消）</Text>
            <Text style={styles.sectionText}>
              1. 当アプリは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、当アプリの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>• 本規約のいずれかの条項に違反した場合</Text>
              <Text style={styles.listItem}>• 登録事項に虚偽の事実があることが判明した場合</Text>
              <Text style={styles.listItem}>• 料金等の支払債務の不履行があった場合</Text>
              <Text style={styles.listItem}>• 当アプリからの連絡に対し、一定期間返答がない場合</Text>
              <Text style={styles.listItem}>• その他、当アプリがサービスの利用を適当でないと判断した場合</Text>
            </View>
            <Text style={styles.sectionText}>
              2. 当アプリは、本条に基づき当アプリが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第8条（免責事項）</Text>
            <Text style={styles.sectionText}>
              1. 当アプリは、当アプリのサービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            </Text>
            <Text style={styles.sectionText}>
              2. 当アプリは、当アプリのサービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第9条（サービス内容の変更等）</Text>
            <Text style={styles.sectionText}>
              当アプリは、ユーザーに通知することにより、当アプリのサービスの内容を変更しまたは新サービスの提供を開始することができるものとします。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第10条（利用規約の変更）</Text>
            <Text style={styles.sectionText}>
              当アプリは、必要と判断した場合には、ユーザーに通知することによりいつでも本規約を変更することができるものとします。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第11条（通知または連絡）</Text>
            <Text style={styles.sectionText}>
              ユーザーと当アプリとの間の通知または連絡は、当アプリの定める方法によって行うものとします。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第12条（権利義務の譲渡の禁止）</Text>
            <Text style={styles.sectionText}>
              ユーザーは、当アプリの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>第13条（準拠法・裁判管轄）</Text>
            <Text style={styles.sectionText}>
              1. 本規約の解釈にあたっては、日本法を準拠法とします。
            </Text>
            <Text style={styles.sectionText}>
              2. 当アプリに関して紛争が生じた場合には、当アプリの本店所在地を管轄する裁判所を専属的合意管轄とします。
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>お問い合わせ</Text>
            <Text style={styles.sectionText}>
              利用規約に関するお問い合わせは、アプリ内のフィードバック機能または以下の連絡先までお願いいたします。
            </Text>
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>メール: terms@aigohan.com</Text>
              <Text style={styles.contactText}>受付時間: 平日 9:00-18:00</Text>
            </View>
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

