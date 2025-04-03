/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  FlatList, 
  View, 
  Image, 
  RefreshControl,
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import AuthStore from '../../stores/AuthStore';
import NotificationStore from '../../stores/NotificationStore';
import translations from '../../configs/translations';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const NotificationScreen = observer(() => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) {
      checkAuthAndLoadNotifications();
    }
  }, [isFocused]);

  const checkAuthAndLoadNotifications = async () => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
      return;
    }
    await NotificationStore.getNotification();
    NotificationStore.setAlert(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await NotificationStore.getNotification();
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const NotificationItem = ({ createDate, message, subject, branchName }) => (
    <View style={styles.menuItem}>
      <View style={styles.headerContainer}>
        <Text style={styles.branchName}>{branchName}</Text>
        <Text style={styles.date}>{formatDate(createDate)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        <Image
          style={styles.logo}
          source={require('../../assets/images/group-exercises-min.jpg')}
          resizeMode="cover"
        />
        <FlatList
          style={styles.notificationList}
          data={NotificationStore.notif}
          renderItem={({ item }) => <NotificationItem {...item} />}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Icon name="bell-o" size={50} color={colors.txtDescription} />
              <Text style={styles.emptyText}>Henüz bildirim bulunmuyor</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb"
  },
  scrollView: {
    flex: 1
  },
  logo: {
    width: '100%',
    height: 150
  },
  notificationList: {
    padding: 16
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  branchName: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600'
  },
  date: {
    fontSize: 12,
    color: colors.txtDescription
  },
  contentContainer: {
    gap: 8
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.txtDark
  },
  message: {
    fontSize: 14,
    color: colors.txtDark,
    lineHeight: 20
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16
  },
  emptyText: {
    fontSize: 16,
    color: colors.txtDescription,
    textAlign: 'center'
  }
});

export default NotificationScreen;