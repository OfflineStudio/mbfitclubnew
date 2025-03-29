/* eslint-disable */
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    StyleSheet, 
    Text, 
    SafeAreaView, 
    TouchableOpacity, 
    View, 
    Image, 
    Platform,
    StatusBar,
    ActivityIndicator,
    FlatList,
    Dimensions
} from 'react-native';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import AuthStore from '../../stores/AuthStore';
import ExerciseCardStore from '../../stores/ExerciseCardStore';
import translations from '../../configs/translations';

const { width } = Dimensions.get('window');

const ExerciseCard = ({ day, onPress }) => (
    <TouchableOpacity 
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
                <Icon name='calendar-o' style={styles.cardIcon} size={24} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.dayText}>{day}. {translations.day}</Text>
                <Text style={styles.subtitleText}>Egzersiz programınızı görüntülemek için dokunun</Text>
            </View>
            <Icon name='angle-right' style={styles.arrowIcon} size={20} />
        </View>
    </TouchableOpacity>
);

const ExerciseCardScreen = observer(() => {
    const navigation = useNavigation();

    useEffect(() => {
        if(!AuthStore.isSuccess) {
            AuthStore.userLogout();
            navigation.navigate("LoginPage");
        }
        ExerciseCardStore.getexercisecard();
    }, [navigation]);

    const handleDayPress = (day) => {
      console.log(day);
        ExerciseCardStore.getExerciseForDay('Ant' + day);
        navigation.navigate("ExerciseCardDetail");
    };

    const renderItem = ({ item }) => (
        <ExerciseCard 
            day={item} 
            onPress={() => handleDayPress(item)}
        />
    );

    if (ExerciseCardStore.loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                backgroundColor={colors.background}
            />
            
            <View style={styles.header}>
                <Image
                    style={styles.headerImage}
                    source={require('../../assets/images/group-exercises-min.jpg')}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <Text style={styles.headerTitle}>Egzersiz Programı</Text>
                    <Text style={styles.headerSubtitle}>7 günlük özel program</Text>
                </View>
            </View>

            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7]}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                bounces={true}
            />
        </SafeAreaView>
    );
});

export default ExerciseCardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background || '#F5F5F5'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background || '#F5F5F5'
    },
    header: {
        height: 200,
        width: '100%',
        position: 'relative'
    },
    headerImage: {
        width: '100%',
        height: '100%'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    headerSubtitle: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 8,
        opacity: 0.9
    },
    listContainer: {
        padding: 16
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4
            },
            android: {
                elevation: 3
            }
        })
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary || '#ffcc00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardIcon: {
        color: '#FFF'
    },
    textContainer: {
        flex: 1,
        marginLeft: 16
    },
    dayText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.txtDark || '#333'
    },
    subtitleText: {
        fontSize: 12,
        color: colors.txtDescription || '#666',
        marginTop: 4
    },
    arrowIcon: {
        color: colors.txtDark || '#333'
    }
});