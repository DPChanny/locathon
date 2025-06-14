import React from 'react';
import * as S from '../../styles/Button.styles';

const SecondaryButton = ({title, onPress}: any) => {
  return (
    <S.SecondaryWrapper onPress={onPress}>
      <S.ButtonText>{title}</S.ButtonText>
    </S.SecondaryWrapper>
  );
};

export default SecondaryButton;
