import * as React from "react";
import MapView from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";

export function MapScreen() {
	return (
		<View style={styles.container}>
			<MapView style={styles.mapStyle} />
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
		height: "100%",
	},
});
