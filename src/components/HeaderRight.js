import React, { Component } from 'react';
import { View, Image,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import NotificationStore from '../stores/NotificationStore';
import { observer } from 'mobx-react';
// https://www.youtube.com/watch?v=ergXorHSRzY

@withNavigation @observer
export default class HeaderRight extends Component {
	render() {
if(NotificationStore.notifAlert)
{
	return (
		<TouchableOpacity style={{
			marginRight:10
			
		}} onPress={() => {
		   
			
			  this.props.navigation.navigate("NotificationScreen")
			
		  }} >
<View style={{flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>

<Icon name='bell' color={'#FFFFFF'} size={24} />
<Text style={{
			color:'#FF0000',
			size:10
		}} >1</Text>
</View>
			
		</TouchableOpacity>
	)
}
	else{
		return (
			<TouchableOpacity style={{
				marginRight:10
				
			}} onPress={() => {
               
                
                  this.props.navigation.navigate("NotificationScreen")
                
              }} >
 <View style={{flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>

 <Icon name='bell' color={'#FFFFFF'} size={24} />
 
 </View>
				
			</TouchableOpacity>
		)
	}	
	}
}
