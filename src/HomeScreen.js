// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import Calender2 from './Calender2';
import List from './List';

const HomeScreen = ({navigation}) => {
  return (
      <SafeAreaView style={styles.container}>
          <Calender2 searchBar={'flex'}/>
          <List navigation={navigation}/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarStrip: {
    // Styles for your calendar strip
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    // other styling
  },
  item: {
    // styling for each item
  },
  image: {
    width: 100,
    height: 100,
    // other styling
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // other styling
  },
  details: {
    // styling for the details text
  },
});

export default HomeScreen;
