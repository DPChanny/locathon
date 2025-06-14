import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Container} from '../../styles/GlobalStyles';
import LabeledInput from '../../components/inputs/LabeledInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BusinessLogin = () => {
  const {bottom} = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {};

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
