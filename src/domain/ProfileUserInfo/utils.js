import {} from "react-i18next";

import {
  FOLLOW_ACCEPTED,
  FOLLOW_PENDING,
  FOLLOW_REJECTED,
} from "../../constants/follow_types";

export function getSubscriptionBtnText(status, price, t) {
  if (!status && !price)
    return t("ProfileUserInfoSubscribeBtnTextSubscribeForFree");
  if (!status && price) {
    return `${t("ProfileUserInfoSubscribeBtnTextSubscribeForPrice")} $${price}`;
  }
  if (status === FOLLOW_ACCEPTED)
    return t("ProfileUserInfoSubscribeBtnTextUnsubscribe");
  if (status === FOLLOW_PENDING || status === FOLLOW_REJECTED)
    return t("ProfileUserInfoSubscribeBtnTextAwaitConfirm");
  return t("ProfileUserInfoSubscribeBtnTextSubscribe");
}

export function isAwaitingConfirmation(status) {
  return status !== FOLLOW_ACCEPTED;
}
