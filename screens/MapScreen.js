import * as React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "react-native-paper";

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
		// {
		// 	key: 2,
		// 	name: "Madrid, Spain",
		// 	coords: { latitude: 40.4637, longitude: -3.7492 },
		// 	distance: 0,
		// },
	]);

	//https://github.com/react-native-community/react-native-maps/issues/929
	getDistance = (origin, destination) => {
		var totalDistance = 0;
		const route_url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}`;

		fetch(route_url)
			.then((response) => response.json())
			.then((responseJSON) => {
				// console.log(responseJSON);
				if (responseJSON.routes.length) {
					// sum distances
					for (var i = 0; i < responseJSON.routes.length; i += 1) {
						totalDistance =
							totalDistance +
							responseJSON.routes[0].legs[i].distance.value;
					}
					setDistance(totalDistance / 1000); //convert to km
					console.log(totalDistance);
				}
			})
			.catch((e) => {
				console.warn(e);
			});
	};

	return (
		<View style={styles.container}>
			<GooglePlacesAutocomplete
				placeholder="Search for a new destination"
				fetchDetails={true}
				styles={{ container: styles.searchContainer }}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					// console.log(details);

					getDistance(locations[0].name, details.formatted_address);
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

					// setDistance(-1);
				}}
				query={{
					key: "AIzaSyDHg7w833zvKmsb7ja1SwazC-LBY-0ZzCU",
					language: "en",
				}}
			/>
			<MapView style={styles.mapStyle}>
				{locations.map((place) => (
					<Marker
						identifier={place.name}
						coordinate={place.coords}
						key={place.key}
					/>
				))}
				{locations.map((place, index) => {
					if (index > 0) {
						return (
							<MapViewDirections
								origin={locations[0].coords}
								destination={place.coords}
								apikey={APIKEY}
								strokeWidth={3}
								strokeColor={"#368f8b"}
								key={place.key}
							/>
						);
					}
				})}
			</MapView>
			<Button
				mode="contained"
				style={styles.startButton}
				labelStyle={{ color: "white" }}
			>
				Start Counting Steps
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	mapStyle: {
		width: "100%",
		height: "100%",
	},
	searchContainer: {
		width: "100%",
		position: "absolute",
		top: 0,
		zIndex: 2,
		backgroundColor: "white",
	},
	startButton: {
		position: "absolute",
		bottom: 15,
		zIndex: 2,
		backgroundColor: "#246A73",
		alignSelf: "center",
	},
});
