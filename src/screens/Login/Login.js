import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {countries} from './Country';
import Instance from '../../api/ApiCall';

const Login = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, SetLoading] = useState(false);

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const selectCountry = country => {
    setCountryCode(country.code);
    setCallingCode(country.callingCode);
    setPickerVisible(false);
  };

  const validateFields = () => {
    if (toggle) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        Alert.alert('Validation Error', 'Email address cannot be empty.');
        return false;
      }
      if (!emailRegex.test(email)) {
        Alert.alert('Validation Error', 'Please enter a valid email address.');
        return false;
      }
    } else {
      if (!phoneNumber) {
        Alert.alert('Validation Error', 'Phone number cannot be empty.');
        return false;
      }
      if (phoneNumber.length < 10) {
        Alert.alert(
          'Validation Error',
          'Phone number must be at least 10 digits long.',
        );
        return false;
      }
    }
    return true;
  };

  const handleGetOtp = async () => {
    if (validateFields()) {
      SetLoading(true);

      try {
        if (toggle) {
          console.log('Requesting OTP for email:', email);
          const response = await Instance.post('/api/users/sign-in', {
            email: email,
          });
          if (response.data.success) {
            navigation.navigate('EmailOtpScreen', {email: email});
          } else {
            Alert.alert('Login Failed', response.data.message);
          }
        } else {
          navigation.navigate('OtpScreen');
        }
      } catch (error) {
        console.error('API call error:', error);
        Alert.alert('Login Error', 'Something went wrong. Please try again.');
      } finally {
        SetLoading(false);
      }
    }
  };

  return (
    <View style={styles.main}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image
        source={require('../../assets/images/loginLogo.jpeg')}
        style={styles.logo}
      />

      <Text style={styles.title}>Ohm Astro</Text>
      <Text style={styles.subTitle}>Best Astrologer's Team</Text>
      <View style={styles.loginContainer}>
        <Text style={styles.tagline}>Discover Your Cosmic Path</Text>
        {toggle ? (
          <View style={styles.numberInput}>
            <Icon
              name="email"
              size={24}
              color="gray"
              style={styles.emailIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        ) : (
          <View style={styles.numberInput}>
            <TouchableOpacity
              style={styles.countryPicker}
              onPress={togglePicker}>
              <Text style={styles.flag}>
                {countries.find(c => c.code === countryCode).flag}
              </Text>
              <Text style={styles.callingCode}>+{callingCode}</Text>
              <Icon
                name="keyboard-arrow-down"
                size={24}
                color={COLORS.AstroMaroon}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              maxLength={10}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        )}
        <TouchableOpacity
          style={[styles.otpBtn, loading && styles.disabledBtn]}
          disabled={loading}
          onPress={handleGetOtp}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.btnTxt}>Get OTP</Text>
          )}
        </TouchableOpacity>
        <View style={styles.termsView}>
          <Text style={styles.termsText}>By signing up, you agree to our</Text>
          <TouchableOpacity style={styles.termsLink}>
            <Text style={styles.linktext}>Terms of use</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>&</Text>
          <TouchableOpacity style={styles.termsLink}>
            <Text style={styles.linktext}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setToggle(!toggle)}
          style={styles.signInBtn}>
          {toggle ? (
            <Text style={styles.signInTxt}>Sign in with Mobile Number</Text>
          ) : (
            <Text style={styles.signInTxt}>Sign in with Email</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={isPickerVisible}
        onRequestClose={togglePicker}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countries}
              keyExtractor={item => item.code}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => selectCountry(item)}>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={styles.countryName}>
                    {item.name} (+{item.callingCode})
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={togglePicker}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.darkYellow,
  },
  logo: {
    alignSelf: 'center',
    marginTop: verticalScale(60),
    marginBottom: verticalScale(10),
    width: scale(70),
    height: verticalScale(70),
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(24),
    letterSpacing: scale(1),
  },
  subTitle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(10),
  },
  loginContainer: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    marginTop: verticalScale(35),
  },
  tagline: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(7),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: COLORS.AstroMaroon,
    marginTop: verticalScale(-20),
    backgroundColor: 'white',
    fontSize: moderateScale(12),
  },
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(15),
    borderWidth: moderateScale(1),
    height: verticalScale(42),
    borderColor: COLORS.AshGray,
    marginVertical: verticalScale(30),
    borderRadius: moderateScale(25),
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPickerButton: {
    marginLeft: scale(10),
  },
  callingCode: {
    fontSize: moderateScale(16),
    color: COLORS.AstroMaroon,
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(1),
    marginLeft: scale(10),
    fontSize: moderateScale(14),
  },
  otpBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(45),
    marginHorizontal: scale(15),
    backgroundColor: 'orange',
    borderRadius: moderateScale(25),
  },
  disabledBtn: {
    backgroundColor: COLORS.gray,
  },
  btnTxt: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  termsView: {
    marginVertical: verticalScale(10),
    marginHorizontal: scale(15),
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  termsText: {
    fontSize: moderateScale(11),
  },
  termsLink: {
    marginHorizontal: scale(2),
    padding: scale(1),
  },
  linktext: {fontSize: moderateScale(10), color: COLORS.AstroMaroon},
  signInTxt: {
    color: COLORS.DODGERBLUE,
    textAlign: 'center',

    fontWeight: 'bold',
  },
  signInBtn: {
    marginVertical: verticalScale(35),
  },
  emailIcon: {
    paddingLeft: scale(10),
  },
  flag: {
    fontSize: moderateScale(20),
    marginHorizontal: scale(8),
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPickerButton: {
    marginLeft: scale(10),
  },
  modalContainer: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',

    padding: scale(20),
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  countryName: {
    fontSize: moderateScale(16),
    marginLeft: scale(10),
  },
  closeText: {
    textAlign: 'center',
    color: COLORS.AstroMaroon,
    marginTop: verticalScale(20),
    fontSize: moderateScale(16),
  },
});
