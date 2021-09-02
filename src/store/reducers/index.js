import { combineReducers } from "redux";

import signUp from "./signUp";
import signIn from "./signIn";
import socialAuth from "./socialAuth";
import confirmEmail from "./confirmEmail";
import profilePosts from "./profilePosts";
import followingPosts from "./followingPosts";
import suggestedPosts from "./suggestedPosts";
import media from "./media";
import comment from "./comment";
import users from "./users";
import chat from "./chat";
import user from "./user";
import settings from "./settings";
import hashTags from "./hashTags";
import search from "./search";
import story from "./story";
import stream from "./stream";
import payment from "./payment";
import activity from "./activity";
import notification from "./notification";
import changeLog from "./changeLog";
import help from "./help";
import statistics from "./statistics";

import { SIGNOUT_SUCCESS } from "../actions/signIn";
import { IDLE } from "../../constants/request_status";

const appReducer = combineReducers({
  signUp,
  signIn,
  socialAuth,
  confirmEmail,
  users,
  chat,
  profilePosts,
  followingPosts,
  suggestedPosts,
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
  notification,
  changeLog,
  help,
  statistics,
});

export default function (state, action) {
  if (action.type === SIGNOUT_SUCCESS) {
    state = undefined;
  } else if (action.type === "persist/REHYDRATE") {
    action.payload.signIn.requestStatus = IDLE;
  }
  return appReducer(state, action);
}
