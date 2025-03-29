/* eslint-disable */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import LoginStore from '../../stores/LoginStore';
import { Linking } from 'react-native';
import translations from '../../configs/translations';

const NewPurchasesScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    Linking.openURL(LoginStore.newPurchases);
  }, []);

  return null;
});

export default NewPurchasesScreen;