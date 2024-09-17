import {StyleSheet, Text, FlatList, View, Image} from 'react-native';
import React from 'react';
import {verticalScale, moderateScale, scale} from '../../../utils/Scaling';
import {COLORS} from '../../../Theme/Colors';
import DetailList from '../../component/DetailsList';

const BasicDetails = ({data, listData}) => {
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{uri: item.image}} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
  return (
    <View style={{backgroundColor: COLORS.AntiFlash, flex: 1}}>
      <DetailList title="Basic Details" data={data} />
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalView}
      />
    </View>
  );
};

export default BasicDetails;

const styles = StyleSheet.create({
  horizontalView: {
    paddingHorizontal: verticalScale(15),
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
});
