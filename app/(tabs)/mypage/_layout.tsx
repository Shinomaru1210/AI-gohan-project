import { Stack } from 'expo-router';

export default function MyPageLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerTitleStyle: { fontFamily: 'NotoSansJP-Bold', color: '#2C3E50' },
        headerStyle: { backgroundColor: '#FFF8F2' },
        headerTintColor: '#FF6B35',
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="index" options={{ title: 'マイページ', headerShown: false }} />
      <Stack.Screen name="profile-edit" options={{ title: 'プロフィール編集', headerShown: true }} />
      <Stack.Screen name="favorites" options={{ title: 'お気に入り', headerShown: false }} />
      <Stack.Screen name="history" options={{ title: '料理履歴', headerShown: true }} />
      <Stack.Screen name="achievements" options={{ title: '達成記録', headerShown: true }} />
      <Stack.Screen name="notifications" options={{ title: '通知設定', headerShown: true }} />
      <Stack.Screen name="feedback" options={{ title: 'フィードバック', headerShown: true }} />
      <Stack.Screen name="privacy-policy" options={{ title: 'プライバシーポリシー', headerShown: true }} />
      <Stack.Screen name="terms" options={{ title: '利用規約', headerShown: true }} />
      <Stack.Screen name="subscription" options={{ title: 'プレミアムプラン', headerShown: true }} />
    </Stack>
  );
} 