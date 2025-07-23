import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { DefaultTheme as PaperDefaultTheme, PaperProvider } from 'react-native-paper'; // ✅ PaperProvider を使う

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'NotoSansJP-Thin': require('../assets/fonts/NotoSansJP-Thin.ttf'),
    'NotoSansJP-ExtraLight': require('../assets/fonts/NotoSansJP-ExtraLight.ttf'),
    'NotoSansJP-Light': require('../assets/fonts/NotoSansJP-Light.ttf'),
    'NotoSansJP-Regular': require('../assets/fonts/NotoSansJP-Regular.ttf'),
    'NotoSansJP-Medium': require('../assets/fonts/NotoSansJP-Medium.ttf'),
    'NotoSansJP-SemiBold': require('../assets/fonts/NotoSansJP-SemiBold.ttf'),
    'NotoSansJP-Bold': require('../assets/fonts/NotoSansJP-Bold.ttf'),
    'NotoSansJP-ExtraBold': require('../assets/fonts/NotoSansJP-ExtraBold.ttf'),
    'NotoSansJP-Black': require('../assets/fonts/NotoSansJP-Black.ttf'),
  });

  const paperTheme = {
    ...PaperDefaultTheme,
    fonts: {
      ...PaperDefaultTheme.fonts,
      bodyLarge: { fontFamily: 'NotoSansJP-Regular' },
      bodyMedium: { fontFamily: 'NotoSansJP-Regular' },
      bodySmall: { fontFamily: 'NotoSansJP-Regular' },
      titleLarge: { fontFamily: 'NotoSansJP-Bold' },
      titleMedium: { fontFamily: 'NotoSansJP-Medium' },
      titleSmall: { fontFamily: 'NotoSansJP-Medium' },
      labelLarge: { fontFamily: 'NotoSansJP-Regular' },
      labelMedium: { fontFamily: 'NotoSansJP-Regular' },
      labelSmall: { fontFamily: 'NotoSansJP-Regular' },
    },
  };

  // Text.defaultPropsでグローバルにNotoSansJPを適用
  // @ts-ignore
  if (Text.defaultProps == null) Text.defaultProps = {};
  // @ts-ignore
  Text.defaultProps.style = [{ fontFamily: 'NotoSansJP-Regular' }];

  if (!loaded) return null;

  return (
    <PaperProvider theme={paperTheme}> {/* カスタムテーマを適用 */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
