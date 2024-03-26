import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WebViewDisplay } from './WebViewDisplay';
import { LogBox } from 'react-native';

// Ignore log notifications if needed
LogBox.ignoreAllLogs();

export const QRCodeScanner = ({ plus, setPlus }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [url, setUrl] = useState('');
  const [webview, setWebview] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setWebview(true);
    setUrl(data);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!webview && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      {webview && <WebViewDisplay url={url} />}
      <View style={styles.button}>
        <Button title={'Close'} onPress={() => setPlus(false)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    position: 'absolute', // Use absolute positioning
    bottom: 20, // Distance from the bottom
    left: 0,
    right: 0, // Stretch across the screen width
    padding: 20, // Padding inside the button container for aesthetic spacing
  },
});
