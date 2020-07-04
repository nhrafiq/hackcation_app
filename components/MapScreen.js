import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import RNGooglePlaces from 'react-native-google-places';

const markers = ['Los Angeles, CA', 'New York, NY'];
const APIKEY = 'AIzaSyDHg7w833zvKmsb7ja1SwazC-LBY-0ZzCU';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: -1,
      locations: [
        {
          key: 1,
          name: 'Los Angeles, CA',
          coords: {latitude: 37.78825, longitude: -122.4324},
          distance: 0,
        },
        {
          key: 2,
          name: 'New York, NY',
          coords: {latitude: 40.7128, longitude: -74.006},
          distance: 0,
        },
      ],
    };
  }

  //https://github.com/react-native-community/react-native-maps/issues/929
  getDistance(origin, destination) {
    var totalDistance = 0;
    const route_url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}`;

    fetch(route_url)
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON);
        if (responseJSON.routes.length) {
          // sum distances
          for (var i = 0; i < responseJSON.routes.length; i += 1) {
            totalDistance =
              totalDistance + responseJSON.routes[0].legs[i].distance.value;
          }
          this.setState({distance: totalDistance / 1000}); //convert to km
        }
      })
      .catch(e => {
        console.warn(e);
      });
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({
      type: 'cities', //restrict search results
    })
      .then(place => {
        console.log(place);

        //get distance in km
        this.getDistance(this.state.locations[0].name, place.address);

        //update locations array
        this.setState(
          {
            locations: [
              ...this.state.locations,
              {
                key: this.state.locations.length + 1,
                name: place.address,
                coords: {
                  latitude: place.location.latitude,
                  longitude: place.location.longitude,
                },
                distance: this.state.distance,
              },
            ],
            distance: -1,
          },
          () => console.log(this.state.locations),
        );
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
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
            // this.getDistance(markers[0], markers[1]);
            this.map.fitToSuppliedMarkers(markers);
          }}>
          {this.state.locations.map(key => (
            <Marker identifier={key.name} coordinate={key.coords} />
          ))}
          {this.state.locations.map((key, index) => {
            if (index > 0) {
              return (
                <MapViewDirections
                  origin={this.state.locations[0].coords}
                  destination={key.coords}
                  apikey={APIKEY}
                  strokeWidth={3}
                  strokeColor={'#368f8b'}
                />
              );
            }
          })}
        </MapView>
        <Text style={styles.distance}>
          {this.state.locations[this.state.locations.length - 1].distance}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}>
          <Text>Find a destination</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: 'lightgray',
    height: 30,
    justifyContent: 'center',
  },
});

export default MapScreen;
