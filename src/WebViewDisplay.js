// WebViewDisplay.js
import React from 'react';
import { WebView } from 'react-native-webview';

export const WebViewDisplay = ({ url }) => {
  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};
