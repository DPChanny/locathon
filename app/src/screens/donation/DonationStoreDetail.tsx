import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import {DonationStackParamList} from './DonationStack';
import {useNavigation} from '@react-navigation/native';
import {Container} from '../../styles/GlobalStyles';

type Navigation = NativeStackNavigationProp<DonationStackParamList>;

const DonationStoreDetail = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <Container>
      <Text>가게 이름</Text>
      <Text>음식점</Text>
      <TouchableOpacity onPress={() => navigation.navigate('DonationStatus')}>
        <Text>기부 횟수</Text>
      </TouchableOpacity>
      <Text>가게 정보</Text>
      <Text>네이버 리뷰</Text>
    </Container>
  );
};

export default DonationStoreDetail;
