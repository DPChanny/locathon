import React from 'react';
import LabeledInput from '../inputs/LabeledInput';
import {View} from 'react-native';
import AddressForm from './AddressForm';
import CustomText from '../ui/CustomText';
import {Donor} from '../../types/donation.types';

interface Props {
  formData: Partial<Donor>;
  onChange: (field: keyof Donor, value: string) => void;
}

const BusinessInfoForm = ({formData, onChange}: Props) => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomText
        style={{
          alignSelf: 'flex-start',
          fontSize: 20,
          lineHeight: 30,
          marginTop: 24,
          marginBottom: 24,
        }}
        weight="600">
        사업자 등록 정보를{'\n'}기준으로 작성해 주세요
      </CustomText>
      <LabeledInput label="사업자명" placeholder="사업자명을 입력하세요." />
      <LabeledInput
        label="사업자 전화번호"
        placeholder="사업자 전화번호를 입력하세요."
      />
      <AddressForm />
      <LabeledInput label="업종을 입력하세요" placeholder="업종" />
    </View>
  );
};

export default BusinessInfoForm;
