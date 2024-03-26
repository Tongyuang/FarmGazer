import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import ImageURL from '../function/ImageURL';
import { useData } from '../Data';

const ImageBlock = ({ farm, field, captureTime }) => {
  const { selectedDate } = useData();
  const offset = selectedDate.getTimezoneOffset();
  const localSelectedDate = new Date(selectedDate.getTime() - (offset*60*1000));
  const localDateString = localSelectedDate.toISOString().split('T')[0];
  const images = [
    ImageURL( farm, field, localDateString, "0"),
    ImageURL( farm, field, localDateString, "1"),
    ImageURL( farm, field, localDateString, "2"),
    ImageURL( farm, field, localDateString, "3"),
  ];


  console.log(localDateString); // Check the URIs in the console

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={true}
        autoplay={true}
        autoplayTimeout={3} // Increased timeout for testing
        loop={true}
        dotColor='white'
        prevButton={<Image source={require('../icon/arrow_left.png')} style={{ width: 40, height: 40 }} />}
        nextButton={<Image source={require('../icon/arrow_right.png')} style={{ width: 40, height: 40 }} />}
        style={styles.wrapper}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          </View>
        ))}
      </Swiper>

      <Text style={styles.captureTimeText}>Capture Time: {captureTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff', // Change this as needed
  },
  wrapper: {
    height: 280, // Adjust the height as needed
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotStyle: {
    color: '#000', // Change this as needed
    opacity: 0.4,
  },
  image: {
    width: '100%',
    height: 280, // Adjust the height as needed
    resizeMode: 'cover',
  },
  captureTimeText: {
    fontSize: 14,
    margin: 10, // Adjust the margin as needed
    color: '#000', // Change this as needed
  },
  // Add styles for other descriptions if needed
});

export default ImageBlock;

// Usage of ImageBlock component in your app's screen:
// <ImageBlock 
//   imagePath="https://your-image-path.jpg"
//   captureTime="08:20 am"
// />
