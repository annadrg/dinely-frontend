import { apiUrl } from "../../config/constants";
import axios from "axios";
import { Dispatch } from "redux";
import { ReduxState, AppThunk } from "../types";
import { User } from "./types";
import { appLoading, appDoneLoading } from "../appState/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toast } from "../../functions";

export const logInSuccess = (user: User) => {
  return {
    type: "user/logInSuccess",
    payload: user,
  };
};

const tokenStillValid = (user: User) => ({
  type: "user/tokenStillValid",
  payload: user,
});

export const logOutSuccess = () => ({ type: "user/logOutSuccess" });

export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        email,
        password,
        firstName,
        lastName,
      });

      toast.showToast("Succesfully signed up", 3000, "success", undefined);
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        toast.showToast(error.response.data.message, 6000, "danger", "Okay");
      } else {
        console.log(error.message);
        toast.showToast(error.message, 6000, "danger", "Okay");
      }
      dispatch(appDoneLoading());
    }
  };
};

export const logIn = (email: string, password: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      try {
        await AsyncStorage.setItem("token", response.data.token);
        dispatch(logInSuccess(response.data));
        toast.showToast("Welcome back!", 3000, "success", undefined);
        dispatch(appDoneLoading());
      } catch (error) {
        toast.showToast(error.message, 6000, "danger", "Okay");
        dispatch(appDoneLoading());
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        toast.showToast(error.response.data.message, 6000, "danger", "Okay");
      } else {
        console.log(error.message);
        toast.showToast(error.message, 6000, "danger", "Okay");
      }
      dispatch(appDoneLoading());
    }
  };
};

export const logOut = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      // Remove token to log out
      await AsyncStorage.removeItem("token");
      dispatch(logOutSuccess());
      dispatch(appDoneLoading());
    } catch (error) {
      toast.showToast(error.message, 2500, "danger", "Okay");
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = (): AppThunk => {
  return async (dispatch, getState) => {
    // Get token from storage
    const token = await AsyncStorage.getItem("token");

    // Stop if there is no token
    if (token === null) return;

    dispatch(appLoading());
    try {
      // Check whether token is still valid
      const response = await axios.get(`${apiUrl}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Token is still valid
      dispatch(tokenStillValid({ token, ...response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // Log out when token not valid
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
