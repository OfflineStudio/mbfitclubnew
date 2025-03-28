import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/StoreProvider';

const UserProfile = observer(() => {
  const store = useStore();

  const handleLogin = () => {
    store.setUserData({
      id: 1,
      name: 'Test Kullanıcı',
      email: 'test@example.com'
    });
  };

  const handleLogout = () => {
    store.clearUserData();
  };

  if (store.isLoading) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {store.userData ? (
        <>
          <Text style={styles.title}>Hoş geldin, {store.userData.name}!</Text>
          <Text style={styles.email}>{store.userData.email}</Text>
          <Button title="Çıkış Yap" onPress={handleLogout} />
        </>
      ) : (
        <Button title="Giriş Yap" onPress={handleLogin} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});

export default UserProfile; 