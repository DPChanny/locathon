import React, {useState} from 'react';
import {Container} from '../../styles/GlobalStyles';
import {donors} from '../../data/dummyData';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SharedStackParamList} from './SharedStack';
import CustomText from '../../components/ui/CustomText';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import SelectButton from '../../components/buttons/SelectButton';
import {donationHistoryList} from '../../data/donationHistoryData';
import HistoryCard from '../../components/donation/HistoryCard';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LabeledView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const DonationHistory = () => {
  const {bottom} = useSafeAreaInsets();
  const route = useRoute<RouteProp<SharedStackParamList, 'DonationHistory'>>();
  const {storeId} = route.params;
  const store = donors.find(d => d.id === storeId);
  const [filter, setFilter] = useState<'전체' | '1개월' | '3개월'>('전체');

  const filterByDate = (timestamp: number) => {
    const now = Date.now();
    if (filter === '1개월') {
      const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
      return timestamp >= oneMonthAgo;
    }
    if (filter === '3개월') {
      const threeMonthAgo = now - 90 * 24 * 60 * 60 * 1000;
      return timestamp >= threeMonthAgo;
    }
    return true;
  };

  const history = donationHistoryList
    .filter(item => filterByDate(item.timestamp))
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Container>
      <LabeledView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 7,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <CustomText style={{fontSize: 15}}>기부 횟수</CustomText>
        <CustomText style={{fontSize: 17}} weight="600">
          {store?.donationCount}회
        </CustomText>
      </LabeledView>
      <View style={{backgroundColor: colors.gray2, width: '100%', height: 1}} />
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginVertical: 15,
          alignSelf: 'flex-start',
        }}>
        {['전체', '1개월', '3개월'].map(label => (
          <SelectButton
            key={label}
            title={label}
            isSelected={filter == label}
            onPress={() => setFilter(label as typeof filter)}
          />
        ))}
      </View>
      <ScrollView style={{width: '100%', marginBottom: bottom}}>
        {history.map(item => (
          <HistoryCard
            key={item.id}
            id={item.id}
            timestamp={item.timestamp}
            status={item.status as '기부완료' | '대기중'}
            image={item.image}
            title={item.title}
            quantity={item.quantity}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default DonationHistory;
