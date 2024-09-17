import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import DateTimePicker from '@react-native-community/datetimepicker';
import DetailList from '../../component/DetailsList';

const PanchangScreen = () => {
  const [location, setLocation] = useState('New Delhi, NCT, India');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLocationChange = newLocation => {
    setLocation(newLocation);
  };

  const handleDateChange = () => {
    // Implement date picker here
  };

  const panchangData = [
    {label: 'Tithi', value: 'Dashami up to 01:22 AM, August 29'},
    {label: 'Nakshatra', value: 'Mrigashirsha up to 03:54 PM'},
    {label: 'Yoga', value: 'Vajra up to 07:09 PM'},
    {label: 'First Karana', value: 'Vanija up to 01:26 PM'},
    {label: 'Second Karana', value: 'Vishti up to 01:22 AM, August 29'},
    {label: 'Vaar', value: 'Wednesday'},
  ];

  const additionalInfo = [
    {label: 'Sun Rise', value: '06:01 AM'},
    {label: 'Sun Sign', value: '06:42 PM'},
    {label: 'Moon Rise', value: '12:12 AM'},
  ];
  const inauspiciousTime = [
    {label: 'Sun Rise', value: '06:01 AM'},
    {label: 'Sun Sign', value: '06:42 PM'},
    {label: 'Moon Rise', value: '12:12 AM'},
  ];
  const auspiciousTime = [
    {label: 'Sun Rise', value: '06:01 AM'},
    {label: 'Sun Sign', value: '06:42 PM'},
    {label: 'Moon Rise', value: '12:12 AM'},
  ];

  const handelDatePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.locationInput}
          value={location}
          onChangeText={handleLocationChange}
          placeholder="Enter your location"
        />
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={handleDateChange}>
          <Text style={styles.dateText}>
            {date.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome
            name="calendar"
            size={24}
            color="white"
            onPress={handelDatePicker}
          />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Remaining Screen Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailList title="Punchang" data={panchangData} />

        <DetailList title="Additional Info" data={additionalInfo} />

        <DetailList title="Inauspicious Time" data={inauspiciousTime} />
        <DetailList title="Auspicious Time" data={auspiciousTime} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.AntiFlash,
  },
  headerContainer: {
    backgroundColor: COLORS.darkYellow,
    padding: scale(15),
  },

  locationInput: {
    marginTop: verticalScale(5),
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    backgroundColor: COLORS.darkYellow,
    paddingVertical: verticalScale(10),
  },
  dateText: {
    color: COLORS.AstroGold,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },

  flatlistContainer: {
    padding: scale(10),
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
  },
  panchangContent: {
    padding: scale(15),
  },
  row: {
    flexDirection: 'row',
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
});

export default PanchangScreen;
