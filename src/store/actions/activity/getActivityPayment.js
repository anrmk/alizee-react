import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";

export const GET_ACTIVITY_PAYMENTS_REQUEST = "GET_ACTIVITY_PAYMENTS_REQUEST";
export const GET_ACTIVITY_PAYMENTS_SUCCESS = "GET_ACTIVITY_PAYMENTS_SUCCESS";
export const GET_ACTIVITY_PAYMENTS_FAILURE = "GET_ACTIVITY_PAYMENTS_FAILURE";

function requestGetActivityPayments() {
  return {
    type: GET_ACTIVITY_PAYMENTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetActivityPayments(data) {
  return {
    type: GET_ACTIVITY_PAYMENTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      payment: data || [],
    },
  };
}

function errorGetActivityPayments(message) {
  return {
    type: GET_ACTIVITY_PAYMENTS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getActivityPayments(api, opts) {
  return async (dispatch) => {
    dispatch(requestGetActivityPayments());

    const url = generateUrl("getActivityPayments");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: opts?.start ?? new Date().toUTCString(),
          end: opts?.end ?? new Date().toUTCString(),
        })
        .query(url);

      dispatch(receiveGetActivityPayments(data));
    } catch (e) {
      dispatch(errorGetActivityPayments(e));
    }
  };
}

// Selectors
const paymentSelector = (state) => state.activity.payment;

export const getActivityPaymentsChart = createSelector(
  [paymentSelector],
  (data) =>
    data.reduce(
      (acc, curr) => ({
        ...acc,
        labels: [
          ...(acc.labels || []),
          new Date(curr.createdDate).toLocaleDateString(),
        ],
        otherTotal: [...(acc.otherTotal || []), curr.totalOtherAmount],
        postsTotal: [...(acc.postsTotal || []), curr.totalTipsAmount],
        tipsTotal: [...(acc.tipsTotal || []), curr.totalPostsAmount],
        total: (acc.total || 0) + curr.totalAmount,
      }),
      {}
    )
);
