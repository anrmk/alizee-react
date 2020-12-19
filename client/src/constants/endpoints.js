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

    // POST COMMENTS
    getCommentsPost: "comment/comments",
    createCommentPost: "comment/comment",
    deleteCommentPost: "comment/comment",

    // MEDIA
    getFollowingPosts: "post/getfollowingposts",
    createPost: 'post/createpost',
    createMedia: 'media/createmedia',

    // LIKES
    likePost: "post/like",
    favoritePost: "post/favorite",
    buyPost: "post/buy",
    
    // CHAT
    getRoom: "chat/getRoom",
    getRooms: "chat/getRooms",
    createRoom: "chat/createRoom",
    deleteRoom: "chat/deleteRoom",
    deleteRoomHistory: "chat/deleteRoomHistory",
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
    getPasswordConfirm: "account/passwordresetconfirm",
    updatePassword: "account/resetpassword",
    getSettingsPasswordConfirm: "account/passwordchangeconfirm",

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
    getBlackList: "accountsetting/blacklist",
    deleteBlackList: "accountsetting/blacklist",
    createBlackList: "accountsetting/blacklist",

    // INTERESTS
    getInterests: "interest/getinterests"
  },
};
