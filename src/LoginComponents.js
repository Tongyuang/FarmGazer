// Login Screen
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useData } from './Data';

const LoginComponents = ({ navigation }) => {
  const [name, setName] = useState('');
  const { storeFarmName, setFarmName} = useData();

  const handleLogin = () => {
    // Perform login operation (you might want to validate the name or store it)
    // Navigate to HomeScreen after login
    storeFarmName(name);
    setFarmName(name);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default LoginComponents

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
});