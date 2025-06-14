import React, {useState} from 'react';
import {Container} from '../../styles/GlobalStyles';
import DonationGuideBox from '../../components/donation/DonationGuideBox';
import styled from 'styled-components/native';
import CustomText from '../../components/ui/CustomText';
import {colors} from '../../styles/colors';
import {font} from '../../styles/font.styles';
import {Image, Modal, View} from 'react-native';
import share from '../../assets/images/icon/share.png';
import ImageUploadModal from '../../components/ui/ImageUploadModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Toast from 'react-native-toast-message';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DonationStackParam} from './DonationStack';
import {useNavigation} from '@react-navigation/native';
import CenterModal from '../../components/ui/CenterModal';

type Navigation = NativeStackNavigationProp<DonationStackParam>;

const Label = styled(CustomText).attrs({
  weight: '600',
})`
  font-size: 17px;
  color: ${colors.gray8};
`;

const CustomInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: colors.gray5,
}))`
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  background-color: white;
  color: ${colors.gray8};
  font-family: ${font.pretendard400.fontFamily};
  font-size: 13px;
  border-radius: 20px;
  border: 1px solid ${colors.green};
`;

const UploadButton = styled.Pressable`
  width: 132px;
  height: 48px;
  padding: 14px 25px;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  border: 1px solid ${colors.green};
  background-color: white;
  border-radius: 20px;
`;

const DonationCertify = () => {
  const navigation = useNavigation<Navigation>();
  const {bottom} = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [stampModalVisible, setStampModalVisible] = useState(false);

  const [itemName, setItemName] = useState('');
  const [itemCount, setItemCount] = useState(0);

  const handleUpload = () => {
    /*
    if (!uploadedImage) {
      Toast.show({
        type: 'myCustomToast',
        text1: '이미지 오류',
        text2: '이미지를 등록해주세요.',
        position: 'bottom',
      });
      return;
    }
    if (!itemName || !itemCount) {
      Toast.show({
        type: 'myCustomToast',
        text1: '입력 오류',
        text2: '모든 정보를 입력해주세요.',
        position: 'bottom',
      });
      return;
    }
      */
    setStampModalVisible(true);
  };

  return (
    <Container style={{paddingBottom: bottom, justifyContent: 'space-between'}}>
      <View style={{width: '100%'}}>
        <DonationGuideBox />
        <View style={{width: '100%', gap: 12, marginTop: 28, marginBottom: 40}}>
          <Label>1. 기부 이미지를 업로드해주세요.</Label>
          <UploadButton
            onPress={() => setModalVisible(true)}
            disabled={!!uploadedImage}
            style={{
              backgroundColor: uploadedImage ? colors.gray2 : 'white',
            }}>
            <Image source={share} style={{width: 15, height: 15}} />
            <CustomText>사진 올리기</CustomText>
          </UploadButton>
        </View>
        <View style={{width: '100%', gap: 12, marginBottom: 40}}>
          <Label>2. 기부 물품을 입력해주세요.</Label>
          <CustomInput placeholder="기부 물품을 입력해주세요" />
        </View>
        <View style={{width: '100%', gap: 12}}>
          <Label>3. 물품 개수를 입력해주세요.</Label>
          <CustomInput placeholder="기부 개수를 입력해주세요" />
        </View>
        <ImageUploadModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onImageSelect={uri => {
            setUploadedImage(uri);
            setModalVisible(false);
          }}
        />
      </View>
      <View style={{width: '100%'}}>
        <PrimaryButton title="확인" onPress={handleUpload} />
      </View>
      <CenterModal
        visible={stampModalVisible}
        onClose={() => {
          setStampModalVisible(false);
          navigation.navigate('DonationMain');
        }}
      />
    </Container>
  );
};

export default DonationCertify;
