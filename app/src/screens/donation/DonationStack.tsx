import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DonationMain from './DonationHome';
import DonationCertify from './DonationCertify';
import DonationHonor from './DonationHonor';
import DonationStoreDetail from './DonationStoreDetail';
import {Image} from 'react-native';
import headerLogo from '../../assets/images/header_logo.png';
import {colors} from '../../styles/colors';

export type DonationStackParam = {
  DonationMain: undefined;
  DonationCertify: undefined;
  DonationHonor: undefined;
  DonationStatus: undefined;
  DonationStoreDetail: {storeId: number; rank: number};
};

const Stack = createNativeStackNavigator();

const DonationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DonationMain"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTitle: () => (
          <Image
            source={headerLogo}
            style={{
              width: 92,
              height: 15,
              resizeMode: 'contain',
            }}
          />
        ),
        headerStyle: {
          backgroundColor: colors.cream,
        },
      }}>
      <Stack.Screen name="DonationMain" component={DonationMain} />
      <Stack.Screen name="DonationCertify" component={DonationCertify} />
      <Stack.Screen name="DonationHonor" component={DonationHonor} />
      <Stack.Screen
        name="DonationStoreDetail"
        component={DonationStoreDetail}
      />
    </Stack.Navigator>
  );
};

export default DonationStack;
