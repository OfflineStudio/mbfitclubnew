/* eslint-disable */
import React, { Component } from 'react';
import { Button, StyleSheet, View, TextInput, Text, Alert, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import Wallpaper from '../login/wallpaper';
import ForgotPasswordStore from '../../stores/ForgotPasswordStore';
import translations from '../../configs/translations'
export default observer(class ForgotPasswordScreen extends Component {
  handleRemindClick = () => {
    ForgotPasswordStore.forgot(() => {
      Alert.alert(
        translations.passwordsend,
        translations.passwordsendinfo,
        [
          { text: 'OK' ,onPress: () => {         
            this.props.navigation.navigate("LoginPage");
          }}
        ],
        { cancelable: false },
      );
    },
      () => {
        Alert.alert(
          translations.usernotfound,
          translations.usernotfoundinfo,
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      })
  }

  render() {
   
    if (!ForgotPasswordStore.loading) {
      return (
        <Wallpaper>
          <View style={styles.remindView}>
            <View style={styles.titleView}>
              <Text style={styles.title}>{translations.forgotpassword}</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput  placeholderTextColor={'gray'}
                style={styles.textInput}
                placeholder={translations.email}
                onChangeText={text => { ForgotPasswordStore.setUsername(text) }}
                returnKeyType={"next"}
                onSubmitEditing={() => this.passwordInput.focus()}
              />
            </View>
           
            <View style={styles.inputView}>
              <Button
                title={translations.send}
                disabled={!ForgotPasswordStore.isValid}
                onPress={this.handleRemindClick}
              />
            </View>
          </View>
        </Wallpaper>
      );

    }
    else {
      return (
        <Wallpaper>
          <View style={styles.indicatorView}>
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
        </Wallpaper>
      );
    }

  }
})


const styles = StyleSheet.create({
  indicatorView: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  remindView: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    margin: 14,
    padding: 14
  },
  titleView: {
    alignItems: "center",
    padding: 12,
    paddingTop: 2
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#696969"
  },
  inputView: {
    marginVertical: 6
  },
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "lightgray",
    color:"gray"
  }
});