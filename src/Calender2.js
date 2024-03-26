import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar } from 'react-native-calendars';
import { Image } from 'expo-image';
import { QRCodeScanner } from './QRCodeScanner';
import { useData } from './Data';


const Calendar2 = ({ searchBar }) => {
  const [expanded, setExpanded] = useState(false);
  const [isPlus, setIsPlus] = useState(false);
  const { selectedDate, setSelectedDate, storeDate } = useData();


  const onDaySelect = (day) => {
    // Construct a Date object directly from the parts of the 'day' object
    const dateParts = day.dateString.split('-').map(part => parseInt(part, 10));
    // month in Date constructor is 0-indexed, so subtract 1
    const newselectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    setSelectedDate(newselectedDate);
    console.log("from Calendar2.js");
    console.log(newselectedDate);
    storeDate(newselectedDate.toISOString());
    setExpanded(false); // Optionally close the calendar view
  };
  

  return (
    <View style={[styles.container, {height: isPlus? 500: expanded? 380 : 132 }]}>
      <View style={styles.topBar}>
      <TouchableOpacity
      style={styles.dateExpandButton}
      onPress={() => setExpanded(!expanded)}
      >
        <Text
        style={styles.monthYearText}
        >        
          {selectedDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })}
        </Text>
        <View style={styles.iconContainer}>
          <Image source={require('./icon/pick.png')} style={styles.monthYearIcon} />
        </View>
      </TouchableOpacity>
        <View style = {{flexDirection:'row', paddingRight: 18}}>
          <View style={[styles.iconContainer, {paddingRight: 40, display: searchBar}]}>
            <TouchableOpacity>
              <Image source={require('./icon/search.png')} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
          <View style={[styles.iconContainer, {display: searchBar}]}>
            <TouchableOpacity
              onPress={() => setIsPlus(!isPlus)}
            >
              <Image source={require('./icon/plus.png')} style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {expanded? 
      (
        <Calendar
          onDayPress={(day) => {
            onDaySelect(day);
          }}
          current={selectedDate.toISOString()}
          markedDates={{
            [selectedDate.toISOString().split('T')[0]]: {
              selected: true,
              marked: true,
              selectedColor: 'black'
            }
          }}
        />
      ) :
      (
      <View>
      <CalendarStrip
        scrollable
        style={{ height: 90, paddingTop: 0, paddingBottom: 30 }}
        calendarColor={'white'}
        calendarHeaderStyle={{ display: 'none'}}
        dateNumberStyle={{ color: 'black', fontSize: 18, fontWeight:'300' }}
        dateNameStyle={{ color: 'black', paddingBottom: 15}}
        highlightDateNumberStyle={styles.highlightedDateNumber}
        highlightDateNameStyle={{ color: 'black' }}
        iconContainer={{ display: 'none' }}  // Hide icon container
        onDateSelected={(date) => {
          setSelectedDate(date.toDate());
          storeDate(date.toISOString());
          console.log(date.toISOString());
        }}
        selectedDate={selectedDate}
      />
      <Text style={styles.selectedDateText}>
        {selectedDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      </View>
      )
      } 
      {isPlus? < QRCodeScanner plus={isPlus} setPlus={setIsPlus}/>: null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 132,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateExpandButton: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0066FF',
  },
  iconContainer: {
    // Make sure the container is large enough to fit the icon plus any rotation or offset
    width: 30,  // Adjust the width as necessary
    height: 30, // Adjust the height as necessary
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible', // This allows the icon to be visible even if it overflows the bounds of this view
  },
  monthYearIcon: {
    width: 18,
    height: 14,
    transform: [{ rotate: '0deg' }],
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  plusIcon: {
    width: 18,
    height: 18,
  },
  selectedDateText: {
    bottom: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  highlightedDateNumber: {
    backgroundColor: 'black', // Background color for the circle
    color: 'white', // Text color
    borderRadius: 15, // Half of the height and width to create a circle
    overflow: 'hidden', // Ensure the background doesn't bleed out of the border radius
    padding: 5, // Adjust padding to increase the size of the circle
    minWidth: 30, // Minimum width for the circle
    textAlign: 'center', // Center the text
    fontSize: 18, // Font size
  },
  // ... add any other styles you need here
});

export default Calendar2;
