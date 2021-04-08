import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import rootReducer from "./rootReducer";

export type ReduxState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
