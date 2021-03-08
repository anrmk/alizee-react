import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { CONFIRM_DIALOG_TYPE, FOLLOW_DIALOG_TYPE } from "../../constants/dialogs";
import * as relationshipActions from "../../store/actions/relationship";
import useDialog from "../useDialog";

export default function useFollowDialog() {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const { isFetching } = useSelector(state => ({
    isFetching: state.user.isFetching,
  }));
  const dialog = useDialog();

  const handleFollowBuy = async ({ userName, isFollow }) => {
    dialog.toggle({ open: false });

    if (!isFetching) {
      isFollow ?
        await dispatch(relationshipActions.deleteFollow(apiClient, userName)) :
        await dispatch(relationshipActions.createFollow(apiClient, userName));
    }
  }

  const handleDialogToggle = useCallback((data) => {
    const { isFollow } = data;
    if (!isFollow) {
      dialog.toggle(dialogs[FOLLOW_DIALOG_TYPE]({ onMainClick: handleFollowBuy, tempData: { ...data }}, { user: data }));
    } else {
      const confirmText = "Are you sure that you want to unsubscribe from this modal?";
      dialog.toggle(dialogs[CONFIRM_DIALOG_TYPE]({ onMainClick: handleFollowBuy, tempData: { ...data }, title: "Unfollow" }, { contentText: confirmText }));
    }
  }, [isFetching])

  return {
    toggle: handleDialogToggle,
  };
}
