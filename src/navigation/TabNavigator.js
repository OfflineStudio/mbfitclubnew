import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsScreen from '../pages/news';
import ActivitiesScreen from '../pages/activities';
import QrCodeScreen from '../pages/qr';
import ExerciseCardScreen from '../pages/exercisecard';
import MenuScreen from '../pages/menu';
import translations from '../configs/translations';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsStore from '../stores/NewsStore';
import ActivitiesStore from '../stores/ActivitiesStore';

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
            <Icon name="newspaper-o" size={size} color={color} />
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
            <Icon name="bicycle" size={size} color={color} />
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
            <Icon name="qrcode" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => {
          
          },
        }}
      />
      <Tab.Screen 
        name="ExerciseCard" 
        component={ExerciseCardScreen}
        options={{
          tabBarLabel: translations.exercisecard,
          tabBarIcon: ({ color, size }) => (
            <Icon name="heartbeat" size={size} color={color} />
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
            <Icon name="bars" size={size} color={color} />
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