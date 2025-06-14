import React from 'react';
import StackNavigator from './src/screens/navigation/StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomToast from './src/components/ui/CustomToast';

const App: React.FC = () => {
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
            myCustomToast: props => <CustomToast {...props} />,
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
