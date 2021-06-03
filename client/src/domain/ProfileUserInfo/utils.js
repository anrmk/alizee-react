import {  } from "react-i18next";

import { FOLLOW_ACCEPTED, FOLLOW_PENDING, FOLLOW_REJECTED } from "../../constants/follow_types";

export function getSubscriptionBtnText(status, price, t) {
  if (status === null && !price)
    return t("ProfileUserInfoSubscribeBtnTextFollowForFree");
  else if (status === null && price)
    return `${t("ProfileUserInfoSubscribeBtnTextFollowForPrice")} $${price}`;
  else if (status === FOLLOW_ACCEPTED)
    return t("ProfileUserInfoSubscribeBtnTextUnfollow");
  else if (status === FOLLOW_PENDING || status === FOLLOW_REJECTED)
    return t("ProfileUserInfoSubscribeBtnTextAwaitConfirm");
  else
    return t("ProfileUserInfoSubscribeBtnTextFollow");
}

export function isAwaitingConfirmation(status) {
  return status !== FOLLOW_ACCEPTED;
}
