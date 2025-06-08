import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import imageLogo from '../../assets/image_upload_logo.png';
import {Image} from 'react-native';
import CustomText from './CustomText';

const ImageBox = styled.TouchableOpacity`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  border: 1px solid ${colors.gray5};
  align-items: center;
  justify-content: center;
`;

const ImageUpload = ({onPress}: {onPress: () => void}) => {
  return (
    <ImageBox onPress={onPress}>
      <Image
        source={imageLogo}
        style={{width: 28, height: 28, marginBottom: 4}}
        resizeMode="contain"
      />
      <CustomText style={{fontSize: 11}}>이미지</CustomText>
    </ImageBox>
  );
};

export default ImageUpload;
