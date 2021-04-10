// State type
export type TagState = {
  tags: Tag[];
};

// Action types
export type TagActions = { type: string; payload: any }; // To change

// Tag type
export type Tag = {
  id: number;
  name: string;
  color: string;
};
