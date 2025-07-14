// app/(tabs)/_layout.tsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'circle';

          switch (route.name) {
            case 'home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'fridge':
              iconName = focused ? 'fridge' : 'fridge-outline';
              break;
            case 'buy_list':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'suggestion':
              iconName = focused ? 'lightbulb' : 'lightbulb-outline';
              break;
            case 'mypage':
              iconName = focused ? 'account' : 'account-outline';
              break;
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#6C757D',
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopColor: '#E9ECEF',
          borderTopWidth: 1,
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 24,
          paddingRight: 24,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: textColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'ホーム' }} />
      <Tabs.Screen name="fridge" options={{ title: '冷蔵庫' }} />
      <Tabs.Screen name="buy_list" options={{ title: '買い物' }} />
      <Tabs.Screen name="suggestion" options={{ title: '提案' }} />
      <Tabs.Screen name="mypage" options={{ title: 'マイページ' }} />
    </Tabs>
  );
}
