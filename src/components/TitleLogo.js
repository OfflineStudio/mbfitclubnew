import React, { Component } from 'react';
import { View, Image,Button } from 'react-native';
export default class TitleLogo extends Component {
	render() {
		return (
			<View style={{
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'center'
				
			}}>
				<Image
					style={{ width: 120, height: 40 }}
					source={require('../assets/images/ustlogo.png')}
				/>
			</View>
		)
	}
}
