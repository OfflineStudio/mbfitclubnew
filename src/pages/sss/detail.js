/* eslint-disable */
import React, { useEffect } from 'react';
import { 
  Text, 
  View, 
  SafeAreaView, 
  StyleSheet, 
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import SSSStore from '../../stores/SSSStore';
import translations from '../../configs/translations';

const SSSDetailScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('SSSDetailScreen - useEffect çalıştı');
    console.log('Store Değerleri:', {
      shortText: SSSStore.selectShortText,
      longText: SSSStore.selectLongText
    });

    if (!AuthStore.isSuccess) {
      console.log('Auth kontrolü başarısız');
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
      return;
    }

    if (!SSSStore.selectShortText || !SSSStore.selectLongText) {
      console.log('SSS verileri eksik, ana sayfaya yönlendiriliyor');
      navigation.goBack();
      return;
    }
  }, [navigation]);

  if (!SSSStore.selectShortText || !SSSStore.selectLongText) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffcc00" />
        <Text style={styles.loadingText}>Veriler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background || '#F5F5F5'}
      />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Icon name="question-circle" size={24} color="#ffcc00" style={styles.titleIcon} />
            <Text style={styles.title}>{SSSStore.selectShortText}</Text>
          </View>
          <View style={styles.separator} />
          <Text style={styles.content}>{SSSStore.selectLongText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  contentContainer: {
    padding: 16
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  titleIcon: {
    marginRight: 12
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    lineHeight: 24
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16
  },
  content: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666'
  }
});

export default SSSDetailScreen;