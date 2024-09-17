import React, {version} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/loginLogo.jpeg')} // Replace with your actual image URL
          style={styles.logo}
        />
        <Text style={styles.appName}>Ohm Astro</Text>
        <Text style={styles.tagline}>Best Astrologers Team</Text>
        <Text style={styles.version}>Visit Our Website</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://astrowaniindia.com/')}>
          <Text style={styles.link}>https://astrowaniindia.com/</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    width: scale(90), // Adjust as needed
    height: scale(90), // Adjust as needed
    marginBottom: verticalScale(15),
    resizeMode: 'contain',
  },
  appName: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: COLORS.black,
  },
  tagline: {
    fontSize: moderateScale(13),
    color: '#000',
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
  },
  version: {
    color: '#000',
  },
  link: {
    fontSize: moderateScale(15),
    marginTop: verticalScale(5),
    color: '#D73D60',
    textDecorationLine: 'underline',
  },
});
