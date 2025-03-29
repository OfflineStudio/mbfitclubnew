/* eslint-disable */
import React from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import LoginStore from '../../stores/LoginStore';
import translations from '../../configs/translations';

const ContactScreen = observer(() => {
  return (
    <WebView
      source={{ uri: LoginStore.contactUrl }}
      startInLoadingState={true}
      originWhitelist={['*']}
      ignoreSslError={true}
    />
  );
});

ContactScreen.navigationOptions = {
  title: translations.contact,
  headerLayoutPreset: 'center'
};

export default ContactScreen;