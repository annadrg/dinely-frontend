import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import rootReducer from "./rootReducer";

// Root reducer type
export type ReduxState = ReturnType<typeof rootReducer>;

// Thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
