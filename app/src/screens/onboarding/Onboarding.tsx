import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BusinessStackParam} from '../business/BusinessStack';

type MyPageNav = NativeStackNavigationProp<BusinessStackParam>;
type RootNav = NativeStackNavigationProp<RootStackParamList>;

type Navigation = CompositeNavigationProp<MyPageNav, RootNav>;

const Onboarding = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
      <Text>온보딩화면</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BusinessStack', {screen: 'BusinessLogin'})
        }>
        <Text>사업자 로그인</Text>
      </TouchableOpacity>

      <Text
        onPress={() =>
          navigation.navigate('BusinessStack', {screen: 'BusinessRegister'})
        }>
        사업자 회원가입
      </Text>
      {/* 임시 이동 버튼 */}
      <Text onPress={() => navigation.navigate('Main')}>메인 이동</Text>
    </SafeAreaView>
  );
};

export default Onboarding;
