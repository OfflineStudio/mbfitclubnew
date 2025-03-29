/* eslint-disable */
import React, { useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import colors from '../../components/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { screens } from '../DepositMenu/financeScreens';
import AuthStore from '../../stores/AuthStore';
import { Right } from 'native-base';
import LoginStore from '../../stores/LoginStore';
import AccountStore from '../../stores/AccountStore';
import translations from '../../configs/translations';

const AccountsScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
    }
  }, [navigation]);

  return (
    <View style={styles.bannerContainerWrapper}>
      <View style={styles.bannerContainer}>
        <Icon style={styles.bannerIcon} name={"info-circle"} size={22} />
        <Text style={styles.bannerText}>
          {translations.aboutus}
        </Text>
      </View>
    </View>
  );
});

export default AccountsScreen;

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
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    backgroundColor: '#fbfbfb',
  },
  mennuIconContainer: {
    borderRadius: 4, 
    marginRight: 2,
    width:200,
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
    paddingLeft:20
  },
  menuTitle: {
    color: colors.txtDark,
    fontWeight: 'bold',
    
  },
  menuImage: {
    
    
    padding: 0,    
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  modalSelect: {
    paddingHorizontal: 11,
    paddingVertical: 11,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "lightgray"
  },
  modalInitValueText: {
    fontSize: 14,
    color: "darkgray",
    textAlign: "left"
  },
  modalTextSelect: {
    fontSize: 14,
    color: "black",
    textAlign: "left"
  }
});
