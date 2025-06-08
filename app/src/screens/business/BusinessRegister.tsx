import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Container} from '../../styles/GlobalStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BusinessStackParam} from './BusinessStack';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '../../components/ui/ProgressBar';
import LabeledInput from '../../components/inputs/LabeledInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type Navigation = NativeStackNavigationProp<BusinessStackParam>;

const BusinessRegister = () => {
  const navigation = useNavigation<Navigation>();
  const {bottom} = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleNext = () => {
    if (!username || !password || !passwordConfirm) {
      Toast.show({
        type: 'myCustomToast',
        text1: '입력 오류',
        text2: '모든 정보를 입력해주세요.',
        position: 'bottom',
      });
      return;
    }
    if (password !== passwordConfirm) {
      Toast.show({
        type: 'myCustomToast',
        text1: '비밀번호 불일치',
        text2: '비밀번호가 일치하지 않습니다.',
        position: 'bottom',
      });
      return;
    }

    console.log('회원가입 정보:', {username, password});
    navigation.navigate('BusinessVerify');
  };

  return (
    <Container>
      <ProgressBar progress={0.33} />
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'space-between',
          paddingBottom: bottom,
        }}>
        <View style={{width: '100%', marginTop: 28}}>
          <LabeledInput
            label="아이디"
            placeholder="아아디를 입력하세요."
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
          <LabeledInput
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요."
            secureTextEntry
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />
        </View>
        <View>
          <PrimaryButton title="사업자 인증하기" onPress={handleNext} />
        </View>
      </View>
    </Container>
  );
};

export default BusinessRegister;
