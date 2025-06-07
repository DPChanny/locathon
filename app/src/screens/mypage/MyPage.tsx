import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Container} from '../../styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import MyDonationCard from './MyDonationCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MyPageStackParam} from './MyPageStack';

type Navigation = NativeStackNavigationProp<MyPageStackParam>;

const MyPage = () => {
  const navigation = useNavigation<Navigation>();
  // 수정 필요
  const userType: 'business' | 'user' = 'business';

  return (
    <Container>
      <Text>마이페이지</Text>
      <MyDonationCard />
      {userType === 'business' ? (
        <Text onPress={() => navigation.navigate('StoreInfoEdit')}>
          내 가게 정보
        </Text>
      ) : (
        <Text onPress={() => navigation.navigate('MyVolunteer')}>봉사시간</Text>
      )}
    </Container>
  );
};

export default MyPage;
