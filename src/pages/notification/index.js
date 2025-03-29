/* eslint-disable */
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Text, SafeAreaView, FlatList, View,Image,KeyboardAvoidingView, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
 
import AuthStore  from '../../stores/AuthStore';
  import NotificationStore from '../../stores/NotificationStore';
import translations from '../../configs/translations';
@observer
class NotificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: translations.notification,
        headerLayoutPreset: 'center'
      });
    componentDidMount(){   
        console.log(NotificationStore.notifAlert)
        if(!AuthStore.isSuccess)
        {
          AuthStore.userLogout();
          this.props.navigation.navigate("LoginPage");
        }
        NotificationStore.getNotification();
        NotificationStore.setAlert(false);
    } 
    
    render() {
        const Menu = ({ navigation, createDate, message,subject,branchName }) => (
    
            
                <View style={styles.menuItem}>
                    <Text style={styles.mennuIconContainer}>
                    {branchName}    {createDate}
                    </Text>
                    <View style={styles.menuTitleContainer}>
                        <Text style={styles.menuTitle}>{subject}</Text>
                    </View>
                    <View style={styles.menuTitleContainer}>
                        <Text style={styles.menuTitle}>{message}</Text>
                    </View>
                    
                </View>
        
        );

        const renderMenuItem = (navigation) => ({ item }) => (
            <Menu navigation={navigation} {...item} />
        );
        return (
            
 <ScrollView style={styles.scrollView}>
 <SafeAreaView style={styles.container}>
                
           
                 <Image
                style={styles.logo}
                source={require('../../assets/images/group-exercises-min.jpg')}
                title={'logo'}
              />
            
        

          
                <FlatList
                    style={styles.categoryList}
                    data={NotificationStore.notif}
                    renderItem={renderMenuItem(this.props.navigation)}
                    keyExtractor={item => item.id.toString()}
                />
           

                

               
               

              

               
            </SafeAreaView>
 </ScrollView>

          
           
        )
    }
}

export default withNavigation(NotificationScreen)

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
        flex: 1,
        flexDirection: "column",
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginVertical: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#c4c4c4",
        backgroundColor: "#fbfbfb"
    },
    mennuIconContainer: {
        textAlign: "right",
        fontSize:8
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
       
       
    },
    menuTitle: {
        color: colors.txtDark,
        fontWeight: "bold",
        padding: 11,
    }
});