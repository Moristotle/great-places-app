import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import configureStore from "./store/configureStore";
import PlacesNavigator from "./navigation/PlacesNavigation";
import { init } from "./helpers/db";

init()
	.then(() => {
		console.log("initializing database");
	})
	.catch(err => {
		console.log("initializing db reason", err);
	});

const store = configureStore();

export default function App() {
	return (
		<Provider store={store}>
			<PlacesNavigator />
		</Provider>
	);
}
