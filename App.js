import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/NavigatorTab';
import { DataProvider } from './src/Data';

export default function App() {
  return (
    <DataProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </DataProvider>
    )
}
