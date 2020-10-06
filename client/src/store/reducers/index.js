import { combineReducers } from 'redux';

import signUp from './signUp';
import signIn from './signIn';
import posts from './posts';

export default combineReducers({
    signUp,
    signIn,
    posts
})