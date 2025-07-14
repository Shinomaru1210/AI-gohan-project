import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  onDateSelect: (dateStr: string) => void;
};

const { width } = Dimensions.get('window');

const DateSelector: React.FC<Props> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'));
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // テーマカラーの取得
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = '#6C757D';

  // 週の日付を生成
  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(currentWeek.add(i, 'day').format('YYYY-MM-DD'));
    }
    return dates;
  };

  const dates = getWeekDates();

  useEffect(() => {
    onDateSelect(selectedDate);
    
    // アニメーション
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [selectedDate, onDateSelect, fadeAnim]);

  const handlePrevWeek = () => {
    setCurrentWeek(prev => prev.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prev => prev.add(1, 'week'));
  };

  const scrollToToday = () => {
    const today = dayjs().format('YYYY-MM-DD');
    const todayWeek = dayjs().startOf('week');
    setCurrentWeek(todayWeek);
    setSelectedDate(today);
  };

  const getDayLabel = (date: string) => {
    const targetDate = dayjs(date);
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    return dayNames[targetDate.day()];
  };

  const getDateColor = (date: string) => {
    const targetDate = dayjs(date);
    const today = dayjs();
    
    if (targetDate.isSame(today, 'day')) return '#FF6B35';
    if (targetDate.day() === 0) return '#E74C3C';
    if (targetDate.day() === 6) return '#3498DB';
    return textColor;
  };

  const getDateBackgroundColor = (date: string) => {
    const targetDate = dayjs(date);
    const today = dayjs();
    
    if (targetDate.isSame(today, 'day')) return '#FF6B35' + '20';
    if (selectedDate === date) return '#FF6B35' + '15';
    return 'transparent';
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: fadeAnim }
      ]}
    >
      <View style={styles.headerContent}>
        <View style={styles.monthSelector}>
          <TouchableOpacity 
            style={styles.monthButton}
            onPress={handlePrevWeek}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons 
              name="chevron-left" 
              size={24} 
              color={textColor} 
            />
          </TouchableOpacity>
          
          <Text style={[styles.monthText, { color: textColor }]}> 
            {currentWeek.format('YYYY年M月')}
          </Text>
          
          <TouchableOpacity 
            style={styles.monthButton}
            onPress={handleNextWeek}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={24} 
              color={textColor} 
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.todayButton, { backgroundColor: '#4ECDC4' + '15' }]}
          onPress={scrollToToday}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="calendar-today" 
            size={16} 
            color="#4ECDC4" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
        {dates.map((date, index) => {
          const dayLabel = getDayLabel(date);
          const dateColor = getDateColor(date);
          const backgroundColor = getDateBackgroundColor(date);
          const isSelected = selectedDate === date;
          const targetDate = dayjs(date);
          
          return (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateItem,
                { backgroundColor },
                isSelected && styles.selectedDateItem
              ]}
              onPress={() => setSelectedDate(date)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayLabel, { color: dateColor }]}> 
                {dayLabel}
              </Text>
              <Text style={[styles.dateNumber, { color: dateColor }]}> 
                {targetDate.date()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    justifyContent: 'center',
  },
  monthButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 100,
    textAlign: 'center',
  },
  todayButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    paddingTop: 4,
    paddingBottom: 8,
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 10,
    paddingVertical: 6,
  },
  selectedDateItem: {
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  dayLabel: {
    fontSize: 9,
    fontWeight: '600',
    marginBottom: 2,
  },
  dateNumber: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default DateSelector;
