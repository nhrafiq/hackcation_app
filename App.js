import React from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        App
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});