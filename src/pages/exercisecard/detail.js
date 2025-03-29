/* eslint-disable */
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import colors from '../../components/colors';
import MenuStore from '../../stores/MenuStore';
import { images } from '../DepositMenu/financeimages';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExerciseCardStore from '../../stores/ExerciseCardStore';
import translations from '../../configs/translations';

const Menu = ({ navigation, exerciseText, set, duration, repetition, imagePath, videoUrl }) => (
  <TouchableOpacity onPress={() => {
    ExerciseCardStore.setselectedImage(imagePath);
    ExerciseCardStore.setselectedVideo(videoUrl);
    navigation.navigate("ExerciseVideoScreen");
  }}>
    <View style={styles.menuItem}>
      <View style={styles.mennuIconContainer}>
        <Icon name='heartbeat' style={styles.menuArrow} size={22} />
      </View>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Hareket: {exerciseText}</Text>
        <Text style={styles.menuTitle}>Süre: {duration}</Text>
      </View>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Set: {set}</Text>
        <Text style={styles.menuTitle}>Tekrar: {repetition}</Text>
      </View>
      <Icon name='angle-right' style={styles.menuArrow} size={16} />
    </View>
  </TouchableOpacity>
);

const renderMenuItem = navigation => ({ item }) => (
  <Menu navigation={navigation} {...item} />
);

const ExerciseCardDetailScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
    }
  }, [navigation]);

  if (!ExerciseCardStore.loading) {
    if (!ExerciseCardStore.dayList.length) {
      return (
        <View style={styles.bannerContainerWrapper}>
          <View style={styles.bannerContainer}>
            <Icon style={styles.bannerIcon} name={"info-circle"} size={22} />
            <Text style={styles.bannerText}>
              {translations.exerciseempty}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.categoryList}>
              <FlatList
                style={styles.menuList}
                data={ExerciseCardStore.dayList}
                renderItem={renderMenuItem(navigation)}
                keyExtractor={item => item.id.toString()}
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

export default ExerciseCardDetailScreen;

const styles = StyleSheet.create({
    menuArrow: {
        color: colors.txtDark,
        textAlign: "right",
        paddingHorizontal: 8,
        paddingVertical: 12
    },
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
     // width:200,
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
       width: 60,
       height: 60,
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