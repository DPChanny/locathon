import React, {useEffect} from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import {RootStackParamList} from '../../screens/navigation/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import kakaoIcon from '../../assets/images/login/kakao_icon.png';
import googleIcon from '../../assets/images/login/google_icon.png';
import naverIcon from '../../assets/images/login/naver_icon.png';
import api from '../../../axiosConfig';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const IconCircleRow = () => {
  const navigation = useNavigation<Navigation>();

  const handleKakaoLogin = () => {
    navigation.navigate('Main');
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        Toast.show({
          type: 'myCustomToast',
          text1: '로그인 실패',
          text2: 'id token을 가져올 수 없습니다.',
          position: 'bottom',
        });
        return;
      }
      const response = await api.post('/api/user/login', {
        provider: 'google',
        id_token: idToken,
      });
      console.log('userInfo', userInfo);

      const accessToken = response.data.data.access_token;
      await AsyncStorage.setItem('access_token', accessToken);
      Toast.show({
        type: 'mySuccessToast',
        text1: '로그인 성공',
        text2: 'Welcome',
        position: 'bottom',
      });
      navigation.navigate('Main');
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'myCustomToast',
        text1: '로그인 실패',
        text2: '로그인에 실패하였습니다.',
        position: 'bottom',
      });
    }
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
