import {PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const useImagePicker = () => {
  const requestGalleryPermission = async () => {
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

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 접근 권한 요청',
          message: '사진을 찍으려면 카메라 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImages = async (
    multiple: boolean = false,
    maxCount: number = 1,
  ): Promise<string[]> => {
    const hasPermission = await requestGalleryPermission();
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

  const takePhoto = async (): Promise<string | null> => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return null;

    return new Promise(resolve => {
      launchCamera(
        {
          mediaType: 'photo',
          saveToPhotos: true,
        },
        res => {
          const uri = res.assets?.[0]?.uri ?? null;
          resolve(uri);
        },
      );
    });
  };

  return {pickImages, takePhoto};
};
