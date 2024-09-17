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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from '../../Theme/Colors';

const MuhuratCard = ({title, data}) => {
  const [location, setLocation] = useState('New Delhi, NCT, India');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLocationChange = newLocation => {
    setLocation(newLocation);
  };

  const handleDateChange = () => {
    // Implement date picker here
  };

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
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <ScrollView contentContainerStyle={styles.Scrollcontainer}>
        <Text style={styles.header}>{title}</Text>
        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <View>
              <View style={styles.rowHeader}>
                {item.name ? (
                  <View style={styles.rowHeader}>
                    <Text style={styles.choghadiyaName}>{item.name}</Text>
                    {item.icon && (
                      <View style={styles.iconContainer}>
                        <Text style={styles.subText}>{item.subText}</Text>
                        <Icon name={item.icon} size={20} color="#E91E63" />
                      </View>
                    )}
                  </View>
                ) : null}
              </View>
              {item.time && <Text style={styles.time}>{item.time}</Text>}
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.darkYellow,
    paddingHorizontal: scale(15),
    marginHorizontal: scale(15),
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(8),
    paddingVertical: verticalScale(5),
  },

  locationInput: {
    marginTop: verticalScale(3),
    fontSize: moderateScale(13),
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: COLORS.darkYellow,
    paddingVertical: verticalScale(10),
  },
  dateText: {
    color: COLORS.AstroGold,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  Scrollcontainer: {
    flexGrow: 1,
    padding: scale(15),
  },
  header: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(15),
    backgroundColor: COLORS.lightTurquoise,
    padding: scale(5),
    borderRadius: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    paddingBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  choghadiyaName: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(10),
  },
  subText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#E91E63',
    marginRight: scale(5),
  },
  time: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: 'red',
    marginVertical: verticalScale(5),
  },
  description: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#000',
    width: scale(160),
  },
});

export default MuhuratCard;
