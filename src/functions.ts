import { Toast } from "native-base";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

// Set state to input field value on change
export const onChangeInput = (setInput: Function) => (
  e: NativeSyntheticEvent<TextInputChangeEventData>
): void => {
  const value = e.nativeEvent.text;
  setInput(value);
};

// Toast message
export const showToast = (
  message: string,
  duration: number,
  type: "danger" | "success",
  buttonText: "Okay" | undefined
) => {
  Toast.show({
    text: message,
    duration,
    position: "bottom",
    textStyle: { textAlign: "center" },
    buttonText,
    type,
  });
};
