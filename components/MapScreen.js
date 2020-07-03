import React from 'react';
import {View, StyleSheet} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const markers = ['Home', 'New York'];

class MapScreen extends React.Component {
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
            this.map.fitToSuppliedMarkers(markers);
          }}>
          <Marker
            identifier="Home"
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
          />

          <Marker
            identifier="New York"
            coordinate={{latitude: 40.7128, longitude: -74.006}}
          />
        </MapView>
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
});

export default MapScreen;
