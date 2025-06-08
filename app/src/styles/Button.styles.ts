import styled from 'styled-components/native';
import {colors} from './colors';
import CustomText from '../components/CustomText';

export const PrimaryWrapper = styled.Pressable`
  background-color: ${colors.green};
  width: 364px;
  height: 62px;
  padding: 19px 0;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const SecondaryWrapper = styled.Pressable`
  background-color: ${colors.green};
  width: 364px;
  height: 53px;
  padding: 14.5px 0;
  border-radius: 42px;
  justify-content: center;
  align-items: center;
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
