export default {
  url: "/api",
  urlFiles: "/files",
  endpoints: {
    // AUTH
    signIn: "account/authenticate",
    signUp: "account/createaspnetuser",
    googleAuth: "account/signingoogle",
    confirmEmail: "account/confirmemail",
    resendEmailVerification: "account/resendemailverification",
    getCurrentDeposit: "deposit/current",
    signintwitter: "account/signintwitter",
    onetimeauth: "account/onetimeauthenticate",

    // POSTS
    getPost: "post/getpost",
    getPosts: "post/getposts",
    getReceipt: "post/receipt",
    getPurchases: "post/purchases",
    getFollowingPosts: "post/getfollowingposts",
    createPost: "post/createpost",
    getFavoritePosts: "post/getfavouriteposts",
    likePost: "post/like",
    favoritePost: "post/favorite",
    reportPost: "post/report",
    deletePost: "post/deletepost",

    //PAYMENT
    buyPost: "payment/buyPost",
    sendTip: "payment/sendTip",

    // POST COMMENTS
    getCommentsPost: "comment/comments",
    createCommentPost: "comment/comment",
    deleteCommentPost: "comment/comment",

    // STORIES
    createStorySlide: "story/slide",
    getStory: "story/story",
    getStorySlide: "story/slide",
    getFollowingStories: "story/followingstories",

    createMood: "mood/createmood",

    // MEDIA
    createMedia: "media/createmedia",
    createChatMedia: "media/createChatMedia",
    
    // CHAT
    getRoom: "chat/getRoom",
    getRooms: "chat/getRooms",
    createRoom: "chat/createRoom",
    shareMessage: "chat/shareMessage",
    deleteRoom: "chat/deleteRoom",
    deleteRoomHistory: "chat/deleteRoomHistory",
    chat: "/hubs/chat",

    createMessage: "chat/createMessage",

    // RELATIONSHIP
    getFollowers: "relationship/getfollowers",
    getFollowings: "relationship/getfollowings",
    createFollow: "relationship/follow",
    deleteFollow: "relationship/follow",
    acceptFollow: "relationship/accept",
    rejectFollow: "relationship/reject",
    createBlock: "relationship/block",
    deleteBlock: "relationship/unblock",

    // SUGGESTIONS
    getPeopleSuggestions: "suggestion/people",
    getPostsSuggestions: "suggestion/posts",

    // USER
    getUser: "account/getaccountbyusername",
    getPasswordConfirm: "account/passwordresetconfirm",
    updatePassword: "account/resetpassword",
    getSettingsPasswordConfirm: "account/passwordchangeconfirm",
    getUserStatistics: "account/statistics",

    // ACCOUNT FAVORITES
    getAccountFavorites: "account/favorites",
    createAccountFavorites: "account/favorites",
    deleteAccountFavorites: "account/favorites",

    // SETTINGS
    updateAccount: "accountsetting/updateaccount",
    updateUsername: "accountsetting/updateusername",
    updatePrivacy: "accountsetting/privacysettings",
    updateActivityStatus: "accountsetting/activitystatus",
    updatePrivateStatus: "accountsetting/privatestatus",
    updateOffensiveComments: "accountsetting/offensivecontentstatus",
    updateAvatar: "accountsetting/updateavatar",
    getPrivacy: "accountsetting/privacysettings",
    getNotification: "accountsetting/notification",
    updateNotification: "accountsetting/notification",
    deleteAccount: "accountsetting/deleteaccount",
    getAccountPersonalized: "accountsetting/isaccountpersonalized",
    getAccountInterests: "accountsetting/interests",
    createAccountInterests: "accountsetting/interests",
    //TODO: Remove-----
    getBlackList: "accountsetting/blacklist",
    deleteBlackList: "accountsetting/blacklist",
    createBlackList: "accountsetting/blacklist",
    //------

    updateCover: "accountsetting/updatecover",
    getPersonal: "accountsetting/personal",
    updatePersonal: "accountsetting/personal",
    getCard: "accountsetting/card",
    updateCard: "accountsetting/card",
    getBank: "accountsetting/bankAccount",
    updateBank: "accountsetting/bankAccount",
    getSubscription: "accountsetting/subscriptionsettings",
    updateSubscription: "accountsetting/subscriptionsettings",

    // HASH TAGS
    getHashTags: "hashtag/gethashtags",

    //STREAM
    createStreamRoom: "stream/room",
    updateStreamRoom: "stream/room",
    getHotStreamers: "stream/hotstreamers",

    // ACTIVITY
    getActivityPayments: "activity/payments",

    //SEARCH
    getSearchData: "search/search",

    //NOTIFICATION
    notification: "/hubs/notification",
    notifyCall: "notification/call"
  },
};
