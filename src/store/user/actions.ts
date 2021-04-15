import { apiUrl } from "../../config/constants";
import axios from "axios";
import { Dispatch } from "redux";
import { AppThunk } from "../types";
import { User, UserWithoutToken } from "./types";
import { appLoading, appDoneLoading } from "../appState/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../functions";
import { selectToken } from "./selectors";
import { getTags } from "../tag/actions";
import { getRestaurants } from "../restaurant/actions";

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

export const updateUserDetails = (user: UserWithoutToken) => {
  return {
    type: "user/updateUserDetails",
    payload: user,
  };
};

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
      dispatch(appDoneLoading());
      showToast("Succesfully signed up", 2500, "success", undefined);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        showToast(error.response.data.message, 6000, "danger", "Okay");
      } else {
        console.log(error.message);
        showToast(error.message, 6000, "danger", "Okay");
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
        dispatch(getTags());
        dispatch(getRestaurants());
        dispatch(appDoneLoading());
        showToast("Welcome back!", 2500, "success", undefined);
      } catch (error) {
        dispatch(appDoneLoading());
        showToast(error.message, 6000, "danger", "Okay");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        showToast(error.response.data.message, 6000, "danger", "Okay");
      } else {
        console.log(error.message);
        showToast(error.message, 6000, "danger", "Okay");
      }
      dispatch(appDoneLoading());
    }
  };
};

export const logOut = (): AppThunk => {
  return async (dispatch) => {
    dispatch(appLoading());
    try {
      // Remove token to log out
      await AsyncStorage.removeItem("token");
      dispatch(logOutSuccess());
      dispatch(appDoneLoading());
    } catch (error) {
      showToast(error.message, 2500, "danger", "Okay");
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = (): AppThunk => {
  return async (dispatch) => {
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
      dispatch(getTags());
      dispatch(getRestaurants());
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

export const changeUserDetails = (
  id: number | null,
  firstName: string,
  lastName: string,
  email: string
): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const token = selectToken(getState());
      const response = await axios.patch(
        `${apiUrl}/users/${id}`,
        {
          email,
          firstName,
          lastName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updateUserDetails(response.data));
      dispatch(appDoneLoading());
      showToast("Details succesfully changed", 2500, "success", undefined);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        showToast(error.response.data.message, 6000, "danger", "Okay");
      } else {
        console.log(error.message);
        showToast(error.message, 6000, "danger", "Okay");
      }
      dispatch(appDoneLoading());
    }
  };
};

export const changePassword = (
  id: number | null,
  password: string
): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const token = selectToken(getState());
      await axios.patch(
        `${apiUrl}/users/${id}`,
        {
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(appDoneLoading());
      showToast("Password succesfully changed", 2500, "success", undefined);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        showToast(error.response.data.message, 6000, "danger", "Okay");
      } else {
        console.log(error.message);
        showToast(error.message, 6000, "danger", "Okay");
      }
      dispatch(appDoneLoading());
    }
  };
};
