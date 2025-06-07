import React from 'react';
import * as S from '../../styles/IconButton.styles';

type IconParam = {
  icon: any;
  onPress?: () => void;
};

const IconButton = ({icon, onPress}: IconParam) => {
  return (
    <S.IconTouchable onPress={onPress}>
      <S.IconImage source={icon} />
    </S.IconTouchable>
  );
};

export default IconButton;
