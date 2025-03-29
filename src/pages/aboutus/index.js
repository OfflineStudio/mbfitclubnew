/* eslint-disable */
import React from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import LoginStore from '../../stores/LoginStore';
import translations from '../../configs/translations';

const AboutUsScreen = observer(() => {
  return (
    <WebView
      source={{ uri: LoginStore.aboutUsUrl }}
      startInLoadingState={true}
      originWhitelist={['*']}
      ignoreSslError={true}
    />
  );
});

AboutUsScreen.navigationOptions = {
  title: translations.aboutus,
  headerLayoutPreset: 'center'
};

export default AboutUsScreen;