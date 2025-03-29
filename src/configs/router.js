import React, { Component } from 'react';
import { View, Image,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 
import LoginScreen from "../pages/login/index"; 
import ForgotPasswordScreen from "../pages/forgotpassword/index";
import TitleLogo from "../components/TitleLogo";
import HeaderRight from "../components/HeaderRight";
import ChangePasswordScreen from "../pages/changepassword/index";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LogoutScreen from '../pages/login/logout'; 
import MenuScreen from '../pages/menu';
import 	NewsStore from '../stores/NewsStore';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../components/colors';
import ActivitiesStore  from '../stores/ActivitiesStore';
 
import AccountsScreen from "../pages/account/index";
 
import translations from '../configs/translations';
import styles from '../theme/styles';
import QrCodeScreen from '../pages/qr/index';
import QrStore from '../stores/QrStore';
import ExerciseCardScreen from '../pages/exercisecard/index';
import ExerciseCardDetailScreen from '../pages/exercisecard/detail';
import ExerciseVideoScreen from '../pages/exercisecard/video';
import CustomerIdentityScreen from '../pages/customerIdentity';
import LastEntriesScreen from '../pages/lastentries';
import AboutUsScreen from '../pages/aboutus';
import ContactScreen from '../pages/contact';
import BranchScreen from '../pages/branch/index';
import BranchDetailScreen from '../pages/branch/detail';
import NewsScreen from '../pages/news/index';
import NewsDetailScreen from '../pages/news/detail';
import MembershipScreen from '../pages/membership';
import ActivitiesScreen from '../pages/activities/index';
import ActivityDetailScreen from '../pages/activities/detail';
import SSSScreen from '../pages/sss/index';
import SSSDetailScreen from '../pages/sss/detail';
import CareerScreen from '../pages/career/index';
import newPurchasesScreen from '../pages/menu/newPurchases';
import NotificationScreen from '../pages/notification/index';
import QrCodeCreateScreen from '../pages/qr/create';


// class TitleLogo extends Component {
// 	render() {
// 		return (
// 			<View style={{
// 				flex: 1,
// 				flexDirection: 'row',
// 				justifyContent: 'center'
				
// 			}}>
// 				<Image
// 					style={{ width: 120, height: 40 }}
// 					source={require('../assets/images/logo.png')}
// 				/>
// 			</View>
// 		)
// 	}
// }
const logoHeader = {
	headerTitle: <TitleLogo />,
	headerLeft: null
}

const MemberPages = {
	HomePage: NewsScreen,
	ChangePasswordScreen,
	LogoutScreen,	 
	QrCodeScreen,
	ExerciseCardScreen,
	ExerciseCardDetailScreen,
	ExerciseVideoScreen,
	CustomerIdentityScreen,
	LastEntriesScreen,
	AboutUsScreen,
	ContactScreen,
	BranchScreen,
	BranchDetailScreen,
	NewsDetailScreen,
	MembershipScreen,
	ActivityDetailScreen,
	SSSScreen,
	SSSDetailScreen,
	CareerScreen,
	newPurchasesScreen,
	NotificationScreen,
	QrCodeCreateScreen

	 
	
};

const GuestPages = {
	LoginPage: {
		screen: LoginScreen,
		navigationOptions: {
			headerMode: "none",
			headerShown:false
		}
	},
	ForgotPassword: {
		screen: ForgotPasswordScreen,
		navigationOptions: {
			headerMode: "none",
			 
			headerShown:false
		}
	}
};

const TabNavigator =createBottomTabNavigator({
	Announcements: {
		screen: NewsScreen,
		navigationOptions: {
			tabBarLabel: translations.news,
			tabBarIcon: ({ tintColor, size }) => (
				<Icon name='newspaper-o' color={tintColor} size={24} />
			),
			tabBarOnPress: ({navigation, defaultHandler }) => {
				NewsStore.getNews();
				QrStore.setTimer(false);
				defaultHandler();}
			
		}
	},
	Deposit: {
		screen: ActivitiesScreen,
		navigationOptions: {
			tabBarLabel: translations.activities,
			tabBarIcon: ({ tintColor, size }) => (
				<Icon name='bicycle' color={tintColor} size={24} />
			),
			tabBarOnPress: ({navigation, defaultHandler }) => {
				ActivitiesStore.getTypes();
				QrStore.setTimer(false);
				defaultHandler();}
		}
	},
	Withdraw: {
		screen: QrCodeCreateScreen,
		navigationOptions: {
			tabBarLabel: "QR",
			tabBarIcon: ({ tintColor, size }) => (
				<Icon name='qrcode' color={tintColor} size={38} />
			),
			tabBarOnPress: ({navigation, defaultHandler }) => {
				QrStore.setTimer(true);
				 
				defaultHandler();}
		}
	},
	SSS: {
		screen: ExerciseCardScreen,
		navigationOptions: {
			tabBarLabel: translations.exercise,
			tabBarIcon: ({ tintColor, size }) => (
				<Icon name='heartbeat' color={tintColor} size={24} />
			),
			tabBarOnPress: ({navigation, defaultHandler }) => {
				QrStore.setTimer(false);
				 
				defaultHandler();}
		}
	},
	Menu: {
		screen: MenuScreen,
		navigationOptions: {
			tabBarLabel: translations.menu,
			tabBarIcon: ({ tintColor, size }) => (
				<Icon name='bars' color={tintColor} size={24} />
			),
			tabBarOnPress: ({navigation, defaultHandler }) => {
				// LastEntryStore.getEntry();
				QrStore.setTimer(false);
				defaultHandler();}
		
		}
	}
}, {
	tabBarOptions: {
		activeTintColor: "#ffcc00",
		inactiveTintColor: colors.txtDark,
		style: {
			height: 66,
			paddingBottom: 16
		},
	},
	navigationOptions: {
		headerTitle: <TitleLogo />,
		headerLeft: null,
		headerRight:  <HeaderRight />,
	
		headerStyle: {
			backgroundColor: '#212529'
		}
	}
});

const RootNavigator = createStackNavigator({
	...GuestPages,
	Tabs: TabNavigator,
	...MemberPages
});

export default createAppContainer(RootNavigator);