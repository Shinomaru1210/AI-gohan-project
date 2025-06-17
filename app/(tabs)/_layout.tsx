// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
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
            case 'menu_list':
              iconName = focused ? 'list' : 'list-outline';
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
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="fridge" options={{ title: '冷蔵庫' }} />
      <Tabs.Screen name="suggestion" options={{ title: '提案ごはん' }} />
      <Tabs.Screen name="menu_list" options={{ title: '献立リスト' }} />
      <Tabs.Screen name="buy_list" options={{ title: '買い物リスト' }} />
      <Tabs.Screen name="mypage" options={{ title: 'マイページ' }} />
    </Tabs>
  );
}
