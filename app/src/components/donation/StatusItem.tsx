import React from 'react';
import CustomText from '../ui/CustomText';
import styled from 'styled-components/native';
import {View} from 'react-native';

interface Props {
  label: string;
  count?: number;
}

const getUnit = (label: string) => {
  if (label.includes('기부')) return '회';
  if (label.includes('스탬프')) return '개';
};

const ItemWrapper = styled.View`
  width: 100%;
  height: 32px;
  box-sizing: border-box;
  padding: 4px 12px;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  border-radius: 100px;
  align-items: center;
`;

const StatusItem = ({label, count}: Props) => {
  const unit = getUnit(label);

  return (
    <ItemWrapper>
      <CustomText style={{fontSize: 15}}>{label}</CustomText>
      <View style={{flexDirection: 'row'}}>
        <CustomText style={{fontSize: 15}} weight="600">
          {count}
        </CustomText>
        <CustomText style={{fontSize: 15}} weight="600">{`${unit}`}</CustomText>
      </View>
    </ItemWrapper>
  );
};

export default StatusItem;
