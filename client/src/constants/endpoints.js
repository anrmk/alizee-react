export default {
  url: "/api",
  endpoints: {
    signIn: "account/authenticate",
    signUp: "account/createaspnetuser",
    getPosts: "post/getposts",
    getFollowers: "follower/getfollowers",
    // CHAT
    getRoom: "chat/room/id",
    getRooms: "chat/getrooms",
    createRoom: "chat/createRoom",
  },
};
