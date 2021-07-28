import { generateUrl } from "../../../helpers/functions";
import { addFollower } from "../user";
import { getDeposit } from "../account";

export const CREATE_FOLLOW_REQUEST = "CREATE_FOLLOW_REQUEST";
export const CREATE_FOLLOW_SUCCESS = "CREATE_FOLLOW_SUCCESS";
export const CREATE_FOLLOW_FAILURE = "CREATE_FOLLOW_FAILURE";

function requestCreateFollow() {
  return {
    type: CREATE_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateFollow(data) {
  return {
    type: CREATE_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorCreateFollow(message) {
  return {
    type: CREATE_FOLLOW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createFollow(api, userName, isPrivateAccount) {
  return async (dispatch, getState) => {
    dispatch(requestCreateFollow());

    const url = generateUrl("createFollow");
    try {
      await api.setParams({ userName }).query(url);

      const updatedData = toggleFollowStatus(
        getState().users.data,
        userName,
        true
      );

      dispatch(addFollower(isPrivateAccount));
      dispatch(receiveCreateFollow(updatedData));
      dispatch(getDeposit(api));
    } catch {
      dispatch(
        errorCreateFollow("When follow was creating then something went wrong")
      );
    }
  };
}

export function toggleFollowStatus(data, userName, status) {
  if (!data || !data.length) return [];

  const list = [...data];
  const index = list.findIndex((item) => item.userName === userName);

  if (index !== -1) {
    list[index].isFollow = status;
  }

  return list;
}
