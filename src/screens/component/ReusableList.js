import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ReusableList = ({data, actionButton, handleAstrologer, buttonType}) => {
  const renderButton = item => {
    switch (buttonType) {
      case 'video':
        return (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => actionButton(item)}>
            <Text style={styles.chatText}>Video</Text>
          </TouchableOpacity>
        );
      case 'call':
        return (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => actionButton(item)}>
            <Text style={styles.chatText}>Call</Text>
          </TouchableOpacity>
        );
      case 'view profile':
        return (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => actionButton(item)}>
            <Text style={styles.chatText}>View Profile</Text>
          </TouchableOpacity>
        );
      case 'chat':
      default:
        return (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => actionButton(item)}>
            <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
        );
    }
  };

  const renderItem = ({item}) => {
    const languages = item.language?.join(', ');

    return (
      <TouchableOpacity
        onPress={() => handleAstrologer(item)}
        style={styles.card}>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <View style={styles.row}>
          <View style={styles.reviewImageView}>
            <Image
              source={{
                uri:
                  item.profileImage ||
                  'https://th.bing.com/th/id/OIP.xHU435DrZMf0aN-ri48zEAHaJQ?w=126&h=180&c=7&r=0&o=5&pid=1.7',
              }}
              style={styles.avatar}
            />

            <View style={styles.starsContainer}>
              {Array.from({length: item?.rating}).map((_, index) => (
                <MaterialIcons
                  key={index}
                  name="star"
                  size={moderateScale(14)}
                  color="orange" // Gold color for stars
                  style={styles.star}
                />
              ))}
            </View>
          </View>
          <View style={styles.details}>
            <Text style={styles.name}>{item.name || 'name'}</Text>

            <Text style={styles.specialization}>
              {item.specialties?.[0]?.name || 'Vedic Astrology'}
            </Text>

            <Text style={styles.languages}>{languages || 'Hindi'}</Text>

            <Text style={styles.experience}>
              Exp: {item.experience ?? '0'} Years
            </Text>

            <View style={styles.priceRow}>
              {/* Check if pricing exists, otherwise show 'Free' */}
              <Text style={styles.offer}>
                {item.pricing ? `₹${item.pricing}/min` : 'Free'}
              </Text>
            </View>
          </View>

          {renderButton(item)}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default ReusableList;

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    backgroundColor: COLORS.AntiFlash,
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
    top: verticalScale(0),
    right: scale(0),
    backgroundColor: 'red',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(4),
    borderTopRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(30),
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
    fontSize: moderateScale(13),
    color: '#666',
    fontWeight: 'bold',
  },
  languages: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#666',
  },
  experience: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: '#666',
  },
  offer: {
    fontSize: moderateScale(12),
    color: 'red',
    fontWeight: 'bold',
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
  reviewImageView: {
    alignItems: 'center',
    width: scale(75),
    marginRight: scale(10),
  },
  rating: {
    color: COLORS.darkYellow,
    fontWeight: 'bold',
    fontSize: moderateScale(10),
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(4),
  },
  star: {
    marginRight: scale(1), // Add space between stars if needed
  },
});
