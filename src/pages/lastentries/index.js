/* eslint-disable */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
  RefreshControl,
  Dimensions
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import AuthStore from '../../stores/AuthStore';
import LastEntryStore from '../../stores/LastEntryStore';
import translations from '../../configs/translations';

const { width } = Dimensions.get('window');

const EntryCard = ({ createDate, branchText, typeText }) => (
  <View style={styles.entryCard}>
    <View style={styles.iconContainer}>
      <Icon name="sign-in" size={24} color="#FFF" />
    </View>
    <View style={styles.entryInfo}>
      <Text style={styles.dateText}>{createDate}</Text>
      <Text style={styles.branchText}>{branchText}</Text>
      <Text style={styles.timeText}>{typeText}</Text>
    </View>
    <View style={styles.statusContainer}>
      <Icon name="check-circle" size={20} color="#4CAF50" />
    </View>
  </View>
);

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Icon name="history" size={50} color={colors.primary || '#ffcc00'} />
    <Text style={styles.emptyText}>{translations.noentryrecords}</Text>
  </View>
);

const LastEntriesScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
      return;
    }
    LastEntryStore.getEntry();
  }, [navigation]);

  const handleRefresh = () => {
    LastEntryStore.getEntry();
  };

  if (LastEntryStore.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary || '#ffcc00'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background || '#F5F5F5'}
      />
      
    

      <FlatList
        data={LastEntryStore.dataEntry}
        renderItem={({ item }) => (
          <EntryCard
            createDate={item.createDate}
            branchText={item.branchText}
            typeText={item.typeText}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
        refreshControl={
          <RefreshControl
            refreshing={LastEntryStore.loading}
            onRefresh={handleRefresh}
            colors={[colors.primary || '#ffcc00']}
            tintColor={colors.primary || '#ffcc00'}
          />
        }
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#F5F5F5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background || '#F5F5F5'
  },
  header: {
    padding: 16,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.txtDark || '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.txtDescription || '#666',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary || '#ffcc00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  entryInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.txtDark || '#333',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: colors.txtDescription || '#666',
    marginBottom: 2,
  },
  branchText: {
    fontSize: 14,
    color: colors.primary || '#ffcc00',
  },
  statusContainer: {
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.txtDescription || '#666',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default LastEntriesScreen;