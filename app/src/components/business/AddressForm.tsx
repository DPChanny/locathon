import React from 'react';
import {Pressable, View} from 'react-native';
import styled from 'styled-components/native';
import CustomText from '../ui/CustomText';
import {colors} from '../../styles/colors';
import {font} from '../../styles/font.styles';

const Label = styled(CustomText).attrs({
  weight: '600',
})`
  font-size: 15px;
  color: ${colors.gray8};
`;

const CustomInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: colors.gray5,
}))`
  flex: 1;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  background-color: #eae5e0;
  color: ${colors.gray5};
  font-family: ${font.pretendard400.fontFamily};
  font-size: 13px;
  border-radius: 20px;
`;

const AddressButton = styled.Pressable`
  background-color: white;
  height: 48px;
  padding: 12px 0;
  border: 1px solid #eae5e0;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const AddressBtnText = styled(CustomText).attrs({
  weight: '500',
})`
  font-size: 13px;
  color: ${colors.gray4};
`;

const AddressForm = () => {
  return (
    <View style={{width: '100%', gap: 12, marginBottom: 32}}>
      <Label>주소</Label>
      <View style={{gap: 8}}>
        <View style={{flexDirection: 'row', gap: 8}}>
          <CustomInput placeholder="사업자 전화번호를 입력하세요." />
          <AddressButton style={{width: 119}}>
            <AddressBtnText style={{}}>주소 검색</AddressBtnText>
          </AddressButton>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <CustomInput placeholder="상세 정보를 입력하세요." />
          <AddressButton style={{width: 165}}>
            <AddressBtnText>위치 확인/지도보기</AddressBtnText>
          </AddressButton>
        </View>
      </View>
    </View>
  );
};

export default AddressForm;
