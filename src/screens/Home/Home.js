import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import Astrologers, {LiveAstrologers, Reviews} from './Astrologers'; // import the astrologer data.
import Instance from '../../api/ApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingAstrologer, setLoadingAstrologer] = useState(true);
  const [topRatedReviews, setTopRatedReviews] = useState([]);
  const [error, setError] = useState(null);
  const [errroBlogs, setErrorBlogs] = useState(null);
  const [errorAstrologer, setErrorAstrologer] = useState(null);
  const [categories, setCategories] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [blogsToshow, setBlogsToShow] = useState(null);
  const [astrologer, setAstrologer] = useState(null);
  const [astrologerToShow, setAstrologerToShow] = useState(null);
  const [errorReview, setErrorReview] = useState(null);
  const [loadingReview, setLoadingReview] = useState(true);
  // const [topReviews, setTopReviews] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          throw new Error('Token not found');
        }

        const response = await Instance.get('/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log('data', response.data);

        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await Instance.get('/api/blogs', {
          headers: {Authorization: `Bearer ${token}`},
        });
        // console.log('blog', response.data);
        const sliceData =
          response.data.length >= 6 ? response.data.slice(0, 6) : response.data;
        setBlogsToShow(sliceData);

        setBlogs(response.data);
      } catch (err) {
        setErrorBlogs(err.message);
      } finally {
        setLoadingBlogs(false);
      }
    };
    const fetchAstrologer = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await Instance.get('/api/astrologers', {
          headers: {Authorization: `Bearer ${token}`},
        });
        const astroResponse = response.data.data;
        const sliceData =
          astroResponse.length >= 7 ? astroResponse.slice(0, 7) : astroResponse;
        setAstrologerToShow(sliceData);
        setAstrologer(astroResponse);
      } catch (err) {
        setErrorAstrologer(err.message);
      } finally {
        setLoadingAstrologer(false);
      }
    };

    const fetchTopReviews = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await Instance.get(
          '/api/reviews/astrologers/reviews',
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );
        // console.log(response.data);
        // setTopReviews(response.data);

        const sortedReviews = response.data.sort((a, b) => b.rating - a.rating);

        const topReviews =
          sortedReviews.length >= 5 ? sortedReviews.slice(0, 5) : sortedReviews;

        setTopRatedReviews(topReviews);
      } catch (err) {
        setErrorReview(err.message);
      } finally {
        setLoadingReview(false);
      }
    };
    fetchAstrologer();
    fetchCategories();
    fetchBlogs();
    fetchTopReviews();
  }, []);

  const handleMorePress = review => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReview(null);
  };
  const handleSearch = () => {
    navigation.navigate('SearchScreen', {data: astrologer});
  };

  const openAstrologer = person => {
    console.log(person);
    navigation.navigate('AstrologerInfo', {person: person});
  };

  const renderAstrologerList = ({item}) => {
    const languages = item.language?.join(', ');
    return (
      <TouchableOpacity
        onPress={() => openAstrologer(item)}
        style={styles.AstrologerCard}>
        <Image
          source={{
            uri:
              item.profileImage ||
              'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
          }}
          style={styles.AstroImage}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{item.name || 'Name'}</Text>
          <Text style={styles.specialty}>
            {item.specialties[0].name || 'vedic Astrology'}
          </Text>
          <Text style={styles.exp}>Exp: {item.experience || '0'} years</Text>
          <Text style={styles.language}>{languages || 'hindi'}</Text>
        </View>
        <View style={styles.btnView}>
          <Text style={[styles.charge, {color: item.isFree ? 'red' : 'green'}]}>
            {item.pricing === 0 ? 'Free' : `₹${item.pricing}/min`}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatIntakeForm', {person: item})
            }
            style={styles.chatBtn}>
            <Text style={styles.chatBtnTxt}>Chat</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const renderReviewList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleMorePress(item)}
        style={styles.ReviewCard}>
        <View style={styles.reviewImageView}>
          <Image
            source={{
              uri:
                item.user?.profilePic ||
                'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
            }}
            style={styles.ReviewerImage}
          />

          <View style={styles.starsContainer}>
            {item.rating
              ? Array.from({length: item.rating}).map((_, index) => (
                  <MaterialIcons
                    key={index}
                    name="star"
                    size={moderateScale(14)}
                    color="orange" // Gold color for stars
                    style={styles.star}
                  />
                ))
              : null}
          </View>
        </View>

        <View style={styles.ReviewWrapper}>
          <View>
            <Text style={styles.reviewer}>
              {item.user?.firstName || 'Anonymous'}
            </Text>
            <Text style={styles.date}>3 may 2024</Text>
          </View>
          <Text style={styles.review} numberOfLines={3} ellipsizeMode="tail">
            {item.comment || 'no comment'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const AstrologerItem = ({astrologer}) => {
    return (
      <TouchableOpacity style={styles.AstroBackWrapper}>
        <ImageBackground
          source={{
            uri: astrologer.image,
          }}
          style={styles.liveAstrologerimg}>
          <View style={styles.darkOverlay} />
          <View
            style={[
              styles.livebtn,
              astrologer.live ? styles.live : styles.scheduled,
            ]}>
            <Text
              style={astrologer.live ? styles.livetxt : styles.scheduledtxt}>
              {astrologer.live ? 'Live' : 'Scheduled'}
            </Text>
          </View>
          <View style={styles.astroNameview}>
            <Text style={styles.livename}>{astrologer.name}</Text>
            <Text style={styles.topic}>{astrologer.topic}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const BlogItem = ({blog}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('BlogScreen', {data: blog})}
        style={styles.blogCard}>
        <Image style={styles.blogImg} source={{uri: blog.thumbnail}} />
        <Text style={styles.blogTitle}>{blog.title}</Text>
        <Text style={styles.blogContent} numberOfLines={2} ellipsizeMode="tail">
          {blog.metaDescription}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.main}>
        <View style={styles.searchBtnView}>
          <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
            <MaterialIcons name="search" size={24} color="#800000" />
            <Text style={styles.searchTxt}>Search Here</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageBackWrapper}>
          <ImageBackground
            style={styles.backgroundImg}
            source={require('../../assets/images/mainlogo.jpeg')}>
            <View style={styles.textWrapper}>
              <Text style={styles.freetext}>Get First Chat FREE</Text>
              <Text style={styles.topAstro}>From India's Top Astrologers</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat')}
                style={styles.chatnowBtn}>
                <Text style={styles.chatnowTxt}>CHAT NOW</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.topAstrologers}>
          <Text style={styles.topAstrologerTxt}>Our Top Astrologers</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {loadingAstrologer ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : errorAstrologer ? (
          <Text style={styles.errorText}>{errorAstrologer}</Text>
        ) : (
          <FlatList
            data={astrologerToShow}
            keyExtractor={item => item._id.toString()}
            renderItem={renderAstrologerList}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.astrologerList}
          />
        )}
        <View style={styles.customerReviews}>
          <Text style={styles.topAstrologerTxt}>What Our Client Says</Text>
          {loadingReview ? (
            <View style={styles.indicator}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : errorReview ? (
            <Text style={styles.errorText}>{errorReview}</Text>
          ) : (
            <FlatList
              data={topRatedReviews}
              renderItem={renderReviewList}
              keyExtractor={item => item._id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.ReviewsList}
            />
          )}
        </View>
        <View style={styles.separator}></View>
        <View style={styles.topAstrologers}>
          <Text style={styles.topAstrologerTxt}>Live Astrologers</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Live')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={LiveAstrologers}
          renderItem={({item}) => <AstrologerItem astrologer={item} />}
          keyExtractor={item => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.liveAstrologersView}
        />

        <View style={styles.separator}></View>
        <Text style={styles.CategoryTitle}>Categories</Text>
        <View style={styles.CategoryView}>
          {loading ? (
            <View style={styles.indicator}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            categories?.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat')}
                key={index}
                style={styles.category}>
                <Image
                  style={styles.categoryImg}
                  resizeMode="cover"
                  source={{
                    uri:
                      item.image ||
                      'https://th.bing.com/th/id/OIP.u8mYbwil7gU0BZejsy4ySAAAAA?w=276&h=176&c=7&r=0&o=5&pid=1.7',
                  }}
                />
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
        <View style={styles.separator}></View>
        <View style={styles.topAstrologers}>
          <Text style={styles.topAstrologerTxt}>Astrowani's Blog</Text>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => navigation.navigate('BlogList', {data: blogs})}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {loadingBlogs ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : errroBlogs ? (
          <Text style={styles.errorText}>{errroBlogs}</Text>
        ) : (
          <FlatList
            data={blogsToshow}
            renderItem={({item}) => <BlogItem blog={item} />}
            keyExtractor={item => item._id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.BlogView}
          />
        )}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Why Ohm Astro ?</Text>
          <View style={styles.footericonView}>
            <View style={styles.firstsection}>
              <Image
                source={require('../../assets/images/verified.png')}
                style={styles.verifyLogo}
              />
              <Text style={styles.sectionTxt}>Verified Astrologers</Text>
            </View>
            <View style={styles.firstsection}>
              <Image
                source={require('../../assets/images/question.png')}
                style={styles.verifyLogo}
              />
              <Text style={styles.sectionTxt}>
                Talk With Astrologer via Multiple Ways
              </Text>
            </View>
            <View style={styles.firstsection}>
              <Image
                source={require('../../assets/images/padlock.png')}
                style={styles.verifyLogo}
              />
              <Text style={styles.sectionTxt}>100 % Privacy</Text>
            </View>
          </View>
        </View>

        {selectedReview && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Image
                  source={{
                    uri:
                      selectedReview.user?.profilePic ||
                      'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
                  }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalName}>
                  {selectedReview.user?.firstName || 'Anonymous'}
                </Text>

                <View style={styles.starsContainer}>
                  {selectedReview.rating
                    ? Array.from({length: selectedReview.rating}).map(
                        (_, index) => (
                          <MaterialIcons
                            key={index}
                            name="star"
                            size={moderateScale(18)}
                            color={COLORS.AstroGold} // Gold color for stars
                            style={styles.star}
                          />
                        ),
                      )
                    : null}
                </View>

                <Text style={styles.modalReview}>
                  {selectedReview.comment || 'no comment'}
                </Text>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeIconWrapper}>
                  <MaterialIcons
                    name="close"
                    size={moderateScale(24)}
                    color="black"
                    style={styles.closeButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
      <View style={styles.fixedBtnView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={styles.fixedBtn}>
          <MaterialIcons name="wechat" size={22} color="black" />
          <Text style={styles.fixedBtnTxt}>Chat with Astrologer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Call')}
          style={styles.fixedBtn}>
          <MaterialIcons name="add-call" size={22} color="black" />
          <Text style={styles.fixedBtnTxt}>Talk To Astrologer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {backgroundColor: 'white'},
  searchTxt: {
    paddingHorizontal: scale(5),
  },
  searchBtnView: {
    backgroundColor: COLORS.darkYellow,
  },
  searchBtn: {
    backgroundColor: COLORS.white,
    marginHorizontal: scale(15),
    marginVertical: verticalScale(12),
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(8),
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#800000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backgroundImg: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imageBackWrapper: {
    width: scale(320),
    marginHorizontal: scale(15),
    marginVertical: verticalScale(15),
    height: verticalScale(120),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
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
  textWrapper: {
    width: scale(180),
    marginVertical: verticalScale(13),
  },
  freetext: {
    color: 'white',
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontFamily: 'Lato-Bold',
  },
  topAstro: {
    color: 'white',
    marginHorizontal: scale(10),
    fontSize: moderateScale(10),
    fontWeight: 'bold',
    marginVertical: verticalScale(4),
  },
  chatnowBtn: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(26),
    width: scale(90),
    backgroundColor: 'orange',
    borderRadius: moderateScale(20),
    marginTop: verticalScale(30),
    marginHorizontal: scale(10),
  },
  chatnowTxt: {
    color: 'black',

    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  topAstrologers: {
    marginHorizontal: scale(15),
    marginVertical: verticalScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customerReviews: {
    marginHorizontal: scale(15),
    marginVertical: verticalScale(4),

    justifyContent: 'space-between',
  },
  topAstrologerTxt: {
    color: 'black',
    fontWeight: 'bold',
  },
  viewAll: {
    color: COLORS.AstroMaroon,
  },
  astrologerList: {
    marginHorizontal: scale(15),
    paddingRight: scale(15),
  },
  ReviewsList: {},
  column: {
    flexDirection: 'column',
    marginRight: scale(15),
  },
  AstroImage: {
    width: scale(70),
    height: verticalScale(70),
    marginVertical: verticalScale(6),
    borderRadius: moderateScale(35),
  },
  AstrologerCard: {
    alignItems: 'center',
    marginVertical: verticalScale(15),
    width: scale(150),
    elevation: 3,

    backgroundColor: COLORS.Antiflashwhite,
    borderRadius: moderateScale(10),
    marginRight: scale(15),
    paddingVertical: verticalScale(5),
  },
  infoWrapper: {
    flex: 1,
  },

  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: moderateScale(15),
    textAlign: 'center',
  },

  specialty: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(11),
    marginTop: verticalScale(1),
    marginBottom: verticalScale(4),
  },
  language: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: moderateScale(12),
    marginBottom: verticalScale(1),
  },
  exp: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: moderateScale(12),
    marginBottom: verticalScale(1),
  },
  charge: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    textAlign: 'center',
    marginTop: scale(5),
  },
  chatBtn: {
    backgroundColor: 'green',
    borderRadius: moderateScale(15),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(25),
    marginVertical: verticalScale(5),
  },
  chatBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(10),
  },
  ReviewCard: {
    flexDirection: 'row',
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.Antiflashwhite,
    width: scale(230),
    borderWidth: moderateScale(0.5),
    borderColor: COLORS.AshGray,
    marginVertical: verticalScale(10),
    marginRight: scale(15),
    padding: moderateScale(10),
  },
  ReviewerImage: {
    width: scale(65),
    height: scale(65),
    borderRadius: moderateScale(50),
    borderWidth: scale(0.5),
    borderColor: COLORS.gray,
  },
  reviewImageView: {
    alignItems: 'center',
    width: scale(75),
  },
  review: {
    color: 'black',
    fontWeight: 'bold',
    width: scale(100),
    fontSize: moderateScale(12),
  },
  rating: {
    color: COLORS.AstroMaroon,
    fontWeight: 'bold',
    fontSize: moderateScale(13),
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  star: {
    marginRight: scale(1), // Add space between stars if needed
  },
  date: {
    color: '#000',
  },
  ReviewWrapper: {
    flex: 1,
    marginLeft: scale(20),
  },
  reviewer: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: moderateScale(15),
    marginBottom: verticalScale(2),
  },
  moretxt: {
    color: 'red',
    marginVertical: verticalScale(8),
    width: scale(33),
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: 'red',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  modalImage: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: moderateScale(50),
    marginBottom: verticalScale(15),
    borderWidth: scale(0.5),
    borderColor: COLORS.AshGray,
  },
  modalName: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: 'black',
  },
  modalProfession: {
    fontSize: moderateScale(14),
    color: COLORS.AstroMaroon,
  },

  modalReview: {
    fontSize: moderateScale(14),
    color: 'black',
    textAlign: 'center',
    marginVertical: verticalScale(15),
    fontWeight: 'bold',
  },
  closeButton: {marginBottom: verticalScale(15)},
  bar: {
    width: scale(320),
    alignSelf: 'center',
    elevation: 2,

    shadowColor: COLORS.AstroMaroon,
  },
  separator: {
    borderTopWidth: moderateScale(2), // Thickness of the separator
    width: scale(320),
    marginVertical: verticalScale(13),
    alignSelf: 'center',
    borderTopColor: 'rgba(128, 0, 0, 0.1)',
  },
  CategoryTitle: {
    marginHorizontal: scale(15),
    color: 'black',
    fontWeight: 'bold',
  },
  liveAstrologersView: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    marginVertical: verticalScale(5),
  },

  AstroBackWrapper: {
    width: scale(100),
    height: verticalScale(120),
    overflow: 'hidden',
    borderRadius: moderateScale(10),
    marginHorizontal: scale(5),
  },
  liveAstrologerimg: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  livebtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    height: verticalScale(15),
    alignSelf: 'flex-end',
  },
  live: {backgroundColor: 'red'},
  scheduled: {
    backgroundColor: 'gold',
  },
  livetxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(10),
  },
  scheduledtxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(10),
  },
  astroNameview: {
    position: 'absolute',
    bottom: 0,

    padding: scale(5),
  },
  livename: {
    color: 'white',
    fontWeight: 'bold',
  },
  topic: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: moderateScale(10),
  },
  CategoryView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(10),
  },
  category: {
    marginHorizontal: scale(10),
    marginBottom: verticalScale(15),
  },
  categoryImg: {
    width: scale(60),
    height: verticalScale(60),
    marginVertical: verticalScale(1),
    borderRadius: moderateScale(50),
    borderWidth: moderateScale(2),
    borderColor: COLORS.AntiFlash,
  },
  categoryName: {
    color: 'black',
    fontSize: moderateScale(11),
    textAlign: 'center',
    fontWeight: 'bold',
    width: scale(65),
  },
  fixedBtnView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    marginHorizontal: scale(5),
    marginVertical: verticalScale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixedBtn: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(10),
    width: scale(150),
    height: verticalScale(45),
  },
  fixedBtnTxt: {
    color: 'black',
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    marginHorizontal: scale(5),
  },
  BlogView: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    marginVertical: verticalScale(5),
  },
  footer: {
    height: verticalScale(260),
    marginTop: verticalScale(20),
    backgroundColor: COLORS.AstroSoftOrange,
  },
  blogCard: {
    borderWidth: moderateScale(0.5),
    borderColor: COLORS.AshGray,
    width: scale(210),
    marginHorizontal: scale(5),
    borderRadius: moderateScale(10),
  },
  blogImg: {
    width: scale(210),
    height: verticalScale(100),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  blogTitle: {
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(10),
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  blogContent: {
    paddingHorizontal: scale(5),
    paddingBottom: scale(5),
    fontSize: moderateScale(11),
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray',
  },
  moreBtn: {
    alignSelf: 'center',
  },

  footericonView: {
    flexDirection: 'row',
  },
  footerTitle: {
    marginVertical: verticalScale(20),
    textAlign: 'center',
    color: 'black',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  verifyLogo: {
    width: scale(55),
    height: verticalScale(55),
  },
  firstsection: {
    width: scale(116),
    alignItems: 'center',
  },
  sectionTxt: {
    color: COLORS.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: moderateScale(13),
    marginVertical: verticalScale(5),
  },
});
