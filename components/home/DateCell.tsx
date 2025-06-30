import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  label: string; // 日付表示（例：06/26）
  weekday: string; // 曜日表示（例：Wed）
  isSelected: boolean;
  onPress: () => void;
};

const ORANGE = '#FF7043';

export default function DateCell({
  label,
  weekday,
  isSelected,
  onPress,
}: Props) {
  const animatedWidth = useSharedValue(isSelected ? 70 : 50);

  useEffect(() => {
    animatedWidth.value = withTiming(isSelected ? 70 : 50, { duration: 200 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
  }));

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          styles.cell,
          isSelected && styles.selectedCell,
          animatedStyle,
        ]}
      >
        <Text style={[styles.dateText, isSelected && styles.selectedText]}>
          {label}
        </Text>
        <Text style={[styles.weekText, isSelected && styles.selectedText]}>
          {weekday}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#FBE9E7',
  },
  selectedCell: {
    backgroundColor: ORANGE,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
  weekText: {
    fontSize: 11,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
});
