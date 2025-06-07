import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import {DonationStackParam} from './DonationStack';
import {useNavigation} from '@react-navigation/native';
import {Container} from '../../styles/GlobalStyles';

type Navigation = NativeStackNavigationProp<DonationStackParam>;

const DonationHonor = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <Container>
      <Text>기부자 명예의 전당</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('DonationStoreDetail')}>
        <Text>기부자 가게 순위</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default DonationHonor;
