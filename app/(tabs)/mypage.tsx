// app/(tabs)/mypage.tsx

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function MypageScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hasAllergy, setHasAllergy] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>マイページ</Text>

        <View style={styles.section}>
          <Ionicons name="person-circle" size={28} color="#2196F3" />
          <Text style={styles.sectionTitle}>ユーザー設定</Text>
          <Text style={styles.itemText}>仮ユーザー: guest@example.com</Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="notifications" size={24} color="#FFC107" />
          <View style={styles.row}>
            <Text style={styles.itemText}>通知を受け取る</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Ionicons name="alert-circle" size={24} color="#FF7043" />
          <View style={styles.row}>
            <Text style={styles.itemText}>アレルギー登録</Text>
            <Switch value={hasAllergy} onValueChange={setHasAllergy} />
          </View>
          {hasAllergy && (
            <Text style={styles.subText}>※ 今後アレルギー食材の除外設定に対応予定</Text>
          )}
        </View>

        <View style={styles.section}>
          <Ionicons name="information-circle" size={24} color="#9E9E9E" />
          <Text style={styles.itemText}>バージョン: 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  section: {
    backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 8, marginBottom: 4 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8,
  },
  itemText: { fontSize: 16 },
  subText: { fontSize: 13, marginTop: 4, color: '#888' },
});
