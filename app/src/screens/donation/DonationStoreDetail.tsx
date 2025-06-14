import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import {DonationStackParam} from './DonationStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Container} from '../../styles/GlobalStyles';
import {donors} from '../../data/dummyData';
import styled from 'styled-components/native';
import CustomText from '../../components/ui/CustomText';
import Carousel from '../../components/ui/Carousel';

type Navigation = NativeStackNavigationProp<DonationStackParam>;

const StoreInfoView = styled.View``;

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
      <Carousel
        images={store?.gallery?.length ? store.gallery : placeholderImages}
      />
      <CustomText>{store?.name}</CustomText>
      <CustomText>{store?.category}</CustomText>
      <TouchableOpacity onPress={() => navigation.navigate('DonationStatus')}>
        <CustomText>기부 {store?.donationCount}회</CustomText>
      </TouchableOpacity>
      <StoreInfoView>
        <CustomText>{store?.address}</CustomText>
        <CustomText>{store?.phone}</CustomText>
        <CustomText>{store?.openHours}</CustomText>
      </StoreInfoView>
    </Container>
  );
};

export default DonationStoreDetail;
