/* eslint-disable */
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  Platform,
  StatusBar,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { observer } from 'mobx-react';
import Video from 'react-native-video';
import ExerciseCardStore from '../../stores/ExerciseCardStore';
import colors from '../../components/colors';

const { width, height } = Dimensions.get('window');

const ExerciseVideoScreen = observer(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
        backgroundColor={colors.background || '#000'}
      />
      
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: ExerciseCardStore.selectedVideo }}
          style={styles.video}
          poster={ExerciseCardStore.selectedImage}
          posterResizeMode="cover"
          resizeMode="contain"
          repeat
          controls
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
        />
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary || '#007AFF'} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
});

export default ExerciseVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: width * 0.5625, // 16:9 aspect ratio
    backgroundColor: '#000'
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});