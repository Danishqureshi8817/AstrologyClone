import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';

const data = [
  {
    id: '1',
    title: 'Group Puja',
    description:
      'Join shared rituals by renowned Purohits and Pandits for blessings and positivity.',
    image:
      'https://astrowaniindia.com/wp-content/uploads/2024/05/second-300x300.jpg',
  },
  {
    id: '2',
    title: 'VIP E-Puja',
    description:
      'Experience high-priority, personalized rituals for maximum spiritual benefits.',
    image:
      'https://astrowaniindia.com/wp-content/uploads/2024/05/second-300x300.jpg',
  },
  {
    id: '3',
    title: 'Gemstones',
    description:
      'Buy certified gemstones to balance energies and support your astrological goals.',
    image:
      'https://astrowaniindia.com/wp-content/uploads/2024/05/second-300x300.jpg',
  },
  {
    id: '4',
    title: 'Gemstones',
    description:
      'Buy certified gemstones to balance energies and support your astrological goals.',
    image:
      'https://astrowaniindia.com/wp-content/uploads/2024/05/second-300x300.jpg',
  },
  {
    id: '5',
    title: 'Gemstones',
    description:
      'Buy certified gemstones to balance energies and support your astrological goals.',
    image:
      'https://astrowaniindia.com/wp-content/uploads/2024/05/second-300x300.jpg',
  },
  {
    id: '6',
    title: 'Gemstones',
    description:
      'Buy certified gemstones to balance energies and support your astrological goals.',
    image:
      'https://astrowaniindia.com/wp-content/uploads/2024/05/second-300x300.jpg',
  },
];

const Remedies = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BookPujaScreen')}
      style={styles.card}>
      <View style={styles.textContainer}>
        <View style={styles.textOverlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
      <Image source={{uri: item.image}} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.AntiFlash,
  },
  listContainer: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
  },
  card: {
    flexDirection: 'row',
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    height: verticalScale(120),
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    position: 'relative',
  },

  textOverlay: {
    paddingHorizontal: scale(15),
    justifyContent: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: moderateScale(16),
    marginBottom: verticalScale(10),
    fontWeight: 'bold',
  },
  description: {
    color: COLORS.black,
    fontSize: moderateScale(13),
    fontWeight: 'bold',
  },
  image: {
    height: '100%',
    width: scale(120),
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
});

export default Remedies;
