import { combineReducers, createStore } from "redux";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const enhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  : (x: any) => x;

const store = createStore(rootReducer, enhancer);

export default store;

export type ReduxState = ReturnType<typeof rootReducer>;
