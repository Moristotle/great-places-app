import * as Filesystem from "expo-file-system";
import * as types from "./actionTypes";

import { insertPlace, fetchPlaces } from "../../helpers/db";

export const addPlace = (title, image) => {
	return async dispatch => {
		const fileName = image.split("/").pop();
		const newPath = Filesystem.documentDirectory + fileName;

		try {
			await Filesystem.moveAsync({
				from: image,
				to: newPath
			});
			const dbResult = await insertPlace(title, newPath, "Here", 15.6, 12.3);
			console.log("[ACTION CREATOR: ADD_PLACE - DB_RESULT]", dbResult);
			dispatch({
				type: types.ADD_PLACE,
				placeData: {
					id: dbResult.insertId,
					title,
					image: newPath
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
