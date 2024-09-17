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

import HoroscopeCard from '../../component/HoroscopeCard';

const HoroscopeDetails = ({navigation, route}) => {
  const [activeTab, setActiveTab] = useState('Daily');
  const {data} = route.params;

  const renderContent = () => {
    switch (activeTab) {
      case 'Daily':
        return <HoroscopeCard data={data} tab="daily" daily={true} />;
      case 'Monthly':
        return <HoroscopeCard data={data} tab="monthly" />;
      case 'Yearly':
        return <HoroscopeCard data={data} tab="yearly" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Daily' && styles.activeTab]}
          onPress={() => setActiveTab('Daily')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Daily' && styles.tabTextActive,
            ]}>
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Monthly' && styles.activeTab]}
          onPress={() => setActiveTab('Monthly')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Monthly' && styles.tabTextActive,
            ]}>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Yearly' && styles.activeTab]}
          onPress={() => setActiveTab('Yearly')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Yearly' && styles.tabTextActive,
            ]}>
            Yearly
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
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(5),
  },
  activeTab: {
    borderWidth: scale(1),
    backgroundColor: COLORS.AntiFlash,
    borderRadius: moderateScale(30),
    borderBottomColor: COLORS.AstroMaroon,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(5),
  },
  tabTextActive: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  tabText: {
    color: '#000',
  },
});

export default HoroscopeDetails;
