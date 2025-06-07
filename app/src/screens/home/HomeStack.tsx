import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FoodMap from '../home/FoodMap';

export type HomeStackParam = {
  FoodMap: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParam>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FoodMap" component={FoodMap} />
    </Stack.Navigator>
  );
};

export default HomeStack;
