import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, FlatList, Image, View} from 'react-native';
import badge1 from '../../assets/images/donation/badge1.png';
import badge2 from '../../assets/images/donation/badge2.png';
import badge3 from '../../assets/images/donation/badge3.png';

interface CarouselProps {
  images: any[];
  rank: any;
}

const {width} = Dimensions.get('window');
const ITEM_WIDTH = 182;
const SPACING = 0;
const FULL_ITEM_WIDTH = ITEM_WIDTH + SPACING;
const CENTER_OFFSET = (width - ITEM_WIDTH) / 2;

const Carousel = ({images, rank}: CarouselProps) => {
  const middleIndex = Math.floor(images.length / 2);
  const initialScrollX = FULL_ITEM_WIDTH * middleIndex;
  const scrollX = useRef(new Animated.Value(initialScrollX)).current;
  const badgeImages = [badge1, badge2, badge3];
  const currentIndex = useRef(middleIndex);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / FULL_ITEM_WIDTH);
      currentIndex.current = index;
    });

    return () => scrollX.removeAllListeners();
  }, []);

  return (
    <View style={{marginHorizontal: -24}}>
      <Animated.FlatList
        data={images}
        horizontal
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={FULL_ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        initialScrollIndex={middleIndex}
        getItemLayout={(_, index) => ({
          length: FULL_ITEM_WIDTH,
          offset: FULL_ITEM_WIDTH * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: CENTER_OFFSET - SPACING,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * FULL_ITEM_WIDTH,
            index * FULL_ITEM_WIDTH,
            (index + 1) * FULL_ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_WIDTH,
                marginRight: SPACING,
                transform: [{scale}],
                overflow: 'visible',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0,
                marginTop: 36,
              }}>
              <Image
                source={item}
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_WIDTH,
                  resizeMode: 'cover',
                  borderRadius: 8,
                }}
              />
              {index === currentIndex.current && rank <= 3 && (
                <Image
                  source={badgeImages[rank - 1]}
                  style={{
                    position: 'absolute',
                    top: -36,
                    left: -22,
                    width: 72,
                    height: 75.1,
                    resizeMode: 'contain',
                  }}
                />
              )}
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default Carousel;
