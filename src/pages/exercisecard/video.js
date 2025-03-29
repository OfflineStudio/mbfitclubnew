/* eslint-disable */
import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VideoPlayer from 'react-native-video-player';
import ExerciseCardStore from '../../stores/ExerciseCardStore';
import translations from '../../configs/translations';

const ExerciseVideoScreen = observer(() => {
  const navigation = useNavigation();

  return (
    <View style={styles.centered}>
      <VideoPlayer
        video={{ uri: ExerciseCardStore.selectedVideo }}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{ uri: ExerciseCardStore.selectedImage }}
        controls={true}
        disableFullscreen={true}
        resizeMode={'cover'}
      />
    </View>
  );
});

export default ExerciseVideoScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
  }
});