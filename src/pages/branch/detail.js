/* eslint-disable */
import React from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import BranchStore from '../../stores/BranchStore';

const BranchDetailScreen = observer(() => {
  return (
    <WebView
      source={{ uri: BranchStore.selectBranchUrl }}
      startInLoadingState={true}
      originWhitelist={['*']}
      ignoreSslError={true}
    />
  );
});

BranchDetailScreen.navigationOptions = {
  title: BranchStore.selectBranchName,
  headerLayoutPreset: 'center'
};

export default BranchDetailScreen;