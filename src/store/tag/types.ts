// State type
export type TagState = {
  userTags: Tag[];
};

// Action types
export type TagActions =
  | { type: "tag/tagsFetched"; payload: Tag[] }
  | { type: "tag/addOne"; payload: Tag }
  | { type: "tag/updateOne"; payload: Tag }
  | { type: "tag/deleteOne"; payload: number };

// Tag type
export type Tag = {
  id: number;
  name: string;
  color?: string;
};

// New tag type
export type NewTag = {
  name: string;
  color?: string;
};
