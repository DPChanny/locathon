import React, {useState} from 'react';
import {Image, Modal, Pressable, View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import x_icon from '../../assets/images/icon/x_icon.png';
import CustomText from './CustomText';
import stampModal from '../../assets/images/modal/stamp_modal.png';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalBackView = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  padding-horizontal: 40px;
`;

const ModalView = styled.View`
  background-color: ${colors.cream};
  width: 100%;
  height: 383px;
  border: 2px solid ${colors.green};
  padding: 12px;
  border-radius: 20px;
  align-items: center;
`;

const CenterModal = ({visible, onClose}: Props) => {
  const [stampCount, setStampCount] = useState(2);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <ModalBackView>
        <ModalView>
          <View style={{width: '100%', alignItems: 'flex-end'}}>
            <Pressable style={{width: 24, height: 24}} onPress={onClose}>
              <Image
                source={x_icon}
                style={{tintColor: colors.gray8, width: 24, height: 24}}
              />
            </Pressable>
          </View>
          <View style={{alignItems: 'center', gap: 4}}>
            <CustomText
              style={{fontSize: 20, color: colors.gray8, marginTop: 3.5}}
              weight="600">
              새로운 스탬프를 얻었어요!
            </CustomText>
            <Image source={stampModal} style={{width: 264, height: 217}} />
            <View style={{alignItems: 'center'}}>
              <CustomText
                style={{fontSize: 17, color: colors.gray8}}
                weight="600">
                지금까지 총 {stampCount}개를 모았어요
              </CustomText>
              <CustomText style={{fontSize: 15, color: colors.gray8}}>
                마이페이지에서 봉사시간으로 바꿔보세요
              </CustomText>
            </View>
          </View>
        </ModalView>
      </ModalBackView>
    </Modal>
  );
};

export default CenterModal;
