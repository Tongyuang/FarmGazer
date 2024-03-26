import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const GrowingProcessSection = () => {
  const [startDate, setStartDate] = useState(new Date(2024, 1, 2)); // months are 0-indexed
  const [endDate, setEndDate] = useState(new Date(2024, 8, 1)); // months are 0-indexed

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    //setShowStartPicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    //setShowEndPicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Check growing process</Text>
        </View>
      <View style={styles.dateContainer}>
        <View style={styles.datePickContainer}>
            <Text style={styles.datePickText}> From </Text>
            <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStart}
            />
        </View>
        <View style={styles.datePickContainer}>
        <Text style={styles.datePickText}> To </Text>
        <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEnd}
            style={styles.datePickButton}
        />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('./icon/image1.png')} style={styles.image} />
        <Image source={require('./icon/image4.png')} style={styles.image} />
        <Image source={require('./icon/image3.png')} style={styles.image} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('./icon/image2.png')} style={styles.image} />
        <Image source={require('./icon/image5.png')} style={styles.image} />
        <Image source={require('./icon/image6.png')} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  headerContainer: {
    width: '200%',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateContainer: {
    marginTop: 5,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  datePickContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '50%',
  },
  datePickButton: {
  },
  datePickText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: "34%",
    resizeMode: 'cover',
  },
  // ... Add other styles you may need here
});

export default GrowingProcessSection;
