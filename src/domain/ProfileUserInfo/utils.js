import {} from "react-i18next";

import {
  FOLLOW_ACCEPTED,
  FOLLOW_PENDING,
  FOLLOW_REJECTED,
} from "../../constants/follow_types";

export function getSubscriptionBtnText(status, price, t) {
  if (status === null && !price)
    return t("ProfileUserInfoSubscribeBtnTextFollowForFree");
  if (status === null && price)
    return `${t("ProfileUserInfoSubscribeBtnTextFollowForPrice")} $${price}`;
  if (status === FOLLOW_ACCEPTED)
    return t("ProfileUserInfoSubscribeBtnTextUnfollow");
  if (status === FOLLOW_PENDING || status === FOLLOW_REJECTED)
    return t("ProfileUserInfoSubscribeBtnTextAwaitConfirm");
  return t("ProfileUserInfoSubscribeBtnTextFollow");
}

export function isAwaitingConfirmation(status) {
  return status !== FOLLOW_ACCEPTED;
}
