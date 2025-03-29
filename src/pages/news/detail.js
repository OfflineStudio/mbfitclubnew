/* eslint-disable */
import React from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import NewsStore from '../../stores/NewsStore';

const NewsDetailScreen = observer(() => {
  const navigation = useNavigation();

  return (
    <WebView
      source={{ html: NewsStore.selectNews.content }}
      startInLoadingState={true}
      originWhitelist={['*']}
      ignoreSslError={true}
      scalesPageToFit={false}
    />
  );
});

export default NewsDetailScreen;