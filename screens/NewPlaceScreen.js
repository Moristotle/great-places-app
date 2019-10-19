import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/actions/placesActions";
import {
	ScrollView,
	View,
	Text,
	Button,
	TextInput,
	StyleSheet
} from "react-native";

import Colors from "../constants/Colors";
import ImagePicker from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = props => {
	const [title, setTitle] = useState("");
	const [selectedImage, setSelectedImage] = useState();

	const dispatch = useDispatch();

	const titleChangedHandler = text => {
		setTitle(text);
	};

	const imageTakenHandler = imagePath => {
		setSelectedImage(imagePath);
	};

	const savePlaceHandler = () => {
		dispatch(placesActions.addPlace(title, selectedImage));
		props.navigation.goBack();
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={titleChangedHandler}
					value={title}
				/>
				<ImagePicker onImageTaken={imageTakenHandler} />
				<LocationPicker />
				<Button
					title="Save Place"
					color={Colors.primary}
					onPress={savePlaceHandler}
				/>
			</View>
		</ScrollView>
	);
};

NewPlaceScreen.navigationOptions = {
	headerTitle: "Add Place"
};
const styles = StyleSheet.create({
	form: {
		margin: 30
	},
	label: {
		fontSize: 18,
		marginBottom: 15
	},
	textInput: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2
	}
});

export default NewPlaceScreen;
