import { Toast } from "native-base";

export const toast = {
  showToast: (
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
  },
};
