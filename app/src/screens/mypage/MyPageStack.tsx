import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MyPage from './MyPage';
import StoreInfoEdit from './StoreInfoEdit';
import MyStampView from './MyStampView';
import MyVolunteer from './MyVolunteer';
import CustomText from '../../components/ui/CustomText';
import {colors} from '../../styles/colors';

export type MyPageStackParam = {
  MyPage: undefined;
  StoreInfoEdit: undefined;
  MyStampView: undefined;
  MyVolunteer: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParam>();

const MyPageStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: ({children}) => (
          <CustomText style={{fontSize: 17}} weight="600">
            {children}
          </CustomText>
        ),
        headerStyle: {
          backgroundColor: colors.cream,
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{title: '마이페이지'}}
      />
      <Stack.Screen
        name="StoreInfoEdit"
        component={StoreInfoEdit}
        options={{title: '내 가게 정보'}}
      />
      <Stack.Screen
        name="MyStampView"
        component={MyStampView}
        options={{title: '스탬프 모아보기'}}
      />
      <Stack.Screen
        name="MyVolunteer"
        component={MyVolunteer}
        options={{title: '봉사시간'}}
      />
    </Stack.Navigator>
  );
};

export default MyPageStack;
