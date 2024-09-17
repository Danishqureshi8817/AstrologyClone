import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';

const blogData = [
  {
    id: '1',
    title:
      'Vastu for Rented Houses: Know Auspicious Directions, Tips, Remedies & Crucial Details',
    author: 'Parita Soni',
    date: '2024-08-22',
    image:
      'https://th.bing.com/th?id=OSK.HEROSY3YpbPg1tDIP0OQw8YDqBEZwOzrVULccyt99US3vH8&w=200&h=80&c=9&rs=1&o=6&pid=SANGAM',
  },
  {
    id: '2',
    title:
      'Moon Mercury Conjunction in Astrology: Benefits, Effects & Remedies',
    author: 'Parita Soni',
    date: '2024-08-21',
    image:
      'https://th.bing.com/th?id=OSK.HEROSY3YpbPg1tDIP0OQw8YDqBEZwOzrVULccyt99US3vH8&w=200&h=80&c=9&rs=1&o=6&pid=SANGAM',
  },
  {
    id: '3',
    title:
      'Moon Mercury Conjunction in Astrology: Benefits, Effects & Remedies',
    author: 'Parita Soni',
    date: '2024-08-21',
    image:
      'https://th.bing.com/th?id=OSK.HEROSY3YpbPg1tDIP0OQw8YDqBEZwOzrVULccyt99US3vH8&w=200&h=80&c=9&rs=1&o=6&pid=SANGAM',
  },
  // Add more blog data here...
];

const BlogList = ({navigation, route}) => {
  const {data} = route.params;

  const renderBlogItem = ({item}) => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('BlogScreen', {data: item})}
        style={styles.card}>
        <ImageBackground
          source={{uri: item.thumbnail}}
          style={styles.image}></ImageBackground>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.metaDescription}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.author}>{item.category?.name}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderBlogItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    padding: scale(10),
  },
  card: {
    marginBottom: verticalScale(15),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    height: verticalScale(160),
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: scale(10),
  },
  title: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: COLORS.black,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
  },
  author: {
    fontSize: moderateScale(13),
    color: COLORS.black,
  },
  date: {
    fontSize: moderateScale(13),
    color: COLORS.gray,
  },
});

export default BlogList;
