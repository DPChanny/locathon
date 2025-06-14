import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import CustomText from '../ui/CustomText';
import {Image, View} from 'react-native';

interface Props {
  donor: Donor;
}

interface Donor {
  id: number;
  name: string;
  donationCount: number;
  gallery: any[];
  description: string;
}

const DonorCard = styled.View`
  width: 100%;
  height: 203px;
  box-sizing: border-box;
  border: 1px solid ${colors.gray2};
  border-radius: 20px;
  background-color: white;
  padding: 16px;
  justify-content: space-between;
`;

const Badge = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray8};
`;

const TopDonorCard = ({donor}: Props) => {
  return (
    <DonorCard>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <Badge>
            <CustomText style={{color: 'white', fontSize: 13}} weight="700">
              1
            </CustomText>
          </Badge>
          <CustomText style={{color: colors.gray8, fontSize: 17}} weight="600">
            {donor.name}
          </CustomText>
        </View>
        <CustomText style={{color: colors.gray6, fontSize: 11}}>
          기부 {donor.donationCount}회
        </CustomText>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {donor.gallery.map((imageSrc, index) => (
          <Image
            key={index}
            source={imageSrc}
            style={{width: 84, height: 84, borderRadius: 8}}
          />
        ))}
      </View>
      <CustomText style={{fontSize: 15}}>{donor.description}</CustomText>
    </DonorCard>
  );
};

export default TopDonorCard;
