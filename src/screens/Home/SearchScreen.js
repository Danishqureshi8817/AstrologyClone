import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReusableList from '../component/ReusableList';
import {COLORS} from '../../Theme/Colors';
import {scale, verticalScale, moderateScale} from '../../utils/Scaling';
import debounce from 'lodash.debounce';

const SearchScreen = ({navigation, route}) => {
  const {data = []} = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const mostSearched = [
    'Marital Life',
    'Love & Relationship',
    'Career & Job',
    'Cheating & Affairs',
    'Finance & Business',
    'Break-Up & Divorce',
    'Vedic Astrology',
    'Psychic Reading',
    'Tarot Reading',
    'Numerology',
    'Relationship Counseling',
  ];

  const filterAstrologers = query => {
    if (!query || data?.length === 0) return;

    const filtered = data?.filter(astrologer => {
      const {name, specialties} = astrologer;

      const isNameMatch = name.toLowerCase().includes(query.toLowerCase());
      const isSpecialtyMatch = specialties.some(specialty =>
        specialty.name.toLowerCase().includes(query.toLowerCase()),
      );

      return isNameMatch || isSpecialtyMatch;
    });

    setFilteredData(filtered);
  };

  // const handleSearchSubmit = () => {
  //   filterAstrologers(searchQuery);
  //   setSearchSubmitted(true);
  // };

  const debouncedFilterAstrologers = useCallback(
    debounce(filterAstrologers, 1000),
    [data],
  );

  const handleSearchChange = text => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData([]);
      setSearchSubmitted(false);
    } else {
      debouncedFilterAstrologers(text);
      setSearchSubmitted(true);
    }
  };

  const handleAstrologer = item => {
    navigation.navigate('AstrologerInfo', {person: item});
  };
  const handleChat = item => {
    navigation.navigate('ChatIntakeForm', {person: item});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBtn}>
          <MaterialIcons name="search" size={24} color="#800000" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Here"
            placeholderTextColor="#ccc"
            value={searchQuery}
            onChangeText={handleSearchChange}
            // onSubmitEditing={handleSearchSubmit}
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Search Results or "No astrologer found" message */}
      {searchSubmitted ? (
        filteredData?.length > 0 ? (
          <ReusableList
            data={filteredData}
            buttonType="chat"
            handleAstrologer={handleAstrologer}
            actionButton={handleChat}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <MaterialIcons
              name="sentiment-dissatisfied"
              size={60}
              color="#800000"
            />
            <Text style={styles.noDataText}>No astrologer found</Text>
          </View>
        )
      ) : (
        <View>
          <Text style={styles.sectionTitle}>Most searched on Astrowani</Text>
          <View style={styles.mostSearchedContainer}>
            {mostSearched.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat')}
                key={index}
                style={styles.mostSearchedItem}>
                <Text style={styles.mostText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.AntiFlash,
  },
  header: {
    backgroundColor: COLORS.darkYellow,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(6),
  },
  searchInput: {
    flex: 1,

    borderRadius: moderateScale(20),
    paddingHorizontal: scale(5),
    color: '#000',
    height: verticalScale(40),
  },
  searchBtn: {
    backgroundColor: COLORS.white,
    marginHorizontal: scale(10),
    borderRadius: moderateScale(20),

    paddingHorizontal: scale(8),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerIcon: {
    paddingHorizontal: scale(5),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#000',
    marginVertical: verticalScale(10),
    marginHorizontal: scale(15),
  },
  separator: {
    borderTopWidth: moderateScale(2),
    width: scale(320),
    marginVertical: verticalScale(13),
    alignSelf: 'center',
    borderTopColor: 'rgba(128, 0, 0, 0.1)',
  },

  mostSearchedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(15),
  },
  mostSearchedItem: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    margin: scale(5),
  },
  mostText: {
    color: 'black',
    fontSize: moderateScale(11),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  noDataText: {
    textAlign: 'center',
    color: '#000',
    marginVertical: verticalScale(15),
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
});

export default SearchScreen;
