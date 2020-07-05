import React from "react";
import { Title, Card, Subheading, Button } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export function DestinationScreen({ navigation, route }) {
	const { location } = route.params;
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<Title style={styles.title}>{location.title}</Title>
			<Subheading>Tours</Subheading>
			<ScrollView horizontal={true} contentContainerStyle={styles.cards}>
				{location.tours.map((tour) => (
					<Card style={styles.card} key={tour.url}>
						<Card.Content>
							<Title>{tour.title}</Title>
						</Card.Content>
						<Card.Cover source={{ uri: tour.image }} />
						<Card.Actions>
							<Button
								mode="contained"
								onPress={() => {
									Linking.openURL(tour.url);
								}}
							>
								Visit
							</Button>
						</Card.Actions>
					</Card>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	cards: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignContent: "flex-start",
		marginTop: 50,
		flexWrap: "wrap",
	},
	title: {
		// position: "absolute",
		top: 10,
		alignSelf: "center",
		// marginLeft: 10,
	},
	card: {
		height: "45%",
		width: "45%",
		alignSelf: "flex-start",
		margin: "2.5%",
	},
});
