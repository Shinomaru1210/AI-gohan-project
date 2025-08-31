/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// メインカラーパレット
export const AppColors = {
  // ブランドカラー
  primary: '#FF6B35',      // メインオレンジ
  secondary: '#1976D2',    // セカンダリブルー
  
  // 背景色
  background: '#F8F9FA',
  surface: '#FFFFFF',
  
  // テキスト色
  text: {
    primary: '#2C3E50',    // メインテキスト
    secondary: '#7F8C8D',  // サブテキスト
    light: '#B0BEC5',      // プレースホルダー
  },
  
  // カテゴリカラー（統一感のある色）
  category: {
    vegetable: '#4CAF50',   // 野菜（緑）
    meat: '#E74C3C',        // 肉類（赤）
    fish: '#3498DB',        // 魚介類（青）
    dairy: '#9B59B6',       // 卵・乳製品（紫）
    grain: '#F39C12',       // 主食（オレンジ）
    seasoning: '#1ABC9C',   // 調味料（ティール）
    other: '#95A5A6',       // その他（グレー）
  },
  
  // 状態色
  status: {
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',
  },
  
  // グラデーション
  gradient: {
    primary: ['#FF6B35', '#FF8E53'],
    secondary: ['#1976D2', '#42A5F5'],
    header: ['#E3F2FD', '#BBDEFB'],
    background: ['#fff', '#FFF8F2'],
  },
  
  // シャドウ
  shadow: {
    light: '#000000',
    primary: '#FF6B35',
    secondary: '#1976D2',
  },
};

const tintColorLight = AppColors.primary;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: AppColors.text.primary,
    background: AppColors.background,
    tint: tintColorLight,
    icon: AppColors.text.secondary,
    tabIconDefault: AppColors.text.secondary,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
