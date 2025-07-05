import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    refDay.subtract((refDay.day() + 6) % 7, 'day');

  const startOfWeek = getStartOfWeek(today.add(weekOffset * 7, 'day'));

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = startOfWeek.add(i, 'day');
    return {
      label: d.format('DD'),           // "02"
      weekday: d.format('ddd'),        // "Wed"
      full: d.format('YYYY-MM-DD'),
    };
  });

  const handleSelect = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <View style={styles.wrapper}>
      {/* 年月表示 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev - 1)}>
          <Text style={styles.arrow}>{'＜'}</Text>
        </TouchableOpacity>
        <Text style={styles.range}>{startOfWeek.format('YYYY年M月')}</Text>
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev + 1)}>
          <Text style={styles.arrow}>{'＞'}</Text>
        </TouchableOpacity>
      </View>

      {/* 日付セル */}
      <View style={styles.row}>
        {dates.map((item) => {
          const isSelected = item.full === selectedDate;
          return (
            <View
              key={item.full}
              style={{
                flex: isSelected ? 1.1 : 0.98,
                alignItems: 'center',
              }}
            >
              <DateCell
                label={item.label}
                weekday={item.weekday}
                isSelected={isSelected}
                onPress={() => handleSelect(item.full)}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const ORANGE = '#FF7043';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    paddingBottom: 4,
    marginHorizontal: -24, // ← SafeAreaView の padding: 24 を相殺
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 12,
  },
  arrow: {
    fontSize: 20,
    color: ORANGE,
    paddingHorizontal: 8,
  },
  range: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
});
