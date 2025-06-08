import {View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from './colors';

export const Container = styled(View)`
  flex: 1;
  background-color: ${colors.cream};
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
