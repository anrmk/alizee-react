export const DEFAULT_ROUTE = "/";
export const HOME_ROUTE = "/feed";
export const ABOUT_ROUTE = "";
export const HELP_ROUTE = "help";
export const PRIVACY_ROUTE = "";
export const EXPLORE_ROUTE = "/explore";
export const ACTIVITY_ROUTE = "/activity";
export const POST_ID_ROUTE = (id) => `/posts/${id}`;
export const POST_ROUTE = "/posts/:id";
export const MEET_ROUTE = "/meet";
//export const CHAT_ROUTE = "/chat";
export const CHAT_ROUTE = username => `/chat/${username}`;
export const CHAT_USERNAME_ROUTE = '/chat/:username?';

export const ROOM_ROUTE = "/room";
export const ROOM_ID_DEFAULT_ROUTE = "/room/:roomId";
export const ROOM_ID_ROUTE = roomId => `/room/${roomId}`;
export const SIGN_IN_ROUTE = "/signIn";
export const SIGN_UP_ROUTE = "/signUp";
export const PRIVACY_POLICY_ROUTE = "/terms";
export const EMAIL_CONFIRMATION = "/email-confirmation";
export const EMAIL_VERIFY = "/email-verify";
export const FOLLOWERS_ROUTE = username => `/${username}/followers`;
export const FOLLOWINGS_ROUTE = username => `/${username}/followings`;
export const SEARCH_ROUTE = "/search";

export const FAVORITES_USERNAME_ROUTE = username => `/${username}/favorites`;
export const FAVORITES_ROUTE = "/:username/favorites";

export const PROFILE_USERNAME_ROUTE = username => `/${username}`;
export const PROFILE_ROUTE = "/:username";
export const PROFILE_FOLLOWERS_ROUTE = "/:username/followers";
export const PROFILE_FOLLOWINGS_ROUTE = "/:username/followings";

export const SUGESTED_PEOPLE = "/people/suggested";
export const SETTINGS_TYPE_ROUTE = "/settings/:type";
export const SETTINGS_ROUTE = "/settings";
export const SETTINGS_EDIT_PROFILE_ROUTE = "/settings/edit-profile";
export const SETTINGS_INTERESTS_ROUTE = "/settings/interests";
export const SETTINGS_NOTIFICATION_ROUTE = "/settings/notification";
export const SETTINGS_PRIVACY_SECURITY_ROUTE = "/settings/privacy-security";
export const SETTINGS_BLACK_LIST_ROUTE = "/settings/privacy-security/black-list";
export const RESET_PASSWORD_ROUTE = "/reset-password";
export const PASSWORD_CHANGE_ROUTE = "/password-change";
export const STORIES_ROUTE = (id, username) => username ? `/stories/${username}/${id}` : `/stories/${id}`;
export const STORIES_ID_ROUTE = "/stories/:username/:storyId?";
export const STORIES_DEFAULT_ROUTE = "/stories";
