import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import {COLORS} from '../../../Theme/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Instance from '../../../api/ApiCall';

const Horoscope = ({navigation}) => {
  const [horoscope, setHoroscope] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {month: 'short', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchFreeServices = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await Instance.get('/api/free-services/horoscopes', {
          headers: {Authorization: `Bearer ${token}`},
        });
        // console.log('horoscope data', response.data);
        setHoroscope(response.data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFreeServices();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('HoroscopeDetails', {data: item})}
      style={styles.signContainer}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              item.zodiacImage ||
              'https://www.bing.com/th?id=OIP.CtB9-R0mxlASJmUU3FkwKgHaHa&w=142&h=150&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
          }}
          style={styles.signImage}
        />
      </View>
      <Text style={styles.signName}>{item.zodiacSign || 'Sign'}</Text>
      <Text style={styles.signDate}>
        {item.dateRange?.start && item.dateRange?.end
          ? `${formatDate(item.dateRange.start)} - ${formatDate(
              item.dateRange.end,
            )}`
          : 'July - March'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Zodiac Sign</Text>
      {loading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={horoscope}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.AstroMaroon,
    marginBottom: verticalScale(20),
  },
  listContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  signContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(25),
  },
  signImage: {
    width: scale(50),
    height: verticalScale(50),

    marginBottom: verticalScale(10),
  },
  signName: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  signDate: {
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    color: '#000',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(70),
    height: scale(70),
    borderRadius: moderateScale(35),
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
  },
});

export default Horoscope;
