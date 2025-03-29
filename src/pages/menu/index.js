/* eslint-disable */
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  Dimensions,
  Linking,
  StatusBar
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';
import CustomerIdentityStore from '../../stores/CustomerIdentityStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import menuStructure from './menuStructure';
import colors from '../../components/colors';
import translations from '../../configs/translations';

const { width } = Dimensions.get('window');

const MenuItem = ({ title, icon, screen, onPress }) => (
  <TouchableOpacity 
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIconContainer}>
      <Icon name={icon} style={styles.menuIcon} size={24} />
    </View>
    <View style={styles.menuTitleContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    <Icon name="angle-right" style={styles.menuArrow} size={20} />
  </TouchableOpacity>
);

const CategorySection = ({ category, menus, navigation }) => (
  <View style={styles.categorySection}>
    <Text style={styles.categoryTitle}>{category}</Text>
    <View style={styles.menuGrid}>
      {menus.map((menu) => 
        menu.isActive && (
          <MenuItem
            key={menu.id}
            {...menu}
            onPress={() => {
              if (menu.screen.includes('http')) {
                Linking.openURL(menu.screen);
              } else {
                navigation.navigate(menu.screen);
              }
            }}
          />
        )
      )}
    </View>
  </View>
);

const MenuScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!AuthStore.isSuccess) {
        await AuthStore.userLogout();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return;
      }
      CustomerIdentityStore.getInfo();
    };

    checkAuth();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {menuStructure.map((category) => (
            <CategorySection
              key={category.id}
              {...category}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#f5f5f5'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24
  },
  categorySection: {
    marginBottom: 24
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.txtDescription || '#666',
    marginBottom: 12,
    paddingLeft: 4
  },
  menuGrid: {
    width: '100%'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary || '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  menuIcon: {
    color: '#fff'
  },
  menuTitleContainer: {
    flex: 1
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.txtDark || '#333'
  },
  menuArrow: {
    color: colors.txtDescription || '#666'
  }
});