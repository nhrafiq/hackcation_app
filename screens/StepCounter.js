import React from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Progress extends React.Component {
    constructor(props){ 
        super(props); 
        this.state = {
            isPedometerAvailable: 'checking',
            pastStepCount: 0,
            currentStepCount: 0,
            start: "",
          };
    }
 

  getData = async () => {
    try {
      const dist = await AsyncStorage.getItem('distance')
      const time = await AsyncStorage.getItem('startTime')
      if (dist !== null && time !== null) {
        // value previously stored
        console.log(dist);
        console.log(time);
        this.setState({start:Date.parse(time)});
        console.log(this.state);
      }
    } catch (e) {
      // error reading value
    }
  }

  componentDidMount() {
    this.getData(); 
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = async () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );

    const end = new Date();
    const startStr = AsyncStorage.getItem('startTime').then( 
        value => { 
            console.log("value");
            console.log(value);
            const start = Date.parse(value);
            end.setDate(start.getDate() + 1);
            this.setState({start:start});
            console.log("start");
            console.log(start); 
            Pedometer.getStepCountAsync(start, end).then(
                result => {
                  this.setState({ pastStepCount: result.steps });
                },
                error => {
                  this.setState({
                    pastStepCount: 'Could not get stepCount: ' + error,
                  });
                }
              );
        }
    ); 
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Steps taken in the last 24 hours: {this.state.pastStepCount}</Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
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