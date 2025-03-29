/* eslint-disable */
import React, { Component } from 'react';
import {Text, View, FlatList ,ActivityIndicator,TouchableOpacity} from 'react-native';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import { withNavigation } from 'react-navigation';
 class LogoutScreen extends Component {
     

    
  componentDidMount(){
    try {
          AsyncStorage.removeItem('CoreMobile');
        this.props.navigation.navigate("LoginPage");
    } catch (err) {
        this.props.navigation.navigate("HomePage");
    }
}   

      
  render() {
     
   
      return ( 
       
         <View></View>
        );
    }
     

}
export default withNavigation(LogoutScreen)