import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Animated, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Surface,
  Text,
  TextInput
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const mealTypes = [
  { id: 'home', label: '自炊', icon: 'home', color: '#4CAF50' },
  { id: 'restaurant', label: '外食', icon: 'food-fork-drink', color: '#2196F3' },
  { id: 'takeout', label: 'テイクアウト', icon: 'food-takeout-box', color: '#FF9800' },
];

const mealTypeToIcon = {
  '朝ごはん': 'weather-sunset',
  '昼ごはん': 'white-balance-sunny',
  '夜ごはん': 'weather-night',
};

const mealTypeToColor = {
  '朝ごはん': '#FFB74D',
  '昼ごはん': '#4FC3F7',
  '夜ごはん': '#9575CD',
};

export default function RegisterMealScreen() {
  const { date, type } = useLocalSearchParams<{ date: string; type: string }>();
  const router = useRouter();

  const [itemInput, setItemInput] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [selectedKind, setSelectedKind] = useState<string | null>(null);
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  // テーマカラーの取得
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = '#6C757D';

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('許可が必要です', '写真ライブラリへのアクセスを許可してください');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // ボタンアニメーション
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

    console.log({ date, type, items, selectedKind, calories, image });
    router.back();
  };

  const handleAddItem = () => {
    if (itemInput.trim() !== '') {
      setItems(prev => [...prev, itemInput.trim()]);
      setItemInput('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!date || !type) {
      Alert.alert('エラー', 'パラメータが不足しています');
      router.back();
    }
  }, [date, type, router]);

  const iconColor = mealTypeToColor[type as keyof typeof mealTypeToColor] || '#FF6B35';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}> 
      {/* ヘッダー（ボックスなし） */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={iconColor} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}> 
            <MaterialCommunityIcons
              name={mealTypeToIcon[type as keyof typeof mealTypeToIcon] as any}
              size={24}
              color={iconColor}
            />
          </View>
          <Text style={[styles.title, { color: textColor, fontFamily: 'NotoSansJP-Bold' }]}>{type} の記録</Text>
        </View>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 日付表示 */}
        <Surface style={[styles.dateCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={1}>
          <MaterialCommunityIcons name="calendar" size={20} color={iconColor} />
          <Text style={[styles.dateText, { color: textColor, fontFamily: 'NotoSansJP-Regular' }]}>
            {date ? dayjs(date).format('YYYY年M月D日') : ''}
          </Text>
        </Surface>

        {/* 食事内容入力（1品ずつ追加） */}
        <Surface style={[styles.inputCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={1}>
          <Text style={[styles.sectionTitle, { color: textColor, fontFamily: 'NotoSansJP-Bold' }]}>食べたもの</Text>
          <View style={styles.addRow}>
            <TextInput
              mode="outlined"
              value={itemInput}
              onChangeText={setItemInput}
              placeholder="例：味噌汁"
              style={[styles.textInput, { flex: 1, fontFamily: 'NotoSansJP-Regular' }]}
              outlineColor="#E9ECEF"
              activeOutlineColor={iconColor}
              onSubmitEditing={handleAddItem}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: iconColor, opacity: itemInput.trim() ? 1 : 0.5 }]}
              onPress={handleAddItem}
              disabled={!itemInput.trim()}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {items.length > 0 && (
            <View style={styles.itemList}>
              {items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Text style={[styles.itemText, { color: textColor, fontFamily: 'NotoSansJP-Regular' }]}>{item}</Text>
                  <TouchableOpacity onPress={() => handleRemoveItem(idx)} style={styles.removeButton}>
                    <MaterialCommunityIcons name="close" size={18} color="#E74C3C" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Surface>

        {/* 分類選択 */}
        <Surface style={[styles.inputCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={1}>
          <Text style={[styles.sectionTitle, { color: textColor, fontFamily: 'NotoSansJP-Bold' }]}>分類</Text>
          <View style={styles.chipRow}>
            {mealTypes.map((mealType) => (
              <TouchableOpacity
                key={mealType.id}
                style={[
                  styles.chip,
                  { backgroundColor: selectedKind === mealType.id ? mealType.color + '20' : '#F8F9FA' },
                  selectedKind === mealType.id && { borderColor: mealType.color }
                ]}
                onPress={() => setSelectedKind(mealType.id)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={mealType.icon as any}
                  size={16}
                  color={selectedKind === mealType.id ? mealType.color : textSecondaryColor}
                />
                <Text style={[
                  styles.chipText,
                  { color: selectedKind === mealType.id ? mealType.color : textColor, fontFamily: 'NotoSansJP-Regular' }
                ]}>
                  {mealType.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Surface>

        {/* カロリー入力 */}
        <Surface style={[styles.inputCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={1}>
          <Text style={[styles.sectionTitle, { color: textColor, fontFamily: 'NotoSansJP-Bold' }]}>カロリー</Text>
          <View style={styles.calorieInput}>
            <TextInput
              mode="outlined"
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
              placeholder="例：450"
              style={styles.textInput}
              outlineColor="#E9ECEF"
              activeOutlineColor={iconColor}
            />
            <Text style={[styles.calorieUnit, { color: textSecondaryColor, fontFamily: 'NotoSansJP-Regular' }]}>kcal</Text>
            <TouchableOpacity
              style={{ marginLeft: 8, backgroundColor: iconColor, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 }}
              onPress={() => setCalories('350')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="robot" size={18} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 13, marginLeft: 4, fontFamily: 'NotoSansJP-Bold' }}>AIカロリー推定</Text>
            </TouchableOpacity>
          </View>
        </Surface>

        {/* 写真追加 */}
        <Surface style={[styles.inputCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF' }]} elevation={1}>
          <Text style={[styles.sectionTitle, { color: textColor, fontFamily: 'NotoSansJP-Bold' }]}>写真</Text>
          <TouchableOpacity
            style={[styles.imageButton, { borderColor: '#E9ECEF' }]}
            onPress={pickImage}
            activeOpacity={0.7}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <MaterialCommunityIcons name="camera-plus" size={32} color={textSecondaryColor} />
                <Text style={[styles.imagePlaceholderText, { color: textSecondaryColor, fontFamily: 'NotoSansJP-Regular' }]}>
                  写真を追加
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </Surface>
      </ScrollView>

      {/* 保存ボタン */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: iconColor },
            (items.length === 0 || !selectedKind) && { opacity: 0.5 }
          ]}
          onPress={handleSave}
          disabled={items.length === 0 || !selectedKind}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="content-save" size={20} color="white" />
          <Text style={[styles.saveButtonText, { fontFamily: 'NotoSansJP-Bold' }]}>保存する</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
  },
  dateText: {
    fontSize: 16,
  },
  inputCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 8,
  },
  chipText: {
    fontSize: 14,
  },
  calorieInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  calorieUnit: {
    fontSize: 16,
  },
  imageButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  imagePlaceholderText: {
    fontSize: 14,
  },
  imagePreview: {
    width: '100%',
    height: 200,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemList: {
    gap: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 15,
  },
  removeButton: {
    marginLeft: 8,
    padding: 4,
  },
});
