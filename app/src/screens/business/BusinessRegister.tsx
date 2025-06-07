import React from 'react';
import {View, Text} from 'react-native';
import {Container} from '../../styles/GlobalStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BusinessStackParam} from './BusinessStack';
import {useNavigation} from '@react-navigation/native';

type Navigation = NativeStackNavigationProp<BusinessStackParam>;

const BusinessRegister = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <Container>
      <Text>사업자 회원가입</Text>
      <Text onPress={() => navigation.navigate('BusinessVerify')}>
        사업자 인증하기
      </Text>
    </Container>
  );
};

export default BusinessRegister;
