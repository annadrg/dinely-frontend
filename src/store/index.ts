import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

const enhancer = applyMiddleware(ReduxThunk, logger);

const store = createStore(rootReducer, enhancer);

export default store;
