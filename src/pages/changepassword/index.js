/* eslint-disable */
import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
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
import ChangePasswordStore from '../../stores/ChangePasswordStore';
import translations from '../../configs/translations';

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
            text: 'Tamam', 
            onPress: () => {   
              navigation.navigate("LoginScreen");
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
    });
  };

  const renderPasswordInput = (
    label,
    placeholder,
    onChangeText,
    ref,
    onSubmitEditing,
    isLastInput = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={onChangeText}
          ref={ref}
          returnKeyType={isLastInput ? "done" : "next"}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
        />
        <Icon name="lock" size={20} color="#ffcc00" style={styles.inputIcon} />
      </View>
    </View>
  );

  if (!ChangePasswordStore.loading) {
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Icon name="shield" size={22} color="#fff" style={styles.headerIcon} />
              <Text style={styles.headerText}>
                Güvenliğiniz için güçlü bir şifre seçin ve düzenli olarak değiştirin.
              </Text>
            </View>

            {renderPasswordInput(
              translations.oldpassword,
              translations.oldpassword,
              text => ChangePasswordStore.setOldPassword(text),
              null,
              () => passwordInputRef.current.focus()
            )}

            {renderPasswordInput(
              translations.newpassword,
              translations.newpassword,
              text => ChangePasswordStore.setPassword(text),
              passwordInputRef,
              () => passwordInput2Ref.current.focus()
            )}

            {renderPasswordInput(
              translations.newpasswordagain,
              translations.newpasswordagain,
              text => ChangePasswordStore.setPasswordConfim(text),
              passwordInput2Ref,
              null,
              true
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                !ChangePasswordStore.isValid && styles.submitButtonDisabled
              ]}
              onPress={handleSubmitClick}
              disabled={!ChangePasswordStore.isValid}
            >
              <Text style={styles.submitButtonText}>Şifreyi Değiştir</Text>
            </TouchableOpacity>

            {!ChangePasswordStore.isValid && ChangePasswordStore.password && ChangePasswordStore.passwordConfirm && (
              <Text style={styles.errorText}>
                Yeni şifreler birbiriyle eşleşmiyor
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#ffcc00" />
    </View>
  );
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
    backgroundColor: 'black',
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
  inputContainer: {
    marginBottom: 20
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
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
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#333'
  },
  inputIcon: {
    marginRight: 16
  },
  submitButton: {
    backgroundColor: '#ffcc00',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
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
  submitButtonDisabled: {
    backgroundColor: '#B0B0B0'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ChangePasswordScreen;