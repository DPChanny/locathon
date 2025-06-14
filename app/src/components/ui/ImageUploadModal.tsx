import React from 'react';
import {Image, Modal} from 'react-native';
import file from '../../assets/images/icon/file.png';
import camera from '../../assets/images/icon/camera.png';
import upload from '../../assets/images/icon/upload_green.png';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {useImagePicker} from '../hooks/useImagePicker';
import CustomText from './CustomText';

interface Props {
  visible: boolean;
  onClose: () => void;
  onImageSelect: (uri: string) => void;
}

const ModalBackView = styled.Pressable`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.25);
`;

const ModalView = styled.View`
  background-color: ${colors.cream};
  height: 167px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: 48px;
  padding-bottom: 39px;
  flex-direction: row;
  justify-content: center;
  gap: 64px;
`;

const ModalItem = styled.TouchableOpacity`
  align-items: center;
`;

const ImageUploadModal = ({visible, onClose, onImageSelect}: Props) => {
  const {pickImages, takePhoto} = useImagePicker();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <ModalBackView onPress={onClose}>
        <ModalView>
          <ModalItem
            onPress={async () => {
              const image = await pickImages(false);
              if (image.length > 0) {
                onImageSelect(image[0]);
              }
              onClose();
            }}>
            <Image source={file} style={{width: 47, height: 37}} />
            <CustomText style={{fontSize: 15, marginTop: 16}}>
              파일 선택
            </CustomText>
          </ModalItem>
          <ModalItem
            onPress={async () => {
              const image = await pickImages(false);
              if (image.length > 0) {
                onImageSelect(image[0]);
              }
              onClose();
            }}>
            <Image source={upload} style={{width: 36.358, height: 41}} />
            <CustomText style={{fontSize: 15, marginTop: 16}}>
              사진 업로드
            </CustomText>
          </ModalItem>
          <ModalItem
            onPress={async () => {
              const image = await takePhoto();
              if (image) {
                onImageSelect(image);
              }
              onClose();
            }}>
            <Image source={camera} style={{width: 46.52, height: 41}} />
            <CustomText style={{fontSize: 15, marginTop: 16}}>
              사진 찍기
            </CustomText>
          </ModalItem>
        </ModalView>
      </ModalBackView>
    </Modal>
  );
};

export default ImageUploadModal;
