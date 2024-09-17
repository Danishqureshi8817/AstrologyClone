import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';

const TermsOfUse = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Terms of Use</Text>
        <View style={styles.textcontainer}>
          <Text style={styles.text}>
            1. sddkfjls dfjlk sdjfkl sffkjskdl sfdjlk sdfjkls sdfj lkjdfkl
            lskdlfj llkjf 1. sddkfjls dfjlk sdjfkl sffkjskdl sfdjlk sdfjkls sdfj
            lkjdfkl lskdlfj llkjf 1. sddkfjls dfjlk sdjfkl sffkjskdl sfdjlk
            sdfjkls sdfj lkjdfkl lskdlfj llkjf 1. sddkfjls dfjlk sdjfkl
            sffkjskdl sfdjlk sdfjkls sdfj lkjdfkl lskdlfj llkjf 1. sddkfjls
            dfjlk sdjfkl sffkjskdl sfdjlk sdfjkls sdfj lkjdfkl lskdlfj llkjf 1.
            sddkfjls dfjlk sdjfkl sffkjskdl sfdjlk sdfjkls sdfj lkjdfkl lskdlfj
            llkjf 1. sddkfjls dfjlk sdjfkl sffkjskdl sfdjlk sdfjkls sdfj lkjdfkl
            lskdlfj llkjf 1. sddkfjls dfjlk sdjfkl sffkjskdl sfdjlk sdfjkls sdfj
            lkjdfkl lskdlfj llkjf 1. sddkfjls dfjlk sdjfkl sffkjskdl sfdjlk
            sdfjkls sdfj lkjdfkl lskdlfj llkjf
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.AntiFlash,
    padding: scale(15),
  },
  heading: {
    color: '#000',
    marginVertical: verticalScale(10),
    fontSize: moderateScale(17),
    fontWeight: 'bold',
  },
  textcontainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(9),
    padding: scale(15),
    elevation: 3,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
});
