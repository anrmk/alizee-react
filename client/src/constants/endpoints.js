export default {
  url: '/api',
  urlFiles: '/files',
  endpoints: {
    // AUTH
    signIn: "account/authenticate",
    signUp: "account/createaspnetuser",
    googleAuth: "account/signingoogle",
    confirmEmail: 'account/confirmemail',
    resendEmailVerification: 'account/resendemailverification',

    // POSTS
    getPost: 'post/getpost',
    getPosts: 'post/getposts',

    // MEDIA
    getFollowingPosts: "post/getfollowingposts",
    createPost: 'post/createpost',
    createMedia: 'media/createmedia',

    // LIKES
    likePost: "post/like",
    
    // CHAT
    getRoom: "chat/getRoom",
    getRooms: "chat/getRooms",
    createRoom: "chat/createRoom",
    chat: "/hubs/chat",

    createMessage: "chat/createMessage",

    // RELATIONSHIP
    getFollowers: "relationship/getfollowers",
    getFollowings: "relationship/getfollowings",
    createFollow: "relationship/follow",
    deleteFollow: "relationship/follow",
    followPeopleSuggestions: "relationship/follow",
    unfollowPeopleSuggestions: "relationship/follow",

    // SUGGESTIONS
    getPeopleSuggestions: "suggestion/people",

    // USER
    getUser: "account/getaccountbyusername",

    // SETTINGS
    updateAccount: "accountsetting/updateaccount",
    updateUsername: "accountsetting/updateusername",
    updatePrivacy: "accountsetting/privacysettings",
    updateActivityStatus: "accountsetting/activitystatus",
    updatePrivateStatus: "accountsetting/privatestatus",
    updateOffensiveComments: "accountsetting/offensivecontentstatus",
    getPrivacy: "accountsetting/privacysettings",
    deleteAccount: "accountsetting/deleteaccount",
    getAccountPersonalized: "accountsetting/isaccountpersonalized",
    getAccountInterests: "accountsetting/interests",
    createInterests: "accountsetting/interests",

    // INTERESTS
    getInterests: "interest/getinterests"
  },
};
