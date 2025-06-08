import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BusinessStackParam} from '../business/BusinessStack';
import start_logo from '../../assets/start_logo.png';
import header_logo from '../../assets/header_logo.png';
import start_msg from '../../assets/start_msg.png';
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
      <Image
        source={header_logo}
        style={{width: 30, height: 26, marginBottom: 113}}
        resizeMode="contain"
      />
      <Image
        source={start_logo}
        style={{width: 151, height: 132, marginBottom: 52}}
        resizeMode="contain"
      />
      <CustomText
        style={{textAlign: 'center', fontSize: 20, lineHeight: 30}}
        weight="700">
        지금 공유냉장고에서{'\n'}기부해보세요~
      </CustomText>
      <Image
        source={start_msg}
        style={{width: 135, height: 52, marginTop: 100}}
        resizeMode="contain"
      />
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
