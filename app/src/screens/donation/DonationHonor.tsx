import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DonationStackParam} from './DonationStack';
import {useNavigation} from '@react-navigation/native';
import {Container} from '../../styles/GlobalStyles';
import CustomText from '../../components/ui/CustomText';
import DonorTop3 from '../../components/donation/DonorTop3';
import {donors} from '../../data/dummyData';
import styled from 'styled-components/native';
import RankItem from '../../components/donation/RankItem';
import {colors} from '../../styles/colors';

type Navigation = NativeStackNavigationProp<DonationStackParam>;

const DonorRest = styled.View`
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid ${colors.gray2};
`;

const DonationHonor = () => {
  const navigation = useNavigation<Navigation>();
  const top3Donors = donors.slice(0, 3);
  const restDonors = donors.slice(3, 10);

  return (
    <Container>
      <CustomText
        style={{fontSize: 20, alignSelf: 'flex-start', marginBottom: 16}}
        weight="600">
        기부자 명예의 전당
      </CustomText>
      <DonorTop3 donors={top3Donors} variant="honorwall" />
      <DonorRest>
        {restDonors.map((donor, i) => (
          <RankItem
            key={donor.id}
            donor={donor}
            rank={i + 4}
            onPress={() =>
              navigation.navigate('DonationStoreDetail', {
                storeId: donor.id,
                rank: i + 4,
              })
            }
          />
        ))}
      </DonorRest>
    </Container>
  );
};

export default DonationHonor;
