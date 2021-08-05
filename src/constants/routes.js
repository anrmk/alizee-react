export const DEFAULT_ROUTE = "/";
export const HOME_ROUTE = "/";
export const NOTIFICATION_ROUTE = "/notifications";
export const NOTIFICATION_ID_DEFAULT_ROUTE = "/notifications/:type";
export const NOTIFICATION_ID_ROUTE = (type) => `/notifications/${type}`;
export const NOTIFICATION_ROUTE_ALL = "/notifications/all";

export const ABOUT_ROUTE = "/about";
export const CONTACT_ROUTE = "/contact";
export const CONTRACT_ROUTE = "/standard-contract-between-fan-and-creator";
export const COOKIE_POLICY_ROUTE = "/cookie-policy";
export const REFERRAL_PROGRAM_ROUTE = "/referral-program";
export const HOW_IT_WORKS_ROUTE = "/how";
export const HELP_ROUTE = "/help";
export const HELP_DETAIL_ROUTE = "/help/:currentQuestion";
export const HELP_TICKETS_ROUTE = "/help/my/tickets";
export const CHANGE_LOG_ROUTE = "/changelog";
export const PRIVACY_ROUTE = "/privacy";
export const EXPLORE_ROUTE = "/explore";
export const EXPLORE_BY_TAG_ROUTE = (tag) => `/explore?tag=${tag}`;
export const ACTIVITY_ROUTE = "/activity";
export const POST_ID_ROUTE = (id) => `/posts/${id}`;
export const POST_ROUTE = "/posts/:id";
export const MEET_ROUTE = "/meet";
export const CHAT_ROUTE = "/chat/";
export const CHAT_USERNAME_ROUTE = (username) => `/chat/${username}`;
export const CHAT_DEFAULT_ROUTE = "/chat/:username?";

export const ROOM_ROUTE = "/room";
export const ROOM_DEFAULT_ROUTE = "/room/:roomId";
export const ROOM_ID_ROUTE = (roomId) => `/room/${roomId}`;
export const PEAR_TO_PEAR_ROUTE = "/ptp";
export const PEAR_TO_PEAR_DEFAULT_ROUTE = "/ptp/:userName?";
export const PEAR_TO_PEAR_ID_ROUTE = (username) => `/ptp/${username}`;

export const SIGN_IN_ROUTE = "/signIn";
export const SIGN_UP_ROUTE = "/signUp";
export const PRIVACY_POLICY_ROUTE = "/terms-of-service";
export const ACCEPTABLE_USE_POLICY_HASH = "#acceptable-use-policy";
export const COMPLAINTS_POLICY_HASH = "#complaints-policy";
export const EMAIL_CONFIRMATION_ROUTE = "/email-confirmation";
export const EMAIL_VERIFY_ROUTE = "/email-verify";
export const FOLLOWERS_ROUTE = (username) => `/${username}/followers`;
export const FOLLOWINGS_ROUTE = (username) => `/${username}/followings`;
export const SEARCH_ROUTE = "/search";

export const FAVORITES_USERNAME_ROUTE = (username) => `/${username}/favorites`;
export const FAVORITES_ROUTE = "/:username/favorites";

export const PROFILE_USERNAME_ROUTE = (username) => `/${username}`;
export const PROFILE_ROUTE = "/:username";
export const PROFILE_FOLLOWERS_ROUTE = "/:username/followers";
export const PROFILE_FOLLOWINGS_ROUTE = "/:username/followings";
export const PROFILE_LINK_ROUTE = (username) =>
  `https://themembers.com/${username}`;

export const BLOCKED_USERNAME_ROUTE = (username) => `/${username}/blocked`;
export const BLOCKED_ROUTE = "/:username/blocked";

export const SUGESTED_PEOPLE = "/people/suggested";
export const SETTINGS_DEFAULT_ROUTE = "/settings/:type?";
export const SETTINGS_ROUTE = "/settings";
export const SETTINGS_EDIT_PROFILE_ROUTE = "/settings/edit-profile";
export const SETTINGS_ACCOUNT_ROUTE = "/settings/account";
export const SETTINGS_CARD_ROUTE = "/settings/card";
export const SETTINGS_BANK_ROUTE = "/settings/bank";

export const SETTINGS_NOTIFICATIONS_ROUTE = "/settings/notifications";
export const SETTINGS_NOTIFICATIONS_PUSH_ROUTE = "/settings/notifications/push";
export const SETTINGS_NOTIFICATIONS_EMAIL_ROUTE =
  "/settings/notifications/email";
export const SETTINGS_NOTIFICATIONS_SITE_ROUTE = "/settings/notifications/site";
export const SETTINGS_NOTIFICATIONS_TOAST_ROUTE =
  "/settings/notifications/toast";

export const SETTINGS_PRIVACY_SECURITY_ROUTE = "/settings/privacy-security";
export const SETTINGS_SUBSCRIPTION_ROUTE = "/settings/subscription";
export const RESET_PASSWORD_ROUTE = "/reset-password";
export const PASSWORD_CHANGE_ROUTE = "/password-change";
export const STORIES_ROUTE = (id, username) =>
  username ? `/stories/${username}/${id}` : `/stories/${id}`;
export const STORIES_ID_ROUTE = "/stories/:username/:slideId?";
export const STORIES_DEFAULT_ROUTE = "/stories";

export const STATISTICS_ROUTE = "/statistics";

export const NOT_FOUND_ROUTE = "/not-found";

export const ONDATO_ROUTE =
  "https://sandbox-start.ondato.com/clients/themembers";
