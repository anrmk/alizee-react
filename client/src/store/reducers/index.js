import { combineReducers } from "redux";

import signUp from "./signUp";
import signIn from "./signIn";
import confirmEmail from './confirmEmail';
import posts from "./posts";
import media from './media';

import relationship from "./relationship";
import suggestion from "./suggestion";

import chat from "./chat";

export default combineReducers({
  signUp,
  signIn,
  confirmEmail,
  relationship,
  suggestion,
  chat,
  posts,
  media
});
