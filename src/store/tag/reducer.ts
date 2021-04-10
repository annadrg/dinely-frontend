import { TagActions, TagState } from "./types";

const initialState: TagState = {
  tags: [],
};

export default function reducer(state = initialState, action: TagActions) {
  switch (action.type) {
    default:
      return state;
  }
}
