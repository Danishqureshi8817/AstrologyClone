import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import {COLORS} from '../../../Theme/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const services = [
  {
    id: 1,
    title: "Today's Panchang",
    icon: 'https://cdn-icons-png.flaticon.com/128/13258/13258799.png',
  },
  {
    id: 2,
    title: 'Janam Kundali',
    icon: 'https://cdn-icons-png.flaticon.com/128/9085/9085836.png',
  },
  {
    id: 3,
    title: 'Kundali Match',
    icon: 'https://cdn-icons-png.flaticon.com/128/4663/4663642.png',
  },
  {
    id: 4,
    title: 'Free Horoscope',
    icon: 'https://cdn-icons-png.flaticon.com/128/678/678901.png',
  },
  {
    id: 5,
    title: 'Shubh Muhurat',
    icon: 'https://cdn-icons-png.flaticon.com/128/2982/2982306.png',
  },
  {
    id: 6,
    title: 'Vrat and Upvaas',
    icon: 'https://cdn-icons-png.flaticon.com/128/4245/4245482.png',
  },
];

const FreeServicesScreen = ({navigation}) => {
  const handleService = service => {
    if (service.title === "Today's Panchang") {
      navigation.navigate('PanchangScreen');
    } else if (service.title === 'Janam Kundali') {
      navigation.navigate('JanamKundaliScreen');
    } else if (service.title === 'Kundali Match') {
      navigation.navigate('KundaliMatchScreen');
    } else if (service.title === 'Free Horoscope') {
      navigation.navigate('Horoscope');
    } else if (service.title === 'Shubh Muhurat') {
      navigation.navigate('ShubhMuhurat');
    } else if (service.title === 'Vrat and Upvaas') {
      navigation.navigate('VrataUpvaas');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chose A Service</Text>

      <View style={styles.servicesContainer}>
        {services.map(service => (
          <TouchableOpacity
            onPress={() => handleService(service)}
            key={service.id}
            style={styles.serviceBox}>
            <Image source={{uri: service.icon}} style={styles.icon} />
            <Text style={styles.serviceText}>{service.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(16),
  },
  title: {
    fontSize: moderateScale(18),

    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginVertical: verticalScale(25),
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceBox: {
    width: '30%',
    backgroundColor: COLORS.AntiFlash,
    borderRadius: moderateScale(8),
    padding: scale(16),
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  icon: {
    width: scale(50),
    height: verticalScale(50),
    marginBottom: verticalScale(8),
  },
  serviceText: {
    fontSize: moderateScale(11),
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  fixedBtnView: {
    position: 'absolute',
    bottom: verticalScale(20),
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
});

export default FreeServicesScreen;
