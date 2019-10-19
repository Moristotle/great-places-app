import React, { useState } from "react";
import {
	View,
	Button,
	Text,
	ActivityIndicator,
	Alert,
	StyleSheet
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const LocationPicker = props => {
	const [pickedLocation, setPickedLocation] = useState();
	const [loading, setLoading] = useState(false);

	const verifyPermissions = async () => {
		//need to ask for permissions expliciclty on IOS and some android devices
		const result = await Permissions.askAsync(Permissions.LOCATION);

		if (result.status !== "granted") {
			Alert.alert(
				"Insufficient permissions",
				"You need to grant location permissiosn to use this app.",
				[{ text: "Okay" }]
			);
			return false;
		}
		return true;
	};
	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}
		try {
			setLoading(true);
			const location = await Location.getCurrentPositionAsync({
				timeout: 5000
			});
			console.log(location);
			setPickedLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude
			});
		} catch (error) {
			Alert.alert(
				"Could not fetch location",
				"Please try again later or pick a location on the map",
				[{ text: "Okay" }]
			);
		}
		setLoading(false);
	};
	return (
		<View style={styles.locationPicker}>
			<View style={styles.mapPreview}>
				{loading ? (
					<ActivityIndicator size="large" color={Colors.primary} />
				) : (
					<Text>No Location chosen yet!</Text>
				)}
			</View>
			<Button
				title="Get User Location"
				color={Colors.primary}
				onPress={getLocationHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	locationPicker: {
		marginBottom: 15
	},
	mapPreview: {
		marginBottom: 10,
		width: "100%",
		height: 150,
		borderColor: "#ccc",
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default LocationPicker;
