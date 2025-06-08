import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BusinessLogin from './BusinessLogin';
import BusinessRegister from './BusinessRegister';
import BusinessVerify from './BusinessVerify';
import {colors} from '../../styles/colors';
import {font} from '../../styles/font.styles';

export type BusinessStackParam = {
  BusinessLogin: undefined;
  BusinessRegister: undefined;
  BusinessVerify: undefined;
};

const Stack = createNativeStackNavigator<BusinessStackParam>();

const BusinessStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.cream,
        },
        headerTintColor: colors.gray8,
        headerTitleStyle: {
          fontFamily: font.pretendard600.fontFamily,
          fontSize: 17,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}>
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
        options={{title: '사업자 정보'}}
      />
    </Stack.Navigator>
  );
};

export default BusinessStack;
