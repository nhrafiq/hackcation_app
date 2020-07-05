import React from "react";
import { Title, Card, Headline, Button } from "react-native-paper";
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
        flexWrap: "wrap",
      }}
    >
      <Headline style={styles.title}>{location.title}</Headline>
      <View style={styles.subView}>
      <Title>Tours</Title>
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
      <View style={styles.subView2}>
      <Title>Recipes</Title>
      <ScrollView horizontal={true} contentContainerStyle={styles.cards}>
        {location.recipes.map((tour) => (
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
                Try
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  subView : { 
    width:"100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    marginTop:50,
  },
  subView2 : { 
    width:"100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  title: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    marginLeft: 10,
  },
  card: {
    width: "45%",
    alignSelf: "flex-start",
    marginRight: "2.5%",
    marginLeft: "1%"
  },
});
