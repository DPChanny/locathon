import React from 'react';
import {Image, Pressable, View} from 'react-native';
import loginIcon from '../../assets/login_icon.png';
import {RootStackParamList} from '../../screens/navigation/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

{
  /* 임시 메인 네비게이터 */
}
type Navigation = NativeStackNavigationProp<RootStackParamList>;

const IconCircleRow = () => {
  const navigation = useNavigation<Navigation>();

  const handleLogin = () => {};

  const handleKakaoLogin = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={{flexDirection: 'row', gap: 18, marginTop: 12}}>
      <Pressable
        onPress={() => handleLogin()}
        style={{
          width: 60,
          height: 60,
          borderRadius: 40,
          backgroundColor: '#ddd',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={loginIcon} style={{width: 20, height: 20}} />
      </Pressable>
      <Pressable
        onPress={() => handleKakaoLogin()}
        style={{
          width: 60,
          height: 60,
          borderRadius: 40,
          backgroundColor: '#ddd',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={loginIcon} style={{width: 20, height: 20}} />
      </Pressable>
      <Pressable
        onPress={() => handleLogin()}
        style={{
          width: 60,
          height: 60,
          borderRadius: 40,
          backgroundColor: '#ddd',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={loginIcon} style={{width: 20, height: 20}} />
      </Pressable>
    </View>
  );
};

export default IconCircleRow;
