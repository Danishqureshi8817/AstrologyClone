import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

import {scale, moderateScale, verticalScale} from '../../../utils/Scaling';
import {COLORS} from '../../../Theme/Colors';

const VratData = [
  {
    id: 1,
    month: 'January.2024',
    date: '25',
    monthss: 'January',
    months: '(Thursday)',
    Vratname: 'Paush Purnima\nShakambhari Purnima',
    TithiTime: 'Check Panchang',
  },
  {
    id: 2,
    month: 'January.2024',
    date: '25',
    monthss: 'January',
    months: '(Thursday)',
    Vratname: 'Paush Purnima\nShakambhari Purnima',
    TithiTime: 'Check Panchang',
  },
  {
    id: 3,
    month: 'January.2024',
    date: '25',
    monthss: 'January',
    months: '(Thursday)',
    Vratname: 'Paush Purnima\nShakambhari Purnima',
    TithiTime: 'Check Panchang',
  },
  {
    id: 4,
    month: 'January.2024',
    date: '25',
    monthss: 'January',
    months: '(Thursday)',
    Vratname: 'Paush Purnima\nShakambhari Purnima',
    TithiTime: 'Check Panchang',
  },
  {
    id: 5,
    month: 'January.2024',
    date: '25',
    monthss: 'January',
    months: '(Thursday)',
    Vratname: 'Paush Purnima\nShakambhari Purnima',
    TithiTime: 'Check Panchang',
  },
  {
    id: 6,
    month: 'January.2024',
    date: '25',
    monthss: 'January',
    months: '(Thursday)',
    Vratname: 'Paush Purnima\nShakambhari Purnima',
    TithiTime: 'Check Panchang',
  },
];

const VrataUpvaas = () => {
  const [activeTab, setActiveTab] = useState('Purnima Vrat');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Purnima Vrat':
        return (
          <FlatList
            data={VratData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <Text style={styles.monthTexttt}>{item.month}</Text>
                <View style={styles.cardContent}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.monthText}>{item.monthss}</Text>
                    <Text style={styles.Days}>{item.months}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.VRATNAME}>
                      Vrat Name:
                      <Text style={styles.VRATNAME2}>{item.Vratname}</Text>
                    </Text>
                    <Text style={styles.TITHITIME}>
                      Tithi Time:
                      <Text style={styles.TITHITIME2}>{item.TithiTime}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        );
      case 'Amavasya Dates':
        return (
          <FlatList
            data={VratData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <Text style={styles.monthTexttt}>{item.month}</Text>
                <View style={styles.cardContent}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.monthText}>{item.monthss}</Text>
                    <Text style={styles.Days}>{item.months}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.VRATNAME}>
                      Vrat Name:
                      <Text style={styles.VRATNAME2}>{item.Vratname}</Text>
                    </Text>
                    <Text style={styles.TITHITIME}>
                      Tithi Time:
                      <Text style={styles.TITHITIME2}>{item.TithiTime}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        );
      case 'Ekasashi Vrat':
        return (
          <FlatList
            data={VratData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <Text style={styles.monthTexttt}>{item.month}</Text>
                <View style={styles.cardContent}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.monthText}>{item.monthss}</Text>
                    <Text style={styles.Days}>{item.months}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.VRATNAME}>
                      Vrat Name:
                      <Text style={styles.VRATNAME2}>{item.Vratname}</Text>
                    </Text>
                    <Text style={styles.TITHITIME}>
                      Tithi Time:
                      <Text style={styles.TITHITIME2}>{item.TithiTime}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        );
      case 'Paradosh Vrat':
        return (
          <FlatList
            data={VratData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <Text style={styles.monthTexttt}>{item.month}</Text>
                <View style={styles.cardContent}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.monthText}>{item.monthss}</Text>
                    <Text style={styles.Days}>{item.months}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.VRATNAME}>
                      Vrat Name:
                      <Text style={styles.VRATNAME2}>{item.Vratname}</Text>
                    </Text>
                    <Text style={styles.TITHITIME}>
                      Tithi Time:
                      <Text style={styles.TITHITIME2}>{item.TithiTime}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        );
      case 'Sankashti Chaturthi':
        return (
          <FlatList
            data={VratData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <Text style={styles.monthTexttt}>{item.month}</Text>
                <View style={styles.cardContent}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.monthText}>{item.monthss}</Text>
                    <Text style={styles.Days}>{item.months}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.VRATNAME}>
                      Vrat Name:
                      <Text style={styles.VRATNAME2}>{item.Vratname}</Text>
                    </Text>
                    <Text style={styles.TITHITIME}>
                      Tithi Time:
                      <Text style={styles.TITHITIME2}>{item.TithiTime}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        );
      case 'Vinayak Chaturthi':
        return (
          <FlatList
            data={VratData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <Text style={styles.monthTexttt}>{item.month}</Text>
                <View style={styles.cardContent}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.monthText}>{item.monthss}</Text>
                    <Text style={styles.Days}>{item.months}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.VRATNAME}>
                      Vrat Name:
                      <Text style={styles.VRATNAME2}>{item.Vratname}</Text>
                    </Text>
                    <Text style={styles.TITHITIME}>
                      Tithi Time:
                      <Text style={styles.TITHITIME2}>{item.TithiTime}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        );
      default:
        return (
          <FlatList
            data={VratData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <Text style={styles.monthTexttt}>{item.month}</Text>
                <View style={styles.cardContent}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.monthText}>{item.monthss}</Text>
                    <Text style={styles.Days}>{item.months}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.VRATNAME}>
                      Vrat Name:
                      <Text style={styles.VRATNAME2}>{item.Vratname}</Text>
                    </Text>
                    <Text style={styles.TITHITIME}>
                      Tithi Time:
                      <Text style={styles.TITHITIME2}>{item.TithiTime}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        );
    }
  };

  const items = [
    'Purnima Vrat',
    'Amavasya Dates',
    'Ekasashi Vrat',
    'Paradosh Vrat',
    'Sankashti Chaturthi',
    'Vinayak Chaturthi',
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContainer}>
          {items.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.tabContent}>{renderTabContent()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: scale(5),
  },
  tabScrollContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    marginHorizontal: scale(4),
    borderRadius: scale(5),
  },
  activeTab: {
    backgroundColor: COLORS.AstroSoftOrange,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  activeTabText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  tabContent: {
    padding: scale(10),
  },
  cardContainer: {
    backgroundColor: '#fdd',
    borderRadius: moderateScale(5),
    marginBottom: scale(15),
    padding: scale(10),
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
  },
  dateContainer: {
    borderRightWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: COLORS.red,
  },
  monthText: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    color: COLORS.black,
  },
  monthTexttt: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    color: COLORS.red,
    bottom: scale(5),
  },
  Days: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    color: COLORS.red,
  },
  infoContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  VRATNAME2: {
    color: COLORS.black,
    fontWeight: '400',
  },
  VRATNAME: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  TITHITIME: {
    color: COLORS.black,
    fontWeight: 'bold',
    paddingVertical: verticalScale(5),
  },
  TITHITIME2: {
    color: COLORS.black,
    fontWeight: '400',
  },
});

export default VrataUpvaas;
