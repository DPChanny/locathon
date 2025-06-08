import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Onboarding from '../onboarding/Onboarding';
import TabNavigator from './TabNavigator';
import SharedStack, {SharedStackParamList} from '../shared/SharedStack';
import {NavigatorScreenParams} from '@react-navigation/native';
import BusinessStack, {BusinessStackParam} from '../business/BusinessStack';

export type RootStackParamList = {
  Onboarding: undefined;
  BusinessStack: NavigatorScreenParams<BusinessStackParam>;
  Main: undefined;
  Shared: NavigatorScreenParams<SharedStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BusinessStack"
        component={BusinessStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="Shared"
        component={SharedStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
