import React from 'react';
import styled from 'styled-components/native';
import {DonationHistoryItem} from '../../types/donation.types';
import {View} from 'react-native';
import CustomText from '../ui/CustomText';
import {colors} from '../../styles/colors';

const Card = styled.View`
  width: 100%;
  height: 163px;
  background-color: white;
  border: 1px solid ${colors.gray2};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 12px;
`;

const Thumbnail = styled.Image`
  width: 92px;
  height: 92px;
  border-radius: 8px;
`;

const HistoryCard = ({
  title,
  timestamp,
  image,
  status,
  quantity,
}: DonationHistoryItem) => {
  const date = new Date(timestamp);
  const year = String(date.getFullYear() % 100);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = date.toLocaleDateString('ko-KR', {weekday: 'short'});
  const formattedDate = `${year}.${month}.${day} (${weekday})`;
  const formattedTime = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}>
          <CustomText style={{color: colors.gray8, fontSize: 15}}>
            {formattedDate}
          </CustomText>
          <CustomText style={{color: colors.gray5, fontSize: 13}}>
            {formattedTime}
          </CustomText>
        </View>
        <CustomText style={{color: colors.gray5, fontSize: 15}} weight="600">
          {status}
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
          marginTop: 12,
        }}>
        <Thumbnail source={image} />
        <View style={{gap: 4}}>
          <CustomText style={{color: colors.gray8, fontSize: 15}} weight="600">
            {title}
          </CustomText>
          <CustomText style={{color: colors.gray8, fontSize: 15}}>
            {quantity}개
          </CustomText>
        </View>
      </View>
    </Card>
  );
};

export default HistoryCard;
