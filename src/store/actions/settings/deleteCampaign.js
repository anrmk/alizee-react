import { generateUrl } from "../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const DELETE_CAMPAIGN_REQUEST = "DELETE_CAMPAIGN_REQUEST";
export const DELETE_CAMPAIGN_SUCCESS = "DELETE_CAMPAIGN_SUCCESS";
export const DELETE_CAMPAIGN_FAILURE = "DELETE_CAMPAIGN_FAILURE";

function requestDeleteCampaignRequest() {
  return {
    type: DELETE_CAMPAIGN_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveDeleteCampaignReceive(data) {
  return {
    type: DELETE_CAMPAIGN_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorDeleteCampaign(message) {
  return {
    type: DELETE_CAMPAIGN_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function deleteCampaign(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteCampaignRequest());

    const url = generateUrl("deleteCampaign");
    const { bundles, price, campaigns } = getState().settings.data;

    try {
      await api.setMethod("DELETE").setParams({ id: opts }).query(url);

      const removedCampaignArr = campaigns.filter((item) => item.id !== opts);

      dispatch(
        receiveDeleteCampaignReceive({
          price,
          bundles,
          campaigns: removedCampaignArr,
        })
      );
    } catch (e) {
      dispatch(errorDeleteCampaign("Error: something went wrong:", e));
    }
  };
}
