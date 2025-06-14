import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DonationHistory from '../shared/DonationHistory';
import NotificationList from '../shared/NotificationList';
import {colors} from '../../styles/colors';
import CustomText from '../../components/ui/CustomText';

export type SharedStackParamList = {
  DonationHistory: {storeId: number};
  NotificationList: undefined;
};

const Stack = createNativeStackNavigator<SharedStackParamList>();

const SharedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTitle: ({children}) => (
          <CustomText style={{fontSize: 17}} weight="600">
            {children}
          </CustomText>
        ),
        headerStyle: {
          backgroundColor: colors.cream,
        },
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
