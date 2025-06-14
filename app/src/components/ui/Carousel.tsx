import React, {useRef} from 'react';
import {Animated, Dimensions, Image} from 'react-native';

interface CarouselProps {
  images: any[];
}

const {width} = Dimensions.get('window');
const ITEM_WIDTH = 200;
const SPACING = 16;
const CENTER_SPACING = (width - ITEM_WIDTH) / 2;

const Carousel = ({images}: CarouselProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      horizontal
      data={images}
      keyExtractor={(_, i) => i.toString()}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      pagingEnabled
      snapToInterval={ITEM_WIDTH + SPACING}
      decelerationRate="fast"
      bounces={false}
      contentContainerStyle={{
        paddingHorizontal: CENTER_SPACING,
      }}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
      })}
      renderItem={({item, index}) => {
        const inputRange = [
          (index - 1) * (ITEM_WIDTH + SPACING),
          index * (ITEM_WIDTH + SPACING),
          (index + 1) * (ITEM_WIDTH + SPACING),
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.85, 1, 0.85],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={{
              width: ITEM_WIDTH,
              marginHorizontal: SPACING / 2,
              transform: [{scale}],
            }}>
            <Image
              source={item}
              style={{
                width: '100%',
                height: 182,
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
          </Animated.View>
        );
      }}
    />
  );
};

export default Carousel;
