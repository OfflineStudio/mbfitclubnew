/* eslint-disable */
import React, { Component } from 'react'; 
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';
import LoginStore from '../../stores/LoginStore';

import translations from '../../configs/translations'
@observer
class ContactScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: translations.contact,
    headerLayoutPreset: 'center'
  });

  render() {
     
      return (
        <WebView
          source={{uri: LoginStore.contactUrl}}
          startInLoadingState={true}
          originWhitelist={['*']}
          ignoreSslError={true}
        />
      );
     
  }
}
export default withNavigation(ContactScreen)