import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsScreen from '../pages/news';
import ActivitiesScreen from '../pages/activities';
import QrCodeScreen from '../pages/qr';
import ExerciseCardScreen from '../pages/exercisecard';
import MenuScreen from '../pages/menu';
import translations from '../configs/translations';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsStore from '../stores/NewsStore';
import ActivitiesStore  from '../stores/ActivitiesStore';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="News" 
        component={NewsScreen}
        options={{
          tabBarLabel: translations.news,
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
            NewsStore.getNews();
           
          },
        }}
      />
      <Tab.Screen 
        name="Activities" 
        component={ActivitiesScreen}
        options={{
          tabBarLabel: translations.activities,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bicycle-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
          	ActivitiesStore.getTypes();
          },
        }}
      />
      <Tab.Screen 
        name="QrCode" 
        component={QrCodeScreen}
        options={{
          tabBarLabel: translations.qrcode,
          tabBarIcon: ({ color, size }) => (
            <Icon name="qr-code-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
            QrStore.setTimer(false);
          },
        }}
      />
      <Tab.Screen 
        name="ExerciseCard" 
        component={ExerciseCardScreen}
        options={{
          tabBarLabel: translations.exercisecard,
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-pulse-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
         
          },
        }}
      />
      <Tab.Screen 
        name="Menu" 
        component={MenuScreen}
        options={{
          tabBarLabel: translations.menu,
          tabBarIcon: ({ color, size }) => (
            <Icon name="menu-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
         
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator; 