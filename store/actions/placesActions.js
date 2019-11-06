import * as Filesystem from "expo-file-system";
import axios from "axios";
import * as types from "./actionTypes";
import ENV from "../../env";

import { insertPlace, fetchPlaces } from "../../helpers/db";

export const addPlace = (title, image, location) => {
	return async dispatch => {
		const { data } = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
				location.lat
			},${location.lng}&key=${ENV().googleApiKey}`
		);

		if (!data.results) {
			throw new Error("Something went wrong");
		}

		const address = data.results[0].formatted_address;
		console.log(address);
		const fileName = image.split("/").pop();
		const newPath = Filesystem.documentDirectory + fileName;

		try {
			await Filesystem.moveAsync({
				from: image,
				to: newPath
			});
			const dbResult = await insertPlace(
				title,
				newPath,
				address,
				location.lat,
				location.lng
			);
			console.log("[ACTION CREATOR: ADD_PLACE - DB_RESULT]", dbResult);
			dispatch({
				type: types.ADD_PLACE,
				placeData: {
					id: dbResult.insertId,
					title,
					image: newPath,
					address,
					coords: {
						lat: location.lat,
						lng: location.lng
					}
				}
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};

export const loadPlaces = () => {
	return async dispatch => {
		try {
			const dbResult = await fetchPlaces();
			console.log("[ACTION CREATOR: SET_PLACE - DB_RESULT]", dbResult);
			dispatch({
				type: types.SET_PLACES,
				placeData: { places: dbResult.rows._array }
			});
		} catch (error) {
			throw error;
		}
	};
};
