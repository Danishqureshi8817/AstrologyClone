import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';
import {COLORS} from '../Theme/Colors';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity
        style={styles.userInfoSection}
        onPress={() => props.navigation.navigate('UserProfileScreen')}>
        <Icon name="account-circle" size={50} color="#000" />
        <View style={styles.nameMobile}>
          <View style={styles.userNamerow}>
            <Text style={styles.userName}>John doe </Text>
            <Icon style={styles.editIcon} name="edit" size={17} color="#000" />
          </View>
          <Text style={styles.phone}>9898839397</Text>
        </View>
      </TouchableOpacity>

      <DrawerItem
        label="My Wallet"
        icon={() => <Icon name="wallet" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('Wallet')} // Navigate to ScreenAStack (Home)
      />
      <DrawerItem
        label="My Sessions"
        icon={() => <Icon name="perm-phone-msg" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('SessionStack')} // Navigate to ScreenBStack (Chat)
      />
      {/* <DrawerItem
        label="My Packages"
        icon={() => (
          <MaterialCommunityIcons
            name="ticket-percent"
            size={24}
            color="#000"
          />
        )}
        onPress={() => props.navigation.navigate('PackageStack')} // Navigate to ScreenBStack (Chat)
      /> */}
      {/* <DrawerItem
        label="My Messages"
        icon={() => <Icon name="message" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('MessageScreen')} // Navigate to ScreenBStack (Chat)
      /> */}
      <DrawerItem
        label="Remedies"
        icon={() => <Icon name="workspace-premium" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('DrawerRemedies')} // Navigate to ScreenBStack (Chat)
      />
      <DrawerItem
        label="Chat With Astrologer"
        icon={() => <Icon name="wechat" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('DrawerChat')} // Navigate to ScreenBStack (Chat)
      />
      <DrawerItem
        label="My Favorites"
        icon={() => <Icon name="favorite" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('FavoriteScreen')} // Navigate to ScreenBStack (Chat)
      />
      <DrawerItem
        label="Free Service"
        icon={() => <Icon name="cruelty-free" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('FreeService')} // Navigate to ScreenBStack (Chat)
      />
      <DrawerItem
        label="Refer A friend"
        icon={() => <Icon name="offline-share" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('ReferFriend')} // Navigate to ScreenBStack (Chat)
      />
      <DrawerItem
        label="Settings"
        icon={() => <Icon name="settings-suggest" size={24} color="#000" />}
        onPress={() => props.navigation.navigate('Settings')} // Navigate to ScreenBStack (Chat)
      />
      <View style={styles.socialSection}>
        <Text style={styles.socialheadig}>Available On </Text>
        <View style={styles.socialIconsRow}>
          <TouchableOpacity>
            <FontAwesome name="facebook-square" size={24} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="twitter-square"
              size={24}
              color="#00acee"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="instagram"
              size={24}
              color="#C13584"
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome
              name="whatsapp"
              size={24}
              color="#25D366"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="youtube-square"
              size={24}
              color="#FF0000"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    padding: moderateScale(10),
    margin: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(0.5),
    borderBottomColor: COLORS.AshGray,
  },
  socialSection: {
    padding: moderateScale(10),
    margin: scale(25),

    alignItems: 'center',
    borderTopWidth: scale(0.5),
    borderTopColor: COLORS.AshGray,
  },
  socialheadig: {
    color: '#000',
  },
  userName: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
  },
  userNamerow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(170),
  },
  editIcon: {
    paddingHorizontal: scale(7),
  },
  nameMobile: {
    marginLeft: scale(10),
  },
  socialIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: verticalScale(10),
  },
  socialIcon: {
    marginLeft: scale(5),
  },
  phone: {
    fontSize: moderateScale(12),
    color: COLORS.red,
  },
});

export default CustomDrawerContent;
