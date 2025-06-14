import React, {useEffect, useMemo, useRef} from 'react';
import {Text} from 'react-native';
import BottomSheet from '../../components/ui/BottomSheet';
import {SafeAreaView} from 'react-native-safe-area-context';

const FoodMap = () => {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
      <Text>지도</Text>
      <BottomSheet />
    </SafeAreaView>
  );
};

export default FoodMap;
