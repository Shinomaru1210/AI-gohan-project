// app/(tabs)/suggestion.tsx

import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Checkbox, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuggestionScreen() {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [keyword, setKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('和食');
  const [suggestionMode, setSuggestionMode] = useState<'full' | 'single'>('full');
  const [easyLevel, setEasyLevel] = useState(3);
  const [fridgeOnly, setFridgeOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const foodTypes = ['和食', '洋食', '中華', 'スープ', 'サラダ', 'デザート'];
  const modeOptions = [
    { key: 'full', label: '献立を全部考える' },
    { key: 'single', label: '1品だけ提案' },
  ];

  const router = useRouter();

  const handleGenerate = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setIsLoading(true);
    setTimeout(() => {
      router.push({
        pathname: '/suggestion/result',
        params: {
          type: selectedType,
          mode: suggestionMode,
          easy: easyLevel,
          fridge: fridgeOnly ? '1' : '0',
          keyword,
        },
      } as any);
      setIsLoading(false);
    }, 500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={{ alignItems: 'center', marginTop: 16, marginBottom: 12 }}>
        <View style={{ backgroundColor: '#FFF3E6', borderRadius: 32, padding: 10, marginBottom: 8, shadowColor: '#FF6B35', shadowOpacity: 0.12, shadowRadius: 8, elevation: 2 }}>
          <MaterialCommunityIcons name="chef-hat" size={48} color="#FF6B35" />
        </View>
        {/* 見出し・セクションタイトル */}
        <Text style={{ color: '#FF6B35', fontSize: 20, fontFamily: 'NotoSansJP-Bold', marginBottom: 0, letterSpacing: 1 }}>今日のごはん、何にしよう？</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 24, marginHorizontal: 16, marginBottom: 18, padding: 18, shadowColor: '#FF6B35', shadowOpacity: 0.10, shadowRadius: 12, elevation: 4, borderWidth: 1, borderColor: '#FFE0CC' }}>
          {/* 料理の種類 */}
          <Text style={{ fontFamily: 'NotoSansJP-Bold', fontSize: 16, marginBottom: 8, color: textColor, letterSpacing: 1 }}>料理の種類</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {foodTypes.map(type => (
              <Chip
                key={type}
                style={{ backgroundColor: selectedType === type ? '#FF6B35' : '#FFF3E6', borderRadius: 18, marginRight: 6, marginBottom: 6, elevation: selectedType === type ? 2 : 0, shadowColor: '#FF6B35' }}
                textStyle={{ color: selectedType === type ? '#fff' : '#FF6B35', fontFamily: 'NotoSansJP-Bold', fontSize: 14, letterSpacing: 1 }}
                selected={selectedType === type}
                onPress={() => setSelectedType(type)}
                compact
              >
                {type}
              </Chip>
            ))}
          </View>
          <View style={{ height: 1, backgroundColor: '#FFE0CC', marginVertical: 8, borderRadius: 1 }} />
          {/* 提案タイプ */}
          <Text style={{ fontFamily: 'NotoSansJP-Bold', fontSize: 16, marginBottom: 8, color: textColor, letterSpacing: 1 }}>提案タイプ</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            {modeOptions.map(opt => (
              <Chip
                key={opt.key}
                style={{ backgroundColor: suggestionMode === opt.key ? '#FF6B35' : '#FFF3E6', borderRadius: 18, marginRight: 6, elevation: suggestionMode === opt.key ? 2 : 0, shadowColor: '#FF6B35' }}
                textStyle={{ color: suggestionMode === opt.key ? '#fff' : '#FF6B35', fontFamily: 'NotoSansJP-Bold', fontSize: 14, letterSpacing: 1 }}
                selected={suggestionMode === opt.key}
                onPress={() => setSuggestionMode(opt.key as any)}
                compact
              >
                {opt.label}
              </Chip>
            ))}
          </View>
          <View style={{ height: 1, backgroundColor: '#FFE0CC', marginVertical: 8, borderRadius: 1 }} />
          {/* キーワード入力 */}
          <Text style={{ fontFamily: 'NotoSansJP-Bold', fontSize: 16, marginBottom: 8, color: textColor, letterSpacing: 1 }}>キーワード</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E6', borderRadius: 14, paddingHorizontal: 10, marginBottom: 16, borderWidth: 1, borderColor: '#FFE0CC' }}>
            <MaterialCommunityIcons name="magnify" size={20} color="#FF6B35" />
            <TextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder="例：鶏肉、スパイシー、ダイエット"
              style={{ flex: 1, fontSize: 15, color: textColor, paddingVertical: 8, marginLeft: 6 }}
              placeholderTextColor="#FFB380"
            />
          </View>
          <View style={{ height: 1, backgroundColor: '#FFE0CC', marginVertical: 8, borderRadius: 1 }} />
          {/* 簡単さ加減 */}
          <Text style={{ fontFamily: 'NotoSansJP-Bold', fontSize: 16, marginBottom: 8, color: textColor, letterSpacing: 1 }}>簡単さ</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Text style={{ color: '#FF6B35', fontFamily: 'NotoSansJP-Bold', fontSize: 13, width: 36, textAlign: 'right' }}>簡単</Text>
            <Slider
              style={{ flex: 1, height: 32 }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={easyLevel}
              onValueChange={setEasyLevel}
              minimumTrackTintColor="#FF6B35"
              maximumTrackTintColor="#FFD6C2"
              thumbTintColor="#FF6B35"
            />
            <Text style={{ color: '#FF6B35', fontFamily: 'NotoSansJP-Bold', fontSize: 16 }}>{easyLevel}</Text>
            <Text style={{ color: '#FF6B35', fontFamily: 'NotoSansJP-Bold', fontSize: 13, width: 36, textAlign: 'left' }}>本格</Text>
          </View>
          <View style={{ height: 1, backgroundColor: '#FFE0CC', marginVertical: 8, borderRadius: 1 }} />
          {/* 冷蔵庫にあるもので作る */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <Checkbox.Android
              status={fridgeOnly ? 'checked' : 'unchecked'}
              onPress={() => setFridgeOnly(v => !v)}
              color="#FF6B35"
            />
            <Text style={{ color: textColor, fontSize: 15, fontFamily: 'NotoSansJP-Bold' }}>冷蔵庫にあるもので作る</Text>
          </View>
        </View>
      </ScrollView>
      {/* 画面下部に固定の提案ボタン */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, backgroundColor: 'rgba(255,255,255,0.97)', borderTopLeftRadius: 18, borderTopRightRadius: 18, shadowColor: '#FF6B35', shadowOpacity: 0.10, shadowRadius: 8, elevation: 8 }}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity 
            style={{
              backgroundColor: '#FF6B35',
              borderRadius: 22,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              gap: 8,
              shadowColor: '#FF6B35',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.13,
              shadowRadius: 8,
              elevation: 6,
            }}
            onPress={handleGenerate}
            activeOpacity={0.88}
            disabled={isLoading}
          >
            <MaterialCommunityIcons 
              name={isLoading ? "loading" : "magic-staff"} 
              size={22} 
              color="white" 
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'NotoSansJP-Bold', letterSpacing: 1 }}>{isLoading ? '提案中...' : '献立を提案する'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
