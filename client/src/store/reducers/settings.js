import {
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

  GET_ACCOUNT_INTERESTS_REQUEST,
  GET_ACCOUNT_INTERESTS_SUCCESS,
  GET_ACCOUNT_INTERESTS_FAILURE,

  CREATE_ACCOUNT_INTERESTS_REQUEST,
  CREATE_ACCOUNT_INTERESTS_SUCCESS,
  CREATE_ACCOUNT_INTERESTS_FAILURE,

  GET_PERSONAL_REQUEST,
  GET_PERSONAL_SUCCESS,
  GET_PERSONAL_FAILURE,

  UPDATE_PERSONAL_REQUEST,
  UPDATE_PERSONAL_SUCCESS,
  UPDATE_PERSONAL_FAILURE,

  GET_BLACK_LIST_REQUEST,
  GET_BLACK_LIST_SUCCESS,
  GET_BLACK_LIST_FAILURE,

  DELETE_BLACK_LIST_REQUEST,
  DELETE_BLACK_LIST_SUCCESS,
  DELETE_BLACK_LIST_FAILURE,

  UPDATE_COVER_REQUEST,
  UPDATE_COVER_SUCCESS,
  UPDATE_COVER_FAILURE,

  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAILURE,

  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAILURE,

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
} from '../actions/settings';

export default function settings(state = {
  isFetching: false,
  isAccountPersonalized: null,
  data: {},
  interests: [],
  blackList: []
}, action) {
  switch (action.type) {
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
    case GET_ACCOUNT_INTERESTS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ACCOUNT_INTERESTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ACCOUNT_INTERESTS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    // Create Account Interests
    case CREATE_ACCOUNT_INTERESTS_REQUEST:
      return {
        ...state,
        ...action.payload
      }
    case CREATE_ACCOUNT_INTERESTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case CREATE_ACCOUNT_INTERESTS_FAILURE:
      return {
        ...state,
        ...action.payload
      }

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

    case UPDATE_PERSONAL_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_PERSONAL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_PERSONAL_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // Get black list
    case GET_BLACK_LIST_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_BLACK_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_BLACK_LIST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Delete black list user
    case DELETE_BLACK_LIST_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_BLACK_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_BLACK_LIST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_COVER_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_COVER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_COVER_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    //NOTIFICATION SETTINGS
    case GET_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_NOTIFICATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_NOTIFICATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_NOTIFICATION_FAILURE: {
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
        ...action.payload
      };
    }
    case GET_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case GET_SUBSCRIPTION_FAILURE: {
      return {
        ...state,
        ...action.payload
      };
    }

    case UPDATE_SUBSCRIPTION_REQUEST: {
      return {
        ...state,
        ...action.payload
      };
    }
    case UPDATE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case UPDATE_SUBSCRIPTION_FAILURE: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}
