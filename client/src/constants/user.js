export const USER_TOKEN = 'user_token';

export const USER_MEMBERSHIP = (membership) => {
  switch (membership) {
    case "0":
      return "GREY";
    case "1":
      return "BLUE";

    case "2":
      return "GOLD";

    case "3":
      return "BLACK";

    default:
      return "GREY";
  }
}