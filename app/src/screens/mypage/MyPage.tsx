import React, {Component} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {Container} from '../../styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import MyDonationCard from './MyDonationCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MyPageStackParam} from './MyPageStack';
import userprofile from '../../assets/images/mypage/userprofile.png';
import crown from '../../assets/images/mypage/crown.png';
import CustomText from '../../components/ui/CustomText';
import {donors} from '../../data/dummyData';
import {generalUsers} from '../../data/generaluserData';
import {colors} from '../../styles/colors';
import right_arrow from '../../assets/images/icon/right_arrow.png';

type Navigation = NativeStackNavigationProp<MyPageStackParam>;

type BusinessUser = {
  id: number;
  name: string;
  category: string;
  donationCount: number;
  stampCount: number;
  businessNumber: string;
  gallery: typeof import('*.png')[]; // 이미지 배열
  description: string;
  address: string;
  phone: string;
  openHours: string;
};

type GeneralUser = {
  id: number;
  name: string;
  donationCount: number;
  stampCount: number;
  volunteerHours: number;
};

const MyPage = () => {
  const navigation = useNavigation<Navigation>();
  // 수정 필요
  const userType: string = 'business';

  const userId = 1;

  const userData =
    userType === 'business'
      ? (donors.find(d => d.id === userId) as BusinessUser)
      : (generalUsers.find(u => u.id === userId) as GeneralUser);

  return (
    <Container>
      <View style={{marginTop: 20, marginBottom: 12}}>
        <Image source={userprofile} style={{width: 116, height: 116}} />
      </View>
      <CustomText style={{color: colors.gray8, fontSize: 20}} weight="600">
        {userData?.name}
      </CustomText>
      {userType === 'business' ? (
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 48,
          }}>
          <Image
            source={crown}
            style={{marginRight: 4, width: 17, height: 11}}
          />
          <CustomText style={{color: colors.gray8, fontSize: 15}}>
            명예의 전당 {userData?.id}위
          </CustomText>
        </View>
      ) : (
        <View
          style={{
            marginTop: 4,
            marginBottom: 48,
          }}></View>
      )}
      <View style={{width: '100%'}}>
        <CustomText style={{color: colors.gray8, fontSize: 17}} weight="600">
          내 기부내역
        </CustomText>
        <MyDonationCard
          donationCount={userData?.donationCount ?? 0}
          stampCount={userData?.stampCount ?? 0}
        />
      </View>
      {userType === 'business' ? (
        <View style={{paddingTop: 23.78, width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <CustomText
              style={{
                fontSize: 17,
                paddingBottom: 12,
              }}
              weight="600">
              내 가게 정보
            </CustomText>
            <Pressable onPress={() => navigation.navigate('StoreInfoEdit')}>
              <Image source={right_arrow} style={{width: 7, height: 16}} />
            </Pressable>
          </View>
          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.gray2,
              backgroundColor: 'white',
              width: '100%',
              height: 129,
              paddingHorizontal: 16,
              paddingVertical: 20,
              gap: 8,
              justifyContent: 'center',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray8,
                }}
                weight="400">
                사업자명
              </CustomText>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray5,
                }}
                weight="400">
                {userData?.name}
              </CustomText>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray8,
                }}
                weight="400">
                사업자번호
              </CustomText>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray5,
                }}
                weight="400">
                {(userData as BusinessUser).businessNumber}
              </CustomText>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray8,
                }}
                weight="400">
                카테고리
              </CustomText>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray5,
                }}
                weight="400">
                {(userData as BusinessUser).category}
              </CustomText>
            </View>
          </View>
        </View>
      ) : (
        <View style={{paddingTop: 23.78, width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <CustomText
              style={{
                fontSize: 17,
                paddingBottom: 12,
              }}
              weight="600">
              내 봉사시간
            </CustomText>
            <Pressable onPress={() => navigation.navigate('MyVolunteer')}>
              <Image source={right_arrow} style={{width: 7, height: 16}} />
            </Pressable>
          </View>
          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.gray2,
              backgroundColor: 'white',
              width: '100%',
              height: 56,
              padding: 16,
              justifyContent: 'center',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray8,
                }}
                weight="400">
                누적시간
              </CustomText>
              <CustomText
                style={{
                  fontSize: 15,
                  color: colors.gray8,
                }}
                weight="600">
                {(userData as GeneralUser).volunteerHours}시간
              </CustomText>
            </View>
          </View>
        </View>
      )}
    </Container>
  );
};

export default MyPage;
