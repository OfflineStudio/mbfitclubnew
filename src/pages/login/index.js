/* eslint-disable */
import React, { Component } from 'react';
import { Button, View, TextInput, Alert, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Text, Platform } from 'react-native';
import { observer } from 'mobx-react';
import Wallpaper from './wallpaper';
import LoginStore from '../../stores/LoginStore';
import MenuStore from '../../stores/MenuStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../../configs/translations'
import DeviceInfo from 'react-native-device-info';

class LoginScreen extends Component {
 
  constructor(props) {
     
    super(props);
    
  
    this._loginControlAsync();
  
  }

  componentDidMount() {
    LoginStore.setAuth();
    
    // MenuStore.setAuth();
   
  }

  _loginControlAsync = async () => {

    // const userResult = await AsyncStorage.getItem('CoreMobile');
    // const user = JSON.parse(userResult);
 
    // if (user != null && user.id != null) {     
    //   LoginStore.currentUser = user;
    //   this.props.navigation.navigate("Tabs");
      
    // }
    
   
  };
 
  handleLoginClick = () => {
    LoginStore.login(() => {
      MenuStore.setAuth(); this.props.navigation.navigate("Tabs");
    }, (text) => {
      Alert.alert(
        translations.warning,
        text,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    })
  }
 
  render() {
    const { navigate } = this.props.navigation;
    try {
      LoginStore.setDeviceId(DeviceInfo.getUniqueIdSync());
    } catch (error) {
      console.log('Set Device Error',error);
    } 

    if (!LoginStore.loading) {
      return (
        <Wallpaper style={styles.container}>
          <View style={styles.loginView}>
            <View style={styles.logoView}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/corelogo.png')}
                title={'logo'}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
               placeholderTextColor={'gray'}
                style={styles.textInput}
                placeholder={translations.emailoraccount}
                onChangeText={text => { LoginStore.setUsername(text) }}
                returnKeyType={"next"}
                onSubmitEditing={() => this.passwordInput.focus()}
                value={ LoginStore.username }
                
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
               placeholderTextColor={'gray'}
                style={styles.textInput}
                placeholder={translations.password}
                secureTextEntry
                onChangeText={text => { LoginStore.setPassword(text) }}
                returnKeyType={"go"}
                value={ LoginStore.password }
                ref={input => this.passwordInput = input}
              />
            </View>
            <View style={styles.inputView}>
              <Button
                title={translations.login}
                disabled={!LoginStore.isValid}
                onPress={this.handleLoginClick}
              />
            </View>
            <View style={styles.rememberPassBtnView}>
              <Button
                color={"gray"}
                title={translations.forgotpassword}
                onPress={() => navigate('ForgotPassword')}
              />
            </View>
          </View>
        </Wallpaper>
      );
    }
    else {
      return (
        <Wallpaper style={styles.container}>
          <View style={styles.indicatorView}>
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
        </Wallpaper>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorView: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  loginView: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '90%',
    padding: 24,
    marginHorizontal: '5%',
    marginTop: '30%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoView: {
    alignItems: "center",
    backgroundColor: 'white',
    marginBottom: 20
  },
  logo: {
    width: 280,
    height: 120,
    resizeMode: 'contain'
  },
  inputView: {
    marginVertical: 8
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E0E0E0",
    color: "#333333",
    backgroundColor: '#F8F9FA',
    fontSize: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  rememberPassBtnView: {
    marginTop: 16,
    alignItems: 'center'
  },
  customButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  customButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  customButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline'
  }
});

export default observer(LoginScreen);