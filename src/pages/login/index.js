/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Text,
  ScrollView
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginStore from '../../stores/LoginStore';
import translations from '../../configs/translations';
import colors from '../../components/colors';

const { width, height } = Dimensions.get('window');

const LoginScreen = observer(() => {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    LoginStore.setAuth();
  }, []);

  const handleLogin = () => {
    if (LoginStore.isValid) {
      LoginStore.login(
        () => navigation.navigate('MainTabs'),
        (error) => alert(error)
      );
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ImageBackground
      source={LoginStore.loginScreen ? { uri: LoginStore.loginScreen } : require('../../assets/images/gym.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.logo}
                 
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={translations.username}
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  value={LoginStore.username}
                  onChangeText={(text) => LoginStore.setUsername(text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={translations.password}
                  placeholderTextColor="#999"
                  secureTextEntry={secureTextEntry}
                  value={LoginStore.password}
                  onChangeText={(text) => LoginStore.setPassword(text)}
                />
                <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
                  <Icon
                    name={secureTextEntry ? 'eye' : 'eye-slash'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.loginButton, !LoginStore.isValid && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={!LoginStore.isValid || LoginStore.loading}
              >
                {LoginStore.loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>{translations.login}</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotPasswordText}>
                  {translations.forgotpassword}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: -60
  },
  logo: {
    width: width * 0.5,
    height: 80
   
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 16,
    padding: 24,
    paddingTop: 80,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  inputIcon: {
    marginRight: 12
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12
  },
  eyeIcon: {
    padding: 8
  },
  loginButton: {
    backgroundColor: '#f3eb1a',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#f3eb1a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginButtonDisabled: {
    backgroundColor: '#f3eb1a',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  loginButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600'
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8
  },
  forgotPasswordText: {
    color: '#f3eb1a',
    fontSize: 16
  }
});

export default LoginScreen;