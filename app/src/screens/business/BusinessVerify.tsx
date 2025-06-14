import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Container} from '../../styles/GlobalStyles';
import ProgressBar from '../../components/ui/ProgressBar';
import BusinessInfoForm from '../../components/business/BusinessInfoForm';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BusinessImageUpload from '../../components/business/BusinessImageUpload';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import Animated, {SlideInLeft, SlideInRight} from 'react-native-reanimated';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const BusinessVerify = () => {
  const navigation = useNavigation<Navigation>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: '',
  });
  const {bottom} = useSafeAreaInsets();

  return (
    <Container>
      <ProgressBar progress={step === 1 ? 0.66 : 1} />
      {step === 1 ? (
        <Animated.View
          entering={SlideInRight}
          exiting={SlideInLeft}
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            paddingBottom: bottom,
          }}>
          <View>
            <BusinessInfoForm
              formData={formData}
              onChange={(field, value) => {
                setFormData(prev => ({...prev, [field]: value}));
              }}
            />
          </View>
          <View>
            <PrimaryButton title="다음" onPress={() => setStep(2)} />
          </View>
        </Animated.View>
      ) : (
        <Animated.View
          entering={SlideInRight}
          exiting={SlideInLeft}
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            paddingBottom: bottom,
          }}>
          <View>
            <BusinessImageUpload />
          </View>
          <View>
            <PrimaryButton
              title="확인"
              onPress={() => navigation.navigate('Main')}
            />
          </View>
        </Animated.View>
      )}
    </Container>
  );
};

export default BusinessVerify;
