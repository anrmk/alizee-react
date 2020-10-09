export default {
  url: "/api",
  endpoints: {
    signIn: "account/authenticate",
    signUp: "account/createaspnetuser",
    confirmEmail: 'account/confirmemail',
    resendEmailVerification: 'account/resendemailverification',
    getPosts: "post/getposts",
    getFollowers: "follower/getfollowers",
    // CHAT
    getRoom: "chat/getRoom",
    getRooms: "chat/getRooms",
    createRoom: "chat/createRoom",

    createMessage: "chat/createMessage"
  },
};
