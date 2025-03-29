/* eslint-disable */
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import MembershipStore from '../../stores/MembershipStore';
import MyView from '../../components/MyView';
import translations from '../../configs/translations';

const Menu = ({ navigation, branchName, productName, membershipStartingDate, membershipExpiryDate, membershipStatuText, membershipStatu, purchasesId, suspendMessage, leftDay }) => (
  <View style={styles.menuItem}>
    <View style={styles.mennuIconContainer}>
      <Icon name='info-circle' style={styles.menuIcon} size={22} />
    </View>
    <View style={styles.menuTitleContainer}>
      <Text style={styles.menuTitle}>{translations.branch}: {branchName} </Text>
      <Text style={styles.menuTitle}>{translations.product}:  {productName} </Text>
      <Text style={styles.menuTitle}>{translations.membershipStart}: {membershipStartingDate}</Text>
      <Text style={styles.menuTitle}>{translations.membershipEnd}: {membershipExpiryDate} </Text>
      <Text style={styles.menuTitle}>{translations.leftDay}: {leftDay} </Text>
      <Text style={styles.menuTitle}>{translations.status}: {membershipStatuText} </Text>
    </View>
  </View>
);

const renderMenuItem = navigation => ({ item }) => (
  <Menu navigation={navigation} {...item} />
);

const MembershipScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
    }
    MembershipStore.getMemberships();
  }, [navigation]);

  if (!MembershipStore.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.categoryList}>
          <FlatList
            style={styles.menuList}
            data={MembershipStore.memberships}
            renderItem={renderMenuItem(navigation)}
            keyExtractor={item => item.purchasesId.toString()}
          />
        </View>
      </SafeAreaView>
    );
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

export default MembershipScreen;

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  scrollView: {
  },
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb"
  },
  logo: {
    width: null, height: 150
  },
  categoryTitle: {
    fontWeight: "bold",
    paddingTop: 8,
    color: colors.txtDescription
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
  },
  menuList: {
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    backgroundColor: "#fbfbfb"
  },
  mennuIconContainer: {
    borderRadius: 4,
    width: 42,
    height: 42,
    backgroundColor: "#92bcf0",
    marginRight: 2
  },
  menuIcon: {
    color: colors.txtWhite,
    paddingVertical: 9,
    paddingLeft: 11,
    backgroundColor: "#ffcc00"
  },
  menuArrow: {
    color: colors.txtDark,
    textAlign: "right",
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  menuTitleContainer: {
    flex: 1
  },
  menuTitle: {
    color: colors.txtDark,
    fontWeight: "bold",
    padding: 11,
  },
  textInput: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  }
});