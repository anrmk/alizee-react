import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, {
  CONFIRM_DIALOG_TYPE,
  FOLLOW_DIALOG_TYPE,
} from "../../constants/dialogs";
import * as relationshipActions from "../../store/actions/relationship";
import useDialog from "../useDialog";

export default function useFollowDialog() {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.user.isFetching,
  }));
  const dialog = useDialog();

  const handleSubscribeBuy = async ({
    userName,
    isFollow,
    isPrivate,
    campaignId,
    bundleId,
  }) => {
    const opts = { userName, isFollow, isPrivate, campaignId, bundleId };
    dialog.toggle({ open: false });
    if (!isFetching) {
      if (!isFollow || campaignId || bundleId) {
        await dispatch(relationshipActions.createSubscribe(apiClient, opts));
      } else {
        await dispatch(relationshipActions.deleteSubscribe(apiClient, opts));
      }
    }
  };

  const handleDialogToggle = useCallback(
    (data) => {
      const { isFollow, subscriptionPrice, campaignId, bundleId } = data;
      if (!isFollow || campaignId || bundleId) {
        dialog.toggle(
          dialogs[FOLLOW_DIALOG_TYPE](
            { onMainClick: handleSubscribeBuy, state: data },
            { user: data, amount: subscriptionPrice }
          )
        );
      } else {
        const confirmText =
          "Are you sure that you want to unsubscribe from this modal?";
        dialog.toggle(
          dialogs[CONFIRM_DIALOG_TYPE](
            {
              onMainClick: handleSubscribeBuy,
              state: { ...data },
              title: "Unfollow",
            },
            {
              contentText: confirmText,
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
