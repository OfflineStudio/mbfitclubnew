/* eslint-disable */
import React, { Component } from 'react'; 
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';
import LoginStore from '../../stores/LoginStore';

import translations from '../../configs/translations'
@observer
class CareerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: translations.career,
    headerLayoutPreset: 'center'
  });

  render() {
     
      return (
        <WebView
          source={{uri: LoginStore.careerUrl}}
          startInLoadingState={true}
          originWhitelist={['*']}
          ignoreSslError={true}
        />
      );
     
  }
}
export default withNavigation(CareerScreen)