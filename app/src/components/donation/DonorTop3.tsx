import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../ui/CustomText';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DonationStackParam} from '../../screens/donation/DonationStack';
import {useNavigation} from '@react-navigation/native';
import badge1 from '../../assets/images/donation/badge1.png';
import badge2 from '../../assets/images/donation/badge2.png';
import badge3 from '../../assets/images/donation/badge3.png';
import {Donor} from '../../types/donation.types';

type Navigation = NativeStackNavigationProp<DonationStackParam>;

const Top3View = styled.View<{variant: 'main' | 'honorwall'}>`
  width: 100%;
  background-color: ${({variant}) =>
    variant === 'main' ? 'white' : colors.green};
  height: ${({variant}) => (variant === 'main' ? '200px' : '196px')};
  flex-direction: row;
  justify-content: space-between;
  padding: ${({variant}) => (variant === 'main' ? '32px 32px' : '28px 32px')};
  border: ${({variant}) =>
    variant === 'main' ? `1px solid ${colors.gray2}` : 'none'};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: ${({variant}) =>
    variant === 'main' ? '20px' : '0px'};
  border-bottom-right-radius: ${({variant}) =>
    variant === 'main' ? '20px' : '0px'};
  gap: 28px;
`;

const ImageWrapper = styled.View<{size: number}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  position: relative;
  margin-bottom: 12px;
`;

const StoreImage = styled.Image<{size: number}>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: 999px;
`;

const BadgeImage = styled.Image<{width: number; height: number}>`
  position: absolute;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  top: -4px;
  right: -9px;
`;

const DonorTop3 = ({
  donors,
  variant = 'main',
  onPress,
}: {
  donors: Donor[];
  variant?: 'main' | 'honorwall';
  onPress?: () => void;
}) => {
  const navigation = useNavigation<Navigation>();
  const reordered = [donors[1], donors[0], donors[2]];
  const badgeImages = [badge1, badge2, badge3];

  return variant === 'main' ? (
    <TouchableOpacity onPress={onPress}>
      <Top3View variant={variant}>
        {reordered.map((donor, i) => {
          const isFirst = i === 1;
          return (
            <View
              key={donor.id}
              style={{
                flex: 1,
                alignItems: 'center',
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
              }}>
              <ImageWrapper size={isFirst ? 80 : 69}>
                <StoreImage
                  source={donor.gallery[0]}
                  size={isFirst ? 80 : 69}
                />
                <BadgeImage
                  source={badgeImages[donors.indexOf(donor)]}
                  width={isFirst ? 37.384 : 34}
                  height={isFirst ? 39 : 35.469}
                />
              </ImageWrapper>
              <View style={{gap: 4, alignItems: 'center'}}>
                <CustomText
                  style={{fontSize: 15, color: colors.gray8}}
                  weight="600">
                  {donor.name}
                </CustomText>
                <CustomText style={{fontSize: 11, color: colors.gray7}}>
                  기부 {donor.donationCount}회
                </CustomText>
              </View>
            </View>
          );
        })}
      </Top3View>
    </TouchableOpacity>
  ) : (
    <Top3View variant={variant}>
      {reordered.map((donor, i) => {
        const isFirst = i === 1;
        return (
          <TouchableOpacity
            key={donor.id}
            style={{
              flex: 1,
              alignItems: 'center',
              width: '100%',
              height: '100%',
              justifyContent: 'flex-end',
            }}
            onPress={() =>
              navigation.navigate('DonationStoreDetail', {
                storeId: donor.id,
                rank: i + 1,
              })
            }>
            <ImageWrapper size={isFirst ? 80 : 69}>
              <StoreImage source={donor.gallery[0]} size={isFirst ? 80 : 69} />
              <BadgeImage
                source={badgeImages[donors.indexOf(donor)]}
                width={isFirst ? 37.384 : 34}
                height={isFirst ? 39 : 35.469}
              />
            </ImageWrapper>
            <View style={{gap: 4, alignItems: 'center'}}>
              <CustomText style={{fontSize: 15}} weight="600">
                {donor.name}
              </CustomText>
              <CustomText style={{fontSize: 11}}>
                기부 {donor.donationCount}회
              </CustomText>
            </View>
          </TouchableOpacity>
        );
      })}
    </Top3View>
  );
};

export default DonorTop3;
