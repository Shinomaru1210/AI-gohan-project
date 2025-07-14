import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, TextInput as RNTextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, IconButton, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Item = {
  id: string;
  name: string;
  checked: boolean;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  amount?: string;
  memo?: string;
};

export default function BuyListScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: '牛乳', checked: false, category: '乳製品', priority: 'high', amount: '2本', memo: '' },
    { id: '2', name: '卵', checked: false, category: '乳製品', priority: 'medium', amount: '10個', memo: '' },
    { id: '3', name: 'にんじん', checked: true, category: '野菜', priority: 'low', amount: '3本', memo: '' },
    { id: '4', name: '豚肉', checked: false, category: '肉類', priority: 'high', amount: '200g', memo: '' },
    { id: '5', name: '米', checked: false, category: '主食', priority: 'medium', amount: '5kg', memo: '' },
  ]);
  const [scaleAnim] = useState(new Animated.Value(1));

  // テーマカラーの取得
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = '#6C757D';

  const categoryColors = {
    '野菜': '#4CAF50',
    '肉類': '#F44336',
    '乳製品': '#616161',
    '調味料': '#FF9800',
    '主食': '#9C27B0',
    'その他': '#607D8B',
  };

  const priorityColors = {
    'high': '#E74C3C',
    'medium': '#F39C12',
    'low': '#27AE60',
  };

  const toggleCheck = (id: string) => {
    setItems(prev =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAdd = () => {
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

    const newItem = { 
      id: Date.now().toString(),
      name: `新しい食材 ${items.length + 1}`, 
      checked: false,
      category: 'その他',
      priority: 'medium' as const,
      amount: '',
      memo: '',
    };
    setItems(prev => [...prev, newItem]);
    setTimeout(() => {
      router.push({ pathname: `/buy_list/edit`, params: { id: newItem.id } } as any);
    }, 100);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '野菜': return 'food-apple';
      case '肉類': return 'food-steak';
      case '乳製品': return 'food-variant';
      case '調味料': return 'bottle-tonic';
      case '主食': return 'rice';
      default: return 'food';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return 'flag';
      case 'medium': return 'flag-outline';
      case 'low': return 'flag-variant-outline';
      default: return 'flag-outline';
    }
  };

  const renderItem = ({ item }: { item: Item }) => {
    const categoryColor = categoryColors[item.category as keyof typeof categoryColors] || '#607D8B';
    const priorityColor = priorityColors[item.priority as keyof typeof priorityColors] || '#F39C12';

    return (
      <Surface style={[styles.itemCard, { backgroundColor: '#FFFFFF', borderColor: '#E9ECEF', marginVertical: 4, borderRadius: 14, elevation: 1 }]} elevation={1}>
        <TouchableOpacity
          style={[styles.itemContent, { borderRadius: 14 }]}
          onPress={() => toggleCheck(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.itemLeft}>
            <View style={styles.checkboxContainer}>
              <MaterialCommunityIcons
                name={item.checked ? 'check-circle' : 'circle-outline'}
                size={24}
                color={item.checked ? '#2ECC71' : textSecondaryColor}
              />
            </View>
            <View style={styles.itemInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <Text style={[styles.itemName, { color: textColor, flexShrink: 1 }]} numberOfLines={1}>{item.name}</Text>
                {item.amount ? (
                  <Text style={{ color: '#222', fontSize: 14, marginLeft: 8, textAlign: 'right', minWidth: 48 }}>{item.amount}</Text>
                ) : <View style={{ minWidth: 48 }} />}
              </View>
              <View style={styles.itemMeta}>
                <Chip 
                  style={[styles.categoryChip, { backgroundColor: categoryColor + '15' }]}
                  textStyle={{ color: categoryColor, fontSize: 11 }}
                  compact
                >
                  {item.category}
                </Chip>
                <View style={styles.priorityContainer}>
                  <MaterialCommunityIcons
                    name={getPriorityIcon(item.priority || 'medium')}
                    size={12}
                    color={priorityColor}
                  />
                </View>
              </View>
              {/* メモ欄 */}
              <RNTextInput
                value={item.memo}
                onChangeText={text => setItems(prev => prev.map(i => i.id === item.id ? { ...i, memo: text } : i))}
                placeholder="メモ"
                style={{ fontSize: 13, color: '#888', backgroundColor: '#F8F9FA', borderRadius: 8, paddingHorizontal: 8, marginTop: 4, height: 40 }}
                placeholderTextColor="#B0BEC5"
              />
            </View>
          </View>
          <IconButton
            icon="delete-outline"
            size={20}
            onPress={() => handleDelete(item.id)}
            iconColor={textSecondaryColor}
          />
        </TouchableOpacity>
      </Surface>
    );
  };

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  // カテゴリごとにグループ化
  const categories = ['野菜', '肉類', '乳製品', '主食', '調味料', 'その他'] as const;
  const grouped = categories.map(cat => ({
    label: cat,
    items: items.filter(i => i.category === cat && !i.checked),
    checked: items.filter(i => i.category === cat && i.checked),
  }));

  const categoryMeta = {
    '野菜': { color: '#4CAF50', icon: 'food-apple' },
    '肉類': { color: '#F44336', icon: 'food-steak' },
    '乳製品': { color: '#616161', icon: 'food-variant' },
    '主食': { color: '#9C27B0', icon: 'rice' },
    '調味料': { color: '#FF9800', icon: 'bottle-tonic' },
    'その他': { color: '#607D8B', icon: 'food' },
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}> 
      <View style={[styles.header, { alignItems: 'center' }] }>
        <Text style={[styles.title, { color: textColor, textAlign: 'center', letterSpacing: 2 }]}>SHOPPING</Text>
        <Text style={[styles.subtitle, { color: textSecondaryColor, textAlign: 'center', marginTop: 2 }]}>{checkedCount}/{totalCount} 完了</Text>
      </View>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {grouped.map(section => (
          <View key={section.label} style={{ marginBottom: 28 }}>
            {/* セクションタイトル */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{ backgroundColor: categoryMeta[section.label].color, borderRadius: 16, padding: 6, marginRight: 8 }}>
                <MaterialCommunityIcons name={categoryMeta[section.label].icon as any} size={20} color="#fff" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: categoryMeta[section.label].color }}>{section.label}</Text>
            </View>
            {/* セクション全体をカード風に */}
            <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2, minHeight: 80 }}>
              {section.items.length === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 24 }}>
                  <MaterialCommunityIcons name="emoticon-sad-outline" size={32} color="#B0BEC5" style={{ marginBottom: 6 }} />
                  <Text style={{ color: '#B0BEC5', fontSize: 15 }}>買うものがありません</Text>
                </View>
              ) : (
                section.items.map(item => (
                  <View key={item.id} style={{ marginBottom: 10 }}>
                    {renderItem({ item })}
                  </View>
                ))
              )}
            </View>
            {/* チェック済み */}
            {section.checked.length > 0 && (
              <View style={{ marginTop: 10, backgroundColor: '#F5F5F5', borderRadius: 12, padding: 8 }}>
                <Text style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>完了</Text>
                {section.checked.map(item => (
                  <View key={item.id} style={{ marginBottom: 8 }}>
                    {renderItem({ item })}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], marginTop: 8 }}>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: '#FF6B35', borderRadius: 16 }]} 
          onPress={handleAdd}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text style={styles.addButtonText}>食材を追加</Text>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemChecked: {
    textDecorationLine: 'line-through',
    color: '#B0BEC5',
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryChip: {
    borderRadius: 8,
  },
  priorityContainer: {
    marginLeft: 8,
  },
  separator: {
    height: 8,
  },
  addButton: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 