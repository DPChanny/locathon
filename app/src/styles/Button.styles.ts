import styled from 'styled-components/native';
import {colors} from './colors';
import CustomText from '../components/ui/CustomText';

export const PrimaryWrapper = styled.Pressable`
  background-color: ${colors.green};
  width: 100%;
  height: 62px;
  padding: 19px 0;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const SecondaryWrapper = styled.Pressable`
  background-color: ${colors.green};
  width: 100%;
  height: 53px;
  padding: 14.5px 0;
  border-radius: 42px;
  justify-content: center;
  align-items: center;
`;

export const SelectWrapper = styled.Pressable<{isSelected: boolean}>`
  background-color: ${({isSelected}) => (isSelected ? colors.green : 'white')};
  padding: 7px 20px;
  height: 34px;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  border: ${({isSelected}) =>
    isSelected ? 'none' : `1px solid ${colors.green}`};
`;

export const SelectText = styled(CustomText).attrs({
  weight: '500',
})<{isSelected?: boolean}>`
  font-size: 13px;
  color: ${({isSelected}) => (isSelected ? colors.gray8 : colors.gray5)};
`;

export const ButtonText = styled(CustomText).attrs({
  weight: '500',
})`
  font-size: 16px;
  color: ${colors.gray8};
`;

export const IconImage = styled.Image<{size?: number}>`
  width: ${({size}) => size ?? 20}px;
  height: ${({size}) => size ?? 20}px;
`;
