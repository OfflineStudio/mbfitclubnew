/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import { observer } from 'mobx-react';
import Video from 'react-native-video';
import ExerciseCardStore from '../../stores/ExerciseCardStore';
import colors from '../../components/colors';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const { width, height } = Dimensions.get('window');

const ExerciseVideoScreen = observer(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Video sayfası açıldığında tüm yönlere dönmeyi etkinleştir
      Orientation.unlockAllOrientations();
    }
    return () => {
      // Sayfadan çıkıldığında dikey moda geri dön
      Orientation.lockToPortrait();
    };
  }, [isFocused]);

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

  const handleFullscreenChange = (isFullscreen) => {
    setIsFullscreen(isFullscreen);
    if (isFullscreen) {
      StatusBar.setHidden(true);
    } else {
      StatusBar.setHidden(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, isFullscreen && styles.fullscreenContainer]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
        hidden={isFullscreen}
      />
      
      <View style={[styles.videoContainer, isFullscreen && styles.fullscreenVideo]}>
        <Video
          source={{ uri: ExerciseCardStore.selectedVideo }}
          style={isFullscreen ? styles.fullscreenVideo : styles.video}
          poster={ExerciseCardStore.selectedImage}
          posterResizeMode="cover"
          resizeMode="contain"
          repeat
          controls
          fullscreen={isFullscreen}
          onFullscreenPlayerWillPresent={() => handleFullscreenChange(true)}
          onFullscreenPlayerWillDismiss={() => handleFullscreenChange(false)}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
          ignoreSilentSwitch="ignore"
          fullscreenAutorotate={true}
          fullscreenOrientation="landscape"
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
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  fullscreenVideo: {
    width: height, // Tam ekranda genişlik ve yüksekliği değiştir
    height: width,
    backgroundColor: '#000'
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});