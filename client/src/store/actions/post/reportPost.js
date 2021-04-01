import { number } from "yup";
import { generateUrl } from "../../../helpers/functions";

export const REPORT_POST_REQUEST = "REPORT_POST_REQUEST";
export const REPORT_POST_SUCCESS = "REPORT_POST_SUCCESS";
export const REPORT_POST_FAILURE = "REPORT_POST_FAILURE";

function requestReportPost() {
  return {
    type: REPORT_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveReportPost() {
  return {
    type: REPORT_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorReportPost(message) {
  return {
    type: REPORT_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function reportPost(api, opts) {
  return async (dispatch) => {
    dispatch(requestReportPost());

    const url = generateUrl("reportPost");
    try {
      await api
        .setData({
          postId: opts.postId,
          reportType: parseInt(opts.reportType),
        })
        .query(url);

      dispatch(receiveReportPost());
    } catch (e) {
      dispatch(errorReportPost("Error: something went wrong:", e));
    }
  };
}
