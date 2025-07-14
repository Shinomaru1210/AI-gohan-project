import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

type Props = {
  date: string;
  selected: boolean;
  onPress: () => void;
};

const AnimatedDateChip: React.FC<Props> = ({ date, selected, onPress }) => {
  const scale = useSharedValue(selected ? 1.08 : 1);

   
  useEffect(() => {
    scale.value = withSpring(selected ? 1.08 : 1, {
      damping: 15,
      stiffness: 180,
    });
  }, [selected, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: selected ? '#FFE0B2' : 'transparent',
    shadowColor: selected ? '#FF7043' : '#000',
    shadowOpacity: selected ? 0.25 : 0.08,
    shadowRadius: selected ? 8 : 2,
    elevation: selected ? 6 : 1,
  }));

  return (
    <Animated.View style={[styles.animatedChip, animatedStyle]}>
      <Chip
        mode={selected ? 'flat' : 'outlined'}
        selected={selected}
        onPress={onPress}
        style={[styles.chip, selected && styles.selectedChip]}
        textStyle={[styles.chipText, selected && styles.selectedText]}
      >
        {`${dayjs(date).format('D')} ${dayjs(date).format('ddd')}`}
      </Chip>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedChip: {
    marginHorizontal: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.08,
    elevation: 1,
    backgroundColor: 'transparent',
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: '#FF7043',
  },
  chipText: {
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
    fontWeight: '600',
  },
  innerText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default AnimatedDateChip;
