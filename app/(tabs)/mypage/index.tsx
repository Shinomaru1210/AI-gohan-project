import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import BasicInfoCard from './BasicInfoCard';
import ProfileCard from './ProfileCard';

const dummyUser = {
  name: '田中太郎',
  email: 'tanaka@example.com',
  avatarUrl: '',
  phone: '090-1234-5678',
  gender: '男性',
  birth: '1990-05-15',
  area: '東京都',
};

export default function MyPageScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <ProfileCard
          name={dummyUser.name}
          email={dummyUser.email}
          avatarUrl={dummyUser.avatarUrl}
          onEdit={() => {}}
        />
        <BasicInfoCard
          phone={dummyUser.phone}
          gender={dummyUser.gender}
          birth={dummyUser.birth}
          area={dummyUser.area}
        />
        {/* 今後、各セクションカードをここに順次追加 */}
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={{ fontFamily: 'NotoSansJP-Regular' }}>（各種セクションは今後追加されます）</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
});
