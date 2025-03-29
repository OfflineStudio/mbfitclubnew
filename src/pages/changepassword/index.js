/* eslint-disable */
import React from 'react';
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
import { useNavigation } from '@react-navigation/native';

import ChangePasswordStore from '../../stores/ChangePasswordStore';
import translations from '../../configs/translations'

const ChangePasswordScreen = observer(() => {
  const navigation = useNavigation();
  const passwordInputRef = React.useRef();
  const passwordInput2Ref = React.useRef();
   
  const handleSubmitClick = () => {
    ChangePasswordStore.change(() => {
      Alert.alert(
        'Şifreniz Değiştirilmiştir.',
        '',
        [
          {
            text: 'OK', onPress: () => {   
              navigation.navigate("LoginScreen");}
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

  if (!ChangePasswordStore.loading) {
    return (
      <KeyboardAvoidingView style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} >
        <ScrollView style={styles.scrollView}>
          <View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>{translations.oldpassword}</Text>
              <TextInput   
                placeholderTextColor={'gray'} 
                style={styles.textInput} 
                placeholder={translations.oldpassword} 
                secureTextEntry 
                onChangeText={text => ChangePasswordStore.setOldPassword(text)} 
                returnKeyType={"next"} 
                onSubmitEditing={() => passwordInputRef.current.focus()}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>{translations.newpassword}</Text>
              <TextInput  
                placeholderTextColor={'gray'}  
                style={styles.textInput} 
                placeholder={translations.newpassword}    
                secureTextEntry  
                onChangeText={text => ChangePasswordStore.setPassword(text)} 
                returnKeyType={"next"} 
                ref={passwordInputRef}
                onSubmitEditing={() => passwordInput2Ref.current.focus()}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>{translations.newpasswordagain}</Text>
              <TextInput  
                placeholderTextColor={'gray'} 
                style={styles.textInput} 
                placeholder={translations.newpasswordagain}   
                secureTextEntry  
                onChangeText={text => ChangePasswordStore.setPasswordConfim(text)} 
                returnKeyType={"go"} 
                ref={passwordInput2Ref}
              />
            </View>
            <View style={styles.inputView}>
              <Button
                title="Kaydet"
                disabled={!ChangePasswordStore.isValid}
                onPress={handleSubmitClick}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  
  return (
    <View style={styles.indicatorView}>
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
});

ChangePasswordScreen.navigationOptions = {
  title: translations.changepassword,
  headerLayoutPreset: 'center'
};

export default ChangePasswordScreen;

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