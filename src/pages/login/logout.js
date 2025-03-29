/* eslint-disable */
import React, { useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem('CoreMobile');
        navigation.navigate("LoginPage");
      } catch (err) {
        navigation.navigate("HomePage");
      }
    };

    handleLogout();
  }, [navigation]);

  return <View />;
};

export default LogoutScreen;