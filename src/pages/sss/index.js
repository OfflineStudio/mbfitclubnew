/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator,
  TextInput,
  Platform,
  Dimensions,
  Animated
} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../components/colors';
import SSSStore from '../../stores/SSSStore';
import translations from '../../configs/translations';

const { width } = Dimensions.get('window');

const FAQItem = ({ longText, shortText, id }) => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = new Animated.Value(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const handleDetailPress = (e) => {
    e.stopPropagation(); // Event'in parent'a geçmesini engelle
    try {
      console.log('Detay sayfasına geçiş yapılıyor...');
      console.log('ID:', id);
      console.log('Kısa Metin:', shortText);
      console.log('Uzun Metin:', longText);

      // Store'a verileri kaydet
      SSSStore.setSSS(longText, shortText);
      
      // Store'da verilerin doğru kaydedildiğini kontrol et
      console.log('Store Kontrol - Kısa Metin:', SSSStore.selectShortText);
      console.log('Store Kontrol - Uzun Metin:', SSSStore.selectLongText);

      // Navigasyonu gerçekleştir
      navigation.navigate("SSSDetailScreen");
    } catch (error) {
      console.log('SSS Detay Navigasyon Hatası:', error);
      console.log('Hata Stack:', error.stack);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.faqCard}
      onPress={toggleExpand}
      activeOpacity={0.7}
    >
      <View style={styles.faqHeader}>
        <View style={styles.faqIconContainer}>
          <Icon name="question-circle" style={styles.faqIcon} size={24} />
        </View>
        <View style={styles.faqTitleContainer}>
          <Text style={styles.faqTitle}>{shortText}</Text>
        </View>
        <TouchableOpacity 
          onPress={handleDetailPress}
          style={styles.detailButton}
          activeOpacity={0.6}
        >
      
          <Icon name="arrow-right" size={16} color="#ffcc00" style={styles.detailButtonIcon} />
        </TouchableOpacity>
      </View>
      
      <Animated.View 
        style={[
          styles.faqContent,
          {
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1000]
            }),
            opacity: animatedHeight
          }
        ]}
      >
        <Text style={styles.faqAnswer}>{longText}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const SSSScreen = observer(() => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!AuthStore.isSuccess) {
      AuthStore.userLogout();
      navigation.navigate("LoginPage");
    }
    SSSStore.getSSS();
  }, [navigation]);

  const filteredSSS = SSSStore.sss.filter(item =>
    item.shortText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.longText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFAQItem = ({ item }) => (
    <FAQItem {...item} />
  );

  if (!SSSStore.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Icon name="question-circle" size={22} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerText}>
            Sıkça sorulan sorular ve cevapları
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Soru ara..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredSSS}
          renderItem={renderFAQItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.faqList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="info-circle" size={40} color="#999" />
              <Text style={styles.emptyText}>Soru bulunamadı</Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#ffcc00" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ffcc00',
    padding: 16,
    alignItems: 'center'
  },
  headerIcon: {
    marginRight: 12
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    lineHeight: 22
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#333'
  },
  faqList: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  faqCard: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
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
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff'
  },
  faqIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffcc00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  faqIcon: {
    color: '#fff'
  },
  faqTitleContainer: {
    flex: 1,
    marginRight: 12
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 22
  },
  faqContent: {
    backgroundColor: '#F8F9FA',
    overflow: 'hidden'
  },
  faqAnswer: {
    padding: 16,
    fontSize: 15,
    color: '#666',
    lineHeight: 22
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ffcc00'
  },
  detailButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffcc00',
    marginRight: 4
  },
  detailButtonIcon: {
    marginTop: 1
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    color: '#999'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default SSSScreen;