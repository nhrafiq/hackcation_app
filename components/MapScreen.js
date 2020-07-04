import React from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';

const markers = ['Los Angeles', 'New York'];
const APIKEY = 'AIzaSyDHg7w833zvKmsb7ja1SwazC-LBY-0ZzCU';
const route_url = `https://maps.googleapis.com/maps/api/directions/json?
origin=Los+Angeles,CA&destination=New+York,NY
&key=${APIKEY}`;

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: 0,
    };
  }

  //https://github.com/react-native-community/react-native-maps/issues/929
  getRoute(origin, destination) {
    var totalDistance = 0;

    fetch(route_url)
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.routes.length) {
          // sum distances
          for (var i = 0; i < responseJSON.routes.length; i += 1) {
            totalDistance =
              totalDistance + responseJSON.routes[0].legs[i].distance.value;
          }
          // store sum
          this.setState({
            distance: totalDistance / 1000, // convert to km
          });
        }
      })
      .catch(e => {
        console.warn(e);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onMapReady={() => {
            this.getRoute(markers[0], markers[1]);
            this.map.fitToSuppliedMarkers(markers);
          }}>
          <Marker
            identifier="Los Angeles"
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
          />

          <Marker
            identifier="New York"
            coordinate={{latitude: 40.7128, longitude: -74.006}}
          />

          <MapViewDirections
            origin={{latitude: 37.78825, longitude: -122.4324}}
            destination={{latitude: 40.7128, longitude: -74.006}}
            apikey={APIKEY}
            strokeWidth={3}
            strokeColor={'#368f8b'}
          />
        </MapView>
        <Text style={styles.distance}>{this.state.distance}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  distance: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    borderRadius: 15,
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default MapScreen;
