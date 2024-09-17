import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import {COLORS} from '../../../Theme/Colors';
import DetailList from '../../component/DetailsList';
import BasicDetails from './BasicDetails';
import GunaDetails from './GunaDetails';

const KundaliMatchingReport = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Result');
  const Data = [
    {label: 'Name', value: 'Dashami', extra: 'sheela'},
    {label: 'Nakshatra', value: 'Mrigashirsha ', extra: 'Mrigashirsha'},
    {label: 'Yoga', value: 'Vajra up to 07:09 PM', extra: 'Mrigashirsha'},
    {
      label: 'First Karana',
      value: 'Vanija up to 01:26 PM',
      extra: 'Mrigashirsha',
    },
    {
      label: 'Second Karana',
      value: 'Vishti up to 01:22 AM, ',
      extra: 'Mrigashirsha',
    },
    {label: 'Vaar', value: 'Wednesday', extra: 'Mrigashirsha'},
  ];
  const gunaData = [
    {label: 'Varna', value: '0/1', extra: 'Obedience'},
    {label: 'Vasya', value: '1/2', extra: 'Mutual Control'},
    {label: 'Yoni', value: '1.5/3', extra: 'Sexual Aspects'},
    {label: 'Varna', value: '2/4', extra: 'Obedience'},
    {label: 'Varna', value: '4/4', extra: 'Obedience'},
    {label: 'Varna', value: '0/1', extra: 'Obedience'},
    {label: 'Varna', value: '0/1', extra: 'Obedience'},
    {label: 'Varna', value: '0/1', extra: 'Obedience'},
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
  const renderContent = () => {
    switch (activeTab) {
      case 'Result':
        return (
          <View>
            <Text style={styles.matchingtitle}>Kundali Matching Report</Text>
            <Text style={styles.subTitle}>This Marriage is Preferable</Text>

            <View style={styles.matchContainer}>
              <View style={styles.personContainer}>
                <Image
                  style={styles.personImage}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/3074/3074072.png',
                  }} // Replace with actual image URL
                />
                <Text style={styles.personName}>Mukesh kumar</Text>
                <Text style={styles.personStatus}>Manglik</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Kundali Details')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>View Kundali</Text>
                </TouchableOpacity>
              </View>

              <Image
                style={styles.bondImage}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/4165/4165326.png',
                }} // Replace with actual image URL
              />

              <View style={styles.personContainer}>
                <Image
                  style={styles.personImage}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/3074/3074067.png',
                  }} // Replace with actual image URL
                />
                <Text style={styles.personName}>Sheela Sen</Text>
                <Text style={styles.personStatus}>Manglik</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Kundali Details')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>View Kundali</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.scoreView}>
              <Text style={styles.score}>19.5/36</Text>
              <Text style={styles.advice}>
                This is a good match. But, some remedies are advisable. You can{' '}
                <Text
                  onPress={() => navigation.navigate('Chat')}
                  style={styles.adviceLink}>
                  Consult an Astrologer
                </Text>{' '}
                before going ahead.
              </Text>
            </View>
          </View>
        );
      case 'Basic Details':
        return <BasicDetails data={Data} listData={Dosh} />;
      case 'Guna Details':
        return <GunaDetails data={gunaData} listData={Dosh} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Result' && styles.activeTab]}
          onPress={() => setActiveTab('Result')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Result' && styles.tabTextActive,
            ]}>
            Result
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Basic Details' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Basic Details')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Basic Details' && styles.tabTextActive,
            ]}>
            Basic Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Guna Details' && styles.activeTab]}
          onPress={() => setActiveTab('Guna Details')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Guna Details' && styles.tabTextActive,
            ]}>
            Guna Details
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.white,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: scale(10),
  },
  activeTab: {
    borderBottomWidth: scale(2),
    borderBottomColor: COLORS.darkYellow,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  tabTextActive: {
    color: COLORS.darkYellow,
    fontWeight: 'bold',
  },
  tabText: {
    color: COLORS.darkGray,
  },
  matchingtitle: {
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: verticalScale(8),
  },
  subTitle: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: COLORS.black,
    marginBottom: verticalScale(20),
  },
  matchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  personContainer: {
    alignItems: 'center',
    marginHorizontal: scale(10),
  },
  personImage: {
    width: scale(80),
    height: scale(80),
    resizeMode: 'contain',
    marginBottom: verticalScale(10),
  },
  personName: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: COLORS.black,
  },
  personStatus: {
    fontSize: moderateScale(12),
    color: COLORS.AstroMaroon,
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    marginTop: verticalScale(4),
  },
  bondImage: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: COLORS.AstroGold,
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(20),
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: moderateScale(12),
  },
  score: {
    textAlign: 'center',
    fontSize: moderateScale(27),
    fontWeight: 'bold',
    color: COLORS.red,
    marginBottom: verticalScale(10),
  },
  advice: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: COLORS.AstroMaroon,
    fontWeight: 'bold',
    paddingHorizontal: scale(10),
  },
  adviceLink: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
  scoreView: {
    backgroundColor: COLORS.AntiFlash,
    paddingVertical: verticalScale(15),
  },
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

export default KundaliMatchingReport;
