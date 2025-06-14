import React from 'react';
import {TextInputProps, View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import CustomText from '../ui/CustomText';
import {font} from '../../styles/font.styles';

interface LabeledInputProps extends TextInputProps {
  label: string;
  placeholder: string;
}

const Label = styled(CustomText).attrs({
  weight: '600',
})`
  font-size: 15px;
  color: ${colors.gray8};
`;

const CustomInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: colors.gray5,
}))`
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  background-color: white;
  color: ${colors.gray8};
  font-family: ${font.pretendard400.fontFamily};
  font-size: 13px;
  border-radius: 20px;
  border: 1px solid ${colors.green};
`;

const LabeledInput = ({
  label,
  placeholder,
  ...textInputProps
}: LabeledInputProps) => {
  return (
    <View style={{width: '100%', gap: 12, marginBottom: 32}}>
      <Label>{label}</Label>
      <CustomInput placeholder={placeholder} {...textInputProps} />
    </View>
  );
};

export default LabeledInput;
