/* eslint-disable */
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import ActivitiesStore from '../../stores/ActivitiesStore';
import translations from '../../configs/translations';

const Menu = ({ navigation, id, text, image }) => (
  <TouchableOpacity
    onPress={() => {
      ActivitiesStore.setType(id);
      ActivitiesStore.setTypeText(text);
      navigation.navigate("ActivityDetailScreen");
    }}
    style={styles.buttonFacebookStyle}
    activeOpacity={0.5}
  >
    <Image
      source={{ uri: image }}
      style={styles.logo}
    />
  </TouchableOpacity>
);

const renderMenuItem = navigation => ({ item }) => (
  <Menu navigation={navigation} {...item} />
);

const ActivitiesScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("Login");
    }
    ActivitiesStore.getActivities();
  }, [navigation]);

  if (!ActivitiesStore.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.categoryList}>
          <FlatList
            style={styles.menuList}
            data={ActivitiesStore.types}
            renderItem={renderMenuItem(navigation)}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.indicatorView}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
});

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
  buttonFacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 200,
    borderRadius: 5,
    margin: 3,
  },
  logo: {
    flex: 1,
    width: 100,
    height: 180,
    resizeMode: "cover",
    borderRadius: 20,
  },
  indicatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ActivitiesScreen;