import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ExerciseCardDetail from '../pages/exercisecard/detail';
import LoginScreen from '../pages/login';
import ForgotPassword from '../pages/forgotpassword';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen 
        name="ExerciseCardDetail" 
        component={ExerciseCardDetail}
        options={{
          headerShown: true,
          title: 'Egzersiz Detayı'
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator; 