/* eslint-disable */
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View,Image,KeyboardAvoidingView, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
 
import AuthStore  from '../../stores/AuthStore';
  import ExerciseCardStore from '../../stores/ExerciseCardStore';
import translations from '../../configs/translations';
@observer
class ExerciseCardScreen extends Component {
    componentDidMount(){   
        if(!AuthStore.isSuccess)
        {
          AuthStore.userLogout();
          this.props.navigation.navigate("LoginPage");
        }
        ExerciseCardStore.getexercisecard();
    } 
    render() {
        return (
            <KeyboardAvoidingView style={styles.avoidingView}>
 <ScrollView style={styles.scrollView}>
 <SafeAreaView style={styles.container}>
                
           
                 <Image
                style={styles.logo}
                source={require('../../assets/images/group-exercises-min.jpg')}
                title={'logo'}
              />
            
        

                <TouchableOpacity onPress={() =>{ExerciseCardStore.getExerciseForDay("Ant1");  this.props.navigation.navigate("ExerciseCardDetailScreen");} }>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name='calendar-o' style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>1. {translations.day}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={() =>{ExerciseCardStore.getExerciseForDay("Ant2");  this.props.navigation.navigate("ExerciseCardDetailScreen");} }>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name='calendar-o' style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>2. {translations.day}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={() =>{ExerciseCardStore.getExerciseForDay("Ant3");  this.props.navigation.navigate("ExerciseCardDetailScreen");} }>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name='calendar-o' style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>3. {translations.day}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={() =>{ExerciseCardStore.getExerciseForDay("Ant4");  this.props.navigation.navigate("ExerciseCardDetailScreen");} }>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name='calendar-o' style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>4. {translations.day}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() =>{ExerciseCardStore.getExerciseForDay("Ant5");  this.props.navigation.navigate("ExerciseCardDetailScreen");} }>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name='calendar-o' style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>5. {translations.day}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={() =>{ExerciseCardStore.getExerciseForDay("Ant6");  this.props.navigation.navigate("ExerciseCardDetailScreen");} }>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name='calendar-o' style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>6. {translations.day}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={() =>{ExerciseCardStore.getExerciseForDay("Ant7");  this.props.navigation.navigate("ExerciseCardDetailScreen");} }>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name='calendar-o' style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>7. {translations.day}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
                 </TouchableOpacity>
            </SafeAreaView>
 </ScrollView>

            </KeyboardAvoidingView>
           
        )
    }
}

export default withNavigation(ExerciseCardScreen)

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
        backgroundColor: "black",
        marginRight: 2
    },
    menuIcon: {
        color: colors.txtWhite,
        paddingVertical: 9,
        paddingLeft: 11,
        backgroundColor:"black"

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