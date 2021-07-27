import {
  EMAIL_CONFIRM_REQUEST,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILURE
} from '../actions/confirmEmail';

export default function confirmEmail(state = {
  isFetching: false,
  data: {},
  isConfirmed: false
}, action) {
  switch (action.type) {
    case EMAIL_CONFIRM_REQUEST:
      return {
        ...state,
        ...action.payload
      }
    case EMAIL_CONFIRM_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case EMAIL_CONFIRM_FAILURE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}