import { TagActions, TagState } from "./types";

const initialState: TagState = {
  userTags: [],
};

export default function reducer(state = initialState, action: TagActions) {
  switch (action.type) {
    case "tag/tagsFetched":
      return {
        userTags: [...action.payload],
      };
    case "tag/addOne":
      return {
        userTags: [...state.userTags, action.payload],
      };

    case "tag/updateOne":
      return {
        userTags: state.userTags.map((tag) => {
          if (tag.id !== action.payload.id) {
            return tag;
          }

          return action.payload;
        }),
      };
    case "tag/deleteOne":
      return {
        userTags: state.userTags.filter((tag) => tag.id !== action.payload),
      };
    default:
      return state;
  }
}
