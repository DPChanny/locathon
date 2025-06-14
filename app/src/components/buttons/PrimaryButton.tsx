import React from 'react';
import * as S from '../../styles/Button.styles';

const PrimaryButton = ({title, onPress}: any) => {
  return (
    <S.PrimaryWrapper onPress={onPress}>
      <S.ButtonText>{title}</S.ButtonText>
    </S.PrimaryWrapper>
  );
};

export default PrimaryButton;
