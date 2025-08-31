// app/(tabs)/_layout.tsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';

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
              iconName = 'home';
              break;
            case 'fridge':
              iconName = 'fridge';
              break;
            case 'buy_list':
              iconName = 'shopping';
              break;
            case 'suggestion':
              iconName = 'chef-hat';
              break;
            case 'mypage':
              iconName = 'account';
              break;
          }

          return (
            <View style={styles.iconContainer}>
              {focused && (
                <LinearGradient
                  colors={['#FF6B35', '#FF8E53']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.activeIconBackground}
                />
              )}
              <MaterialCommunityIcons 
                name={iconName} 
                size={focused ? 28 : 24} 
                color={focused ? '#fff' : '#6C757D'} 
              />
            </View>
          );
        },

        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#6C757D',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          height: 100,
          paddingTop: 12,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          shadowColor: '#FF6B35',
          shadowOffset: {
            width: 0,
            height: -8,
          },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 15,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#fff', '#FFF8F2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 8,
          fontFamily: 'NotoSansJP-Bold',
        },
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: textColor,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'NotoSansJP-Bold',
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

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  activeIconBackground: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
