// import { generateUrl } from "../../../../helpers/functions";

export const DELETE_CAMPAIGN_REQUEST = "DELETE_CAMPAIGN_REQUEST";
export const DELETE_CAMPAIGN_SUCCESS = "DELETE_CAMPAIGN_SUCCESS";
export const DELETE_CAMPAIGN_FAILURE = "DELETE_CAMPAIGN_FAILURE";

function requestDeleteCampaignRequest() {
  return {
    type: DELETE_CAMPAIGN_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
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
    },
  };
}

function errorDeleteCampaign(message) {
  return {
    type: DELETE_CAMPAIGN_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteCampaign(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteCampaignRequest());

    //   TODO: connect api

    // const url = generateUrl("deleteCampaign");
    try {
      const { bundles, price, campaigns } = getState().settings.data;

      const removedCampaignArr = campaigns.filter((item) => item.id !== opts);

      //   await api
      //     .setMethod("DELETE")
      //     .setParams(opts)
      //     .query(url);

      dispatch(
        receiveDeleteCampaignReceive({
          price,
          bundles,
          campaigns: removedCampaignArr,
        })
      );
      return true;
    } catch (e) {
      dispatch(errorDeleteCampaign("Error: something went wrong:", e));
      return false;
    }
  };
}