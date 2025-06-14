import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../styles/colors';

const CustomToast = ({text1, text2}: any) => (
  <View
    style={{
      width: '90%',
      backgroundColor: colors.red,
      padding: 16,
      borderRadius: 10,
      marginHorizontal: 20,
      marginBottom: 60,
    }}>
    <Text style={{color: 'white', fontSize: 16}}>{text1}</Text>
    {text2 && <Text style={{color: 'white', fontSize: 13}}>{text2}</Text>}
  </View>
);

export default CustomToast;
