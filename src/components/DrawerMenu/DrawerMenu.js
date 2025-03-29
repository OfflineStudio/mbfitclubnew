import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
 import MenuStore from '../../stores/MenuStore';
 
 import { observer,Observer } from 'mobx-react';
//  https://oblador.github.io/react-native-vector-icons/
import colors from '../colors';
import LoginStore from '../../stores/LoginStore';

 @observer
export default class DrawerMenu extends Component {
   
    navigateToScreen = (route) => () => {
        this.props.navigation.navigate(route)
    };
    GetEnvoyDep() {  
          
        if (MenuStore.EnvoyDeposit) {
            return (
                
                <TouchableOpacity style={styles.menu}  onPress={this.navigateToScreen('EnvoyDepositScreen')}>
                             
                <Icon name='angle-right' color={colors.txtDark} size={24} />
               <Text style={styles.menuText} type='h5White'>Envoy</Text>
            </TouchableOpacity>
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
      GetBankDep() {  
          
        if (MenuStore.BankDeposit) {
            return (
                
                <TouchableOpacity style={styles.menu}  onPress={this.navigateToScreen('BankTransferScreen')}>
                             
							 <Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Havale / EFT</Text>
                         </TouchableOpacity>
                          
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
      GetMobileDep() {  
          
        if (MenuStore.MobileDeposit) {
            return (
                
                <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('MobileBankScreen')}>
                             
							 <Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>CEP BANK</Text>
                         </TouchableOpacity>
                          
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
      GetSkrillDep() {  
          
        if (MenuStore.SkrillDeposit) {
            return (
                
                <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('SkrillTransferScreen')}>
                            
							 <Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Skrill</Text>
                         </TouchableOpacity>
                          
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
      GetBTCDep() {  
          
        if (MenuStore.BtcDeposit) {
            return (
                
                <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('BTCDepositScreen')}>
                            
							 <Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>BTC</Text>
                         </TouchableOpacity>
                          
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
    GetBankTransferMenu() {  
          
        if (MenuStore.selectedMenuItem==1) {
            return (
                <View  >
                    <TouchableOpacity
                             onPress={()=>{MenuStore.setSelectedMenuItem(1)}}
                             style={styles.menu}>
                             <Icon name='bank' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Para Yatırma</Text>
							<Icon name='angle-up' color={colors.txtDark} size={24} />
                         </TouchableOpacity>
     
                         {this.GetEnvoyDep()}
                         {this.GetBTCDep()}
                         {this.GetBankDep()}
                         {this.GetMobileDep()}
                         {this.GetSkrillDep()}
                        
                        
                </View>
            );
        } else {
             
            return (
                <View  >
                    <TouchableOpacity
                              onPress={()=>{MenuStore.setSelectedMenuItem(1)}}
                             style={styles.menu}>
                             
							 <Icon name='bank' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Para Yatırma</Text>
							<Icon name='angle-down' color={colors.txtDark} size={24} />
                         </TouchableOpacity>
      
                </View>
            );
        }
        
      }
      GetAccountMenu() {  
          
        if (MenuStore.selectedMenuItem==2) {
            return (
                <View  >
                     <TouchableOpacity style={styles.menu}   onPress={()=>{MenuStore.setSelectedMenuItem(2)}}>
					 <Icon name='gears' color={colors.txtDark} size={24} />
                            <Text style={styles.menuTextLarge} type='h5White'>Hesap İşlemleri </Text>
							<Icon name='angle-up' color={colors.txtDark} size={24}  />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}  onPress={this.navigateToScreen('BankAccount')}>
						<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Banka Hesabı Güncelle</Text>
                             
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}  onPress={this.navigateToScreen('BTCWalletScreen')}>
						<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>BTC Cüzdan Güncelle</Text>
                             
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('DocumentsScreen')}>
            
			<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Evrak Gönder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('AccountActivitiesScreen')}>
                          
							<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Hesap Hareketleri</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('AcProcessScreen')}>
                             
							<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>İşlemde Olan Hareketler</Text>
                        </TouchableOpacity>
                        
                </View>
            );
        } else {
            return (
                <View  style={styles.itemText}>
                     <TouchableOpacity style={styles.menu}   onPress={()=>{MenuStore.setSelectedMenuItem(2)}}>
                           
							<Icon name='gears' color={colors.txtDark} size={24} />
                            <Text style={styles.menuTextLarge} type='h5White'>Hesap İşlemleri </Text>
							<Icon name='angle-down' color={colors.txtDark} size={24}  />
                        </TouchableOpacity>
                        
                </View>
            );
             
        }
        
      }
      GetEnvoyWith() {  
          
        if (MenuStore.EnvoyWithdrawal) {
            return (
                
                        <TouchableOpacity style={styles.menu}  onPress={this.navigateToScreen('EnvoyWithdrawalScreen')}>
                             
                             <Icon name='angle-right' color={colors.txtDark} size={24} />
                             <Text style={styles.menuText} type='h5White'>Envoy Çekim</Text>
                         </TouchableOpacity>
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
      GetBankWith() {  
          
        if (MenuStore.BankWithdrawal) {
            return (
                
                <TouchableOpacity style={styles.menu}  onPress={this.navigateToScreen('WithdrawalScreen')}>
                             
                <Icon name='angle-right' color={colors.txtDark} size={24} />
                <Text style={styles.menuText} type='h5White'>Havale EFT Para Çekim</Text>
            </TouchableOpacity>
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
      GetSkrillWith() {  
          
        if (MenuStore.SkrillWithdrawal) {
            return (
                
                <TouchableOpacity style={styles.menu}  onPress={this.navigateToScreen('WithdrawalSkrillScreen')}>
                            
							<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Skrill Para Çekim</Text>
                        </TouchableOpacity>
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
      GetBtcWith() {  
          
        if (MenuStore.BtcWithdrawal) {
            return (
                
                <TouchableOpacity style={styles.menu}  onPress={this.navigateToScreen('BTCWithdrawalScreen')}>
                            
							<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>BTC Çekim</Text>
                        </TouchableOpacity>
                        
            );
        } else {
            return (
                <View></View>
            );
             
        }
        
      }
      GetWithdrawalMenu() {  
          
        if (MenuStore.selectedMenuItem==3) {
            return (
                <View  >
                     <TouchableOpacity style={styles.menu}   onPress={()=>{MenuStore.setSelectedMenuItem(3)}}>
					 <Icon5 name='wallet' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Para Çekme</Text>
							<Icon name='angle-up' color={colors.txtDark} size={24} />
                        </TouchableOpacity>
                        {this.GetEnvoyWith()}
                        {this.GetBtcWith()}
                        {this.GetBankWith()}
                        {this.GetSkrillWith()}
                          
                </View>
            );
        } else {
            return (
                <View  style={styles.itemText}>
                     <TouchableOpacity style={styles.menu}   onPress={()=>{MenuStore.setSelectedMenuItem(3)}}>
                             
							<Icon5 name='wallet' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Para Çekme</Text>
							<Icon name='angle-down' color={colors.txtDark} size={24}  />
                        </TouchableOpacity>
                        
                </View>
            );
             
        }
        
      }
	  GetUserMenu() {  
          
        if (MenuStore.selectedMenuItem==4) {
            return (
                <View  >
                     <TouchableOpacity style={styles.menu}   onPress={()=>{MenuStore.setSelectedMenuItem(4)}}>
					 <Icon5 name='user-edit' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Kullanıcı</Text>
							<Icon name='angle-up' color={colors.txtDark} size={24}  />
                        </TouchableOpacity>
						<TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('CustomerIdentityScreen')}>
                            
							<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Kimlik Bilgilerim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('ChangePasswordScreen')}>
						<Icon name='angle-right' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Şifre Değiştir</Text>
                             
                        </TouchableOpacity>
                          
                </View>
            );
        } else {
            return (
                <View  style={styles.itemText}>
                     <TouchableOpacity style={styles.menu}   onPress={()=>{MenuStore.setSelectedMenuItem(4)}}>
                             
							<Icon5 name='user-edit' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Kullanıcı</Text>
							<Icon name='angle-down' color={colors.txtDark} size={24}  />
                        </TouchableOpacity>
                        
                </View>
            );
             
        }
        
      }
    render() {
    
        
            return (
            
                <View style={styles.sideMenu}>
                    <ScrollView>
					{ this._renderHeader() }
                        <TouchableOpacity
                            onPress={this.props.navigation.closeDrawer}
							style={[ styles.menu, { backgroundColor: 'rgba(255,255,255,0.3)'} ]}
							>
								   <Icon name='home' color={colors.txtDark} size={24} />
								   <Text style={styles.menuText} type='h5White'>Anasayfa</Text>
                            
                        </TouchableOpacity>
						 {this.GetUserMenu()}
                         {this.GetBankTransferMenu()}
                        
                         {this.GetWithdrawalMenu()}
                        
                         {this.GetAccountMenu()}
                        
                        
                        <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('AnnouncementsScreen')}>
                            {/* <Text style={styles.itemText}>Duyurular*</Text> */}
							<Icon name='bell-o' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Duyurular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('SuggestionScreen')}>
						<Icon name='support' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Öneriler</Text>
                             
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('SSSScreen')}>
						<Icon name='comments-o' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>SSS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}>
						<Icon name='newspaper-o' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Günlük Bülten</Text>
                             
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.menu} onPress={this.navigateToScreen('LogoutScreen')}>
						<Icon name='sign-out' color={colors.txtDark} size={24} />
                            <Text style={styles.menuText} type='h5White'>Çıkış</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>KlasFX</Text>
                    </View>
                </View>
            );
        }
		_renderHeader() {
			return (
				<View style={ styles.header }>
					<View style={ styles.userInfosHolder }>
					<Icon name='user-circle' color={colors.txtDark} size={48} />
						<View style={ styles.userInfos }>
			<Text type='h1White' style={ styles.username }>{LoginStore.currentUser?.firstName}</Text>
							<Text type='h1White' style={ styles.username }>{LoginStore.currentUser?.lastName}</Text>
						</View>
	
					</View>
				</View>
			)
		}
        
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        paddingVertical: 40
    },
   
    itemText: {
        fontSize: 14,
        color: '#333',
         
    },
    footer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        paddingVertical: 10
    },
    footerText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 20
	},


	sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        backgroundColor: 'transparent'
    },
	menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 50, 
		borderRadius: 5,borderBottomColor: 'gray',
							borderBottomWidth: 1
	},
	menuText: {
		marginLeft: 20,
		marginRight: 20
	},
	menuTextLarge: {
		marginLeft: 20,
		marginRight: 8
	},

	header: {
        marginTop: 20,
		marginBottom: 20,
		marginLeft:20
    },
    userInfosHolder: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    userInfos: {
        height: 50,
		justifyContent: 'center',
		marginLeft:10,
	
    },
    username: {
		fontWeight: '700'
    }

});
