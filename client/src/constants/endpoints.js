export default {
  url: '/api',
  urlFiles: '/files',
  endpoints: {
    signIn: "account/authenticate",
    signUp: "account/createaspnetuser",
    confirmEmail: 'account/confirmemail',
    resendEmailVerification: 'account/resendemailverification',

    getPost: 'post/getpost',
    getPosts: 'post/getposts',
    createPost: 'post/createpost',
    createMedia: 'media/createmedia',
    likePost: "post/like",
    
    // CHAT
    getRoom: "chat/getRoom",
    getRooms: "chat/getRooms",
    createRoom: "chat/createRoom",

    createMessage: "chat/createMessage",

    // FOLLOWER/FOLLOWINGS
    getFollowers: "relationship/getfollowers",
    getFollowings: "relationship/getfollowings",
    followPeopleSuggestions: "relationship/follow",
    unfollowPeopleSuggestions: "relationship/follow",

    // SUGGESTIONS
    getPeopleSuggestions: "suggestion/people",
    
  },
};
