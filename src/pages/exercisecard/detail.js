/* eslint-disable */
import React, { useEffect } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  Platform,
  StatusBar,
  ActivityIndicator,
  FlatList 
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import colors from '../../components/colors';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExerciseCardStore from '../../stores/ExerciseCardStore';
import translations from '../../configs/translations';

const ExerciseItem = ({ exerciseText, set, duration, repetition, imagePath, videoUrl, onPress }) => (
  <TouchableOpacity 
    style={styles.exerciseCard}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.exerciseContent}>
      <View style={styles.iconContainer}>
        <Icon name="heartbeat" style={styles.exerciseIcon} size={24} />
      </View>
      
      <View style={styles.exerciseDetails}>
        <Text style={styles.exerciseTitle}>{exerciseText}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="refresh" size={16} color={colors.primary || '#007AFF'} />
            <Text style={styles.statText}>{set} Set</Text>
          </View>
          
          <View style={styles.statItem}>
            <Icon name="repeat" size={16} color={colors.primary || '#007AFF'} />
            <Text style={styles.statText}>{repetition} Tekrar</Text>
          </View>
          
          {duration && (
            <View style={styles.statItem}>
              <Icon name="clock-o" size={16} color={colors.primary || '#007AFF'} />
              <Text style={styles.statText}>{duration}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.arrowContainer}>
        <Icon name="angle-right" size={20} color={colors.txtDark || '#333'} />
      </View>
    </View>
  </TouchableOpacity>
);

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Icon name="info-circle" size={50} color={colors.primary || '#007AFF'} />
    <Text style={styles.emptyText}>
      {translations.exerciseempty}
    </Text>
  </View>
);

const ExerciseCardDetailScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
    }
  }, [navigation]);

  const handleExercisePress = (imagePath, videoUrl) => {
    ExerciseCardStore.setselectedImage(imagePath);
    ExerciseCardStore.setselectedVideo(videoUrl);
    navigation.navigate("ExerciseVideoScreen");
  };

  if (ExerciseCardStore.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary || '#007AFF'} />
      </View>
    );
  }

  if (!ExerciseCardStore.dayList.length) {
    return <EmptyState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background || '#F5F5F5'}
      />
      
      <FlatList
        data={ExerciseCardStore.dayList}
        renderItem={({ item }) => (
          <ExerciseItem
            {...item}
            onPress={() => handleExercisePress(item.imagePath, item.videoUrl)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
});

export default ExerciseCardDetailScreen;

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
  listContainer: {
    padding: 16
  },
  exerciseCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
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
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary || '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  exerciseIcon: {
    color: '#FFF'
  },
  exerciseDetails: {
    flex: 1
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.txtDark || '#333',
    marginBottom: 8
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4
  },
  statText: {
    fontSize: 14,
    color: colors.txtDescription || '#666',
    marginLeft: 4
  },
  arrowContainer: {
    padding: 8
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background || '#F5F5F5',
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: colors.txtDark || '#333',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24
  }
});