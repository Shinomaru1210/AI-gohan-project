import { Stack } from 'expo-router';

export default function MyPageLayout() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontFamily: 'NotoSansJP-Bold' } }}>
      <Stack.Screen name="index" options={{ title: 'マイページ', headerShown: false }} />
      {/* 今後、プロフィール編集やサブスク登録などのサブ画面をここに追加 */}
    </Stack>
  );
} 