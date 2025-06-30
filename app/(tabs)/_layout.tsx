// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  NotoSansJP_400Regular,
  NotoSansJP_700Bold,
} from '@expo-google-fonts/noto-sans-jp';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    NotoSansJP_400Regular,
    NotoSansJP_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

          switch (route.name) {
            case 'fridge':
              iconName = focused ? 'cube' : 'cube-outline';
              break;
            case 'suggestion':
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              break;
            case 'home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'buy_list':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'mypage':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF7043', // オレンジ基調
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontFamily: 'NotoSansJP_400Regular',
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="fridge" options={{ title: '冷蔵庫' }} />
      <Tabs.Screen name="suggestion" options={{ title: '提案ごはん' }} />
      <Tabs.Screen name="home" options={{ title: 'HOME' }} />
      <Tabs.Screen name="buy_list" options={{ title: '買い物リスト' }} />
      <Tabs.Screen name="mypage" options={{ title: 'マイページ' }} />
    </Tabs>
  );
}
