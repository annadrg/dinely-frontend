import { apiUrl } from "../../config/constants";
import axios from "axios";
import { AppThunk } from "../types";
import { appLoading, appDoneLoading } from "../appState/actions";
import { Tag, NewTag } from "./types";
import { selectToken } from "../user/selectors";
import { getRestaurants } from "../restaurant/actions";

export const tagsFetched = (tags: Tag[]) => {
  return {
    type: "tag/tagsFetched",
    payload: tags,
  };
};

export const getTags = (): AppThunk => async (dispatch, getState) => {
  const token = selectToken(getState());
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/tags/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(tagsFetched(response.data));
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

export const addOneTag = (tag: Tag) => {
  return {
    type: "tag/addOne",
    payload: tag,
  };
};

export const addTag = (tag: NewTag): AppThunk => async (dispatch, getState) => {
  const { name, color } = tag;
  const token = selectToken(getState());
  try {
    dispatch(appLoading());
    const response = await axios.post(
      `${apiUrl}/tags`,
      {
        name: name,
        color: color,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(appDoneLoading());
    const newTag = response.data;
    dispatch(addOneTag(newTag));
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
    } else {
      console.log(error);
    }
    dispatch(appDoneLoading());
  }
};

export const updateOneTag = (tag: Tag) => {
  return {
    type: "tag/updateOne",
    payload: tag,
  };
};

export const updateTag = (tagId: number, tag: NewTag): AppThunk => async (
  dispatch,
  getState
) => {
  const { name, color } = tag;
  const token = selectToken(getState());
  try {
    dispatch(appLoading());
    const response = await axios.patch(
      `${apiUrl}/tags/${tagId}`,
      { name, color },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const updatedTag = response.data;
    dispatch(updateOneTag(updatedTag));
    dispatch(getRestaurants());
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

export const deleteOneTag = (tagId: number) => {
  return {
    type: "tag/deleteOne",
    payload: tagId,
  };
};

export const deleteTag = (tagId: number): AppThunk => async (
  dispatch,
  getState
) => {
  const token = selectToken(getState());
  try {
    dispatch(appLoading());
    await axios.delete(`${apiUrl}/tags/${tagId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(deleteOneTag(tagId));
    dispatch(getRestaurants());
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
