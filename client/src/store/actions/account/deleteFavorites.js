import { generateUrl } from "../../../helpers/functions";
import { removeFavorite } from "../user";

export const DELETE_USER_FAVORITES_REQUEST = "DELETE_USER_FAVORITES_REQUEST";
export const DELETE_USER_FAVORITES_SUCCESS = "DELETE_USER_FAVORITES_SUCCESS";
export const DELETE_USER_FAVORITES_FAILURE = "DELETE_USER_FAVORITES_FAILURE";

function requestDeleteUserFavorite() {
  return {
    type: DELETE_USER_FAVORITES_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteUserFavorite(data) {
  return {
    type: DELETE_USER_FAVORITES_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data
    },
  };
}

function errorDeleteUserFavorite(message) {
  return {
    type: DELETE_USER_FAVORITES_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteFavorites(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteUserFavorite());

    const url = generateUrl("deleteAccountFavorites");
    try {
      await api.setMethod("DELETE").setParams({ userName }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index]["isFavorite"] = true;
      } 

      dispatch(removeFavorite())
      dispatch(receiveDeleteUserFavorite(list));
    } catch {
      dispatch(errorDeleteUserFavorite("Error: something went wrong"));
    }
  };
}
