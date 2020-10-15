import { combineReducers } from "redux";

import signUp from "./signUp";
import signIn from "./signIn";
import confirmEmail from './confirmEmail';
import posts from "./posts";
import media from './media';

import follower from "./follower";
import chat from "./chat";

export default combineReducers({
  signUp,
  signIn,
  confirmEmail,
  follower,
  chat,
  posts,
  media
});
