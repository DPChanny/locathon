import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {RootStackParamList} from '../../screens/navigation/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import kakaoIcon from '../../assets/images/login/kakao_icon.png';
import googleIcon from '../../assets/images/login/google_icon.png';
import naverIcon from '../../assets/images/login/naver_icon.png';

/* 임시 메인 네비게이터 */
type Navigation = NativeStackNavigationProp<RootStackParamList>;

const IconCircleRow = () => {
  const navigation = useNavigation<Navigation>();

  const handleKakaoLogin = () => {
    navigation.navigate('Main');
  };

  const handleGoogleLogin = () => {
    navigation.navigate('Main');
  };

  const handleNaverLogin = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={{flexDirection: 'row', gap: 18, marginTop: 8}}>
      <Pressable onPress={() => handleKakaoLogin()}>
        <Image source={kakaoIcon} style={{width: 60, height: 60}} />
      </Pressable>
      <Pressable onPress={() => handleGoogleLogin()}>
        <Image source={googleIcon} style={{width: 60, height: 60}} />
      </Pressable>
      <Pressable onPress={() => handleNaverLogin()}>
        <Image source={naverIcon} style={{width: 60, height: 60}} />
      </Pressable>
    </View>
  );
};

export default IconCircleRow;
