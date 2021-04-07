// State type
export type UserState = {
  token: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
};

// will add proper action types later
export type UserAction = {
  type: string;
  payload: any;
};
