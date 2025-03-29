/* eslint-disable */
import React, { useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "react-native-image-picker"
import CustomerIdentityStore from '../../stores/CustomerIdentityStore';
import translations from '../../configs/translations'
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window');

const CustomerIdentityScreen = observer(() => {
  const navigation = useNavigation();

  const handleOpenFileClick = useCallback(() => {
    const options = {
      title: translations.selectphoto,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
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
            text: 'Tamam', 
            onPress: () => {
              CustomerIdentityStore.getInfo();
              navigation.navigate("CustomerIdentityScreen");
            }
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
          { text: 'Tamam' },
        ],
        { cancelable: false },
      );
    })
  }, [navigation]);

  if (!CustomerIdentityStore.loading) {
    let img;
  
    if (CustomerIdentityStore.PhotoUrl === "") {
      img = <Image source={require('../../assets/images/preview.png')} style={styles.profileImage} />
    } else {
      let source = { uri: CustomerIdentityStore.PhotoUrl };
      img = <Image source={source} style={styles.profileImage} />
    }

    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Icon name="info-circle" size={22} color="#fff" style={styles.headerIcon} />
              <Text style={styles.headerText}>
                Sizlere daha iyi hizmet verebilmek için bazı bilgilerinize ihtiyaç duyuyoruz.
              </Text>
            </View>

            <View style={styles.profileSection}>
              <Text style={styles.sectionTitle}>{translations.profilphoto}</Text>
              <View style={styles.imageContainer}>
                {img}
                {/* <TouchableOpacity 
                  style={styles.imagePickerButton}
                  onPress={handleOpenFileClick}
                >
                  <Icon name="camera" size={20} color="#fff" />
                  <Text style={styles.imagePickerText}>{translations.selectprofilphoto}</Text>
                </TouchableOpacity>*/} 
              </View>
            </View>

            <View style={styles.birthdateSection}>
              <Text style={styles.sectionTitle}>{translations.birthdate}</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => CustomerIdentityStore.setBirthDateModal(true)}
              >
                <Icon name="calendar" size={20} color="#ffcc00" style={styles.dateIcon} />
                <Text style={styles.dateText}>
                  {CustomerIdentityStore.BirthDate 
                    ? new Date(CustomerIdentityStore.BirthDate).toLocaleDateString('tr-TR')
                    : translations.selectBirthDate
                  }
                </Text>
              </TouchableOpacity>
            </View>

            <DatePicker 
              modal 
              open={CustomerIdentityStore.BirthDateModal}
              date={new Date(CustomerIdentityStore.BirthDate || Date.now())}
              mode="date"
              confirmText={translations.sumbit}
              cancelText={translations.cancel}
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
        </ScrollView>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    flex: 1
  },
  content: {
    padding: 16
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ffcc00',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center'
  },
  headerIcon: {
    marginRight: 12
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    lineHeight: 22
  },
  profileSection: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  imageContainer: {
    alignItems: 'center'
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    marginBottom: 16
  },
  imagePickerButton: {
    flexDirection: 'row',
    backgroundColor: '#ffcc00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center'
  },
  imagePickerText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16
  },
  birthdateSection: {
    marginBottom: 24
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffcc00',
    borderRadius: 8,
    padding: 12
  },
  dateIcon: {
    marginRight: 12
  },
  dateText: {
    fontSize: 16,
    color: '#333'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CustomerIdentityScreen;