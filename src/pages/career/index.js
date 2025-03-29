/* eslint-disable */
import React from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import LoginStore from '../../stores/LoginStore';
import translations from '../../configs/translations';

const CareerScreen = observer(() => {
  return (
    <WebView
      source={{ uri: LoginStore.careerUrl }}
      startInLoadingState={true}
      originWhitelist={['*']}
      ignoreSslError={true}
    />
  );
});

CareerScreen.navigationOptions = {
  title: translations.career,
  headerLayoutPreset: 'center'
};

export default CareerScreen;