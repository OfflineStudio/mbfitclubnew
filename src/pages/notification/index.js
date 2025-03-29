/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react';
import colors from '../../components/colors';
import translations from '../../configs/translations';

const NotificationScreen = observer(() => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emptyText}>{translations.nonotifications || 'Bildirim bulunmamaktadır'}</Text>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#f5f5f5'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  emptyText: {
    fontSize: 16,
    color: colors.txtDescription || '#666',
    textAlign: 'center'
  }
});

export default NotificationScreen;