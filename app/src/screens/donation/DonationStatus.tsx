import React from 'react';
import {Text, Touchable, TouchableOpacity} from 'react-native';
import {Container} from '../../styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';

const DonationStatus = () => {
  const navigation = useNavigation<any>();
  return (
    <Container>
      <Text>기부 횟수</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Shared', {screen: 'DonationHistory'})
        }>
        <Text>기부 내역 보기</Text>
      </TouchableOpacity>
      <Text>지금 모인 스탬프</Text>
    </Container>
  );
};

export default DonationStatus;
