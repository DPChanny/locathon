import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DonationStack from '../donation/DonationStack';
import HomeStack from '../home/HomeStack';
import MyPageStack from '../mypage/MyPageStack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Donation"
        component={DonationStack}
        options={{tabBarLabel: '기부'}}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{tabBarLabel: '홈'}}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{tabBarLabel: '마이'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
