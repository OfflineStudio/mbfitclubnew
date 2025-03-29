/* eslint-disable */
import React, { useEffect } from 'react';
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  FlatList
} from 'react-native';
import { observer } from 'mobx-react';
import colors from '../../components/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInputMask } from 'react-native-masked-text'
import LastEntryStore from '../../stores/LastEntryStore';
import translations from '../../configs/translations'

const Menu = ({navigation, createDate,branchText,typeText}) => (
   
  
  <View style={styles.menuItem}>
     
    <View style={styles.menuTitleContainer}>
      <Text style={styles.menuTitle}>Şube: {branchText}</Text>
      <Text style={styles.menuTitle}>Geçiş: {typeText}</Text>
    </View>
    <View style={styles.menuTitleContainer}>
     
      <Text style={styles.menuTitle}>Tarih: {createDate}</Text>
    
    </View>
  </View>

);
const renderMenuItem = navigation => ({item}) => (
<Menu navigation={navigation} {...item} />
);

const LastEntriesScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    LastEntryStore.getEntry();
  }, []);

  if (!LastEntryStore.loading) {
    if (!LastEntryStore.dataEntry) {
      return (
        <View style={styles.bannerContainerWrapper}>
          <View style={styles.bannerContainer}>
            <Icon style={styles.bannerIcon} name={"info-circle"} size={22} />
            <Text style={styles.bannerText}>
              {translations.entryempty}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.categoryList}>
              <Text style={styles.categoryTitle}></Text>
              <FlatList
                style={styles.menuList}
                data={LastEntryStore.dataEntry}
                renderItem={renderMenuItem(navigation)}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  } else {
    return (
      <View style={styles.indicatorView}>
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }
});

export default LastEntriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryTitle: {
    fontWeight: 'bold',
    paddingTop: 8,
    color: colors.txtDescription,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryItem: {},
  menuList: {},
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    backgroundColor: '#fbfbfb',
  },
  mennuIconContainer: {
    borderRadius: 4,
    width:200,
    // height: 60,
   // backgroundColor: '#92bcf0',
    marginRight: 2,
  },
  menuIcon: {
    color: colors.txtWhite,
    paddingVertical: 9,
    paddingLeft: 11,
    backgroundColor:"#ffcc00"
  },
  menuArrow: {
    color: colors.txtDark,
    textAlign: 'right',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  menuTitleContainer: {
    flex: 1,
  },
  menuTitle: {
    color: colors.txtDark,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  menuImage: {
    // width: 250,
    // height: 60,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bannerContainerWrapper: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bannerContainer: {
    flexDirection: "row",
    backgroundColor: "gray",
    color: "#ffffff",
    padding: 8,
    borderRadius: 4,
    marginBottom: 10
  },
  bannerIcon: {
    color: "#ffffff",
    paddingRight: 2
  },
  bannerText: {
    color: "#ffffff",
    padding: 2
  },
});