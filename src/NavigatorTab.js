import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Detail from './Detail';
import { Image } from 'expo-image';
import LoginScreen from './login';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

function HiddenStackNavigator() {
    return (
      <HiddenStack.Navigator screenOptions={{ headerShown: false }}>
        <HiddenStack.Screen name="Detail" component={Detail} />
        {/* Add other screens to this stack navigator if needed */}
      </HiddenStack.Navigator>
    );
  }

function NavigatorTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { }, // Add padding to the bottom of the tab bar
        headerShown: false, // Hide the header
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Define the icon for each tab screen
          if (route.name === 'Home') {
            iconName = focused ? require('./icon/home_active.png') : require('./icon/home_inactive.png');
          } else if (route.name === 'Support') {
            iconName = focused ? require('./icon/support_active.png') : require('./icon/support_inactive.png');
          } else if (route.name === 'Notification') {
            iconName = focused ? require('./icon/notification_active.png') : require('./icon/notification_inactive.png');
          } else if (route.name === 'Account') {
            iconName = focused ? require('./icon/profile_active.png') : require('./icon/profile_inactive.png');
          }

          // You can also use remote URLs for icons, e.g., { uri: 'https://example.com/icon.png' }

          // Return the Image component with the appropriate source and styling
          return <Image source={iconName} style={{ width: 24, height: 24, tintColor: color }} />;
        },
      })}
    >
      {/* <Tab.Screen name="Login" component={OfficeSignIn} /> */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Support" component={HomeScreen} />
      <Tab.Screen name="Notification" component={HomeScreen} />
      <Tab.Screen name="Account" component={LoginScreen} />
      {/* Define other screens here */}
      {/* Example: <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

function AppNavigator() {
    return (
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="NavigatorTab" component={NavigatorTab} />
        <MainStack.Screen name="Detail" component={Detail} />
        {/* Add other standalone screens here if needed */}
      </MainStack.Navigator>
    );
  }

export default AppNavigator;
