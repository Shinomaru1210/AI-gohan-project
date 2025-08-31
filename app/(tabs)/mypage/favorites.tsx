import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ダミーデータ
const dummyFavorites = [
  {
    id: '1',
    name: 'カレーライス',
    image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=カレー',
    category: 'メイン料理',
    date: '2024-01-15',
    likes: 24,
  },
  {
    id: '2',
    name: 'オムライス',
    image: 'https://via.placeholder.com/300x200/FFC107/FFFFFF?text=オムライス',
    category: 'メイン料理',
    date: '2024-01-14',
    likes: 18,
  },
  {
    id: '3',
    name: '味噌汁',
    image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=味噌汁',
    category: 'スープ',
    date: '2024-01-13',
    likes: 12,
  },
  {
    id: '4',
    name: 'サラダ',
    image: 'https://via.placeholder.com/300x200/8BC34A/FFFFFF?text=サラダ',
    category: '副菜',
    date: '2024-01-12',
    likes: 8,
  },
];

const categories = ['すべて', 'メイン料理', '副菜', 'スープ', 'デザート'];

export default function FavoritesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('すべて');

  const filteredFavorites = dummyFavorites.filter(favorite => {
    const matchesSearch = favorite.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'すべて' || favorite.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBack = () => {
    router.back();
  };

  const handleFavoritePress = (favorite: any) => {
    console.log('お気に入りをタップ:', favorite);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <LinearGradient
        colors={['#FFF8F2', '#FFE8D6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FF9800" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>お気に入りのごはん</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* 検索バー */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color="#7F8C8D" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="料理名で検索"
              placeholderTextColor="#B0BEC5"
            />
          </View>
        </View>

        {/* カテゴリフィルター */}
        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipSelected
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextSelected
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* お気に入り一覧 */}
        <View style={styles.favoritesSection}>
          <Text style={styles.sectionTitle}>
            {filteredFavorites.length}件のお気に入り
          </Text>
          
          <View style={styles.favoritesGrid}>
            {filteredFavorites.map((favorite) => (
              <TouchableOpacity
                key={favorite.id}
                style={styles.favoriteCard}
                onPress={() => handleFavoritePress(favorite)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: favorite.image }} style={styles.favoriteImage} />
                <View style={styles.favoriteContent}>
                  <Text style={styles.favoriteName}>{favorite.name}</Text>
                  <Text style={styles.favoriteCategory}>{favorite.category}</Text>
                  <View style={styles.favoriteFooter}>
                    <Text style={styles.favoriteDate}>{favorite.date}</Text>
                    <View style={styles.likeContainer}>
                      <MaterialCommunityIcons name="heart" size={16} color="#E74C3C" />
                      <Text style={styles.likeCount}>{favorite.likes}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredFavorites.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="heart-outline" size={64} color="#B0BEC5" />
              <Text style={styles.emptyStateText}>お気に入りの料理がありません</Text>
              <Text style={styles.emptyStateSubtext}>
                料理をお気に入りに登録すると、ここに表示されます
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Bold',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'NotoSansJP-Regular',
  },
  categorySection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryChipSelected: {
    backgroundColor: '#FF6B35',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontFamily: 'NotoSansJP-Regular',
  },
  categoryChipTextSelected: {
    color: '#fff',
    fontFamily: 'NotoSansJP-Bold',
  },
  favoritesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 16,
    fontFamily: 'NotoSansJP-Bold',
  },
  favoritesGrid: {
    gap: 16,
  },
  favoriteCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  favoriteImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  favoriteContent: {
    padding: 16,
  },
  favoriteName: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 4,
    fontFamily: 'NotoSansJP-Bold',
  },
  favoriteCategory: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
    fontFamily: 'NotoSansJP-Regular',
  },
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteDate: {
    fontSize: 12,
    color: '#B0BEC5',
    fontFamily: 'NotoSansJP-Regular',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 12,
    color: '#E74C3C',
    marginLeft: 4,
    fontFamily: 'NotoSansJP-Regular',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#7F8C8D',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'NotoSansJP-Bold',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#B0BEC5',
    textAlign: 'center',
    fontFamily: 'NotoSansJP-Regular',
  },
});

