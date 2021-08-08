/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Navigation } from 'react-native-navigation';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  Navigation.registerComponent('Home', () => HomeScreen);

  return (
    <View style={{ display: 'flex', marginTop: 200, alignItems: 'center' }}>
      <Text style={{ fontSize: 40 }}>Maayan Hafart LI!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({


});

export default App;
