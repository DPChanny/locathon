import React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import start_logo from '../../assets/images/start_logo.png';
import header_logo from '../../assets/images/header_logo.png';
import CustomText from '../../components/ui/CustomText';
import {View} from 'react-native';
import IconCircleRow from '../../components/ui/IconCircleRow';
import {colors} from '../../styles/colors';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import BusinessSignupText from '../../components/ui/BusinessSignupText';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const Onboarding = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: `${colors.cream}`,
        paddingLeft: 24,
        paddingRight: 24,
      }}>
      <View style={{width: '100%', paddingLeft: 16, paddingRight: 16}}>
        <Image
          source={header_logo}
          style={{
            width: 102,
            height: 21,
            alignSelf: 'flex-start',
            marginTop: 40,
            marginBottom: 15,
          }}
          resizeMode="contain"
        />
        <CustomText
          style={{
            fontSize: 22,
            lineHeight: 31.46,
            color: colors.gray8,
            alignSelf: 'flex-start',
          }}
          weight="700">
          우리 동네, 우리 손으로{'\n'}채우는 냉장고
        </CustomText>
      </View>
      <Image
        source={start_logo}
        style={{
          width: 246,
          height: 362,
          marginTop: 36.92,
          marginBottom: 14.62,
        }}
        resizeMode="contain"
      />
      <CustomText
        style={{
          fontSize: 15,
          color: '#7b7b7b',
        }}
        weight="400">
        간편 로그인
      </CustomText>
      <IconCircleRow />
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#b9b9b9',
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      <SecondaryButton
        title="사업자 로그인"
        onPress={() =>
          navigation.navigate('BusinessStack', {screen: 'BusinessLogin'})
        }
      />
      <BusinessSignupText
        onPress={() =>
          navigation.navigate('BusinessStack', {screen: 'BusinessRegister'})
        }
      />
    </SafeAreaView>
  );
};

export default Onboarding;
