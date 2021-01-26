import { generateUrl } from "../../../helpers/functions";
import { addFavorite } from "../user";

export const CREATE_USER_FAVORITES_REQUEST = "CREATE_USER_FAVORITES_REQUEST";
export const CREATE_USER_FAVORITES_SUCCESS = "CREATE_USER_FAVORITES_SUCCESS";
export const CREATE_USER_FAVORITES_FAILURE = "CREATE_USER_FAVORITES_FAILURE";

function requestCreateUserFavorite() {
  return {
    type: CREATE_USER_FAVORITES_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateUserFavorite(data) {
  return {
    type: CREATE_USER_FAVORITES_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorCreateUserFavorite(message) {
  return {
    type: CREATE_USER_FAVORITES_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createFavorites(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestCreateUserFavorite());

    const url = generateUrl("createAccountFavorites");
    try {
      await api.setParams({ userName }).query(url);

      const list = [...getState().users.data];
      const index = list.findIndex((item) => item.userName === userName);
      if (index !== -1) {
        list[index]["isFavorite"] = true;
      }

      dispatch(addFavorite());
      dispatch(receiveCreateUserFavorite(list));
    } catch {
      dispatch(errorCreateUserFavorite("Error: something went wrong"));
    }
  };
}
