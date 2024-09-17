import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableList from '../component/ReusableList';
import {COLORS} from '../../Theme/Colors';
import Instance from '../../api/ApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale, verticalScale} from '../../utils/Scaling';

const FavoriteScreen = ({navigation}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFevorites] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          throw new Error('Token not found');
        }

        const response = await Instance.get('/api/favoriteAstrologer', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('data', response.data);
        setFevorites(response.data.favoriteAstrologer);
      } catch (err) {
        setError(err.message);
        console.log('error ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [navigation]);

  const handleViewprofile = item => {
    navigation.navigate('AstrologerInfo', {person: item});
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.AntiFlash}}>
      {loading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : favorites && favorites.length > 0 ? (
        <ReusableList
          data={favorites}
          handleAstrologer={handleViewprofile}
          actionButton={handleViewprofile}
          buttonType="view profile"
        />
      ) : (
        <Text style={styles.notext}>No Favorites</Text>
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
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
  notext: {
    textAlign: 'center',
    marginVertical: verticalScale(50),
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#000',
  },
});
