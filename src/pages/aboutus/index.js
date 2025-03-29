/* eslint-disable */
import React, { Component } from 'react'; 
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';
import LoginStore from '../../stores/LoginStore';

import translations from '../../configs/translations'
@observer
class AboutUsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: translations.aboutus,
    headerLayoutPreset: 'center'
  });

  render() {
     
      return (
        <WebView
          source={{uri: LoginStore.aboutUsUrl}}
          startInLoadingState={true}
          originWhitelist={['*']}
          ignoreSslError={true}
        />
      );
     
  }
}
export default withNavigation(AboutUsScreen)