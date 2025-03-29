/* eslint-disable */
import React, { useEffect } from 'react';
import { 
  View, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import LoginStore from '../../stores/LoginStore';
import AuthStore from '../../stores/AuthStore';
import translations from '../../configs/translations';

const CareerScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('CareerScreen - useEffect çalıştı');
    console.log('Auth durumu:', AuthStore.isSuccess);
    console.log('Career URL:', LoginStore.careerUrl);

    if (!AuthStore.isSuccess) {
      console.log('Auth kontrolü başarısız, login sayfasına yönlendiriliyor');
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
      return;
    }

    if (!LoginStore.careerUrl) {
      console.log('Career URL bulunamadı');
      return;
    }
  }, [navigation]);

  if (!LoginStore.careerUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7fcac6" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: LoginStore.careerUrl }}
      startInLoadingState={true}
      originWhitelist={['*']}
      ignoreSslError={true}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log('WebView hatası:', nativeEvent);
      }}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log('HTTP hatası:', nativeEvent);
      }}
      renderLoading={() => (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7fcac6" />
        </View>
      )}
    />
  );
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

CareerScreen.navigationOptions = {
  title: translations.career,
  headerLayoutPreset: 'center'
};

export default CareerScreen;