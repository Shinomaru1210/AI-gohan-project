import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import dayjs from 'dayjs';
import DateCell from './DateCell';

type Props = {
  onDateSelect: (date: string) => void;
};

export default function DateSelector({ onDateSelect }: Props) {
  const today = dayjs();
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(today.format('YYYY-MM-DD'));

  const getStartOfWeek = (refDay: dayjs.Dayjs) =>
    refDay.subtract((refDay.day() + 6) % 7, 'day'); // 月曜始まり対応

  const startOfWeek = getStartOfWeek(today.add(weekOffset * 7, 'day'));

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = startOfWeek.add(i, 'day');
    return {
      label: d.format('MM/DD'),
      weekday: d.format('ddd'),
      full: d.format('YYYY-MM-DD'),
    };
  });

  const handleSelect = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev - 1)}>
          <Text style={styles.arrow}>{'＜'}</Text>
        </TouchableOpacity>
        <Text style={styles.range}>
          {startOfWeek.format('M/D')}〜{startOfWeek.add(6, 'day').format('M/D')}
        </Text>
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev + 1)}>
          <Text style={styles.arrow}>{'＞'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dates}
        keyExtractor={(item) => item.full}
        renderItem={({ item }) => (
          <DateCell
            label={item.label}
            weekday={item.weekday}
            isSelected={item.full === selectedDate}
            onPress={() => handleSelect(item.full)}
          />
        )}
        horizontal
        contentContainerStyle={styles.row}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const ORANGE = '#FF7043';

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  arrow: {
    fontSize: 20,
    color: ORANGE,
    paddingHorizontal: 12,
  },
  range: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});
