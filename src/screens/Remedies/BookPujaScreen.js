import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Instance from '../../api/ApiCall';

// const data = [
//   {
//     id: '1',
//     title: 'Navgrah Shanti Puja',
//     description: 'Kundali Mein Bure Graho Ki Shanti Karein Aur Success P...',
//     originalPrice: '₹1500',
//     discountedPrice: '₹799',
//     label: 'For Peace & Happiness In Life',
//     image:
//       'https://th.bing.com/th/id/OIP.XKhDJsAyX2WTH1q0Y-ZtRAHaDu?w=347&h=176&c=7&r=0&o=5&pid=1.7',
//   },
//   {
//     id: '2',
//     title: 'Rahu-Ketu Shanti Puja',
//     description: 'Apni Har Pareshani Aur Negativity Ko Door Karne Ke Liye...',
//     originalPrice: '₹1500',
//     discountedPrice: '₹699',
//     label: 'Apna Har Kaam Bane',
//     image:
//       'https://th.bing.com/th/id/OIP.XKhDJsAyX2WTH1q0Y-ZtRAHaDu?w=347&h=176&c=7&r=0&o=5&pid=1.7',
//   },
//   {
//     id: '3',
//     title: 'Mangal Dosh Nivaran Puja',
//     description: 'Mangal Dosh Se Mukti Ke Liye Vishesh Puja',
//     originalPrice: '₹1500',
//     discountedPrice: '₹699',
//     label: 'Resolves Problems In Married Life',
//     image:
//       'https://th.bing.com/th/id/OIP.XKhDJsAyX2WTH1q0Y-ZtRAHaDu?w=347&h=176&c=7&r=0&o=5&pid=1.7',
//   },
// ];

const BookPujaScreen = ({navigation}) => {
  const [pujas, setPujas] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await Instance.get('/api/astro-services/pujas', {
          headers: {Authorization: `Bearer ${token}`},
        });
        // console.log('Puja', response.data);
        if (response.data) {
          setPujas(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPujas();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <ImageBackground
        source={{
          uri:
            item.image ||
            'https://th.bing.com/th/id/OIP.XKhDJsAyX2WTH1q0Y-ZtRAHaDu?w=347&h=176&c=7&r=0&o=5&pid=1.7',
        }}
        style={styles.imageBackground}>
        <View style={styles.textContainer}>
          {item.label ? <Text style={styles.label}>{item.label}</Text> : null}
          <Text style={styles.title}>{item.PujaName || 'Puja name'}</Text>
          <Text
            style={styles.description}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {item.description || 'puja description'}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.priceContainer}>
        {/* <Text style={styles.originalPrice}>{item.originalPrice}</Text> */}
        <Text style={styles.discountedPrice}> ₹{item.price || '100'} </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('PujaDetails', {data: item})}
          style={styles.bookNowButton}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : pujas === null ? (
        <Text style={styles.errorText}>data not available</Text>
      ) : (
        <FlatList
          data={pujas}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContainer: {
    padding: scale(15),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    overflow: 'hidden',
    elevation: verticalScale(3), // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: verticalScale(2)}, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: moderateScale(5), // For iOS shadow
  },
  imageBackground: {
    width: '100%',
    height: verticalScale(140),
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: scale(10),
    height: scale(140),
  },
  label: {
    backgroundColor: COLORS.AstroGold,
    color: 'black',
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(5),
    borderRadius: moderateScale(3),
    alignSelf: 'flex-start',
    marginBottom: verticalScale(5),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: verticalScale(3),
  },
  description: {
    fontSize: moderateScale(13),
    color: 'white',
  },
  priceContainer: {
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: moderateScale(13),
    color: 'gray',
    textDecorationLine: 'line-through',
    fontWeight: 'bold',
    color: '#000',

    paddingHorizontal: scale(10),
  },
  discountedPrice: {
    fontSize: moderateScale(13),
    color: '#FF6347',
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: COLORS.AstroGold,
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(20),
    marginLeft: 'auto',
    marginRight: scale(10),
    marginVertical: verticalScale(5),
  },
  bookNowText: {
    fontSize: moderateScale(12),
    color: 'black',
    fontWeight: 'bold',
  },
});

export default BookPujaScreen;
