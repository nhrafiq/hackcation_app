import React from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Headline, ProgressBar, Colors, Caption } from 'react-native-paper';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPedometerAvailable: 'checking',
      pastStepCount: 0,
      currentStepCount: 0,
      start: "",
      distance: 1,
    };
  }


  getData = async () => {
    try {
      const dist = await AsyncStorage.getItem('distance')
      const time = await AsyncStorage.getItem('startTime')
      if (dist !== null && time !== null) {
        // value previously stored
        console.log("Pedometer");
        console.log(time);
        this.setState({ start: Date(Date.parse(time)) });
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
    const dist = await AsyncStorage.getItem('distance');
    const startStr = AsyncStorage.getItem('startTime').then(
      value => {
        const start = new Date(value);
        this.setState({ start: start });
        Pedometer.getStepCountAsync(start, end).then(
          result => {
            this.setState({ pastStepCount: result.steps, distance: dist });
            console.log("distance: " + dist);
            if (result.steps == dist) {
              // AsyncStorage.clear();
            }
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
    const { dist, dest } = this.props.route.params;
    let progress = ((parseInt(this.state.pastStepCount + this.state.currentStepCount) == "NaN")
      ? this.state.currentStepCount : parseInt(this.state.pastStepCount + this.state.currentStepCount) / parseFloat(dist)) * 100;
    console.log(progress);
    return (
      <View style={styles.container}>
        <Headline style={{alignSelf:"center"}}>
          {(parseInt(this.state.pastStepCount + this.state.currentStepCount) == "NaN") ? this.state.currentStepCount : parseInt(this.state.pastStepCount + this.state.currentStepCount)} / {dist}
        </Headline>
        <ProgressBar progress={progress} color="#246A73" />
        <Caption style={{alignSelf:"center"}}>En route to {dest} ...</Caption>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'center',
  },
});