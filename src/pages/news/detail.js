/* eslint-disable */
import React, { Component } from 'react'; 
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';
import NewsStore from '../../stores/NewsStore';
 
@observer
class NewsDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: NewsStore.selectNews.title,
    headerLayoutPreset: 'center'
  });

  render() {
     
      return (
        <WebView
        source={{ html:  NewsStore.selectNews.content }}
          startInLoadingState={true}
          originWhitelist={['*']}
          ignoreSslError={true}
          scalesPageToFit={false}
        />
      );
     
  }
}
export default withNavigation(NewsDetailScreen)