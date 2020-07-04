import * as React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

export function MapScreen() {
	const APIKEY = "AIzaSyDHg7w833zvKmsb7ja1SwazC-LBY-0ZzCU";
	const [distance, setDistance] = React.useState(-1);
	const [locations, addLocation] = React.useState([
		{
			key: 1,
			name: "Paris, France",
			coords: { latitude: 48.8566, longitude: 2.3522 },
			distance: 0,
		},
		{
			key: 2,
			name: "Madrid, Spain",
			coords: { latitude: 40.4637, longitude: -3.7492 },
			distance: 0,
		},
	]);

	return (
		<View style={styles.container}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				styles={{ container: styles.searchContainer }}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(details);

					//update locations array
					addLocation([
						...locations,
						{
							key: locations.length + 1,
							name: details.formatted_address,
							coords: {
								latitude: details.geometry.location.lat,
								longitude: details.geometry.location.lng,
							},
							distance: distance,
						},
					]);

					setDistance(-1);
				}}
				query={{
					key: "AIzaSyDHg7w833zvKmsb7ja1SwazC-LBY-0ZzCU",
					language: "en",
				}}
			/>
			<MapView style={styles.mapStyle}>
				{locations.map((key) => (
					<Marker identifier={key.name} coordinate={key.coords} />
				))}
				{locations.map((key, index) => {
					if (index > 0) {
						return (
							<MapViewDirections
								origin={locations[0].coords}
								destination={key.coords}
								apikey={APIKEY}
								strokeWidth={3}
								strokeColor={"#368f8b"}
							/>
						);
					}
				})}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	mapStyle: {
		width: "100%",
		height: "70%",
	},
	searchContainer: {
		width: "100%",
		position: "absolute",
		top: 60,
		zIndex: 2,
	},
});
