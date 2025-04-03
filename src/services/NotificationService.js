import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import LoginStore from '../stores/LoginStore';

class NotificationService {
  async requestUserPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  }

  async getFCMToken() {
    try {
      await this.requestUserPermission();
      
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        LoginStore.setDeviceToken(fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
    return null;
  }

  async onMessageReceived() {
    // Arka plan mesajlarını dinle
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Ön plan mesajlarını dinle
    return messaging().onMessage(async remoteMessage => {
      console.log('Received foreground message:', remoteMessage);
    });
  }
}

export default new NotificationService(); 