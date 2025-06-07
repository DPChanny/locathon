import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {DonationStackParam} from './DonationStack';
import {useNavigation} from '@react-navigation/native';
import {Container} from '../../styles/GlobalStyles';

type Navigation = NativeStackNavigationProp<DonationStackParam>;

const DonationHome = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('DonationCertify')}>
        <Text>기부인증하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DonationStatus')}>
        <Text>내 기부 현황</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('DonationHonorWall')}>
        <Text>기부자 명예의 전당</Text>
      </TouchableOpacity>
      <Text>기부 가게 순위</Text>
    </Container>
  );
};

export default DonationHome;
