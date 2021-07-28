export const RESET_SETTINGS_REQUEST = "RESET_SETTINGS_REQUEST";

export function resetSettings() {
  return {
    type: RESET_SETTINGS_REQUEST,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: {},
    },
  };
}
