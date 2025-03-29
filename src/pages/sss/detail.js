/* eslint-disable */
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';

import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import SSSStore from '../../stores/SSSStore';
import translations from '../../configs/translations';

const SSSDetailScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
    }
  }, [navigation]);

  if (!SSSStore.loading) {
    return (
      <View style={styles.itemView}>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowLabel}>{SSSStore.selectShortText}</Text>
          <Text style={styles.itemRowValue}>{SSSStore.selectLongText}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.indicatorView}>
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
});

SSSDetailScreen.navigationOptions = {
  title: translations.sss,
  headerLayoutPreset: 'center'
};

export default SSSDetailScreen;

const styles = StyleSheet.create({
    itemView: {
        backgroundColor: "#e7ebf7",
        borderColor: "#d7e4f7",
        marginHorizontal: 14,
        marginVertical: 7,
        paddingHorizontal: 2,
        paddingVertical: 10,
        borderRadius: 4,
        borderWidth: 1
    },
    itemRow: {
        paddingVertical: 2
    },
    itemRowLabel: {
        fontWeight: "bold",
        color: "#566877",
        paddingHorizontal: 8
    },
    itemRowValue: {
        color: "#647380",
        paddingTop: 8,
        paddingHorizontal: 8
    }
})