import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoreProvider } from './src/stores/StoreProvider.js';
import LoginScreen from './src/pages/login';
import StackNavigator from './src/navigation/StackNavigator';
import ForgotPassword from './src/pages/forgotpassword';
import { colors } from './src/theme/colors';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import NotificationService from './src/services/NotificationService';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    // Uygulama başladığında dikey moda kilitle
    Orientation.lockToPortrait();
    initNotifications();
  }, []);

  const initNotifications = async () => {
    try {
      // FCM token'ı al ve LoginStore'a kaydet
      const token = await NotificationService.getFCMToken();
      
      if (token) {
        console.log('FCM Token:', token);
      }

      // Bildirimleri dinlemeye başla
      NotificationService.onMessageReceived();
    } catch (error) {
      console.log('Notification initialization error:', error);
    }
  };

  return (
    <NavigationContainer>
      <StoreProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.background}
          />
          <StackNavigator />
        </SafeAreaView>
      </StoreProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App; 