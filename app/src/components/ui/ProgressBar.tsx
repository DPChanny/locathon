import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

interface ProgressBarProps {
  progress: number;
}

const ProgressBackground = styled.View`
  width: 100%;
  height: 8px;
  background-color: white;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.View<{progress: number}>`
  width: ${({progress}) => `${progress * 100}%`};
  height: 100%;
  background-color: ${colors.green};
  border-radius: 3px;
`;

const ProgressBar = ({progress}: ProgressBarProps) => {
  return (
    <ProgressBackground>
      <ProgressFill progress={progress} />
    </ProgressBackground>
  );
};

export default ProgressBar;
