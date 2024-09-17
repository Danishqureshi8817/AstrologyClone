import {StyleSheet, Text, FlatList, View, Image} from 'react-native';
import React from 'react';
import {verticalScale, moderateScale, scale} from '../../../utils/Scaling';
import {COLORS} from '../../../Theme/Colors';

const GunaDetails = ({data, listData}) => {
  const renderItemCard = ({item}) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{uri: item.image}} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
      {item.extra && <Text style={styles.extra}>{item.extra}</Text>}
      {/* Conditionally render the third text */}
    </View>
  );
  return (
    <View style={{backgroundColor: COLORS.AntiFlash, flex: 1}}>
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.titletxt}>Guna</Text>
          <Text style={styles.titletxt}>Points</Text>
          <Text style={styles.titletxt}>Area of Life</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlistContainer}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <FlatList
        data={listData}
        renderItem={renderItemCard}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalView}
      />
    </View>
  );
};

export default GunaDetails;

const styles = StyleSheet.create({
  horizontalView: {
    paddingHorizontal: verticalScale(15),
  },
  container: {
    padding: scale(15),
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: COLORS.darkYellow,
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    textAlign: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.lightTurquoise,
  },
  flatlistContainer: {
    padding: scale(10),
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
  },
  item: {
    marginRight: scale(10),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(150),
    borderRadius: moderateScale(10),
    height: verticalScale(120),
    marginBottom: verticalScale(10),
  },
  image: {
    width: scale(45),
    height: verticalScale(45),
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    marginVertical: verticalScale(8),
  },
  title: {
    color: 'red',
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.lightTurquoise,
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    justifyContent: 'space-around',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    paddingVertical: verticalScale(8),
    borderBottomWidth: verticalScale(1),
    borderBottomColor: COLORS.AntiFlash,
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontSize: moderateScale(13),
    borderRightWidth: scale(1),
    borderRightColor: COLORS.AntiFlash,
    width: scale(80),
  },
  value: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    width: scale(85),
    fontSize: moderateScale(13),
  },
  extra: {
    fontWeight: 'bold',
    borderLeftWidth: scale(1),
    borderLeftColor: COLORS.AntiFlash,
    paddingHorizontal: scale(10),
    color: '#000',
    textAlign: 'center',
    fontSize: moderateScale(13),
  },
  titletxt: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
});
