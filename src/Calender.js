import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const daysInWeek = 7;

// Helper function to find the most recent Monday
const getMostRecentMonday = (date) => {
    const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const difference = (dayOfWeek + 6) % daysInWeek; // Calculate difference from Monday
    const mostRecentMonday = new Date(date);
    mostRecentMonday.setDate(mostRecentMonday.getDate() - difference);
    return mostRecentMonday;
  };

// Helper function to generate a range of dates starting from a given Monday
const generateDatesFromMonday = (startDate, totalWeeks) => {
    let dates = [];
    for (let week = 0; week < totalWeeks; week++) {
      for (let day = 0; day < daysInWeek; day++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + week * daysInWeek + day);
        dates.push(date);
      }
    }
    return dates;
  };
  

const Calendar = () => {
  const totalWeeks = 5 * 4; // approximately 5 months
  const flatListRef = useRef(); // Ref for the FlatList to enable programmatic scrolling

  const [selectedDate, setSelectedDate] = useState(new Date());
  const mostRecentMonday = getMostRecentMonday(new Date());
  const dates = generateDatesFromMonday(mostRecentMonday, totalWeeks);



  // Generate the formatted date string for the currently selected date
  const formattedSelectedDate = new Intl.DateTimeFormat('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
  }).format(selectedDate);

  // Scroll to the week of the selected date
  useEffect(() => {
    const startOfWeek = getMostRecentMonday(selectedDate);
    const startIndex = Math.floor((startOfWeek - mostRecentMonday) / (daysInWeek * 86400000)); // Divide by number of milliseconds in a day
    flatListRef.current.scrollToIndex({ index: startIndex * daysInWeek, animated: true });
  }, [selectedDate]);


  return (
    <View style={styles.container}>
    <FlatList
      ref={flatListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={dates}
      renderItem={({ item }) => {
        const dateString = item.toISOString().split('T')[0];
        const isSelected = selectedDate.toISOString().split('T')[0] === dateString;
        
        return (
          <View style={styles.stripContainer}>
            <Text style={styles.dayWordText}>{item.toLocaleString('en-us', { weekday: 'narrow' })}</Text>
            <TouchableOpacity 
                style={[styles.dayContainer, isSelected && styles.selectedDay]}
                onPress={() => setSelectedDate(item)}
            >
                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{item.getDate()}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
      keyExtractor={(item) => item.toISOString()}
    />
    <Text style={styles.formatedDateText}>{formattedSelectedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderWidth: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },  
  stripContainer: {
    width: screenWidth / 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    width: screenWidth / 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  selectedDay: {
    backgroundColor: 'black', // Black background for the circle
    width: screenWidth / 7 - 20, // Subtract the horizontal padding
    height: screenWidth / 7 - 20, // Ensure the height is the same as the width
    borderRadius: (screenWidth / 7 - 20) / 2, // Half of the width to create a circle
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
  },
  selectedDayText: {
    color: 'white', // White text color for selected day
  },
  dayText: {
    textAlign: 'center',
    fontSize: 18,
  },
  dayWordText: {
    textAlign: 'center',
    fontSize: 10,
    padding: 5,
  },
  formatedDateText: {
    fontSize: 17,
  },
  // ... other styles if needed
});

export default Calendar;
