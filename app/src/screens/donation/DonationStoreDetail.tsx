import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {DonationStackParam} from './DonationStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Container} from '../../styles/GlobalStyles';
import {donors} from '../../data/dummyData';
import styled from 'styled-components/native';
import CustomText from '../../components/ui/CustomText';
import Carousel from '../../components/ui/Carousel';
import {colors} from '../../styles/colors';
import rightArrow from '../../assets/images/icon/right_arrow.png';
import phone from '../../assets/images/donation/phone.png';
import mappin from '../../assets/images/donation/map-pin.png';
import time from '../../assets/images/donation/Time_progress.png';
import {RootStackParamList} from '../navigation/StackNavigator';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const DonationView = styled.Pressable`
  width: 100%;
  height: 56px;
  background-color: white;
  border: 1px solid ${colors.gray2};
  border-radius: 20px;
  align-items: center;
  padding: 0 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const StoreInfoView = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 117px;
  padding: 16px;
  background-color: white;
  border: 1px solid ${colors.gray2};
  border-radius: 20px;
  gap: 8px;
`;

const DonationStoreDetail = () => {
  const navigation = useNavigation<Navigation>();
  const route =
    useRoute<RouteProp<DonationStackParam, 'DonationStoreDetail'>>();
  const {storeId} = route.params;
  const store = donors.find(d => d.id === storeId);
  const placeholderImages = [
    require('../../assets/images/donation/placeholder.png'),
  ];

  return (
    <Container>
      <View style={{height: 218}}>
        <Carousel
          images={store?.gallery?.length ? store.gallery : placeholderImages}
          rank={store?.id}
        />
      </View>
      <View style={{marginTop: 20, marginBottom: 20}}>
        <CustomText style={{fontSize: 20, textAlign: 'center'}} weight="600">
          {store?.name}
        </CustomText>
        <CustomText style={{fontSize: 15, textAlign: 'center'}} weight="600">
          {store?.category}
        </CustomText>
      </View>
      <DonationView
        onPress={() =>
          navigation.navigate('Shared', {
            screen: 'DonationHistory',
            params: {storeId},
          })
        }>
        <CustomText style={{fontSize: 15}}>
          기부 {store?.donationCount}회
        </CustomText>
        <Image source={rightArrow} style={{width: 10.537, height: 24}} />
      </DonationView>
      <StoreInfoView>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Image source={mappin} style={{width: 14, height: 14}} />
          <CustomText style={{fontSize: 15}}>{store?.address}</CustomText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Image source={phone} style={{width: 14, height: 14}} />
          <CustomText style={{fontSize: 15}}>{store?.phone}</CustomText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Image source={time} style={{width: 14, height: 14}} />
          <CustomText style={{fontSize: 15}}>{store?.openHours}</CustomText>
        </View>
      </StoreInfoView>
    </Container>
  );
};

export default DonationStoreDetail;
