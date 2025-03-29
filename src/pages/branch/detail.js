/* eslint-disable */
import React, { Component } from 'react'; 
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';
import BranchStore from '../../stores/BranchStore';
 
@observer
class BranchDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: BranchStore.selectBranchName,
    headerLayoutPreset: 'center'
  });

  render() {
     
      return (
        <WebView
          source={{uri: BranchStore.selectBranchUrl}}
          startInLoadingState={true}
          originWhitelist={['*']}
          ignoreSslError={true}
        />
      );
     
  }
}
export default withNavigation(BranchDetailScreen)