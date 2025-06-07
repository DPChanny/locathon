import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {MyPageStackParam} from './MyPageStack';
import {RootStackParamList} from '../navigation/StackNavigator';

type MyPageNav = NativeStackNavigationProp<MyPageStackParam>;
type RootNav = NativeStackNavigationProp<RootStackParamList>;

type Navigation = CompositeNavigationProp<MyPageNav, RootNav>;

const DonationCard = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <View>
      <Text
        onPress={() =>
          navigation.navigate('Shared', {screen: 'DonationHistory'})
        }>
        기부 횟수
      </Text>
      <Text onPress={() => navigation.navigate('MyStampView')}>스탬프</Text>
    </View>
  );
};

export default DonationCard;
