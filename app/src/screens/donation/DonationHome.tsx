import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {DonationStackParam} from './DonationStack';
import {useNavigation} from '@react-navigation/native';
import {Container} from '../../styles/GlobalStyles';
import DottedBox from '../../components/donation/DottedBox';
import CustomText from '../../components/ui/CustomText';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import StatusItem from '../../components/donation/StatusItem';
import {donors} from '../../data/dummyData';
import DonorTop3 from '../../components/donation/DonorTop3';
import TopDonorCard from '../../components/donation/TopDonorCard';

type Navigation = NativeStackNavigationProp<DonationStackParam>;

const MyDoWrapper = styled.View`
  flex: 1;
  height: 152px;
  box-sizing: border-box;
  padding: 17px 16px;
  background-color: ${colors.green};
  border-radius: 20px;
  flex: 1;
  justify-content: space-between;
`;

const DonationHome = () => {
  const navigation = useNavigation<Navigation>();
  const top3Donors = donors.slice(0, 3);
  return (
    <Container>
      <View
        style={{flexDirection: 'row', width: '100%', gap: 12, marginTop: 10}}>
        <DottedBox onPress={() => navigation.navigate('DonationCertify')} />
        <MyDoWrapper>
          <CustomText style={{fontSize: 17, lineHeight: 22.5}} weight="600">
            내 기부 현황
          </CustomText>
          <View style={{gap: 8}}>
            <StatusItem label="기부횟수" count={1} />
            <StatusItem label="스탬프" count={3} />
          </View>
        </MyDoWrapper>
      </View>
      <View style={{gap: 12, marginTop: 28, marginBottom: 24}}>
        <CustomText
          style={{fontSize: 17, alignSelf: 'flex-start'}}
          weight="600">
          기부자 명예의 전당
        </CustomText>
        <DonorTop3
          donors={top3Donors}
          variant="main"
          onPress={() => navigation.navigate('DonationHonor')}
        />
      </View>
      <TopDonorCard donor={top3Donors[0]} />
    </Container>
  );
};

export default DonationHome;
