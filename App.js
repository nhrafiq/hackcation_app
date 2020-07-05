import "react-native-gesture-handler";
import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
import { HomeScreen } from "./screens/HomeScreen";
import { MapScreen } from "./screens/MapScreen";
import store from "./store";
import { DestinationScreen } from "./screens/DestinationScreen";
import Progress from "./screens/StepCounter";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FFF7EB",
    accent: "#246A73",
  },
};

export default class App extends React.Component {
  getData = async () => {
    try {
      const dist = await AsyncStorage.getItem("distance");
      const time = await AsyncStorage.getItem("startTime");
      if (dist !== null && time !== null) {
        // value previously stored
        console.log(dist);
        console.log(time);
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Overview" }}
              />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="Destination" component={DestinationScreen} />
              <Stack.Screen name="Progress" component={Progress} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FFF7EB",
    accent: "#246A73",
  },
});

export default class App extends React.Component {
  getData = async () => {
    try {
      const dist = await AsyncStorage.getItem("distance");
      const time = await AsyncStorage.getItem("startTime");
      if (dist !== null && time !== null) {
        // value previously stored
        console.log(dist);
        console.log(time);
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Overview" }}
              />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="Destination" component={DestinationScreen} />
              <Stack.Screen name="Progress" component={Progress} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
