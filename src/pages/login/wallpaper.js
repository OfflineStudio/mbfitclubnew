/* eslint-disable */
import React, { Component } from 'react';
import { ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, View, Platform } from 'react-native';
 
import LoginStore from '../../stores/LoginStore';
import { observer } from 'mobx-react';
import { LinearGradient } from 'react-native-linear-gradient';

@observer
export default class Wallpaper extends Component {
 
   
   
  render() {
console.log(LoginStore.loginScreen);
    if(LoginStore.loginScreen===''|| LoginStore.loginScreen==null)
    {

      return (
        <KeyboardAvoidingView style={styles.container} >
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <ImageBackground
              style={styles.container}
              source={require("../../assets/images/gym.jpg")}
            >
              {this.props.children}
            </ImageBackground>
  
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
    else
    {
      const image = {uri: LoginStore.loginScreen};
      return (
        <KeyboardAvoidingView style={styles.container} >
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <ImageBackground
              style={styles.container}
              source={image}
            >ß
              {this.props.children}
            </ImageBackground>
  
          </ScrollView>
        </KeyboardAvoidingView>
      );

    
    }

    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
});

