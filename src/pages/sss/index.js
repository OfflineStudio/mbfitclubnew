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
const Menu = ({navigation, longText,shortText}) => (
   
  <TouchableOpacity onPress={() => {
    SSSStore.setSSS(longText,shortText);
    
      navigation.navigate("SSSDetailScreen")
    
  }}>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name='info-circle' style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>{shortText}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
    </TouchableOpacity>
  );
  const renderMenuItem = navigation => ({item}) => (
    <Menu navigation={navigation} {...item} />
  );
@observer
class SSSScreen extends Component {
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
    SSSStore.getSSS();
} 
   
      
render() {
  if (!SSSStore.loading) {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
   
        <View style={styles.categoryList}>

          
          <FlatList
            style={styles.menuList}
            data={SSSStore.sss}
            renderItem={renderMenuItem(navigation)}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      
    </SafeAreaView>
    
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

export default withNavigation(SSSScreen);


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
        backgroundColor:"#ffcc00"
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
    }
});