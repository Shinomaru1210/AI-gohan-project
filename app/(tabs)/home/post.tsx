import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface DishItem {
  id: string;
  name: string;
  type: string;
  calories: string;
}

const mealTypeConfig = {
  breakfast: { label: '朝食', color: '#FFC107', gradient: ['#FFC107', '#FFD54F'] },
  lunch: { label: '昼食', color: '#FF6B9D', gradient: ['#FF6B9D', '#FF8A80'] },
  dinner: { label: '夕食', color: '#9C27B0', gradient: ['#9C27B0', '#BA68C8'] },
};

const dishTypes = [
  { id: 'main', label: 'メイン', icon: 'food-steak' },
  { id: 'side', label: 'サイド', icon: 'food-variant' },
  { id: 'soup', label: 'スープ', icon: 'bowl-mix' },
  { id: 'dessert', label: 'デザート', icon: 'cake-variant' },
  { id: 'drink', label: 'ドリンク', icon: 'cup-water' },
];

const popularTags = [
  'ヘルシー', '簡単', '本格', 'インスタ映え', '時短', '節約', 
  '和食', '洋食', '中華', 'イタリアン', '韓国料理', 'エスニック',
  'ベジタリアン', 'グルテンフリー', '低糖質', '高タンパク'
];

export default function PostScreen() {
  const router = useRouter();
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('lunch');
  const [dishes, setDishes] = useState<DishItem[]>([]);
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishType, setNewDishType] = useState('main');
  const [newDishCalories, setNewDishCalories] = useState('');
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [memo, setMemo] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAddDish = () => {
    if (!newDishName.trim()) {
      Alert.alert('エラー', '料理名を入力してください');
      return;
    }

    if (editingDishId) {
      // 編集モード
      setDishes(prev => prev.map(dish => 
        dish.id === editingDishId 
          ? { ...dish, name: newDishName, type: newDishType, calories: newDishCalories }
          : dish
      ));
      setEditingDishId(null);
    } else {
      // 新規追加モード
      const newDish: DishItem = {
        id: Date.now().toString(),
        name: newDishName,
        type: newDishType,
        calories: newDishCalories,
      };
      setDishes(prev => [...prev, newDish]);
    }

    setNewDishName('');
    setNewDishType('main');
    setNewDishCalories('');
    setShowAddDishModal(false);
  };

  const handleEditDish = (dish: DishItem) => {
    setNewDishName(dish.name);
    setNewDishType(dish.type);
    setNewDishCalories(dish.calories);
    setEditingDishId(dish.id);
    setShowAddDishModal(true);
  };

  const handleRemoveDish = (dishId: string) => {
    setDishes(prev => prev.filter(dish => dish.id !== dishId));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('カメラの権限が必要です');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (dishes.length === 0) {
      Alert.alert('エラー', '料理を追加してください');
      return;
    }

    // 投稿処理（ここでAPIを呼び出すなど）
    Alert.alert(
      '投稿完了',
      'あなたのごはんが投稿されました！',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>投稿</Text>
        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePost}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FF6B35', '#FF8A65']}
            style={styles.postButtonGradient}
          >
            <Text style={styles.postButtonText}>投稿</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 食事タイプ選択 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>食事タイプ</Text>
          <View style={styles.mealTypeContainer}>
            {Object.entries(mealTypeConfig).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.mealTypeCard,
                  selectedMealType === key && styles.mealTypeCardSelected
                ]}
                onPress={() => setSelectedMealType(key as any)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={selectedMealType === key ? config.gradient : ['#F8F9FA', '#F8F9FA']}
                  style={styles.mealTypeGradient}
                >
                  <Text style={[
                    styles.mealTypeText,
                    selectedMealType === key && styles.mealTypeTextSelected
                  ]}>
                    {config.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 写真撮影 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>写真</Text>
          <View style={styles.photoSection}>
            {selectedImage ? (
              <View style={styles.selectedImageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <MaterialCommunityIcons name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.photoButtons}>
                <TouchableOpacity style={styles.photoButton} onPress={takePhoto} activeOpacity={0.8}>
                  <MaterialCommunityIcons name="camera" size={32} color="#FF6B35" />
                  <Text style={styles.photoButtonText}>写真を撮る</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.photoButton} onPress={pickImage} activeOpacity={0.8}>
                  <MaterialCommunityIcons name="image" size={32} color="#FF6B35" />
                  <Text style={styles.photoButtonText}>写真を選択</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* 料理追加 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>料理</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddDishModal(true)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="plus" size={20} color="white" />
              <Text style={styles.addButtonText}>追加</Text>
            </TouchableOpacity>
          </View>
          
          {dishes.length === 0 ? (
            <View style={styles.emptyDishes}>
              <MaterialCommunityIcons name="food" size={48} color="#B0BEC5" />
              <Text style={styles.emptyDishesText}>料理を追加してください</Text>
            </View>
          ) : (
            <View style={styles.dishesContainer}>
              {dishes.map(dish => (
                <View key={dish.id} style={styles.dishCard}>
                  <View style={styles.dishInfo}>
                    <Text style={styles.dishName}>{dish.name}</Text>
                    <Text style={styles.dishType}>
                      {dishTypes.find(type => type.id === dish.type)?.label}
                      {dish.calories && ` • ${dish.calories}kcal`}
                    </Text>
                  </View>
                  <View style={styles.dishActions}>
                    <TouchableOpacity
                      style={styles.editDishButton}
                      onPress={() => handleEditDish(dish)}
                    >
                      <MaterialCommunityIcons name="pencil" size={16} color="#FF6B35" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeDishButton}
                      onPress={() => handleRemoveDish(dish.id)}
                    >
                      <MaterialCommunityIcons name="delete" size={16} color="#E74C3C" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* タグ選択 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>タグ</Text>
          <View style={styles.tagsContainer}>
            {popularTags.map(tag => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.tagSelected
                ]}
                onPress={() => toggleTag(tag)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextSelected
                ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* メモ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>メモ</Text>
          <TextInput
            style={styles.memoInput}
            value={memo}
            onChangeText={setMemo}
            placeholder="料理についてのメモを書いてください..."
            placeholderTextColor="#B0BEC5"
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      {/* 料理追加モーダル */}
      {showAddDishModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingDishId ? '料理を編集' : '料理を追加'}
              </Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => {
                  setShowAddDishModal(false);
                  setEditingDishId(null);
                  setNewDishName('');
                  setNewDishType('main');
                  setNewDishCalories('');
                }}
              >
                <MaterialCommunityIcons name="close" size={24} color="#2C3E50" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>料理名</Text>
                <TextInput
                  style={styles.textInput}
                  value={newDishName}
                  onChangeText={setNewDishName}
                  placeholder="料理名を入力"
                  placeholderTextColor="#B0BEC5"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>種類</Text>
                <View style={styles.dishTypeButtons}>
                  {dishTypes.map(type => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.dishTypeButton,
                        newDishType === type.id && styles.dishTypeButtonSelected
                      ]}
                      onPress={() => setNewDishType(type.id)}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons 
                        name={type.icon as any} 
                        size={16} 
                        color={newDishType === type.id ? 'white' : '#7F8C8D'} 
                      />
                      <Text style={[
                        styles.dishTypeButtonText,
                        newDishType === type.id && styles.dishTypeButtonTextSelected
                      ]}>
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>カロリー（任意）</Text>
                <TextInput
                  style={styles.textInput}
                  value={newDishCalories}
                  onChangeText={setNewDishCalories}
                  placeholder="例: 300"
                  placeholderTextColor="#B0BEC5"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowAddDishModal(false);
                  setEditingDishId(null);
                  setNewDishName('');
                  setNewDishType('main');
                  setNewDishCalories('');
                }}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addDishButton}
                onPress={handleAddDish}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FF6B35', '#FF8A65']}
                  style={styles.addDishButtonGradient}
                >
                  <Text style={styles.addDishButtonText}>
                    {editingDishId ? '更新' : '追加'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
    color: '#2C3E50',
  },
  postButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  postButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  postButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  mealTypeCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mealTypeCardSelected: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mealTypeGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  mealTypeText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
    color: '#7F8C8D',
  },
  mealTypeTextSelected: {
    color: 'white',
  },
  photoSection: {
    alignItems: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  photoButton: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    minWidth: 120,
  },
  photoButtonText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'NotoSansJP-Medium',
    color: '#7F8C8D',
  },
  selectedImageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'NotoSansJP-Bold',
  },
  emptyDishes: {
    alignItems: 'center',
    padding: 40,
  },
  emptyDishesText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#B0BEC5',
  },
  dishesContainer: {
    gap: 12,
  },
  dishCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontFamily: 'NotoSansJP-Bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  dishType: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Regular',
    color: '#7F8C8D',
  },
  dishActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editDishButton: {
    padding: 8,
    backgroundColor: '#FFF5F0',
    borderRadius: 8,
  },
  removeDishButton: {
    padding: 8,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tagSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Medium',
    color: '#7F8C8D',
  },
  tagTextSelected: {
    color: 'white',
  },
  memoInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#2C3E50',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansJP-Bold',
    color: '#2C3E50',
  },
  closeModalButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    fontFamily: 'NotoSansJP-Regular',
    color: '#2C3E50',
  },
  dishTypeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dishTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 4,
  },
  dishTypeButtonSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  dishTypeButtonText: {
    fontSize: 12,
    fontFamily: 'NotoSansJP-Medium',
    color: '#7F8C8D',
  },
  dishTypeButtonTextSelected: {
    color: 'white',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
    color: '#7F8C8D',
  },
  addDishButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  addDishButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  addDishButtonText: {
    fontSize: 14,
    fontFamily: 'NotoSansJP-Bold',
    color: 'white',
  },
});

