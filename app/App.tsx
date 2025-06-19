import React, {useEffect} from 'react';
import StackNavigator from './src/screens/navigation/StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomErrToast from './src/components/ui/CustomErrToast';
import CustomSuccessToast from './src/components/ui/CustomSuccessToast';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';

const App: React.FC = () => {
  useEffect(() => {
    console.log('Google Client ID:', GOOGLE_CLIENT_ID);

    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
    });
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          hidden={false}
        />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
        <Toast
          config={{
            myCustomToast: props => <CustomErrToast {...props} />,
            mySuccessToast: props => <CustomSuccessToast {...props} />,
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
