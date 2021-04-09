import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export const onChangeInput = (setInput: Function) => (
  e: NativeSyntheticEvent<TextInputChangeEventData>
): void => {
  const value = e.nativeEvent.text;
  setInput(value);
};
