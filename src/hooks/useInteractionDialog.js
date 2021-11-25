import React, { useState, useCallback, useEffect, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import dialogs, { INTERACTION_USER_MENU_TYPE } from "../constants/dialogs";
import ApiContext from "../context/ApiContext";

import useDialog from "./useDialog";
import useBlockDialog from "./useBlockDialog";
import * as relationshipActions from "../store/actions/relationship";
import useConfirmationDialog from "./useConfirmationDialog";
import useFavoriteUserAction from "./useFavoriteUserAction";
import ConfirmDialog from "../components/DialogForms/ConfirmDialog";

const initProps = {
  isBlock: true,
  isDelete: true,
  isFavorite: true,
};

export default function useInteractionDialog(props) {
  props = { ...initProps, ...props };
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const blockDialog = useBlockDialog();

  const confirmationDialog = useConfirmationDialog();

  const { favoriteUserAction } = useFavoriteUserAction(props.favoriteProps);
  const [localData, setLocalData] = useState(null);
  const { isFavorite, followingPostsData } = useSelector((state) => ({
    isFavorite: state.user.data?.isFavorite,
    followingPostsData: state.followingPosts.data,
  }));
  useEffect(() => {
    if (localData) {
      const newFollowStatus = !localData.isFavorite;
      dialog.setParams(
        dialogs[INTERACTION_USER_MENU_TYPE](null, {
          onBlock: props.isBlock && blockDialog.toggle,
          onFavorite: props.isFavorite && handleFavoriteUserClick,
          onUnsubscribe: props.isDelete && handleUnsubscribeClick,
          ...localData,
        })
      );
      setLocalData((prev) => ({ ...prev, isFavorite: newFollowStatus }));
    }
  }, [isFavorite, followingPostsData]);

  const handleDeleteConfirm = useCallback(async (opts) => {
    dialog.setParams({ loading: true });
    await dispatch(relationshipActions.deleteSubscription(apiClient, opts));
    dialog.toggle({ open: false, loading: false });
  }, []);

  const handleUnsubscribeClick = useCallback(
    async ({ userName, followStatus, isPrivate, subscriptionPrice }) => {
      const opts = {
        userName,
        followStatus,
        isPrivate,
        subscriptionPrice,
      };
      confirmationDialog.toggle(
        {
          mainBtnText: "Confirm",
          title: "Unsubscribe",
          state: opts,
          onMainClick: handleDeleteConfirm,
        },
        {
          contentText: (
            <ConfirmDialog
              helpText="Do you really want to unsubscribe from this user?"
              textProp={{ variant: "subtitle1", align: "center" }}
            />
          ),
        },
        true
      );
    },
    []
  );

  const handleFavoriteUserClick = useCallback(async (data) => {
    await favoriteUserAction(data);
  }, []);

  const handleDialogToggle = useCallback(async ({ data }) => {
    setLocalData(data);
    dialog.toggleWithStack(
      dialogs[INTERACTION_USER_MENU_TYPE](null, {
        onBlock: props.isBlock && blockDialog.toggle,
        onUnsubscribe: props.isDelete && handleUnsubscribeClick,
        onFavorite: props.isFavorite && handleFavoriteUserClick,
        ...data,
      }),
      true
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
