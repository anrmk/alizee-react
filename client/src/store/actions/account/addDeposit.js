export const ADD_DEPOSIT_SUCCESS = "ADD_DEPOSIT_SUCCESS";

function receiveAddDeposit(userInfo) {
  return {
    type: ADD_DEPOSIT_SUCCESS,
    payload: {
      isFetching: true,
      errorMessage: "",
      userInfo
    },
  };
}

export function addDeposit(amount) {
  return (dispatch, getState) => {
     const user = getState().signIn?.userInfo;
     user.deposit += amount;

    dispatch(receiveAddDeposit(user));
  };
}
