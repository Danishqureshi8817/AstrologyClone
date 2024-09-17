import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Modal,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import Instance from '../../api/ApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({route, navigation}) => {
  const {person} = route.params;
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'astrologer',
      time: '10:00 AM',
    },
    {
      id: '2',
      text: 'I have a query about my career.',
      sender: 'user',
      time: '10:02 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: newMessage,
          sender: 'user',
          time: '10:05 AM',
        }, // Mock time
      ]);
      setNewMessage('');
    }
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.astrologerMessage,
      ]}>
      <View>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );
  const handleEndChat = () => {
    setModalVisible(true);
  };
  handleSubmitReview = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await Instance.post(
        '/api/reviews/',
        {
          astrologerId: person._id,
          rating: rating,
          comment: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data) {
        console.log(response.data);
        Alert.alert('Submitted');
      } else {
        console.error('Error updating favorite status:', result.message);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || 'Something went wrong!';
        Alert.alert(
          'Alert',
          errorMessage,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else {
        console.log('error message:', error.message);
      }
    }

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userProfile}>
          <Icon name="account-circle" size={40} color="#fff" />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{person.name || 'John'}</Text>
            <Text style={styles.typingStatus}>Typing...</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleEndChat} style={styles.endChatButton}>
          <Text style={styles.endChatText}>End Chat</Text>
        </TouchableOpacity>

        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <FontAwesome name="times-circle" size={24} color="black" />
              </TouchableOpacity>
              <Image
                source={{
                  uri:
                    person.profileImage ||
                    'https://th.bing.com/th/id/OIP.6VsfIq35PtqvwJQQHsHqgAHaF6?w=229&h=183&c=7&r=0&o=5&pid=1.7',
                }} // Replace with your image URL
                style={styles.profileImage}
              />
              <Text style={styles.title}>{person.name || 'john'}</Text>
              <Text style={styles.description}>
                Please take a moment to give us your feedback so we can ensure
                you get the best experience.
              </Text>

              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity
                    style={styles.starpress}
                    key={star}
                    onPress={() => setRating(star)}>
                    <FontAwesome
                      name={star <= rating ? 'star' : 'star-o'}
                      size={30}
                      color={star <= rating ? '#FFD700' : '#C0C0C0'}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.feedbackInput}
                multiline={true}
                onChangeText={text => setFeedback(text)}
                numberOfLines={4}
                placeholder="Describe your feedback (optional)"
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitReview}>
                <Text style={styles.submitButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <FontAwesome
            name="paperclip"
            size={24}
            color="#000"
            style={styles.mediaIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={handleSend}>
          <FontAwesome
            name="send"
            size={24}
            color={COLORS.primary}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: COLORS.AntiFlash,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: COLORS.darkYellow,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: scale(10),
  },
  userName: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#fff',
  },
  typingStatus: {
    fontSize: moderateScale(11),
    color: COLORS.white,
  },
  endChatButton: {
    backgroundColor: COLORS.AstroGold,
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(20),
  },
  endChatText: {
    color: COLORS.black,
    fontSize: moderateScale(11),
    fontWeight: 'bold',
  },
  messagesList: {
    padding: scale(15),
    flexGrow: 1,
  },
  messageContainer: {
    padding: scale(10),
    marginVertical: verticalScale(5),
    maxWidth: '70%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
  astrologerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  messageText: {
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  msgbox: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(7),
    padding: scale(10),
  },

  messageTime: {
    fontSize: moderateScale(10),
    color: COLORS.gray,
    marginTop: verticalScale(5),
    alignSelf: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: '#fff',
  },
  mediaIcon: {
    marginHorizontal: scale(5),
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(20),
    elevation: 3,
    marginHorizontal: scale(10),
  },
  sendIcon: {
    marginLeft: 5,
  },
  //modal

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: scale(20),
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(10),
  },
  profileImage: {
    width: scale(70),
    height: scale(70),
    borderRadius: moderateScale(35),
    marginTop: verticalScale(-55),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginTop: verticalScale(10),
    color: '#000',
  },
  subtitle: {
    fontSize: moderateScale(15),
    marginTop: verticalScale(5),
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  description: {
    fontSize: moderateScale(13),
    color: '#000',
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: scale(20),
  },
  submitButton: {
    backgroundColor: '#FFD700',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(5),
  },
  submitButtonText: {
    color: 'black',
    fontSize: moderateScale(13),
    fontWeight: 'bold',
  },
  starpress: {
    marginRight: scale(5),
  },
  feedbackInput: {
    height: verticalScale(100),
    borderColor: 'gray',
    borderWidth: scale(1),
    padding: scale(10),
    textAlignVertical: 'top',
    width: scale(270),

    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
});

export default ChatScreen;
