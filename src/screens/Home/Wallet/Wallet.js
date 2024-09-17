import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
const plans = [
  {id: '1', amount: 50},
  {id: '2', amount: 100},
  {id: '3', amount: 150},
  {id: '4', amount: 200},
  {id: '5', amount: 250},
  {id: '6', amount: 300},
];

const Wallet = () => {
  const renderPlan = ({item}) => (
    <TouchableOpacity style={styles.planContainer}>
      <Text style={styles.planText}>₹ {item.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tap on a plan to recharge</Text>
      <FlatList
        data={plans}
        renderItem={renderPlan}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scale(16),
  },
  heading: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: 'black',

    marginBottom: verticalScale(16),
  },
  planContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: scale(5),
    padding: scale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  planText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#000',
  },
  row: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingBottom: verticalScale(16),
  },
});
