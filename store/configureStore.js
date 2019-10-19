import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export default function configureStore() {
	const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

	return store;
}
