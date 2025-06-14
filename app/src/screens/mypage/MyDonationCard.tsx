import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {MyPageStackParam} from './MyPageStack';
import {RootStackParamList} from '../navigation/StackNavigator';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import check from '../../assets/images/mypage/check.png';
import stamp from '../../assets/images/mypage/stamp.png';
import right_arrow from '../../assets/images/icon/right_arrow.png';
import CustomText from '../../components/ui/CustomText';
import {Pressable} from 'react-native';

type MyPageNav = NativeStackNavigationProp<MyPageStackParam>;
type RootNav = NativeStackNavigationProp<RootStackParamList>;

type Navigation = CompositeNavigationProp<MyPageNav, RootNav>;

type Props = {
  donationCount: number;
  stampCount: number;
};

const CircleWrapper = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: relative;
`;

const CardView = styled.View`
  margin-top: 12px;
  flex-direction: row;
  border-radius: 20px;
  border: 1px solid ${colors.gray2};
  background-color: white;
  width: 100%;
  height: 121.084px;
  padding: 16px;
`;

const Card = styled.View`
  width: 152px;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
`;

const Circle = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: rgba(180, 219, 160, 0.3);
  border: 1px solid ${colors.green};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DonationCard = ({donationCount, stampCount}: Props) => {
  const navigation = useNavigation<Navigation>();

  return (
    <CardView>
      <Card>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <CustomText style={{fontSize: 15, color: colors.gray8}}>
            기부 횟수
          </CustomText>
          <Pressable
            onPress={() =>
              navigation.navigate('Shared', {screen: 'DonationHistory'})
            }>
            <Image source={right_arrow} style={{width: 7, height: 16}} />
          </Pressable>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <CircleWrapper>
            <Circle>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray8,
                }}
                weight="600">
                {donationCount}회
              </CustomText>
            </Circle>
            <Image
              source={check}
              style={{
                width: 22,
                height: 22,
                position: 'absolute',
                left: -8.86,
                bottom: 0,
              }}
            />
          </CircleWrapper>
        </View>
      </Card>
      <View
        style={{
          width: 1,
          height: 90,
          marginHorizontal: 14,
          backgroundColor: '#B4DBA0',
        }}
      />
      <Card>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <CustomText style={{fontSize: 15, color: colors.gray8}}>
            스탬프
          </CustomText>
          <Pressable onPress={() => navigation.navigate('MyStampView')}>
            <Image source={right_arrow} style={{width: 7, height: 16}} />
          </Pressable>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <CircleWrapper>
            <Circle>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray8,
                }}
                weight="600">
                {stampCount}개
              </CustomText>
            </Circle>
            <Image
              source={stamp}
              style={{
                width: 22,
                height: 22,
                position: 'absolute',
                left: -8.86,
                bottom: 0,
              }}
            />
          </CircleWrapper>
        </View>
      </Card>
    </CardView>
  );
};

export default DonationCard;
