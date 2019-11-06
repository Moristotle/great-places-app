import initialState from "../initialState";
import * as types from "../actions/actionTypes";
import Place from "../../models/Place";

const addPlace = (state, action) => {
	const newPlace = new Place(
		action.placeData.id.toString(),
		action.placeData.title,
		action.placeData.image,
		action.placeData.address,
		action.placeData.coords.lat,
		action.placeData.coords.lng
	);
	return {
		...state,
		places: state.places.concat(newPlace)
	};
};

const setPlace = (state, action) => {
	return {
		...state,
		places: action.placeData.places.map(
			pl =>
				new Place(
					pl.id.toString(),
					pl.title,
					pl.imageUri,
					pl.address,
					pl.lat,
					pl.lng
				)
		)
	};
};
export default (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_PLACE:
			return addPlace(state, action);
		case types.SET_PLACES:
			return setPlace(state, action);
		default:
			return state;
	}
};
