import { generateUrl } from "../../../helpers/functions";

export const CREATE_CAMPAIGN_REQUEST = "CREATE_CAMPAIGN_REQUEST";
export const CREATE_CAMPAIGN_SUCCESS = "CREATE_CAMPAIGN_SUCCESS";
export const CREATE_CAMPAIGN_FAILURE = "CREATE_CAMPAIGN_FAILURE";

function requestCreateCampaignRequest() {
  return {
    type: CREATE_CAMPAIGN_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateCampaignReceive(data) {
  return {
    type: CREATE_CAMPAIGN_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorCreateCampaign(message) {
  return {
    type: CREATE_CAMPAIGN_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createCampaign(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCreateCampaignRequest());

    const url = generateUrl("createCampaign");
    const { bundles = [], price, campaigns = [] } = getState().settings.data;

    try {
      const { data } = await api.setMethod("POST").setData(opts).query(url);

      const changedCampaigns = [...campaigns, data];

      dispatch(
        receiveCreateCampaignReceive({
          price,
          bundles,
          campaigns: changedCampaigns,
        })
      );
      return true;
    } catch (e) {
      dispatch(errorCreateCampaign("Error: something went wrong:", e));
      return false;
    }
  };
}
