import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FeedbackCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
}

const feedbackCategories: FeedbackCategory[] = [
  {
    id: 'bug',
    title: 'バグ報告',
    icon: 'bug',
    color: '#E74C3C',
  },
  {
    id: 'feature',
    title: '機能要望',
    icon: 'lightbulb',
    color: '#F39C12',
  },
  {
    id: 'improvement',
    title: '改善提案',
    icon: 'tools',
    color: '#3498DB',
  },
  {
    id: 'other',
    title: 'その他',
    icon: 'message',
    color: '#9B59B6',
  },
];

export default function FeedbackScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('tanaka@example.com');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert('エラー', 'カテゴリを選択してください');
      return;
    }
    if (!title.trim()) {
      Alert.alert('エラー', 'タイトルを入力してください');
      return;
    }
    if (!description.trim()) {
      Alert.alert('エラー', '詳細を入力してください');
      return;
    }

    setIsSubmitting(true);

    // 送信処理のシミュレーション
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        '送信完了',
        'フィードバックを送信しました。ご協力ありがとうございます！',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 2000);
  };

  const canSubmit = selectedCategory && title.trim() && description.trim();

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
          <Text style={styles.headerTitle}>フィードバック送信</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 説明セクション */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <MaterialCommunityIcons name="message-star" size={32} color="#FF9800" />
            <Text style={styles.infoTitle}>フィードバックをお聞かせください</Text>
            <Text style={styles.infoText}>
              アプリの改善のため、ご意見やご要望をお聞かせください。
              いただいたフィードバックは今後の開発に活用させていただきます。
            </Text>
          </View>
        </View>

        {/* カテゴリ選択 */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>カテゴリを選択</Text>
          <View style={styles.categoryGrid}>
            {feedbackCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: category.color + '20' },
                  selectedCategory === category.id && { backgroundColor: category.color }
                ]}>
                  <MaterialCommunityIcons
                    name={category.icon as any}
                    size={24}
                    color={selectedCategory === category.id ? '#fff' : category.color}
                  />
                </View>
                <Text style={[
                  styles.categoryTitle,
                  selectedCategory === category.id && styles.categoryTitleSelected
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* タイトル入力 */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>タイトル</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="フィードバックのタイトルを入力"
              placeholderTextColor="#B0BEC5"
              maxLength={100}
            />
            <Text style={styles.charCount}>{title.length}/100</Text>
          </View>
        </View>

        {/* 詳細入力 */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>詳細</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="詳細な内容を入力してください"
              placeholderTextColor="#B0BEC5"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={1000}
            />
            <Text style={styles.charCount}>{description.length}/1000</Text>
          </View>
        </View>

        {/* メールアドレス */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>連絡先（任意）</Text>
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
          <Text style={styles.inputNote}>
            返信が必要な場合は、メールアドレスをご入力ください
          </Text>
        </View>

        {/* 送信ボタン */}
        <View style={styles.submitSection}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              !canSubmit && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={canSubmit ? ['#FF6B35', '#FF8E53'] : ['#B0BEC5', '#B0BEC5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitButtonGradient}
            >
              {isSubmitting ? (
                <>
                  <MaterialCommunityIcons name="loading" size={20} color="#fff" />
                  <Text style={styles.submitButtonText}>送信中...</Text>
                </>
              ) : (
                <>
                  <MaterialCommunityIcons name="send" size={20} color="#fff" />
                  <Text style={styles.submitButtonText}>フィードバックを送信</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 注意事項 */}
        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>注意事項</Text>
          <Text style={styles.noteText}>
            • 個人情報は含めないでください{'\n'}
            • 不適切な内容は送信できません{'\n'}
            • 送信された内容は開発チームで確認いたします
          </Text>
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
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginTop: 12,
    marginBottom: 8,
    fontFamily: 'NotoSansJP-Bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'NotoSansJP-Regular',
  },
  categorySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryCardSelected: {
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
    textAlign: 'center',
  },
  categoryTitleSelected: {
    color: '#FF6B35',
  },
  inputSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 12,
    zIndex: 1,
  },
  textInput: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
    paddingLeft: 32,
  },
  textAreaContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  textArea: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#B0BEC5',
    textAlign: 'right',
    marginTop: 4,
    fontFamily: 'NotoSansJP-Regular',
  },
  inputNote: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 8,
    fontFamily: 'NotoSansJP-Regular',
  },
  submitSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  submitButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    shadowColor: '#B0BEC5',
    shadowOpacity: 0.2,
  },
  submitButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
    marginLeft: 8,
  },
  noteSection: {
    paddingHorizontal: 20,
  },
  noteTitle: {
    fontSize: 16,
    color: '#E74C3C',
    marginBottom: 8,
    fontFamily: 'NotoSansJP-Bold',
  },
  noteText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    fontFamily: 'NotoSansJP-Regular',
  },
});

