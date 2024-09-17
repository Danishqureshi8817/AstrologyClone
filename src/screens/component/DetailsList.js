import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';

const DetailList = ({title, data}) => {
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
      {item.extra && <Text style={styles.extra}>{item.extra}</Text>}
      {/* Conditionally render the third text */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DetailList;

const styles = StyleSheet.create({
  container: {
    padding: scale(15),
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
    fontSize: moderateScale(12),
    borderRightWidth: scale(1),
    borderRightColor: COLORS.AntiFlash,
    width: scale(100),
  },
  value: {
    flex: 1,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: scale(20),
    fontSize: moderateScale(12),
  },
  extra: {
    // New style for the third text item
    flex: 1,
    fontWeight: 'bold',
    borderLeftWidth: scale(1),
    borderLeftColor: COLORS.AntiFlash,
    color: '#000',
    paddingLeft: scale(20),
    fontSize: moderateScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: COLORS.AstroMaroon,
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
});
