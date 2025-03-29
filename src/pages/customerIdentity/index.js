/* eslint-disable */
import React, { useEffect, useCallback } from 'react';
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "react-native-image-picker"
import { TextInputMask } from 'react-native-masked-text'
import CustomerIdentityStore from '../../stores/CustomerIdentityStore';
import translations from '../../configs/translations'
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window');

const CustomerIdentityScreen = observer(() => {
  const navigation = useNavigation();

  const handleOpenFileClick = useCallback(() => {
    const options = {
      title: translations.selectphoto,
      includeBase64:true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      // maxWidth: 600,
      maxHeight: 375,
      cancelButtonTitle: translations.close,
      takePhotoButtonTitle: translations.takephoto,
      chooseFromLibraryButtonTitle: translations.selectgallery
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        CustomerIdentityStore.setdata(response.assets[0]);
      }
    });
  }, []);

  useEffect(() => {
    CustomerIdentityStore.getInfo();
  }, []);

  const handleSubmitClick = useCallback(() => {
    CustomerIdentityStore.setInfo(() => {
      Alert.alert(
        'Bilgileriniz Kaydedilmiştir.',
        '',
        [
          {
            text: 'OK', onPress: () => {  CustomerIdentityStore.getInfo();
              navigation.navigate("CustomerIdentityScreen");}
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
  }, [navigation]);

  if (!CustomerIdentityStore.loading) {
    let img;
  
    if (CustomerIdentityStore.PhotoUrl=="") {
      img = <Image source={require('../../assets/images/preview.png')} style={docStyle.img} />
     
    } else {
    
      let source = { uri: CustomerIdentityStore.PhotoUrl };
      img = <Image source={source} style={docStyle.img} />
    }

    return (
      <KeyboardAvoidingView style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} >
        <ScrollView style={styles.scrollView}>
          <View>
            <View style={styles.topBannerContainer}>
              <Icon style={styles.topBannerIcon} name={"info-circle"} size={22} />
              <Text style={styles.topBannerText}>
                Sizlere daha iyi hizmet verebilmek için bazı bilgilerinize ihtiyaç duyuyoruz.
              </Text>
            </View>
             <View style={styles.inputView}>
              <Text style={styles.inputLabel}>{translations.profilphoto}</Text>
              {img}
              {/* <Button
              title={translations.selectprofilphoto}
              onPress={this.handleOpenFileClick}
            /> */}
            </View> 
          
            {/* <View style={styles.inputView}>
              <Text style={styles.inputLabel}>{translations.phonenumber}</Text>
              <TextInput
            style={styles.textInput}
            placeholderTextColor={'gray'}
            placeholder={translations.phonenumber}
            value={CustomerIdentityStore.PhoneNumber}
            onChangeText={text => { CustomerIdentityStore.setPhoneNumber(text) }}           
            keyboardType="phone-pad"
           
          />
            </View> */}
              <View style={styles.inputView}>
              <Text style={styles.inputLabel}>{translations.birthdate}  </Text>
              {/* <DatePicker date={new Date()} onDateChange={CustomerIdentityStore.setBirthdate} mode="date" /> */}
              <Button title={translations.selectBirthDate} onPress={() => CustomerIdentityStore.setBirthDateModal(true)} />
      <DatePicker modal open={ CustomerIdentityStore.BirthDateModal} date={new Date(CustomerIdentityStore.BirthDate)} mode="date" confirmText={translations.sumbit} cancelText={translations.cancel} 
        onConfirm={(date) => {
          CustomerIdentityStore.setBirthdate(date)
          CustomerIdentityStore.setBirthDateModal(false)
          handleSubmitClick()
        }}
        onCancel={() => {
          CustomerIdentityStore.setBirthDateModal(false)
        }}
      />
              
            </View>
             
            {/* <View style={styles.inputView}>
              <Button
                title="Kaydet"
                disabled={!CustomerIdentityStore.isValid}
                onPress={this.handleSubmitClick}
              />
            </View> */}
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
});

const docStyle = {
  img: {
    width: width * 0.45,
    height: height * 0.27,
    margin: 20
  }
}

export default CustomerIdentityScreen;

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