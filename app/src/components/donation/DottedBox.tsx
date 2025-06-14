import React from 'react';
import {Image, View} from 'react-native';
import CustomText from '../ui/CustomText';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import plusIcon from '../../assets/images/plus.png';

interface Props {
  onPress: () => void;
}

const DottedView = styled.Pressable`
  flex: 1;
  box-sizing: border-box;
  height: 152px;
  padding: 17px 16px;
  border-radius: 20px;
  background: white;
  border: 2px dashed ${colors.green};
`;

const PlusButton = styled.View`
  width: 29px;
  height: 29px;
  background: ${colors.green};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const DottedBox = ({onPress}: Props) => {
  return (
    <DottedView onPress={onPress}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <CustomText
          style={{fontSize: 20, lineHeight: 30, color: colors.gray8}}
          weight="600">
          기부{'\n'}인증하기
        </CustomText>
        <View style={{alignItems: 'flex-end'}}>
          <PlusButton>
            <Image
              source={plusIcon}
              style={{width: 20, height: 20, tintColor: 'white'}}
            />
          </PlusButton>
        </View>
      </View>
    </DottedView>
  );
};

export default DottedBox;
