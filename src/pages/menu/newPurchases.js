/* eslint-disable */
import React, { Component } from 'react'; 
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import LoginStore  from '../../stores/LoginStore';
import { Linking } from 'react-native';
import translations from '../../configs/translations'
@observer
class newPurchasesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: translations.aboutus,
    headerLayoutPreset: 'center'
  });

  render() {
     
      return (
        Linking.openURL(LoginStore.newPurchases)
      );
     
  }
}
export default withNavigation(newPurchasesScreen)