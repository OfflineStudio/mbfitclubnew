/* eslint-disable */
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import colors from '../../components/colors';
import MenuStore from '../../stores/MenuStore';
import { images } from '../DepositMenu/financeimages';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivitiesStore from '../../stores/ActivitiesStore';
import MyView from '../../components/MyView';
import translations from '../../configs/translations';

const Menu = ({ navigation, activityId, startDateText, branch, status, statusType, countReservation, numberOfReservation }) => (
  <View style={styles.menuItem}>
    <View style={styles.mennuIconContainer}>
      <Icon name='calendar' style={styles.menuIcon} size={22} />
    </View>
    <View style={styles.menuTitleContainer}>
      <Text style={styles.menuTitle}>{translations.branch}: {branch}</Text>
      <Text style={styles.menuTitle}>{translations.date}: {startDateText}</Text>
      <Text style={styles.menuTitle}>{translations.quota}: {numberOfReservation}/{countReservation}</Text>
      <Text style={styles.menuTitle}>{translations.status}: {status}</Text>
    </View>
    
    <MyView hide={statusType==1?false:true} style={styles.menuTitle}>
      <TouchableOpacity onPress={() => {
        Alert.alert('', translations.cancelreservationinfo, [
          {
            text: translations.cancel,        
            style: 'cancel',
          },
          {text: translations.sumbit, onPress: () => {
            ActivitiesStore.setActivity(activityId);
            ActivitiesStore.cancelReservation(() => {
              Alert.alert(
                translations.cancelreservationsuccess,
                '',
                [
                  {
                    text: 'OK', onPress: () => {
                      ActivitiesStore.getActivities();
                    }
                  },
                ],
                { cancelable: false },
              );
            },
            (text) => {
              Alert.alert(
                '',
                text,
                [
                  { text: 'OK' },
                ],
                { cancelable: false },
              );
            })
          }},
        ]);
      }}>
        <Text style={styles.textInput}>{translations.cancelreservation}</Text>
      </TouchableOpacity>
    </MyView>
    <MyView hide={statusType==0?false:true} style={styles.menuTitle}>
      <TouchableOpacity onPress={() => {
        Alert.alert('', translations.makereservationinfo, [
          {
            text: translations.cancel,        
            style: 'cancel',
          },
          {text: translations.sumbit, onPress: () => {
            ActivitiesStore.setActivity(activityId);
            ActivitiesStore.makeReservation(() => {
              Alert.alert(
                translations.makereservationsuccess,
                '',
                [
                  {
                    text: 'OK', onPress: () => {
                      ActivitiesStore.getActivities();
                    }
                  },
                ],
                { cancelable: false },
              );
            },
            (text) => {
              Alert.alert(
                '',
                text,
                [
                  { text: 'OK' },
                ],
                { cancelable: false },
              );
            })
          }},
        ]);
      }}>
        <Text style={styles.textInput}>{translations.makereservation}</Text>
      </TouchableOpacity>
    </MyView>
  </View>
);

const renderMenuItem = navigation => ({ item }) => (
  <Menu navigation={navigation} {...item} />
);

const ActivityDetailScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
    }
    ActivitiesStore.getActivities();
  }, [navigation]);

  if (!ActivitiesStore.loading) {
    if (!ActivitiesStore.activities) {
      return (
        <View style={styles.bannerContainerWrapper}>
          <View style={styles.bannerContainer}>
            <Icon style={styles.bannerIcon} name={"info-circle"} size={22} />
            <Text style={styles.bannerText}>
              {translations.activitiesempty}
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
                data={ActivitiesStore.activities}
                renderItem={renderMenuItem(navigation)}
                keyExtractor={item => item.activityId.toString()}
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

export default ActivityDetailScreen;

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
        width: 42,
        height: 42,
        backgroundColor: "#92bcf0",
        marginRight: 2
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