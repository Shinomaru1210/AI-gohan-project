import { AppColors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Animated, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 食事タイプの設定
const mealTypeConfig = {
  breakfast: {
    label: '朝ごはん',
    icon: 'weather-sunset',
    color: '#FFC107',
    gradient: ['#FFC107', '#FFD54F'] as [string, string],
  },
  lunch: {
    label: '昼ごはん',
    icon: 'white-balance-sunny',
    color: '#FF6B9D',
    gradient: ['#FF6B9D', '#FF8FA3'] as [string, string],
  },
  dinner: {
    label: '夜ごはん',
    icon: 'weather-night',
    color: '#9C27B0',
    gradient: ['#9C27B0', '#BA68C8'] as [string, string],
  },
};

// 料理の種類
const dishTypes = [
  { id: 'main', label: 'メイン', icon: 'food-steak', color: AppColors.status.success },
  { id: 'side', label: 'サイド', icon: 'food-variant', color: AppColors.status.info },
  { id: 'soup', label: 'スープ', icon: 'food-soup', color: AppColors.status.warning },
  { id: 'dessert', label: 'デザート', icon: 'food-cake', color: AppColors.status.error },
  { id: 'drink', label: 'ドリンク', icon: 'cup-water', color: AppColors.primary },
];

// 食事の種類
const mealCategories = [
  { id: 'home', label: '自炊', icon: 'home', color: AppColors.status.success },
  { id: 'restaurant', label: '外食', icon: 'food-fork-drink', color: AppColors.status.info },
  { id: 'takeout', label: 'テイクアウト', icon: 'food-takeout-box', color: AppColors.status.warning },
];

interface DishItem {
  id: string;
  name: string;
  type: string;
  calories: string;
}

export default function RegisterMealScreen() {
  const { date, type } = useLocalSearchParams<{ date: string; type: string }>();
  const router = useRouter();

  const [dishes, setDishes] = useState<DishItem[]>([]);
  const [memo, setMemo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));
  
  // モーダル関連
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishType, setNewDishType] = useState<string | null>(null);
  const [newDishCalories, setNewDishCalories] = useState('');
  const [editingDishId, setEditingDishId] = useState<string | null>(null);

  const config = mealTypeConfig[type as keyof typeof mealTypeConfig];

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

  const handleAddDish = () => {
    if (!newDishName.trim() || !newDishType) {
      Alert.alert('入力エラー', '料理名と種類を入力してください');
      return;
    }

    if (editingDishId) {
      // 編集モード
      setDishes(prev => prev.map(dish => 
        dish.id === editingDishId 
          ? { ...dish, name: newDishName.trim(), type: newDishType, calories: newDishCalories.trim() }
          : dish
      ));
    } else {
      // 新規追加モード
      const newDish: DishItem = {
        id: Date.now().toString(),
        name: newDishName.trim(),
        type: newDishType,
        calories: newDishCalories.trim(),
      };
      setDishes(prev => [...prev, newDish]);
    }
    
    // モーダルをリセット
    setNewDishName('');
    setNewDishType(null);
    setNewDishCalories('');
    setEditingDishId(null);
    setShowAddDishModal(false);
  };

  const handleRemoveDish = (dishId: string) => {
    setDishes(prev => prev.filter(dish => dish.id !== dishId));
  };

  const handleEditDish = (dish: DishItem) => {
    setNewDishName(dish.name);
    setNewDishType(dish.type);
    setNewDishCalories(dish.calories);
    setShowAddDishModal(true);
    // 編集モードのフラグを設定
    setEditingDishId(dish.id);
  };

  const handleAICalorieEstimate = () => {
    const estimatedCalories = Math.floor(Math.random() * 300) + 200;
    setNewDishCalories(estimatedCalories.toString());
    Alert.alert('AI推定完了', `${estimatedCalories}kcalと推定しました`);
  };

  const handleSave = () => {
    // バリデーション
    if (dishes.length === 0) {
      Alert.alert('入力エラー', '料理を1つ以上追加してください');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('入力エラー', '食事の種類を選択してください');
      return;
    }

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

    // 保存処理
    const totalCalories = dishes.reduce((sum, dish) => {
      return sum + (parseInt(dish.calories) || 0);
    }, 0);

    const mealData = {
      date,
      type,
      dishes,
      totalCalories,
      memo: memo.trim(),
      category: selectedCategory,
      image,
    };

    console.log('保存する食事データ:', mealData);
    
    // 成功メッセージ
    Alert.alert('保存完了', '食事記録を保存しました', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const getDishTypeInfo = (typeId: string) => {
    return dishTypes.find(type => type.id === typeId);
  };

  useEffect(() => {
    if (!date || !type) {
      Alert.alert('エラー', 'パラメータが不足しています');
      router.back();
    }
  }, [date, type, router]);

  if (!config) {
    return null;
  }

  const totalCalories = dishes.reduce((sum, dish) => {
    return sum + (parseInt(dish.calories) || 0);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <LinearGradient
        colors={config.gradient}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={config.icon as any}
              size={24}
              color="white"
            />
          </View>
          <Text style={styles.title}>{config.label}の記録</Text>
        </View>
        <View style={{ width: 48 }} />
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 日付表示 */}
        <View style={styles.dateCard}>
          <MaterialCommunityIcons name="calendar" size={20} color={config.color} />
          <Text style={styles.dateText}>
            {date ? dayjs(date).format('YYYY年M月D日') : ''}
          </Text>
        </View>

        {/* 料理リスト */}
        <View style={styles.inputSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>料理 *</Text>
            <TouchableOpacity
              style={styles.addDishButton}
              onPress={() => setShowAddDishModal(true)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="plus" size={20} color="white" />
              <Text style={styles.addDishButtonText}>追加</Text>
            </TouchableOpacity>
          </View>
          
          {dishes.length === 0 ? (
            <View style={styles.emptyDishes}>
              <MaterialCommunityIcons name="food-off" size={48} color={AppColors.text.light} />
              <Text style={styles.emptyDishesText}>料理を追加してください</Text>
            </View>
          ) : (
            <View style={styles.dishesList}>
                             {dishes.map((dish) => {
                 const dishTypeInfo = getDishTypeInfo(dish.type);
                 return (
                   <View key={dish.id} style={styles.dishCard}>
                     <View style={styles.dishInfo}>
                       <View style={styles.dishHeader}>
                         <View style={[styles.dishTypeBadge, { backgroundColor: dishTypeInfo?.color + '20' }]}>
                           <MaterialCommunityIcons
                             name={dishTypeInfo?.icon as any}
                             size={16}
                             color={dishTypeInfo?.color}
                           />
                           <Text style={[styles.dishTypeText, { color: dishTypeInfo?.color }]}>
                             {dishTypeInfo?.label}
                           </Text>
                         </View>
                         <View style={styles.dishActions}>
                           <TouchableOpacity
                             style={styles.editDishButton}
                             onPress={() => handleEditDish(dish)}
                             activeOpacity={0.8}
                           >
                             <MaterialCommunityIcons name="pencil" size={18} color={AppColors.primary} />
                           </TouchableOpacity>
                           <TouchableOpacity
                             style={styles.removeDishButton}
                             onPress={() => handleRemoveDish(dish.id)}
                             activeOpacity={0.8}
                           >
                             <MaterialCommunityIcons name="close" size={18} color={AppColors.status.error} />
                           </TouchableOpacity>
                         </View>
                       </View>
                       <View style={styles.dishDetails}>
                         <Text style={styles.dishName}>{dish.name}</Text>
                         {dish.calories && (
                           <Text style={styles.dishCalories}>{dish.calories}kcal</Text>
                         )}
                       </View>
                     </View>
                   </View>
                 );
               })}
              
              {/* 合計カロリー */}
              {dishes.length > 0 && (
                <View style={styles.totalCaloriesCard}>
                  <Text style={styles.totalCaloriesLabel}>合計カロリー</Text>
                  <Text style={styles.totalCaloriesValue}>{totalCalories}kcal</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* 食事の種類選択 */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>食事の種類 *</Text>
          <View style={styles.categoryContainer}>
            {mealCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={selectedCategory === category.id 
                    ? [category.color + '20', category.color + '10'] as [string, string]
                    : [AppColors.surface, AppColors.surface] as [string, string]
                  }
                  style={styles.categoryGradient}
                >
                  <MaterialCommunityIcons
                    name={category.icon as any}
                    size={24}
                    color={selectedCategory === category.id ? category.color : AppColors.text.secondary}
                  />
                  <Text style={[
                    styles.categoryText,
                    { color: selectedCategory === category.id ? category.color : AppColors.text.secondary }
                  ]}>
                    {category.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* メモ */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>メモ</Text>
          <TextInput
            style={[styles.textInput, styles.memoInput]}
            value={memo}
            onChangeText={setMemo}
            placeholder="感想やメモがあれば記録してください"
            placeholderTextColor={AppColors.text.light}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* 写真追加 */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>写真</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={pickImage}
            activeOpacity={0.8}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <MaterialCommunityIcons name="camera-plus" size={32} color={AppColors.text.light} />
                <Text style={styles.imagePlaceholderText}>写真を追加</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 保存ボタン */}
      <Animated.View style={[styles.saveButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            (dishes.length === 0 || !selectedCategory) && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={dishes.length === 0 || !selectedCategory}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={config.gradient}
            style={styles.saveButtonGradient}
          >
            <MaterialCommunityIcons name="content-save" size={20} color="white" />
            <Text style={styles.saveButtonText}>保存する</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* 料理追加モーダル */}
      <Modal
        visible={showAddDishModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* モーダルヘッダー */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowAddDishModal(false)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="close" size={24} color={AppColors.text.primary} />
            </TouchableOpacity>
                         <Text style={styles.modalTitle}>{editingDishId ? '料理を編集' : '料理を追加'}</Text>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={handleAddDish}
              activeOpacity={0.8}
            >
                             <Text style={[styles.modalSaveButtonText, { color: config.color }]}>{editingDishId ? '更新' : '追加'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* 料理名 */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>料理名 *</Text>
              <TextInput
                style={styles.modalTextInput}
                value={newDishName}
                onChangeText={setNewDishName}
                placeholder="例：カレーライス"
                placeholderTextColor={AppColors.text.light}
              />
            </View>

            {/* 料理の種類 */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>種類 *</Text>
              <View style={styles.dishTypeContainer}>
                {dishTypes.map((dishType) => (
                  <TouchableOpacity
                    key={dishType.id}
                    style={[
                      styles.dishTypeCard,
                      newDishType === dishType.id && styles.dishTypeCardSelected
                    ]}
                    onPress={() => setNewDishType(dishType.id)}
                    activeOpacity={0.8}
                  >
                    <MaterialCommunityIcons
                      name={dishType.icon as any}
                      size={24}
                      color={newDishType === dishType.id ? dishType.color : AppColors.text.secondary}
                    />
                    <Text style={[
                      styles.dishTypeCardText,
                      { color: newDishType === dishType.id ? dishType.color : AppColors.text.secondary }
                    ]}>
                      {dishType.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* カロリー */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>カロリー</Text>
              <View style={styles.modalCalorieContainer}>
                <TextInput
                  style={[styles.modalTextInput, { flex: 1 }]}
                  keyboardType="numeric"
                  value={newDishCalories}
                  onChangeText={setNewDishCalories}
                  placeholder="例：450"
                  placeholderTextColor={AppColors.text.light}
                />
                <Text style={styles.modalCalorieUnit}>kcal</Text>
                <TouchableOpacity
                  style={styles.modalAiButton}
                  onPress={handleAICalorieEstimate}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons name="robot" size={18} color="white" />
                  <Text style={styles.modalAiButtonText}>AI推定</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'NotoSansJP-Bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: AppColors.surface,
    marginBottom: 20,
    gap: 12,
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Regular',
  },
  inputSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
  },
  addDishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  addDishButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
  },
  emptyDishes: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: AppColors.shadow.light,
  },
  emptyDishesText: {
    fontSize: 16,
    color: AppColors.text.light,
    fontFamily: 'NotoSansJP-Regular',
    marginTop: 8,
  },
  dishesList: {
    gap: 12,
  },
  dishCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dishInfo: {
    flex: 1,
  },
  dishHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dishTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  dishTypeText: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Medium',
  },
  dishActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editDishButton: {
    padding: 4,
  },
  removeDishButton: {
    padding: 4,
  },
  dishDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
    flex: 1,
  },
  dishCalories: {
    fontSize: 14,
    color: AppColors.text.secondary,
    fontFamily: 'NotoSansJP-Regular',
  },
  totalCaloriesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.primary + '10',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: AppColors.primary + '20',
  },
  totalCaloriesLabel: {
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
  },
  totalCaloriesValue: {
    fontSize: 18,
    color: AppColors.primary,
    fontFamily: 'NotoSansJP-Bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCardSelected: {
    shadowColor: AppColors.shadow.primary,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  categoryGradient: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Medium',
  },
  textInput: {
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Regular',
    borderWidth: 1,
    borderColor: AppColors.shadow.light,
  },
  memoInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: AppColors.shadow.light,
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
    color: AppColors.text.light,
    fontFamily: 'NotoSansJP-Regular',
  },
  imagePreview: {
    width: '100%',
    height: 200,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: AppColors.background,
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  // モーダル関連のスタイル
  modalContainer: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.shadow.light,
  },
  modalCloseButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
  },
  modalSaveButton: {
    padding: 8,
  },
  modalSaveButtonText: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Bold',
    marginBottom: 12,
  },
  modalTextInput: {
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: AppColors.text.primary,
    fontFamily: 'NotoSansJP-Regular',
    borderWidth: 1,
    borderColor: AppColors.shadow.light,
  },
  dishTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dishTypeCard: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dishTypeCardSelected: {
    shadowColor: AppColors.shadow.primary,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  dishTypeCardText: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Medium',
    marginTop: 4,
  },
  modalCalorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalCalorieUnit: {
    fontSize: 16,
    color: AppColors.text.secondary,
    fontFamily: 'NotoSansJP-Regular',
  },
  modalAiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  modalAiButtonText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'NotoSansJP-Bold',
  },
});
