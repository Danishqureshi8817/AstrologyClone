import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import Allastrologers from './Allastrologers';
import PremiumScreen from './PremiumScreen';
import MaritalLifeScreen from './MaritalLifeScreen';
import LoveAndRelationScreen from './LoveAndRelationScreen';
import CareerJob from './CareerJob';
import Instance from '../../api/ApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tabs = [
  {id: '1', title: 'All'},
  {id: '2', title: 'Premium'},
  {id: '3', title: 'Marital Life'},
  {id: '4', title: 'Love & Relationship'},
  {id: '5', title: 'Career & Job'},
  // Add more tabs here
];

const Chat = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('All');
  const [astrologer, setAstrologer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAstrologer = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await Instance.get('/api/astrologers', {
          headers: {Authorization: token},
        });
        setAstrologer(response.data.data);
        console.log('chat');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAstrologer();
  }, []);
  const handleAllprofile = item => {
    navigation.navigate('AstrologerInfo', {
      person: item,
    });
  };
  const handlePremiumprofile = item => {
    navigation.navigate('AstrologerInfo', {
      person: item,
    });
  };
  const handleMaritalprofile = item => {
    navigation.navigate('AstrologerInfo', {
      person: item,
    });
  };
  const handleLoveprofile = item => {
    navigation.navigate('AstrologerInfo', {
      person: item,
    });
  };
  const handleCareerprofile = item => {
    navigation.navigate('AstrologerInfo', {
      person: item,
    });
  };

  const handleChat = item => {
    navigation.navigate('ChatIntakeForm', {person: item});
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'All':
        return (
          <Allastrologers
            actionButton={handleChat}
            data={astrologer}
            handleAstrologer={handleAllprofile}
          />
        );
      case 'Premium':
        return (
          <PremiumScreen
            navigation={navigation}
            handleChat={handleChat}
            handleAstrologer={handlePremiumprofile}
          />
        );
      case 'Marital Life':
        return (
          <MaritalLifeScreen
            handleChat={handleChat}
            handleAstrologer={handleMaritalprofile}
          />
        );
      case 'Love & Relationship':
        return (
          <LoveAndRelationScreen
            handleChat={handleChat}
            handleAstrologer={handleLoveprofile}
          />
        );
      case 'Career & Job':
        return (
          <CareerJob
            handleChat={handleChat}
            handleAstrologer={handleCareerprofile}
          />
        );

      default:
        return null;
    }
  };
  const renderTab = ({item}) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === item.title && styles.activeTab]}
      onPress={() => setActiveTab(item.title)}>
      <Text
        style={[
          styles.tabText,
          activeTab === item.title && styles.activeTabText,
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }
  return (
    <View style={styles.main}>
      <View style={styles.tabContainer}>
        <FlatList
          data={tabs}
          renderItem={renderTab}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {renderTabContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    padding: scale(10),
    backgroundColor: COLORS.white,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    padding: scale(10),
    marginBottom: verticalScale(10),
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: verticalScale(-10),
    left: scale(-10),
    backgroundColor: 'red',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderTopLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(30),
    marginRight: scale(10),
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: moderateScale(16),
    color: 'black',
    fontWeight: 'bold',
  },
  specialization: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  languages: {
    fontSize: moderateScale(12),
    color: '#666',
  },
  experience: {
    fontSize: moderateScale(12),
    color: '#666',
  },
  reviews: {
    fontSize: moderateScale(12),
    color: COLORS.darkYellow,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    textDecorationLine: 'line-through',
    fontSize: moderateScale(12),
    color: '#666',
  },
  offer: {
    fontSize: moderateScale(12),
    color: 'red',
    marginLeft: scale(5),
  },
  chatButton: {
    backgroundColor: '#00C853',
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
  },
  chatText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
  },
  tab: {
    paddingHorizontal: scale(10),
    marginLeft: scale(5),
    paddingVertical: verticalScale(5),
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    paddingHorizontal: scale(10),
  },
  activeTab: {
    marginLeft: scale(5),
    borderWidth: moderateScale(1),
    borderColor: COLORS.darkYellow,
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.AntiFlash,
  },
  activeTabText: {
    paddingHorizontal: scale(10),
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(12),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    paddingVertical: verticalScale(10),
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
});

export default Chat;
