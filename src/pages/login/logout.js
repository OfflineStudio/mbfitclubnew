/* eslint-disable */
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';

const LogoutScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await AuthStore.userLogout();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } catch (err) {
        console.error('Logout error:', err);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    handleLogout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#7fcac6" />
    </View>
  );
});

export default LogoutScreen;