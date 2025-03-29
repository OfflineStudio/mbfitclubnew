/* eslint-disable */
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, View, Linking } from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import menuStructure from "./menuStructure";
import AuthStore from '../../stores/AuthStore';
import CustomerIdentityStore from '../../stores/CustomerIdentityStore';

const Category = ({ navigation, category, menus }) => (
    <View style={styles.categoryItem}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <FlatList
            style={styles.menuList}
            data={menus.filter((word) => word.isActive)}
            renderItem={renderMenuItem(navigation)}
            keyExtractor={item => item.id.toString()}
        />
    </View>
)

const Menu = ({ navigation, title, icon, screen }) => (
    <TouchableOpacity onPress={() => {
        if (screen.includes('http')) {
            Linking.openURL(screen);
        } else {
            navigation.navigate(screen);
        }
    }}>
        <View style={styles.menuItem}>
            <View style={styles.mennuIconContainer}>
                <Icon name={icon} style={styles.menuIcon} size={22} />
            </View>
            <View style={styles.menuTitleContainer}>
                <Text style={styles.menuTitle}>{title}</Text>
            </View>
            <Icon name='angle-right' style={styles.menuArrow} size={16} />
        </View>
    </TouchableOpacity>
);

const renderCategory = (navigation) => ({ item }) => (
    <Category navigation={navigation} {...item} />
)

const renderMenuItem = (navigation) => ({ item }) => (
    <Menu navigation={navigation} {...item} />
);

const MenuScreen = observer(() => {
    const navigation = useNavigation();

    useEffect(() => {
        if (!AuthStore.isSuccess) {
            AuthStore.userLogout();
            navigation.navigate("LoginPage");
        }
        CustomerIdentityStore.getInfo();
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.categoryList}
                data={menuStructure}
                renderItem={renderCategory(navigation)}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
});

export default MenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
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