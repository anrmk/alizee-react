// import { generateUrl } from "../../../../helpers/functions";
import { addDays } from "../../../helpers/functions";

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

    //   TODO: connect api

    // const url = generateUrl("createCampaign");
    try {
      const { bundles, price, campaigns } = getState().settings.data;
      // TODO: delete create generate date, claims, id if api return these data.
      const createdAt = new Date();
      const finishedAt = addDays(createdAt, opts.finishDays);

      const campaignObj = {
        ...opts,
        claimsCount: 0,
        createdAt,
        finishedAt,
        id: new Date(),
      };
      let changedCampaigns = [...campaigns];

      if (!opts.newSubscribers && !opts.expiredSubscribers) {
        throw Error("can not created without type of subscribers");
      }

      if (opts.newSubscribers && opts.expiredSubscribers) {
        changedCampaigns = [campaignObj];
      } else {
        const index = changedCampaigns.findIndex(
          (item) =>
            (item.newSubscribers === true && opts.newSubscribers === true) ||
            (item.expiredSubscribers === true &&
              opts.expiredSubscribers === true)
        );
        if (index !== -1) {
          changedCampaigns[index] = campaignObj;
        } else {
          changedCampaigns = [...changedCampaigns, campaignObj];
        }
      }

      //   await api
      //     .setMethod("POST")
      //     .setParams(opts)
      //     .query(url);

      dispatch(
        receiveCreateCampaignReceive({
          price,
          bundles,
          campaigns: [...changedCampaigns],
        })
      );
      return true;
    } catch (e) {
      dispatch(errorCreateCampaign("Error: something went wrong:", e));
      return false;
    }
  };
}
