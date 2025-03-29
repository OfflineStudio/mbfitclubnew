/* eslint-disable */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Image,FlatList,ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
 
  
import AuthStore  from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import SSSStore from '../../stores/SSSStore';

import translations from '../../configs/translations'

@observer
class SSSDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: translations.sss,
        headerLayoutPreset: 'center'
      });
  componentDidMount(){   
    if(!AuthStore.isSuccess)
    {
      AuthStore.userLogout();
      this.props.navigation.navigate("LoginPage");
    }
   
} 
   
      
render() {
  if (!SSSStore.loading) {
    const {navigation} = this.props;
    return (
        <View style={styles.itemView}>
        <View style={styles.itemRow}>
            <Text style={styles.itemRowLabel}>{SSSStore.selectShortText}</Text>
            <Text style={styles.itemRowValue}>{SSSStore.selectLongText}</Text>
        </View>
    </View>
    
    );
    
    
  }
  else {
    return (
      <View style={styles.indicatorView}>
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

}
}

export default withNavigation(SSSDetailScreen);


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