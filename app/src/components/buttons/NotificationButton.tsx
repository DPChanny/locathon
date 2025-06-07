import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, TouchableOpacity} from 'react-native';

const NotificationButton = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Shared', {screen: 'NotificationList'})
      }>
      <Image
        source={require('../../assets/Bell.png')}
        style={{width: 20, height: 20}}
      />
    </TouchableOpacity>
  );
};

export default NotificationButton;
