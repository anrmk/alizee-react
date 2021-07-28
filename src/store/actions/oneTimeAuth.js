import { generateUrl } from "../../helpers/functions";

export const ONE_TIME_AUTH_REQUEST = "ONE_TIME_AUTH_REQUEST";
export const ONE_TIME_AUTH_SUCCESS = "ONE_TIME_AUTH_SUCCESS";
export const ONE_TIME_AUTH_FAILURE = "ONE_TIME_AUTH_FAILURE";

export function requestOneTimeAuth() {
  return async (dispatch) =>
    dispatch({
      type: ONE_TIME_AUTH_REQUEST,
      payload: {
        isFetching: true,
        isAuthSocial: false,
        errorMessage: "",
      },
    });
}

function receiveOneTimeAuth(userInfo) {
  return {
    type: ONE_TIME_AUTH_SUCCESS,
    payload: {
      isFetching: false,
      isAuthSocial: true,
      errorMessage: "",
      data: userInfo || {},
    },
  };
}

export function errorOneTimeAuth(message) {
  return async (dispatch) =>
    dispatch({
      type: ONE_TIME_AUTH_FAILURE,
      payload: {
        isFetching: false,
        isAuthSocial: false,
        errorMessage: message,
      },
    });
}

export function oneTimeAuth(api, opts) {
  return async (dispatch) => {
    dispatch(requestOneTimeAuth());

    const url = generateUrl("onetimeauth");
    try {
      const { data } = await api
        .setMethod("POST")
        .setParams({
          email: opts.email,
          token: opts.token,
        })
        .query(url);

      dispatch(receiveOneTimeAuth(data));
    } catch (e) {
      dispatch(errorOneTimeAuth("Error: social authentication"));
    }
  };
}
