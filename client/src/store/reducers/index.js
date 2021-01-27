import { combineReducers } from "redux";

import signUp from "./signUp";
import signIn from "./signIn";
import socialAuth from "./socialAuth";
import confirmEmail from './confirmEmail';
import posts from "./posts";
import media from './media';
import comment from "./comment";

import users from "./users";

import chat from "./chat";
import user from "./user";

import settings from "./settings";

import interests from "./interests";

import story from "./story";

import stream from "./stream";

import { SIGNOUT_SUCCESS } from "../actions/signIn";

const appReducer = combineReducers({
  signUp,
  signIn,
  socialAuth,
  confirmEmail,
  users,
  chat,
  posts,
  media,
  user,
  settings,
  interests,
  comment,
  story,
  stream
});

export default function(state, action) {
  if (action.type === SIGNOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
}