import { combineReducers } from "redux";
import appStateReducer from "./appState/reducer";
import userReducer from "./user/reducer";
import tagReducer from "./tag/reducer";
import restaurantReducer from "./restaurant/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  restaurant: restaurantReducer,
  appState: appStateReducer,
});

export default rootReducer;
