import { combineReducers } from "redux";
import appStateReducer from "./appState/reducer";
import userReducer from "./user/reducer";
import tagReducer from "./tag/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  appState: appStateReducer,
});

export default rootReducer;
