import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Container} from '../../styles/GlobalStyles';
import LabeledInput from '../../components/inputs/LabeledInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import api from '../../../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const BusinessLogin = () => {
  const navigation = useNavigation<Navigation>();
  const {bottom} = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/api/user/login', {
        name: username,
        password: password,
      });

      const accessToken = response.data.data.access_token;

      await AsyncStorage.setItem('access_token', accessToken);

      Toast.show({
        type: 'mySuccessToast',
        text1: '로그인 성공',
        text2: 'Welcome',
        position: 'bottom',
      });
      navigation.navigate('Main');
    } catch (err) {
      Toast.show({
        type: 'myCustomToast',
        text1: '로그인 실패',
        text2: '아이디 또는 비밀번호를 확인하세요.',
        position: 'bottom',
      });
    }
  };

  return (
    <Container
      style={{
        paddingTop: 48,
        justifyContent: 'space-between',
        paddingBottom: bottom,
      }}>
      <View style={{width: '100%'}}>
        <LabeledInput
          label="아이디"
          placeholder="아이디를 입력하세요."
          value={username}
          onChangeText={setUsername}
        />
        <LabeledInput
          label="비밀번호"
          placeholder="비밀번호를 입력하세요."
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={{width: '100%'}}>
        <PrimaryButton title="로그인" onPress={handleLogin} />
      </View>
    </Container>
  );
};

export default BusinessLogin;
