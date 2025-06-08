import React, {useRef} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Container} from '../../styles/GlobalStyles';

const {height} = Dimensions.get('window');
const EXPANDED = 0;
const INITIAL_POSITION = height * 0.5;

const BottomSheet = () => {
  const translateY = useSharedValue(INITIAL_POSITION);
  const context = useSharedValue({y: 0});

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = Math.min(
        INITIAL_POSITION,
        Math.max(EXPANDED, context.value.y + event.translationY),
      );
    })
    .onEnd(() => {
      const threshold = (INITIAL_POSITION + EXPANDED) / 2;
      translateY.value =
        translateY.value < threshold
          ? withSpring(EXPANDED)
          : withSpring(INITIAL_POSITION);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Container>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View style={styles.handleBar} />
          <Text>내 주변 가게 모아보기</Text>
        </Animated.View>
      </GestureDetector>
    </Container>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 8,
    elevation: 10,
  },
  handleBar: {
    width: 92,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 24,
  },
});

export default BottomSheet;
