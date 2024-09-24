import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Instance from '../../api/ApiCall';

const SupportScreen = () => {
  const Issues = [
    {
      label: 'Technical Issue',
      value: 'Technical Issue',
    },
    {label: 'Account Related Issue', value: 'Account Related Issue'},
    {label: 'Refund Request', value: 'Refund Request'},
    {label: 'Other', value: 'Other'},
    {label: 'Feedback', value: 'Feedback'},
  ];

  const [issue, setIssue] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !issue || !message) {
      Alert.alert('Please fill all fields before submitting.');
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await Instance.post(
        '/api/support/create-support',
        {
          name: name,
          email: email,
          issueType: issue,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('data', response.data);
      setName('');
      setEmail('');
      setIssue(null);
      setMessage('');

      Alert.alert('Support request submitted successfully!');
    } catch (err) {
      console.log(err.message);
      Alert.alert('Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Have any Questions?</Text>
        <Text style={styles.subtitle}>
          We are happy to help. Tell us your Issue and we will get back to you
          earliest.
        </Text>

        <TextInput
          placeholder="Enter Your Name"
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={COLORS.gray}
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            data={Issues}
            labelField="label"
            valueField="value"
            placeholder="Select Issue"
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.selectedItemText} // Style for selected item
            value={issue}
            onChange={item => {
              setIssue(item.value);
            }}
            renderRightIcon={() => (
              <Ionicons
                name="chevron-down-outline"
                color={COLORS.orange}
                size={24}
              />
            )}
            renderItem={item => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
            )} // Style for dropdown items
          />
        </View>
        <TextInput
          placeholder="Write your message here"
          placeholderTextColor={COLORS.gray}
          keyboardType="default"
          style={styles.messagebox}
          multiline={true}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitBtnTxt}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.AntiFlash,
    padding: scale(15),
  },
  title: {
    fontSize: moderateScale(16),
    color: '#000',
    paddingVertical: scale(5),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: moderateScale(13),
    color: '#000',
    marginBottom: verticalScale(15),
    fontWeight: 'bold',
  },
  input: {
    flexDirection: 'row',
    height: verticalScale(45),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: verticalScale(45),
  },
  dropdownText: {
    fontSize: moderateScale(14),
    color: COLORS.gray,
  },
  selectedItemText: {
    fontSize: moderateScale(14),
    color: '#000', // Black color for selected item
  },
  item: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  itemText: {
    fontSize: moderateScale(14),
    color: '#000', // Black color for dropdown items
  },
  messagebox: {
    height: verticalScale(190),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
    textAlignVertical: 'top',
    borderRadius: moderateScale(8),
    borderWidth: verticalScale(1),
    backgroundColor: COLORS.white,
    borderColor: COLORS.AshGray,
  },
  submitBtn: {
    backgroundColor: COLORS.AstroGold,
    paddingVertical: verticalScale(10),
    alignSelf: 'center',
    width: '100%',
    borderRadius: moderateScale(25),
    marginVertical: verticalScale(15),
  },
  submitBtnTxt: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {
    padding: scale(15),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    elevation: 4,
  },
});
