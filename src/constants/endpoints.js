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
    createMood: "account/createmood",

    // POSTS
    getPost: "post/getpost",
    getPosts: "post/getposts",
    getReceipt: "post/receipt",
    getPurchases: "post/purchases",
    getFollowingPosts: "post/getfollowingposts",
    createPost: "post/createpost",
    getFavoritePosts: "post/getfavouriteposts",
    getSuggestionPosts: "post/getsuggestedposts",
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

    // MEDIA
    createMedia: "media/createmedia",

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
    getBlocked: "relationship/getblocked",
    createFollow: "relationship/follow",
    deleteFollow: "relationship/follow",
    acceptFollow: "relationship/accept",
    rejectFollow: "relationship/reject",
    createBlock: "relationship/block",
    deleteBlock: "relationship/unblock",
    getFollowingsSearch: "relationship/followingssearch",

    // SUGGESTIONS
    getPeopleSuggestions: "suggestion/people",

    // USER
    getUser: "account/getaccountbyusername",
    getMe: "account/getme",
    getPasswordConfirm: "account/passwordresetconfirm",
    updatePassword: "account/resetpassword",
    getSettingsPasswordConfirm: "account/passwordchangeconfirm",
    getUserStatistics: "account/statistics",
    verifyMe: "account/verify",

    // ACCOUNT FAVORITES
    getAccountFavorites: "account/favorites",
    createAccountFavorites: "account/favorites",
    deleteAccountFavorites: "account/favorites",

    // SETTINGS
    getAccount: "accountsetting/account",
    updateAccount: "accountsetting/updateaccount",
    updateProfile: "accountsetting/updateProfile",

    updatePrivacy: "accountsetting/privacysettings",
    updateActivityStatus: "accountsetting/activitystatus",
    updatePrivateStatus: "accountsetting/privatestatus",
    updateOffensiveComments: "accountsetting/offensivecontentstatus",
    updateAvatar: "accountsetting/updateavatar",
    updateCover: "accountsetting/updatecover",
    getPrivacy: "accountsetting/privacysettings",

    getPushNotification: "accountsetting/pushNotification",
    getSiteNotification: "accountsetting/siteNotification",
    getEmailNotification: "accountsetting/emailNotification",
    getToastNotification: "accountsetting/toastNotification",

    updatePushNotification: "accountsetting/pushNotification",
    updateSiteNotification: "accountsetting/siteNotification",
    updateEmailNotification: "accountsetting/emailNotification",
    updateToastNotification: "accountsetting/toastNotification",

    deleteAccount: "accountsetting/deleteaccount",
    getAccountPersonalized: "accountsetting/isaccountpersonalized",
    getAccountInterests: "accountsetting/interests",
    createAccountInterests: "accountsetting/interests",

    getPersonal: "accountsetting/personal",
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
    notifyCall: "notification/call",
    getNotification: "activity/notifications",

    //CHANGE LOG
    getChangeLog: "changelog/getLogs",

    //HELP
    getHelp: "help/getgroups",
    changeHelpRating: "help/vote",
    getHelpDetails: "help/getarticle",

    //STATISTICS
    getStatistics: "statistics/getStatistics",
  },
};
