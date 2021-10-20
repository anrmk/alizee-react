import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, {
  CONFIRM_DIALOG_TYPE,
  FOLLOW_DIALOG_TYPE,
} from "../../constants/dialogs";
import * as relationshipActions from "../../store/actions/relationship";
import { FOLLOW_ACCEPTED } from "../../constants/follow_types";

import useDialog from "../useDialog";

const FORM_ID = "create-subscription-dialog";

export default function useFollowDialog(isProfile) {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.user.isFetching,
  }));

  const dialog = useDialog();

  const handleGetSubscription = async (userName) => {
    await dispatch(relationshipActions.getSubscription(apiClient, userName));
  };

  const handleSubscribeBuy = async ({
    userName,
    followStatus,
    isPrivate,
    campaignId,
    bundleId,
    subscriptionPrice,
    price,
  }) => {
    const opts = {
      userName,
      followStatus,
      isPrivate,
      campaignId,
      bundleId,
      subscriptionPrice,
      price,
    };
    dialog.toggle({ open: false });
    if (!isFetching) {
      if (isProfile || !(followStatus === FOLLOW_ACCEPTED)) {
        await dispatch(relationshipActions.createSubscription(apiClient, opts));
      } else {
        await dispatch(relationshipActions.deleteSubscription(apiClient, opts));
      }
    }
  };

  const handleDialogToggle = useCallback(
    async (data) => {
      const { followStatus, subscriptionPrice } = data;
      if (isProfile || !(followStatus === FOLLOW_ACCEPTED)) {
        dialog.toggle(
          dialogs[FOLLOW_DIALOG_TYPE](
            {
              state: data,
              mainBtnProps: { type: "submit", form: FORM_ID },
            },
            {
              user: data,
              amount: subscriptionPrice,
              formId: FORM_ID,
              onSubmit: handleSubscribeBuy,
              onGetSubscription: handleGetSubscription,
            }
          )
        );
      } else {
        const confirmText =
          "Are you sure that you want to unsubscribe from this modal?";
        dialog.toggle(
          dialogs[CONFIRM_DIALOG_TYPE](
            {
              onMainClick: handleSubscribeBuy,
              state: data,
              title: "Unfollow",
            },
            {
              contentText: confirmText,
              data,
            }
          )
        );
      }
    },
    [isFetching]
  );

  return {
    toggle: handleDialogToggle,
  };
}
