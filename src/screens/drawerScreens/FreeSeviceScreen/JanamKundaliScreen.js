import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import {COLORS} from '../../../Theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const JanamKundaliScreen = ({navigation}) => {
  const [gender, setGender] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [timeOfBirth, setTimeOfBirth] = useState(null);
  const [dontKnowTime, setDontKnowTime] = useState(false);
  const [showPartner, setShowPartner] = useState(false);
  const [activeTab, setActiveTab] = useState('New Report');

  const handleCheckboxChange = () => {
    setDontKnowTime(!dontKnowTime);
    if (!dontKnowTime) {
      setTimeOfBirth(null);
    }
  };
  const handlePartnerSelect = () => {
    setShowPartner(!showPartner);
  };

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];
  const MarriedOptions = [
    {label: 'Married', value: 'married'},
    {label: 'Unmarried', value: 'unmarried'},
  ];

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || timeOfBirth;
    setShowTimePicker(false);
    setTimeOfBirth(currentTime);
  };
  return (
    <View style={styles.main}>
      <View style={styles.formContainer}>
        <View style={styles.titleView}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9085/9085836.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.title}>Enter Your Details</Text>
        </View>

        <View style={styles.profileView}>
          <TextInput
            placeholder="Enter full Name"
            placeholderTextColor="#000"
            style={styles.input}
          />

          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              data={genderOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              placeholderStyle={styles.dropdownText}
              value={gender}
              onChange={item => {
                setGender(item.value);
              }}
              renderRightIcon={() => (
                <Ionicons
                  name="chevron-down-outline"
                  color={COLORS.orange}
                  size={24}
                />
              )}
            />
          </View>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dropdownText}>
              {dateOfBirth
                ? dateOfBirth.toLocaleDateString()
                : 'Select Date of Birth'}
            </Text>
            <Ionicons name="calendar" color={COLORS.orange} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.input,
              {backgroundColor: dontKnowTime ? COLORS.AntiFlash : 'white'},
            ]}
            onPress={() => !dontKnowTime && setShowTimePicker(true)}
            disabled={dontKnowTime}>
            <Text style={styles.dropdownText}>
              {timeOfBirth
                ? timeOfBirth.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Select Time of Birth'}
            </Text>
            <Ionicons name="alarm-outline" color={COLORS.orange} size={25} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={handleCheckboxChange}>
            <Ionicons
              name={dontKnowTime ? 'checkbox-outline' : 'square-outline'}
              size={20}
              color="red"
            />
            <Text style={styles.label}>I don't know</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Enter Place of Birth"
            placeholderTextColor="#000"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Kundali Details')}
          style={styles.Button}>
          <Text style={styles.ButtonText}>Show Kundali</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={timeOfBirth || new Date()}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
    </View>
  );
};

export default JanamKundaliScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,

    backgroundColor: COLORS.white,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  icon: {
    width: scale(30),
    height: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    marginLeft: scale(10),
    color: '#000',
  },
  formContainer: {
    padding: scale(15),
  },
  profileView: {
    paddingTop: verticalScale(10),
  },
  partnerView: {
    paddingTop: verticalScale(10),
  },

  input: {
    flexDirection: 'row',
    height: verticalScale(50),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(8),
    borderWidth: verticalScale(1),
    backgroundColor: COLORS.white,
    borderColor: COLORS.AshGray,
  },
  dropdownText: {
    fontSize: moderateScale(14),
    color: COLORS.darkYellow,
  },
  LastInput: {
    height: verticalScale(50),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(15),
    justifyContent: 'center',
    borderRadius: moderateScale(8),
    borderWidth: verticalScale(1),
    backgroundColor: COLORS.white,
    borderColor: COLORS.AshGray,
  },
  dropdownContainer: {
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(8),
    borderWidth: verticalScale(1),
    backgroundColor: COLORS.white,
    borderColor: COLORS.AshGray,
  },
  dropdown: {
    width: '100%',
    height: verticalScale(55),
  },
  Button: {
    height: verticalScale(45),
    marginVertical: verticalScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    backgroundColor: COLORS.AstroGold,
  },
  ButtonText: {
    color: COLORS.black,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  changePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: scale(150),
    height: scale(150),
    borderRadius: moderateScale(75),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.white,
  },
  userIcon: {
    width: scale(150),
    height: scale(150),
    borderRadius: moderateScale(75),
  },
  editButton: {
    paddingVertical: verticalScale(5),
    position: 'absolute',
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(15),
    backgroundColor: COLORS.darkYellow,
    bottom: 0,
    right: scale(10),
    bottom: 0,
  },
  editButtonText: {
    fontSize: moderateScale(12),
    color: COLORS.white,
  },
  userName: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    marginTop: verticalScale(5),
    color: COLORS.darkYellow,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: verticalScale(12),
  },
  partnercheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(12),
  },
  label: {
    marginLeft: scale(8),
    fontSize: moderateScale(13),
    color: COLORS.black,
  },
  partnersLabel: {
    marginLeft: scale(8),
    fontSize: moderateScale(14),
    color: COLORS.black,
    fontWeight: 'bold',
  },

  //modal
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: scale(310),
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    padding: scale(20),
    alignItems: 'center',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: moderateScale(13),
    marginBottom: verticalScale(20),
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },

  okButton: {
    backgroundColor: '#FFD700',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(40),
    borderRadius: moderateScale(25),
  },
  okButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#DBC2A9',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(5),
  },
  tab: {
    paddingHorizontal: scale(10),
    marginLeft: scale(5),
    paddingVertical: verticalScale(8),
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    paddingHorizontal: scale(10),
  },
  activeTab: {
    marginLeft: scale(5),
    borderWidth: moderateScale(1),
    borderColor: COLORS.AstroMaroon,
    borderRadius: moderateScale(20),
    backgroundColor: 'white',
  },
  activeTabText: {
    paddingHorizontal: scale(10),
    color: COLORS.AstroMaroon,
    fontWeight: 'bold',
    fontSize: moderateScale(12),
  },
});
