import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class RootStore {
  isLoading = false;
  userData = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUserData();
  }

  setLoading(status) {
    this.isLoading = status;
  }

  setUserData(data) {
    this.userData = data;
    this.saveUserData();
  }

  async loadUserData() {
    try {
      this.setLoading(true);
      const data = await AsyncStorage.getItem('@user_data');
      if (data) {
        this.userData = JSON.parse(data);
      }
    } catch (error) {
      console.error('Kullanıcı verisi yüklenirken hata:', error);
    } finally {
      this.setLoading(false);
    }
  }

  async saveUserData() {
    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(this.userData));
    } catch (error) {
      console.error('Kullanıcı verisi kaydedilirken hata:', error);
    }
  }

  async clearUserData() {
    try {
      await AsyncStorage.removeItem('@user_data');
      this.userData = null;
    } catch (error) {
      console.error('Kullanıcı verisi silinirken hata:', error);
    }
  }
}

export default new RootStore(); 