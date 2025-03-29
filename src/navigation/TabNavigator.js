import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
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

const CustomHeader = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
           
          />
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate('NotificationScreen')}
        >
          <Icon name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        tabBarActiveTintColor: '#ffcc00',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'black',
        },
        header: () => <CustomHeader />
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

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'black',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: Platform.OS === 'ios' ? 88 : 56,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 120,
  },
  notificationButton: {
    padding: 8,
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'ios' ? 46 : 16,
  },
});

export default TabNavigator; 