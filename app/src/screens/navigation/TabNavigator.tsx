import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import DonationStack from '../donation/DonationStack';
import HomeStack from '../home/HomeStack';
import MyPageStack from '../mypage/MyPageStack';
import tab_don from '../../assets/images/tapbar/tab_don.png';
import tab_home from '../../assets/images/tapbar/tab_home.png';
import tab_my from '../../assets/images/tapbar/tab_my.png';
import {colors} from '../../styles/colors';
import {Image} from 'react-native';
import {font} from '../../styles/font.styles';
import CustomText from '../../components/ui/CustomText';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const renderLabel =
    (label: string) =>
    ({color}: {color: string}) =>
      <CustomText style={{color, fontSize: 12}}>{label}</CustomText>;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}): BottomTabNavigationOptions => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.green,
          height: 110,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: colors.gray8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
        tabBarActiveTintColor: colors.gray8,
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({focused}) => {
          let icon;

          if (route.name === 'Donation') {
            icon = tab_don;
          } else if (route.name === 'Home') {
            icon = tab_home;
          } else if (route.name === 'MyPage') {
            icon = tab_my;
          }

          return (
            <Image
              source={icon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? colors.gray8 : '#aaa',
              }}
              resizeMode="contain"
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: renderLabel('홈'),
        }}
      />
      <Tab.Screen
        name="Donation"
        component={DonationStack}
        options={{
          tabBarLabel: renderLabel('기부'),
        }}
      />

      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          tabBarLabel: renderLabel('마이'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
