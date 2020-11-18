import { combineReducers } from "redux";

import signUp from "./signUp";
import signIn from "./signIn";
import socialAuth from "./socialAuth";
import confirmEmail from './confirmEmail';
import posts from "./posts";
import media from './media';

import relationship from "./relationship";
import suggestion from "./suggestion";

import chat from "./chat";
import user from "./user";

import settings from "./settings";

import interests from "./interests";

import { SIGNOUT_SUCCESS } from "../actions/signIn";

const appReducer = combineReducers({
  signUp,
  signIn,
  socialAuth,
  confirmEmail,
  relationship,
  suggestion,
  chat,
  posts,
  media,
  user,
  settings,
  interests
});

export default function(state, action) {
  if (action.type === SIGNOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
}