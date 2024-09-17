import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import DetailList from '../../component/DetailsList';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import {COLORS} from '../../../Theme/Colors';

const KundaliDetails = () => {
  const panchangData = [
    {label: 'Name', value: 'Mukesh Dangi'},
    {label: 'Tithi', value: 'Dashami up to 01:22 AM, August 29'},
    {label: 'Nakshatra', value: 'Mrigashirsha up to 03:54 PM'},
    {label: 'Yoga', value: 'Vajra up to 07:09 PM'},
    {label: 'First Karana', value: 'Vanija up to 01:26 PM'},
    {label: 'Second Karana', value: 'Vishti up to 01:22 AM, August 29'},
    {label: 'Vaar', value: 'Wednesday'},
  ];
  const Dosh = [
    {
      image: 'https://cdn-icons-png.flaticon.com/128/815/815887.png',
      name: 'mangal dosh',
      title: 'yes',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/128/815/815887.png',
      name: 'mangal dosh',
      title: 'Leo',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/128/815/815887.png',
      name: 'mangal dosh',
      title: 'yes',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/128/815/815887.png',
      name: 'mangal dosh',
      title: 'yes',
    },
  ];
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{uri: item.image}} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.main}>
      <DetailList title="Details" data={panchangData} />
      <FlatList
        data={Dosh}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalView}
      />
    </View>
  );
};

export default KundaliDetails;

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: COLORS.AntiFlash},
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
