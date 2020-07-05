import * as React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View, StatusBar, StyleSheet, YellowBox } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "react-native-paper";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";

//ignore map warnings
YellowBox.ignoreWarnings(["MapViewDirections Error: "]);

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1); // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

export function MapScreen({ navigation }) {
	const APIKEY = "AIzaSyDHg7w833zvKmsb7ja1SwazC-LBY-0ZzCU";
	const [distance, setDistance] = React.useState(-1);
	//locations stores all locations, including current and polylineLocations
	const [locations, addLocation] = React.useState([
		//map needs one dummy location to use while loading current user location
		{
			key: 1,
			name: "Paris, France",
			coords: { latitude: 48.8566, longitude: 2.3522 },
			distance: 0,
		},
	]);
	//polylineLocations is updated dynamically as unroutable locations are selected
	const [polylineLocations, addPolyline] = React.useState([]);

	//https://www.youtube.com/watch?v=UcWG2o2gVzw
	_getLocation = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);

		if (status !== "granted") {
			console.log("PERMISSION NOT GRAINTED!");
		}

		const userLocation = await Location.getCurrentPositionAsync();
		const userLocationName = await Location.reverseGeocodeAsync({
			latitude: userLocation.coords.latitude,
			longitude: userLocation.coords.longitude,
		});
		addLocation([
			...locations,
			{
				key: locations.length + 1,
				name:
					userLocationName[0].city +
					" " +
					userLocationName[0].region +
					", " +
					userLocationName[0].country,
				coords: {
					latitude: userLocation.coords.latitude,
					longitude: userLocation.coords.longitude,
				},
				distance: 0,
			},
		]);
	};

	React.useEffect(() => {
		_getLocation();
	}, []);

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

	setGoal = async () => {
		let start = locations[locations.length - 2];
		let end = locations[locations.length - 1];
		let calcDistance = 0;
		if (distance == -1) {
			calcDistance = getDistanceFromLatLonInKm(
				start.coords.latitude,
				start.coords.longitude,
				end.coords.latitude,
				end.coords.longitude
			);
			calcDistance = parseInt(calcDistance);
			var date = new Date();
			try {
				await AsyncStorage.setItem("distance", calcDistance.toString());
				await AsyncStorage.setItem("startTime", date.toString());
				navigation.navigate("Progress");
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<GooglePlacesAutocomplete
				placeholder="Search for a new destination"
				fetchDetails={true}
				styles={{ container: styles.searchContainer }}
				onPress={(data, details = null) => {
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
				}}
				query={{
					key: "AIzaSyDHg7w833zvKmsb7ja1SwazC-LBY-0ZzCU",
					language: "en",
				}}
			/>
			<MapView
				style={styles.mapStyle}
				region={{
					//map will focus on most recently added location
					latitude: locations[locations.length - 1].coords.latitude,
					longitude: locations[locations.length - 1].coords.longitude,
					latitudeDelta: 30,
					longitudeDelta: 0.0421,
				}}
			>
				{locations.map((place, index) => {
					if (index > 0) {
						return (
							<Marker
								identifier={place.name}
								coordinate={place.coords}
								key={place.key}
							/>
						);
					}
				})}
				{locations.map((place, index) => {
					if (index > 0) {
						return (
							<MapViewDirections
								origin={locations[1].coords} //home location
								destination={place.coords}
								apikey={APIKEY}
								strokeWidth={3}
								strokeColor={"#368f8b"}
								key={place.key}
								onError={(e) =>
									addPolyline([...polylineLocations, place])
								}
							/>
						);
					}
				})}
				{polylineLocations.map((place) => {
					return (
						<Polyline
							coordinates={[locations[1].coords, place.coords]}
							strokeWidth={3}
							strokeColor={"#368f8b"}
							key={place.key}
						/>
					);
				})}
			</MapView>
			<Button
				mode="contained"
				style={styles.startButton}
				labelStyle={{ color: "white" }}
				onPress={() => setGoal()}
			>
				Start Your Journey
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
