import {PermissionsAndroid, Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export const useImagePicker = () => {
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const sdkInt = Number(Platform.Version);

      const permission =
        sdkInt >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission, {
        title: '이미지 접근 권한 요청',
        message: '이미지를 업로드하려면 사진 접근 권한이 필요합니다.',
        buttonNeutral: '나중에',
        buttonNegative: '거부',
        buttonPositive: '허용',
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImages = async (
    multiple: boolean = false,
    maxCount: number = 1,
  ): Promise<string[]> => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      console.warn('사진 권한이 거부됨');
      return [];
    }

    return new Promise(resolve => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: multiple ? maxCount : 1,
        },
        res => {
          const uris = res.assets?.map(a => a.uri).filter(Boolean) as string[];
          resolve(uris);
        },
      );
    });
  };

  return {pickImages};
};
