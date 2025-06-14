import React from 'react';
import {Image, View} from 'react-native';
import CustomText from '../ui/CustomText';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Donor} from '../../types/donation.types';

interface Props {
  donor: Donor;
  onPress: () => void;
  rank: number;
}

const RankItemWrapper = styled.Pressable`
  margin-top: 12px;
`;

const RankItem = ({donor, rank, onPress}: Props) => {
  return (
    <RankItemWrapper key={donor.id} onPress={onPress}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
        }}>
        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <CustomText
            style={{
              width: 17,
              fontSize: 15,
              color: colors.gray8,
              textAlign: 'center',
            }}
            weight="600">
            {rank}
          </CustomText>
          <Image
            source={donor.gallery[0]}
            style={{width: 40, height: 40, borderRadius: 40}}
          />
          <CustomText style={{fontSize: 15, color: colors.gray8}} weight="600">
            {donor.name}
          </CustomText>
        </View>
        <CustomText style={{fontSize: 11, color: colors.gray7}}>
          기부 {donor.donationCount}회
        </CustomText>
      </View>

      {rank < 10 ? (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: colors.gray2,
            marginTop: 12,
          }}
        />
      ) : (
        <View
          style={{
            height: 1,
            marginTop: 12,
          }}
        />
      )}
    </RankItemWrapper>
  );
};

export default RankItem;
