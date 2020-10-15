export default {
  url: '/api',
  urlFiles: '/files',
  endpoints: {
    signIn: "account/authenticate",
    signUp: "account/createaspnetuser",
    confirmEmail: 'account/confirmemail',
    resendEmailVerification: 'account/resendemailverification',
    getPosts: "post/getposts",
    getPost: 'post/getpost',
    createPost: 'post/createpost',
    createMedia: 'media/createmedia',
    getFollowers: "follower/getfollowers",
    // CHAT
    getRoom: "chat/getRoom",
    getRooms: "chat/getRooms",
    createRoom: "chat/createRoom",

    createMessage: "chat/createMessage"
  },
};
