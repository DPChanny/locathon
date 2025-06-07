import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BusinessLogin from './BusinessLogin';
import BusinessRegister from './BusinessRegister';
import BusinessVerify from './BusinessVerify';

export type BusinessStackParam = {
  BusinessLogin: undefined;
  BusinessRegister: undefined;
  BusinessVerify: undefined;
};

const Stack = createNativeStackNavigator<BusinessStackParam>();

const BusinessStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BusinessLogin"
        component={BusinessLogin}
        options={{title: '사업자 로그인'}}
      />
      <Stack.Screen
        name="BusinessRegister"
        component={BusinessRegister}
        options={{title: '사업자 회원가입'}}
      />
      <Stack.Screen
        name="BusinessVerify"
        component={BusinessVerify}
        options={{title: '사업자 인증'}}
      />
    </Stack.Navigator>
  );
};

export default BusinessStack;
