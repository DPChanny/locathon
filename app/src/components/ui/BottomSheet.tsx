import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import CustomText from './CustomText';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

const {height} = Dimensions.get('window');
const SHEET_TOP_PADDING = 169;
const EXPANDED = SHEET_TOP_PADDING;
const INITIAL_POSITION = height * 0.7;
const DIMISSED_POSITION = height * 0.87;

const AnimatedSheet = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${height}px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 10;
  padding: 16px;
`;
const HandleBar = styled.View`
  width: 92px;
  height: 4px;
  border-radius: 3px;
  background-color: ${colors.gray5};
  align-self: center;
  margin-bottom: 8px;
`;

export type BottomSheetRef = {
  collapse: () => void;
};

const BottomSheet = forwardRef<BottomSheetRef>((_, ref) => {
  const translateY = useSharedValue(INITIAL_POSITION);
  const context = useSharedValue({y: 0});

  useImperativeHandle(ref, () => ({
    collapse: () => {
      translateY.value = withSpring(DIMISSED_POSITION, {
        damping: 30,
        stiffness: 100,
        mass: 0.8,
        overshootClamping: true,
      });
    },
  }));

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
          ? withSpring(EXPANDED, {
              damping: 30,
              stiffness: 100,
              mass: 0.8,
              overshootClamping: true,
            })
          : withSpring(INITIAL_POSITION, {
              damping: 30,
              stiffness: 100,
              mass: 0.8,
              overshootClamping: true,
            });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <AnimatedSheet style={animatedStyle}>
        <HandleBar />
        <CustomText>내 주변 가게 모아보기</CustomText>
      </AnimatedSheet>
    </GestureDetector>
  );
});

export default BottomSheet;
