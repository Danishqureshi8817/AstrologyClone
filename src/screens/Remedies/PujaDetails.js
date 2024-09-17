import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';

const PujaDetails = ({route, navigation}) => {
  const {data} = route.params || {};
  // const benefits = [
  //   'Doing this Puja helps reduce the bad effects of Mangal Dosh, bringing more happiness and stability in marriages and relationships.',
  //   'Doing this Puja helps reduce the bad effects of Mangal Dosh, bringing more happiness and stability in marriages and relationships.',
  //   'Doing this Puja helps reduce the bad effects of Mangal Dosh, bringing more happiness and stability in marriages and relationships.',
  //   'Doing this Puja helps reduce the bad effects of Mangal Dosh, bringing more happiness and stability in marriages and relationships.',
  // ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{
            uri:
              data.image ||
              'https://th.bing.com/th/id/OIP.XKhDJsAyX2WTH1q0Y-ZtRAHaDu?w=347&h=176&c=7&r=0&o=5&pid=1.7',
          }}
          style={styles.imageBackground}>
          {data.label ? (
            <Text style={styles.bannerText}>{data.label}</Text>
          ) : null}
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{data.pujaName || 'Puja name'}</Text>
          {/* <Text style={styles.subtitle}>
            Mangal Dosh Se Mukti Ke Liye Vishesh Puja
          </Text> */}

          <Text style={styles.description}>
            {data.description || 'Description here'}
          </Text>

          <Text style={styles.label}>
            • Duration:{' '}
            <Text style={styles.detailText}>{data.duration || '0'} Hour</Text>
          </Text>
          <Text style={styles.label}>
            • Pooja God or Goddess:
            <Text style={styles.detailText}> {data.godName || 'God'}</Text>
          </Text>

          <View style={styles.separator}></View>

          {/* Benefits Section */}
          <Text style={styles.benefitsTitle}>Benefits</Text>
          <View style={styles.benefitsContainer}>
            {data?.benefits ? (
              data.benefits?.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Icon
                    name="check-circle"
                    size={moderateScale(16)}
                    color="#4CAF50"
                    style={styles.benefitIcon}
                  />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.benefitText}>Benifits here ..</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.price}>
          {/* <Text style={styles.originalPrice}>₹1500 </Text> */}
          <Text style={styles.discountedPrice}>₹{data.price || '0'}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => Alert.alert('take to the payment gatway ')}
          style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageBackground: {
    width: '100%',
    height: verticalScale(160),
    justifyContent: 'flex-end',
  },
  bannerText: {
    backgroundColor: COLORS.AstroGold,
    color: '#000',
    paddingHorizontal: scale(10),
    fontSize: moderateScale(12),
    paddingVertical: verticalScale(2),
    fontWeight: 'bold',
    borderTopRightRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(15),
    marginVertical: verticalScale(10), // Adds some margin from the edges
    alignSelf: 'flex-start', // Aligns text to the start of the container
  },
  detailsContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: moderateScale(13),
    color: '#000',
    fontWeight: 'bold',
    marginVertical: verticalScale(2),
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  statsText: {
    fontSize: 14,
    marginRight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
  },
  description: {
    fontSize: moderateScale(14),
    color: '#000',
    marginVertical: verticalScale(10),
  },
  label: {
    fontSize: moderateScale(14),
    color: '#000',
    marginVertical: verticalScale(3),
    fontWeight: 'bold',
  },
  detailText: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  separator: {
    borderTopWidth: moderateScale(2),
    width: scale(320),
    marginVertical: verticalScale(13),
    alignSelf: 'center',
    borderTopColor: 'rgba(128, 0, 0, 0.1)',
  },
  benefitsTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#000',
    marginVertical: verticalScale(10),
  },
  benefitsContainer: {
    marginVertical: verticalScale(5),
    paddingBottom: verticalScale(50),
  },
  benefitItem: {
    flexDirection: 'row',

    marginVertical: verticalScale(5),
  },
  benefitIcon: {
    marginRight: scale(6),
    paddingVertical: verticalScale(3),
  },
  benefitText: {
    fontSize: moderateScale(13),
    color: '#000',
    width: scale(300),
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    backgroundColor: '#F5F5F5',
    borderTopWidth: verticalScale(1),
    borderColor: '#ddd',
  },
  price: {
    fontSize: moderateScale(15),
    color: '#000',
    fontWeight: 'bold',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#000',
  },
  discountedPrice: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: COLORS.AstroGold,
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
  },
  bookButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default PujaDetails;
