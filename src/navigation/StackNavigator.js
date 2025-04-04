import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ExerciseCardDetail from '../pages/exercisecard/detail';
import ExerciseVideoScreen from '../pages/exercisecard/video';
import LoginScreen from '../pages/login';
import LogoutScreen from '../pages/login/logout';
import ForgotPassword from '../pages/forgotpassword';
import AboutUsScreen from '../pages/aboutus';
import ContactScreen from '../pages/contact';
import CustomerIdentityScreen from '../pages/customerIdentity';
import ChangePasswordScreen from '../pages/changepassword';
import SSSScreen from '../pages/sss';
import SSSDetailScreen from '../pages/sss/detail';
import MembershipScreen from '../pages/membership';
import LastEntriesScreen from '../pages/lastentries';
import BranchScreen from '../pages/branch';
import BranchDetailScreen from '../pages/branch/detail';
import CareerScreen from '../pages/career';
import NotificationScreen from '../pages/notification';
import ActivityDetailScreen from '../pages/activities/detail';
import translations from '../configs/translations';

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
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
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
      <Stack.Screen 
        name="ExerciseVideoScreen" 
        component={ExerciseVideoScreen}
        options={{
          headerShown: true,
          title: 'Egzersiz Videosu'
        }}
      />
      <Stack.Screen 
        name="AboutUsScreen" 
        component={AboutUsScreen}
        options={{
          headerShown: true,
          title: translations.aboutus
        }}
      />
      <Stack.Screen 
        name="ContactScreen" 
        component={ContactScreen}
        options={{
          headerShown: true,
          title: translations.contact
        }}
      />
      <Stack.Screen 
        name="CustomerIdentityScreen" 
        component={CustomerIdentityScreen}
        options={{
          headerShown: true,
          title: translations.userinfo
        }}
      />
      <Stack.Screen 
        name="ChangePasswordScreen" 
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          title: translations.changepassword
        }}
      />
      <Stack.Screen 
        name="SSSScreen" 
        component={SSSScreen}
        options={{
          headerShown: true,
          title: translations.sss
        }}
      />
      <Stack.Screen 
        name="SSSDetailScreen" 
        component={SSSDetailScreen}
        options={{
          headerShown: true,
          title: translations.sss
        }}
      />
      <Stack.Screen 
        name="MembershipScreen" 
        component={MembershipScreen}
        options={{
          headerShown: true,
          title: translations.memberships
        }}
      />
      <Stack.Screen 
        name="LastEntriesScreen" 
        component={LastEntriesScreen}
        options={{
          headerShown: true,
          title: translations.entryrecords
        }}
      />
      <Stack.Screen 
        name="BranchScreen" 
        component={BranchScreen}
        options={{
          headerShown: true,
          title: translations.branches
        }}
      />
      <Stack.Screen 
        name="BranchDetailScreen" 
        component={BranchDetailScreen}
        options={{
          headerShown: true,
          title: translations.branches
        }}
      />
      <Stack.Screen 
        name="CareerScreen" 
        component={CareerScreen}
        options={{
          headerShown: true,
          title: translations.career || 'Kariyer'
        }}
      />
      <Stack.Screen 
        name="NotificationScreen" 
        component={NotificationScreen}
        options={{
          headerShown: true,
          title: translations.notifications || 'Bildirimler'
        }}
      />
      <Stack.Screen 
        name="ActivityDetailScreen" 
        component={ActivityDetailScreen}
        options={{
          headerShown: true,
          title: translations.activities || 'Aktiviteler'
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator; 