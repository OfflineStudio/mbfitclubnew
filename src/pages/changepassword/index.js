/* eslint-disable */
import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

import ChangePasswordStore from '../../stores/ChangePasswordStore';
import translations from '../../configs/translations'

@observer
class ChangePasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: translations.changepassword,
    headerLayoutPreset: 'center'
  });
   
  handleSubmitClick = () => {
    ChangePasswordStore.change(() => {
      Alert.alert(
        'Şifreniz Değiştirilmiştir.',
        '',
        [
          {
            text: 'OK', onPress: () => {   
              this.props.navigation.navigate("LoginScreen");}
          },
        ],
        { cancelable: false },
      );
    },
      (text) => {
        Alert.alert(
          '',
          text,
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      })
  }

  
  render() {
   
    if (!ChangePasswordStore.loading) {
   

      return (
        <KeyboardAvoidingView style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} >
          <ScrollView style={styles.scrollView}>
            <View>
               
            
            
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>{translations.oldpassword}</Text>
                
             <TextInput   placeholderTextColor={'gray'} style={styles.textInput} placeholder={translations.oldpassword} secureTextEntry onChangeText={text =>{ChangePasswordStore.setOldPassword(text)}} returnKeyType={"next"} onSubmitEditing={()=>this.passwordInput.focus()}/>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>{translations.newpassword}</Text>
                
                <TextInput  placeholderTextColor={'gray'}  style={styles.textInput} placeholder={translations.newpassword}    secureTextEntry  onChangeText={text =>{ChangePasswordStore.setPassword(text)}} returnKeyType={"next"} ref={input=>this.passwordInput=input}/>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputLabel}>{translations.newpasswordagain}</Text>
                
                <TextInput  placeholderTextColor={'gray'} style={styles.textInput} placeholder={translations.newpasswordagain}   secureTextEntry  onChangeText={text =>{ChangePasswordStore.setPasswordConfim(text)}} returnKeyType={"go"} ref={input=>this.passwordInput2=input}/>
      
                </View>
              <View style={styles.inputView}>
                <Button
                  title="Kaydet"
                  disabled={!ChangePasswordStore.isValid}
                  onPress={this.handleSubmitClick}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
    else {
      return (
        <View style={styles.indicatorView}>
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      );
    }
  }
}

export default withNavigation(ChangePasswordScreen)

const styles = StyleSheet.create({
  indicatorView: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  scrollView: {
    margin: 14
  },
  topBannerContainer: {
    flexDirection: "row",
    backgroundColor: "#7fcac6",
    color: "#ffffff",
    padding: 8,
    borderRadius: 4,
    marginBottom: 10
  },
  topBannerIcon: {
    color: "#ffffff",
    marginRight: 6,
    marginTop: 2
  },
  topBannerText: {
    color: "#ffffff"
  },
  radioFormView: {
    
  },
  inputView: {
    marginVertical: 6
  },
  inputLabel: {
    paddingBottom: 6
  },
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "lightgray",
    color:"gray"
  }
})