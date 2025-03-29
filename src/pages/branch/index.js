/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  FlatList, 
  ActivityIndicator,
  TextInput,
  Platform,
  Dimensions
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import BranchStore from '../../stores/BranchStore';
import translations from '../../configs/translations';

const { width } = Dimensions.get('window');

const BranchItem = ({ navigation, id, name }) => (
  <TouchableOpacity 
    style={styles.branchCard}
    onPress={() => {
      BranchStore.setBranch(id, name);
      navigation.navigate("BranchDetailScreen");
    }}
    activeOpacity={0.7}
  >
    <View style={styles.branchIconContainer}>
      <Icon name="building" style={styles.branchIcon} size={24} />
    </View>
    <View style={styles.branchInfoContainer}>
      <Text style={styles.branchName}>{name}</Text>
      <Text style={styles.branchSubtext}>Detaylar için tıklayın</Text>
    </View>
    <Icon name="angle-right" style={styles.branchArrow} size={24} />
  </TouchableOpacity>
);

const BranchScreen = observer(() => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
    }
    BranchStore.getBranch();
  }, [navigation]);

  const filteredBranches = BranchStore.branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBranchItem = ({ item }) => (
    <BranchItem navigation={navigation} {...item} />
  );

  if (!BranchStore.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Icon name="map-marker" size={22} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerText}>
            Size en yakın MB Fit Club şubesini bulun
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Şube ara..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredBranches}
          renderItem={renderBranchItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.branchList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="info-circle" size={40} color="#999" />
              <Text style={styles.emptyText}>Şube bulunamadı</Text>
            </View>
          }
        />
      </SafeAreaView>
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
    lineHeight: 22
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#333'
  },
  branchList: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  branchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  branchIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffcc00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  branchIcon: {
    color: '#fff'
  },
  branchInfoContainer: {
    flex: 1
  },
  branchName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  branchSubtext: {
    fontSize: 14,
    color: '#666'
  },
  branchArrow: {
    color: '#ffcc00'
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
    color: '#999'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default BranchScreen;