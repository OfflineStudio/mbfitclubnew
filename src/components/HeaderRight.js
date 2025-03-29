import React from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import NotificationStore from '../stores/NotificationStore';
import { observer } from 'mobx-react';
// https://www.youtube.com/watch?v=ergXorHSRzY

const HeaderRight = observer(() => {
	const navigation = useNavigation();

	if (NotificationStore.notifAlert) {
		return (
			<TouchableOpacity
				style={{ marginRight: 10 }}
				onPress={() => navigation.navigate("NotificationScreen")}
			>
				<View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Icon name='bell' color={'#FFFFFF'} size={24} />
					<Text style={{ color: '#FF0000', size: 10 }}>1</Text>
				</View>
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity
				style={{ marginRight: 10 }}
				onPress={() => navigation.navigate("NotificationScreen")}
			>
				<View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Icon name='bell' color={'#FFFFFF'} size={24} />
				</View>
			</TouchableOpacity>
		);
	}
});

export default HeaderRight;
