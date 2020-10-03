import { combineReducers } from 'redux';

import signUp from './signUp';
import signIn from './signIn';

import follower from './follower';
import chat from './chat';

export default combineReducers({
    signUp,
    signIn,
    follower,
    chat
})