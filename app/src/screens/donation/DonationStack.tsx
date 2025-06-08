import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DonationMain from './DonationHome';
import DonationCertify from './DonationCertify';
import DonationHonorWall from './DonationHonor';
import DonationStatus from './DonationStatus';
import DonationStoreDetail from './DonationStoreDetail';

export type DonationStackParam = {
  DonationMain: undefined;
  DonationCertify: undefined;
  DonationHonorWall: undefined;
  DonationStatus: undefined;
  DonationStoreDetail: undefined;
};

const Stack = createNativeStackNavigator();

const DonationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DonationMain"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="DonationMain"
        component={DonationMain}
        options={{title: '기부'}}
      />
      <Stack.Screen
        name="DonationCertify"
        component={DonationCertify}
        options={{title: '기부 인증하기'}}
      />
      <Stack.Screen
        name="DonationHonorWall"
        component={DonationHonorWall}
        options={{title: '기부자 명예의 전당'}}
      />
      <Stack.Screen
        name="DonationStatus"
        component={DonationStatus}
        options={{title: '내 기부 현황'}}
      />
      <Stack.Screen
        name="DonationStoreDetail"
        component={DonationStoreDetail}
        options={{title: '가게 상세'}}
      />
    </Stack.Navigator>
  );
};

export default DonationStack;
