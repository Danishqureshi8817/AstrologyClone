import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import RenderHTML from 'react-native-render-html'; // Import the RenderHTML component

const BlogScreen = ({route}) => {
  const {data = {}} = route.params || {};

  const thumbnail = data.thumbnail || 'https://via.placeholder.com/150';
  const title = data.title || 'No title';
  const metaDescription = data.metaDescription || 'No description available';
  const content = data.content || '<p>Content not available.</p>'; // Assuming content might be HTML
  const excerpt = data.excerpt || 'No excerpt available.';

  const date = data.createdAt ? new Date(data.createdAt) : new Date();
  const formattedDate = date.toLocaleDateString();

  // Simple check for HTML content; you might need a more robust check depending on your use case
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(content);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image Section with Default Image */}
        <Image source={{uri: thumbnail}} style={styles.imageBackground} />

        {/* Guidance Section */}
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceSubtitle}>{metaDescription}</Text>
        </View>

        {/* Blog Description Section */}
        <View style={styles.blogDescriptionContainer}>
          <Text style={styles.blogTitle}>{title}</Text>
          <Text style={styles.blogMeta}>Created At {formattedDate}</Text>
        </View>

        {/* Blog Content Section */}
        <View style={styles.contentView}>
          <Text style={styles.blogheadline}>{excerpt}</Text>

          {/* Conditional Rendering for HTML vs Plain Text */}
          {isHTML ? (
            <RenderHTML
              contentWidth={scale(320)}
              source={{html: content}}
              baseStyle={styles.content}
            />
          ) : (
            <Text style={styles.content}>{content}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageBackground: {
    width: '100%',
    height: verticalScale(200),
  },
  guidanceContainer: {
    padding: scale(20),
    backgroundColor: '#FEECEC',
    alignItems: 'center',
  },
  guidanceTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: verticalScale(5),
  },
  guidanceSubtitle: {
    fontSize: moderateScale(14),
    color: COLORS.black,
    marginBottom: verticalScale(20),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.red,
    padding: scale(10),
    borderRadius: moderateScale(5),
    width: '80%',
    marginBottom: verticalScale(10),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.red,
    marginLeft: scale(10),
  },
  blogDescriptionContainer: {
    padding: scale(20),
    alignItems: 'center',
  },
  blogTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  blogMeta: {
    fontSize: moderateScale(14),
    color: COLORS.gray,
  },
  author: {
    color: COLORS.red,
  },
  blogheadline: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: moderateScale(17),
    marginVertical: verticalScale(15),
  },
  contentView: {
    padding: moderateScale(15),
  },
  content: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
});

export default BlogScreen;
