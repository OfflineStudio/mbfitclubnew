import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import LoginStore from '../stores/LoginStore';
import PushNotification from 'react-native-push-notification';
import { NavigationService } from './NavigationService';
import NotificationStore from '../stores/NotificationStore';
class NotificationService {
  constructor() {
    this.createNotificationChannel();
    this.configurePushNotifications();
  }

  createNotificationChannel() {
    if (Platform.OS === 'android') {
      PushNotification.createChannel({
        channelId: 'default',
        channelName: 'Default Channel',
        channelDescription: 'Default notification channel for MB Fit Club',
        playSound: true,
        soundName: 'default',
        importance: 5,
        vibrate: true,
        enableVibration: true,
        enableLights: true,
      }, (created) => console.log(`Notification channel created: ${created}`));
    }
  }

  configurePushNotifications() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        NotificationStore.setAlert(true);
        if (notification.userInteraction) {
          NavigationService.navigate('NotificationScreen');
        }
        
        if (Platform.OS === 'ios') {
          notification.finish();
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
        criticalAlert: true,
      },
      popInitialNotification: true,
      requestPermissions: true
    });
  }

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
      this.showNotification(remoteMessage);
    });

    // Ön plan mesajlarını dinle
    messaging().onMessage(async remoteMessage => {
      console.log('Received foreground message:', remoteMessage);
      
      // Bildirimi göster
      this.showNotification(remoteMessage);
    });
  }

  showNotification(remoteMessage) {
    const notificationData = {
      channelId: 'default',
      title: remoteMessage.notification?.title || 'Yeni Bildirim',
      message: remoteMessage.notification?.body || '',
      smallIcon: 'ic_notification',
      largeIcon: 'ic_launcher',
      priority: 'max',
      importance: 'high',
      vibrate: true,
      vibration: 1000,
      playSound: true,
      soundName: 'default',
      invokeApp: true,
      autoCancel: true,
      data: remoteMessage.data,
      ongoing: false,
      alertAction: 'view',
      category: 'notification',
      id: Math.floor(Math.random() * 1000000),
      userInteraction: true,
      actions: ['Görüntüle'],
    };

    console.log('Showing notification:', notificationData);
    PushNotification.localNotification(notificationData);
  }
}

export default new NotificationService(); 