import React, {useState} from 'react';
import {Image, PermissionsAndroid, Platform, View} from 'react-native';
import CustomText from '../ui/CustomText';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import ImageUpload from '../ui/ImageUpload';
import {launchImageLibrary} from 'react-native-image-picker';
import {FlatList} from 'react-native-gesture-handler';
import plusIcon from '../../assets/plus.png';
import {useImagePicker} from '../hooks/useImagePicker';

const MAX_DETAIL_IMAGES = 5;

const ImageSection = styled.View`
  width: 100%;
  padding: 18px 20px;
  border: 1px solid ${colors.gray5};
  border-radius: 20px;
`;

const Label = styled(CustomText).attrs({
  weight: '600',
})`
  font-size: 15px;
  color: #000;
  margin-bottom: 12px;
`;

const PreviewImage = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  border: 1px solid ${colors.gray5};
`;

const Gap = styled.View`
  width: 8px;
`;

const ImageBox = styled.TouchableOpacity`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  border: 1px solid ${colors.gray5};
  align-items: center;
  justify-content: center;
  margin-left: 8;
`;

const BusinessImageUpload = () => {
  const {pickImages} = useImagePicker();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [detailImages, setDetailImages] = useState<string[]>([]);

  const handleProfile = async () => {
    const [uri] = await pickImages(false);
    if (uri) setProfileImage(uri);
  };

  const handleDetail = async () => {
    const uris = await pickImages(
      true,
      MAX_DETAIL_IMAGES - detailImages.length,
    );
    setDetailImages(prev => [...prev, ...uris]);
  };

  return (
    <View>
      <CustomText
        style={{
          alignSelf: 'flex-start',
          fontSize: 20,
          lineHeight: 30,
          marginTop: 24,
          marginBottom: 24,
        }}
        weight="600">
        가게 이미지를 등록해 주세요
      </CustomText>
      <CustomText
        style={{
          fontSize: 15,
          lineHeight: 22.5,
          marginBottom: 24,
        }}>
        지도 페이지에{'\n'}설정하신 이미지가 노출됩니다
      </CustomText>
      <ImageSection>
        <Label>프로필 이미지</Label>
        {profileImage ? (
          <PreviewImage source={{uri: profileImage}} />
        ) : (
          <ImageUpload onPress={() => handleProfile} />
        )}
        <Label style={{marginTop: 16}}>상세 이미지 (0/5)</Label>
        {detailImages.length === 0 ? (
          <ImageUpload onPress={handleDetail} />
        ) : (
          <FlatList
            horizontal
            data={detailImages}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({item}) => <PreviewImage source={{uri: item}} />}
            ItemSeparatorComponent={() => <Gap />}
            ListFooterComponent={
              detailImages.length < MAX_DETAIL_IMAGES ? (
                <ImageBox onPress={handleDetail}>
                  <Image
                    source={plusIcon}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                </ImageBox>
              ) : null
            }
          />
        )}
      </ImageSection>
    </View>
  );
};

export default BusinessImageUpload;
