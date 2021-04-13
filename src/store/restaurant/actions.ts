import { apiUrl } from "../../config/constants";
import axios from "axios";
import { AppThunk } from "../types";
import { appLoading, appDoneLoading } from "../appState/actions";
import { Restaurant, NewRestaurant } from "./types";
import { selectToken } from "../user/selectors";
import { showToast } from "../../functions";

export const restaurantsFetched = (restaurants: Restaurant[]) => {
  return {
    type: "restaurant/restaurantsFetched",
    payload: restaurants,
  };
};

export const getRestaurants = (): AppThunk => async (dispatch, getState) => {
  const token = selectToken(getState());
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/restaurants/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(restaurantsFetched(response.data));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
    } else {
      console.log(error);
    }
    dispatch(appDoneLoading());
  }
};

export const addOneRestaurant = (restaurant: Restaurant) => {
  return {
    type: "restaurant/addOne",
    payload: restaurant,
  };
};

export const addRestaurant = (restaurant: NewRestaurant): AppThunk => async (
  dispatch,
  getState
) => {
  const token = selectToken(getState());
  try {
    dispatch(appLoading());
    const response = await axios.post(
      `${apiUrl}/restaurants`,
      {
        ...restaurant,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(appDoneLoading());
    const newRestaurant = response.data;
    dispatch(addOneRestaurant(newRestaurant));
    showToast("Restaurant succesfully added", 2000, "success", undefined);
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
    } else {
      console.log(error);
    }
    dispatch(appDoneLoading());
  }
};

export const updateOneRestaurant = (restaurant: Restaurant) => {
  return {
    type: "restaurant/updateOne",
    payload: restaurant,
  };
};

export const updateRestaurant = (
  restaurantId: number,
  restaurant: NewRestaurant
): AppThunk => async (dispatch, getState) => {
  const token = selectToken(getState());
  try {
    dispatch(appLoading());
    const response = await axios.patch(
      `${apiUrl}/restaurants/${restaurantId}`,
      { ...restaurant },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const updatedRestaurant = response.data;
    dispatch(updateOneRestaurant(updatedRestaurant));
    showToast("Restaurant succesfully updated", 2000, "success", undefined);
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
    } else {
      console.log(error);
    }
    dispatch(appDoneLoading());
  }
};

export const deleteOneRestaurant = (restaurantId: number) => {
  return {
    type: "restaurant/deleteOne",
    payload: restaurantId,
  };
};

export const deleteRestaurant = (restaurantId: number): AppThunk => async (
  dispatch,
  getState
) => {
  const token = selectToken(getState());
  try {
    dispatch(appLoading());
    await axios.delete(`${apiUrl}/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(deleteOneRestaurant(restaurantId));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
    } else {
      console.log(error);
    }
    dispatch(appDoneLoading());
  }
};
