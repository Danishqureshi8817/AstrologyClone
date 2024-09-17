import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import Instance from '../../api/ApiCall';

const Reviews = [
  {
    name: 'Anonymous User',
    date: 'Aug 17, 2024',
    rating: 5,
    comment: 'Good',
  },
  {
    name: 'Pravatee Nayak',
    date: 'Aug 17, 2024',
    rating: 5,
    comment:
      'Mam aap ki prediction sab accurate hai. Jo v bola aap ne sab sahi hai. Puja mai karungi',
  },
  {
    name: 'Anonymous User',
    date: 'Aug 16, 2024',
    rating: 5,
    comment: 'Very Good',
  },
  {
    name: 'Pravatee Nayak',
    date: 'Aug 15, 2024',
    rating: 5,
    comment:
      'Aapne Jo Jo bola sab sahi hai mam. Aapki prediction 100%accurate hai. Sab sahi hai. Aapse bat karke dil ko tasali mil geyi . Mai puja karungi mam. Thank u so much',
  },
  {
    name: 'Priyalakshmi Sukumaran',
    date: 'Aug 1, 2024',
    rating: 5,
    comment: 'accurate',
  },
];
const AstrologerInfo = ({route, navigation}) => {
  const {person} = route.params;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(person.isFavorite || false);
  const [loading, setLoading] = useState(false);
  const [reviewloading, setReviewLoading] = useState(false);
  const [reviews, setReviews] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [avgRating, setAvgRating] = useState('');
  const [avgError, setAvgError] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleShowAllReviews = () => {
    setShowAllReviews(true);
  };

  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 2);

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

        const favoriteAstrologers = response.data.favoriteAstrologer || [];
        const isPersonFavorite = favoriteAstrologers.some(
          favAstrologer => favAstrologer._id === person._id,
        );

        setIsFavorite(isPersonFavorite);
      } catch (err) {
        console.log('Error fetching favorite astrologers:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      setReviewLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await Instance.get(
          `/api/reviews/astrologer/${person._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setReviews(response.data);
          // console.log('reviews', response.data);
        }
      } catch (err) {
        console.log('Error fetching favorite astrologers:', err);
        setReviewError(err.message);
      } finally {
        setReviewLoading(false);
      }
    };
    const fetchAvgRating = async () => {
      setReviewLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await Instance.get(
          `/api/reviews/astrologer/${person._id}/average-rating`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setAvgRating(response.data);
          console.log('avgRating', response.data);
        }
      } catch (err) {
        console.log('Error fetching favorite astrologers:', err);
        setAvgError(err.message);
      } finally {
        setReviewLoading(false);
      }
    };
    fetchAvgRating();
    fetchReviews();
    fetchFavorites();
  }, [navigation, person._id]);

  const toggleFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await Instance.post(
        isFavorite
          ? '/api/favoriteAstrologer/remove'
          : 'api/favoriteAstrologer/add',
        {
          astrologerId: person._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data) {
        setIsFavorite(!isFavorite);
        console.log(response.data);
      } else {
        console.error('Error updating favorite status:', result.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('API call failed:', error.response.data);
      } else {
        console.log('error message:', error.message);
      }
    }
  };
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const languages = person.language?.join(', ');
  const specialties = person.specialties
    ?.map(specialty => specialty.name)
    .join(', ');

  const handleChat = () => {
    navigation.navigate('ChatIntakeForm', {person: person});
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri:
                person.profileImage ||
                'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
            }}
            style={styles.avatar}
          />
          <View style={styles.profileDetails}>
            <View style={styles.nameView}>
              <Text style={styles.profileName}>{person.name || 'Name'}</Text>
              <TouchableOpacity onPress={toggleFavorite} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="gray" />
                ) : (
                  <FontAwesome
                    name={isFavorite ? 'heart' : 'heart-o'}
                    size={20}
                    color={isFavorite ? 'red' : 'gray'}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.specialization}>
              {person.specialties?.[0]?.name || 'vedic Astrology'}
            </Text>
            <Text style={styles.languages}>{languages || 'hindi'}</Text>
            <View style={styles.reviewsRow}>
              {/* <Text style={styles.reviews}>Reviews: {}</Text> */}
              <Text style={styles.rating}>{person.rating || '0'} ★</Text>
              <Text style={styles.experience}>
                Exp: {person.experience || '0'} Years
              </Text>
            </View>
          </View>
        </View>

        {/* Specialization */}
        <View style={styles.specializationSection}>
          <Text style={styles.sectionTitle}>Specialization</Text>
          <View style={styles.tagsContainer}>
            {person.specialties?.length > 0 ? (
              person.specialties?.map((item, index) => (
                <View style={styles.tag} key={index}>
                  <Text style={styles.tagText}>{item.name || 'Vedic'}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.tagText}>Vedic</Text>
            )}
          </View>
        </View>

        <View style={styles.separator}></View>

        {/* About My Services */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About My Services</Text>
          <Text
            numberOfLines={isExpanded ? null : 5}
            ellipsizeMode="tail"
            style={styles.aboutText}>
            {person.bio || 'hello'}
          </Text>
          <TouchableOpacity onPress={handleReadMore}>
            <Text style={styles.readMore}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator}></View>

        {/* Experience & Qualification */}
        <View style={styles.experienceSection}>
          <Text style={styles.sectionTitle}>Experience & Qualification</Text>
          <Text style={styles.experienceText}>
            With several years of dedicated practice, I've honed my skills in
            {specialties || 'vedic'}
          </Text>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>
            Reviews:{' '}
            <Text style={styles.reviewCount}>
              {avgRating.totalReviews || '0'}
            </Text>
          </Text>
          <View style={styles.ratingAvg}>
            <Text style={styles.overallRating}>
              {avgRating.averageRating || '0'}
            </Text>
            <MaterialIcons name="star" size={16} color="orange" />
          </View>

          {/* Individual Reviews */}
          {reviewloading ? (
            <View style={styles.indicator}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : reviewError ? (
            <Text style={styles.errorText}>{reviewError}</Text>
          ) : reviewsToShow && reviewsToShow.length > 0 ? (
            reviewsToShow?.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>
                    {review.user?.firstName || 'Anonymous'}
                  </Text>
                  <Text style={styles.reviewDate}>
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString('en-GB')
                      : 'Date not provided'}
                  </Text>
                </View>
                <View style={styles.starsContainer}>
                  {review.rating !== undefined
                    ? Array.from({length: review.rating}).map(
                        (_, starIndex) => (
                          <MaterialIcons
                            key={starIndex}
                            name="star"
                            size={moderateScale(14)}
                            color="orange"
                            style={styles.star}
                          />
                        ),
                      )
                    : null}
                </View>
                <Text style={styles.reviewComment}>
                  {review.comment || 'no comment'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReviewsText}>No reviews available.</Text>
          )}

          {/* Show All Reviews Button */}
          {!showAllReviews && reviews.length <= 2 && (
            <TouchableOpacity onPress={handleShowAllReviews}>
              <Text style={styles.showAllReviews}>Show All Reviews</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Chat and Call Buttons */}
      <View style={styles.footer}>
        <View>
          <TouchableOpacity onPress={handleChat} style={styles.chatButton}>
            <MaterialIcons
              name="chat"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
          <View style={styles.priceRow}>
            <Text style={styles.offer}>
              {person.pricing ? `₹${person.pricing}/min` : 'Free'}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.chatButton}>
            <MaterialIcons
              name="call"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <View style={styles.priceRow}>
            <Text style={styles.buttonSubText}>₹21/min</Text>
            <Text style={styles.offer}>FREE</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContainer: {
    paddingBottom: verticalScale(80),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    marginHorizontal: scale(15),
    marginTop: verticalScale(10),
    position: 'relative',
  },
  avatar: {
    width: scale(70),
    height: verticalScale(70),
    borderRadius: moderateScale(40),
  },
  profileDetails: {
    flex: 1,
    marginLeft: scale(10),
  },
  profileName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'black',
  },
  specialization: {
    color: 'black',
    fontSize: moderateScale(14),
  },
  languages: {
    fontSize: moderateScale(12),
    color: '#000',
  },
  reviewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
  },
  reviews: {
    fontSize: moderateScale(12),
    color: '#000',
  },
  rating: {
    fontSize: moderateScale(12),
    color: 'orange',
    fontWeight: 'bold',
  },
  experience: {
    fontSize: moderateScale(12),
    color: 'orange',
    marginLeft: scale(10),
  },
  notifyButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  notifyText: {
    color: '#A52A2A',
    textDecorationLine: 'underline',
  },
  specializationSection: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(15),
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    marginBottom: verticalScale(5),
    fontWeight: 'bold',
    color: '#000',
  },
  separator: {
    borderTopWidth: moderateScale(2), // Thickness of the separator
    width: scale(320),
    marginVertical: verticalScale(13),
    alignSelf: 'center',
    borderTopColor: 'rgba(128, 0, 0, 0.1)',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: verticalScale(10),
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(5),
    margin: moderateScale(5),
  },
  tagText: {
    fontSize: moderateScale(11),
    color: '#000',
  },
  aboutSection: {
    marginTop: moderateScale(10),
    marginHorizontal: scale(15),
  },
  aboutText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#000',
  },
  readMore: {
    color: 'red',
    marginTop: verticalScale(3),
    fontSize: moderateScale(12),
  },
  experienceSection: {
    marginTop: verticalScale(10),
    marginHorizontal: scale(15),
  },
  experienceText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
    // borderTopWidth: verticalScale(1),
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it stays on top
  },
  chatButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.AstroGold,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(150),
    height: verticalScale(45),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
  },
  icon: {
    marginHorizontal: scale(5),
  },

  buttonText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#000',
  },
  buttonSubText: {
    fontSize: moderateScale(11),
    color: 'red',
    textDecorationLine: 'line-through',
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  offer: {
    fontSize: moderateScale(12),
    color: 'red',
    fontWeight: 'bold',
    marginLeft: scale(5),
  },

  reviewsSection: {
    marginTop: verticalScale(20),
    backgroundColor: COLORS.Antiflashwhite,
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(15),
    borderTopRightRadius: moderateScale(16),
    borderTopLeftRadius: moderateScale(16),
  },

  reviewsTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'black',
    fontWeight: 'bold',
  },
  reviewCount: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: COLORS.AstroMaroon,
  },
  overallRating: {
    marginRight: scale(2),
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: 'black',
  },
  reviewItem: {
    marginTop: verticalScale(20),
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewerName: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: 'black',
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: moderateScale(10),
    color: '#666',
  },

  starsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(4),
  },
  star: {
    marginRight: scale(1), // Add space between stars if needed
  },
  reviewComment: {
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
    color: '#666',
    fontWeight: 'bold',
  },

  showAllReviews: {
    marginTop: verticalScale(15),
    color: COLORS.AstroMaroon,
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingAvg: {
    marginTop: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameView: {
    flexDirection: 'row',
    width: scale(200),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AstrologerInfo;
