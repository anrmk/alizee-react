import {
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILURE,
  UPDATE_PRIVACY_REQUEST,
  UPDATE_PRIVACY_SUCCESS,
  UPDATE_PRIVACY_FAILURE,
  UPDATE_ACTIVITY_STATUS_REQUEST,
  UPDATE_ACTIVITY_STATUS_SUCCESS,
  UPDATE_ACTIVITY_STATUS_FAILURE,
  UPDATE_PRIVATE_STATUS_REQUEST,
  UPDATE_PRIVATE_STATUS_SUCCESS,
  UPDATE_PRIVATE_STATUS_FAILURE,
  UPDATE_OFFENSIVE_COMMENTS_REQUEST,
  UPDATE_OFFENSIVE_COMMENTS_SUCCESS,
  UPDATE_OFFENSIVE_COMMENTS_FAILURE,
  GET_PRIVACY_REQUEST,
  GET_PRIVACY_SUCCESS,
  GET_PRIVACY_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  GET_ACCOUNT_PERSONALIZED_REQUEST,
  GET_ACCOUNT_PERSONALIZED_SUCCESS,
  GET_ACCOUNT_PERSONALIZED_FAILURE,
  GET_PERSONAL_REQUEST,
  GET_PERSONAL_SUCCESS,
  GET_PERSONAL_FAILURE,
  GET_SITE_NOTIFICATION_REQUEST,
  GET_SITE_NOTIFICATION_SUCCESS,
  GET_SITE_NOTIFICATION_FAILURE,
  UPDATE_SITE_NOTIFICATION_REQUEST,
  UPDATE_SITE_NOTIFICATION_SUCCESS,
  UPDATE_SITE_NOTIFICATION_FAILURE,
  GET_PUSH_NOTIFICATION_REQUEST,
  GET_PUSH_NOTIFICATION_SUCCESS,
  GET_PUSH_NOTIFICATION_FAILURE,
  UPDATE_PUSH_NOTIFICATION_REQUEST,
  UPDATE_PUSH_NOTIFICATION_SUCCESS,
  UPDATE_PUSH_NOTIFICATION_FAILURE,
  GET_EMAIL_NOTIFICATION_REQUEST,
  GET_EMAIL_NOTIFICATION_SUCCESS,
  GET_EMAIL_NOTIFICATION_FAILURE,
  UPDATE_EMAIL_NOTIFICATION_REQUEST,
  UPDATE_EMAIL_NOTIFICATION_SUCCESS,
  UPDATE_EMAIL_NOTIFICATION_FAILURE,
  GET_TOAST_NOTIFICATION_REQUEST,
  GET_TOAST_NOTIFICATION_SUCCESS,
  GET_TOAST_NOTIFICATION_FAILURE,
  UPDATE_TOAST_NOTIFICATION_REQUEST,
  UPDATE_TOAST_NOTIFICATION_SUCCESS,
  UPDATE_TOAST_NOTIFICATION_FAILURE,
  GET_CARD_REQUEST,
  GET_CARD_SUCCESS,
  GET_CARD_FAILURE,
  UPDATE_CARD_REQUEST,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILURE,
  GET_BANK_REQUEST,
  GET_BANK_SUCCESS,
  GET_BANK_FAILURE,
  UPDATE_BANK_REQUEST,
  UPDATE_BANK_SUCCESS,
  UPDATE_BANK_FAILURE,
  GET_SUBSCRIPTION_REQUEST,
  GET_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  RESET_SETTINGS_REQUEST,
} from "../actions/settings";

export default function settings(
  state = {
    isFetching: false,
    isAccountPersonalized: null,
    data: {},
    interests: [],
  },
  action
) {
  switch (action.type) {
    // Update Account
    case GET_ACCOUNT_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_ACCOUNT_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_ACCOUNT_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // Update privacy
    case UPDATE_PRIVACY_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_PRIVACY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_PRIVACY_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Update activity status
    case UPDATE_ACTIVITY_STATUS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_ACTIVITY_STATUS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_ACTIVITY_STATUS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Update private status
    case UPDATE_PRIVATE_STATUS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_PRIVATE_STATUS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_PRIVATE_STATUS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Update private status
    case UPDATE_OFFENSIVE_COMMENTS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_OFFENSIVE_COMMENTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_OFFENSIVE_COMMENTS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Get privacy
    case GET_PRIVACY_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_PRIVACY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_PRIVACY_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Delete account
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Get account personalized
    case GET_ACCOUNT_PERSONALIZED_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ACCOUNT_PERSONALIZED_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ACCOUNT_PERSONALIZED_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Get account settings

    //GET PERSONAL
    case GET_PERSONAL_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_PERSONAL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_PERSONAL_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //NOTIFICATION SETTINGS
    case GET_SITE_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_SITE_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_SITE_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_SITE_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_SITE_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_SITE_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_PUSH_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_PUSH_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_PUSH_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_PUSH_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_PUSH_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_PUSH_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_EMAIL_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_EMAIL_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_EMAIL_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_EMAIL_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_EMAIL_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_EMAIL_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_TOAST_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_TOAST_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_TOAST_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_TOAST_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_TOAST_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_TOAST_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //CARD SETTINGS
    case GET_CARD_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CARD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CARD_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_CARD_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_CARD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_CARD_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //BANK SETTINGS
    case GET_BANK_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_BANK_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_BANK_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_BANK_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_BANK_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_BANK_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_SUBSCRIPTION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_SUBSCRIPTION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_SUBSCRIPTION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_SUBSCRIPTION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //RESET SETTINGS
    case RESET_SETTINGS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
