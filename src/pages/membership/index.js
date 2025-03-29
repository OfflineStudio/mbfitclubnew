/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Dimensions,
  RefreshControl
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import MembershipStore from '../../stores/MembershipStore';
import translations from '../../configs/translations';

const { width } = Dimensions.get('window');

const MembershipCard = ({ item, onSuspendPress }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'aktif':
        return '#4CAF50';
      case 'suspended':
      case 'donduruldu':
        return '#FFA000';
      case 'expired':
      case 'süresi doldu':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const calculateDaysLeft = (endDate) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysLeft(item.membershipExpiryDate);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.packageContainer}>
          <Icon name="bookmark" size={20} color="#ffcc00" style={styles.packageIcon} />
          <Text style={styles.packageName}>{item.productName || translations.product}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.membershipStatuText) }]}>
          <Text style={styles.statusText}>{item.membershipStatuText}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon name="calendar" size={16} color="#666" />
            <Text style={styles.infoLabel}>{translations.membershipStart}</Text>
            <Text style={styles.infoValue}>{item.membershipStartingDate || '-'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="calendar-check-o" size={16} color="#666" />
            <Text style={styles.infoLabel}>{translations.membershipEnd}</Text>
            <Text style={styles.infoValue}>{item.membershipExpiryDate || '-'}</Text>
          </View>
        </View>

        <View style={styles.branchInfo}>
          <Icon name="building" size={16} color="#666" />
          <Text style={styles.branchText}>{item.branchName}</Text>
        </View>

        <View style={styles.daysLeftContainer}>
          <Icon name="hourglass-half" size={16} color="#ffcc00" />
          <Text style={styles.daysLeftText}>
            {translations.leftDay}: <Text style={styles.daysLeftNumber}>{item.leftDay}</Text>
          </Text>
        </View>

        {item.membershipStatu === 1 && (
          <TouchableOpacity
            style={styles.suspendButton}
            onPress={() => onSuspendPress(item)}
            activeOpacity={0.7}
          >
            <Icon name="pause-circle" size={18} color="#fff" style={styles.suspendIcon} />
            <Text style={styles.suspendText}>{translations.suspendrequest}</Text>
          </TouchableOpacity>
        )}

        {item.membershipStatu === 2 && (
          <TouchableOpacity
            style={[styles.suspendButton, styles.unsuspendButton]}
            onPress={() => onSuspendPress(item)}
            activeOpacity={0.7}
          >
            <Icon name="play-circle" size={18} color="#fff" style={styles.suspendIcon} />
            <Text style={styles.suspendText}>{translations.unsuspendrequest}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const MembershipScreen = observer(() => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!AuthStore.isSuccess) {
        await AuthStore.userLogout();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return;
      }
      loadMemberships();
    };

    checkAuth();
  }, [navigation]);

  const loadMemberships = async () => {
    await MembershipStore.getMemberships();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMemberships();
    setRefreshing(false);
  };

  const handleSuspendPress = (membership) => {
    MembershipStore.membershipId = membership.purchasesId;
    
    if (membership.status?.toLowerCase() === 'donduruldu') {
      MembershipStore.unSuspendMembership(
        () => {
          alert(translations.unsuspendsuccess);
          loadMemberships();
        },
        (error) => alert(error)
      );
    } else {
      MembershipStore.suspendMembership(
        () => {
          alert(translations.suspendsuccess);
          loadMemberships();
        },
        (error) => alert(error)
      );
    }
  };

  if (MembershipStore.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
     

      <FlatList
        data={MembershipStore.memberships}
        renderItem={({ item }) => (
          <MembershipCard 
            item={item}
            onSuspendPress={handleSuspendPress}
          />
        )}
        keyExtractor={item => item.purchasesId.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#ffcc00']}
            tintColor="#ffcc00"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="info-circle" size={40} color="#999" />
            <Text style={styles.emptyText}>{translations.subscriptionnotfound}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ffcc00',
    padding: 16,
    alignItems: 'center'
  },
  headerIcon: {
    marginRight: 12
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  listContainer: {
    padding: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
      },
      android: {
        elevation: 3
      }
    }),
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  packageContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  packageIcon: {
    marginRight: 8
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  cardBody: {
    padding: 16
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  infoItem: {
    alignItems: 'center'
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 2
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  branchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  branchText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1
  },
  daysLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  daysLeftText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666'
  },
  daysLeftNumber: {
    fontWeight: '600',
    color: '#ffcc00'
  },
  suspendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA000',
    padding: 12,
    borderRadius: 8
  },
  unsuspendButton: {
    backgroundColor: '#4CAF50'
  },
  suspendIcon: {
    marginRight: 8
  },
  suspendText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    color: '#999',
    textAlign: 'center'
  }
});

export default MembershipScreen;