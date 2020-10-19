import { combineReducers } from "redux";

import signUp from "./signUp";
import signIn from "./signIn";
import confirmEmail from './confirmEmail';
import posts from "./posts";
import media from './media';

import relationship from "./relationship";
import suggestion from "./suggestion";

import chat from "./chat";

import { SIGNOUT_SUCCESS } from "../actions/signIn";

const appReducer = combineReducers({
  signUp,
  signIn,
  confirmEmail,
  relationship,
  suggestion,
  chat,
  posts,
  media
});

export default function(state, action) {
  if (action.type === SIGNOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
}