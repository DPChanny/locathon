import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DonationHistory from '../shared/DonationHistory';
import NotificationList from '../shared/NotificationList';

export type SharedStackParamList = {
  DonationHistory: undefined;
  NotificationList: undefined;
};

const Stack = createNativeStackNavigator<SharedStackParamList>();

const SharedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="DonationHistory"
        component={DonationHistory}
        options={{title: '기부 내역'}}
      />
      <Stack.Screen
        name="NotificationList"
        component={NotificationList}
        options={{title: '알림'}}
      />
    </Stack.Navigator>
  );
};

export default SharedStack;
