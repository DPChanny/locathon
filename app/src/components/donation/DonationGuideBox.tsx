import React from 'react';
import styled from 'styled-components/native';
import o_icon from '../../assets/images/icon/o_icon.png';
import x_icon from '../../assets/images/icon/x_icon.png';
import {Image, View} from 'react-native';
import {colors} from '../../styles/colors';
import CustomText from '../ui/CustomText';

const BoxView = styled.View`
  width: 100%;
  height: 214px;
  background-color: white;
  border: 1px solid ${colors.red};
  border-radius: 20px;
  padding: 16px 20px;
`;

const IconBox = styled.View`
  width: 16.414px;
  height: 16.414px;
  background-color: ${colors.red};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.View`
  width: 1px;
  height: 35px;
  background-color: ${colors.gray6};
`;

const DonationGuideBox = () => {
  return (
    <BoxView>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 7.59}}>
        <IconBox>
          <Image source={o_icon} style={{width: 10, height: 10}} />
        </IconBox>
        <CustomText style={{fontSize: 15, color: colors.gray8}} weight="600">
          공유 가능한 음식
        </CustomText>
      </View>
      <CustomText style={{fontSize: 15, color: colors.gray8, marginTop: 8}}>
        유통기한이 3일 이상 남은 음식
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          height: 35,
          alignItems: 'center',
          gap: 7.34,
          marginTop: 8,
          marginBottom: 12,
        }}>
        <Divider />
        <CustomText
          style={{
            fontSize: 13,
            color: colors.gray6,
            lineHeight: 15.6,
            alignItems: 'center',
          }}>
          채소, 식재료, 과일, 반찬류, 통조림 등 가공품, 반조리식품,{'\n'}
          냉동식품, 음료수, 빵, 떡, 간식류, 곡류, 음식적 상품권(쿠폰) 등
        </CustomText>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 7.59}}>
        <IconBox>
          <Image source={x_icon} style={{width: 14, height: 14}} />
        </IconBox>
        <CustomText style={{fontSize: 15, color: colors.gray8}} weight="600">
          공유 불가능한 음식
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 35,
          alignItems: 'center',
          gap: 7.34,
          marginTop: 8,
        }}>
        <Divider />
        <CustomText
          style={{
            fontSize: 13,
            color: colors.red,
            lineHeight: 15.6,
            alignItems: 'center',
          }}>
          유통기한이 지난 음식물,{'\n'}
          주류, 약품류, 건강보조식품, 불량식품 등
        </CustomText>
      </View>
    </BoxView>
  );
};

export default DonationGuideBox;
