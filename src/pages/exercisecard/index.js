/* eslint-disable */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import ExerciseCardStore from '../../stores/ExerciseCardStore';
import AuthStore from '../../stores/AuthStore';
import translations from '../../configs/translations';
import { colors } from '../../theme/colors';

const ExerciseCardScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("Login");
    }
    ExerciseCardStore.getExerciseCards();
  }, [navigation]);

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => navigation.navigate('ExerciseCardDetail', { exerciseId: item.id })}
    >
      <View style={styles.exerciseContent}>
        <Text style={styles.exerciseTitle}>{item.title}</Text>
        <Text style={styles.exerciseDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (!ExerciseCardStore.loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{translations.exercisecard}</Text>
        </View>
        <FlatList
          style={styles.list}
          data={ExerciseCardStore.exerciseCards}
          renderItem={renderExerciseItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.indicatorView}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  list: {
    padding: 16
  },
  exerciseItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  exerciseContent: {
    flex: 1
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.txtTitle,
    marginBottom: 4
  },
  exerciseDescription: {
    fontSize: 14,
    color: colors.txtDescription
  },
  indicatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ExerciseCardScreen;