import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailScreen = props => {
	return (
		<View>
			<Text>PlaceDetailScreen</Text>
		</View>
	);
};

PlaceDetailScreen.navigationOptions = props => {
	return {
		headerTitle: props.navigation.getParam("placeTitle")
	};
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
