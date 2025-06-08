import React from 'react';
import CustomText from './CustomText';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

const Underline = styled.View`
  background-color: #9f9f9f;
  width: 104px;
  height: 1px;
`;

interface Props {
  onPress?: () => void;
}

const BusinessSignupText: React.FC<Props> = ({onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{alignItems: 'center', justifyContent: 'center'}}>
      <CustomText
        style={{
          fontSize: 15,
          color: `${colors.gray5}`,
          marginTop: 14,
          marginBottom: 4,
        }}>
        사업자 회원가입
      </CustomText>
      <Underline />
    </Pressable>
  );
};

export default BusinessSignupText;
