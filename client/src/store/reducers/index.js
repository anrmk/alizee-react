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
import chatMedia from "./chatMedia";
import user from "./user";
import settings from "./settings";
import hashTags from "./hashTags";
import search from "./search";
import story from "./story";
import stream from "./stream";
import payment from "./payment";
import activity from "./activity";
import notification from "./notification";

import { SIGNOUT_SUCCESS } from "../actions/signIn";

const appReducer = combineReducers({
  signUp,
  signIn,
  socialAuth,
  confirmEmail,
  users,
  chat,
  chatMedia,
  posts,
  media,
  user,
  settings,
  hashTags,
  comment,
  search,
  story,
  stream,
  payment,
  activity,
  notification
});

export default function(state, action) {
  if (action.type === SIGNOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
}