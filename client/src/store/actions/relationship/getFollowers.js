import { generateUrl, generateFileUrl } from "../../../helpers/functions";

export const GET_FOLLOWERS_REQUEST = "GET_FOLLOWERS_REQUEST";
export const GET_FOLLOWERS_SUCCESS = "GET_FOLLOWERS_SUCCESS";
export const GET_FOLLOWERS_FAILURE = "GET_FOLLOWERS_FAILURE";

function requestGetFollowers() {
  return {
    type: GET_FOLLOWERS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFollowers(followersData) {
  return {
    type: GET_FOLLOWERS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      followers: followersData || []
        },
  };
}

function errorGetFollowers(message) {
  return {
    type: GET_FOLLOWERS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getFollowers(api, userId, status) {
  return async (dispatch) => {
    dispatch(requestGetFollowers());

    const url = generateUrl("getFollowers");
    try {
      const { data } = await api
        .setParams({ userId, status })
        .setMethod("GET")
        .query(url);

      data.forEach((item) => {
        item.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl);
      });

      dispatch(receiveGetFollowers(data));
    } catch {
      dispatch(errorGetFollowers("Error: GetFollowers"));
    }
  };
}
