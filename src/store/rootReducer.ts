import { combineReducers } from "redux";
import appStateReducer from "./appState/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  appState: appStateReducer,
});

export default rootReducer;
