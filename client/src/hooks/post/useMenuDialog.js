import { useState, useCallback, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router";

import dialogs, { POST_MENU_DIALOG_TYPE } from "../../constants/dialogs";

import useDialog from "../useDialog";
import useSharePostDialog from "./useSharePostDialog";
import useReportDialog from "./useReportDialog";
import useBlockDialog from "../useBlockDialog";
import useShareDialog, { SHARE_DIALOG_PROFILE_TYPE } from "../useShareDialog";
import useDeleteAction from "./useDeleteAction";
import useFavoriteUserAction from "../useFavoriteUserAction";
import { DEFAULT_ROUTE } from "../../constants/routes";
import { POST_TYPE } from "../../components/Post/Menu";
import { useSelector } from "react-redux";

const initProps = {
  isBlock: true,
  isReport: true,
  isShare: true,
  isChatShare: false,
  isDelete: true,
  isFavorite: true,
  useFavoriteProps: null,
  type: POST_TYPE
};

export default function useMenuDialog(props) {
  props = { ...initProps, ...props };
  const history = useHistory();
  const location = useLocation();
  const dialog = useDialog();
  const blockDialog = useBlockDialog();
  const reportDialog = useReportDialog();
  const postShareDialog = useSharePostDialog();
  const chatShareDialog = useShareDialog({ withStack: true, type: SHARE_DIALOG_PROFILE_TYPE });
  const { deletePostAction } = useDeleteAction();
  const { favoriteUserAction } = useFavoriteUserAction(props.favoriteProps);
  const [localData, setLocalData] = useState(null);
  
  const { isFavorite, followingPostsData } = useSelector((state) => ({
    isFavorite: state.user.data?.isFavorite,
    followingPostsData: state.followingPosts.data,
  }));

  // TODO: WIP
  useEffect(() => {
    if (localData) {
      // const newFollowStatus = !localData.isFavorite;
      dialog.setParams(
        dialogs[POST_MENU_DIALOG_TYPE](null, {
          onBlock: props.isBlock && blockDialog.toggle,
          onReport: props.isReport && reportDialog.toggle,
          onShare: props.isShare && postShareDialog.toggle,
          onChatShare: props.isChatShare && chatShareDialog.toggle,
          onDelete: props.isDelete && handleDeleteClick,
          onFavorite: props.isFavorite && handleFavoriteUserClick,
          type: props.type,
          ...localData,
        })
      );
      setLocalData(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
      // setLocalData({ ...localData, isFavorite: newFollowStatus });
    }
  }, [isFavorite, followingPostsData]);

  const handleDeleteClick = useCallback(async (id) => {
    dialog.setParams({ loading: true });
    await deletePostAction(id);
    dialog.toggle({ open: false, loading: false });

    if (location.pathname !== DEFAULT_ROUTE) {
      history.push(DEFAULT_ROUTE);
    }
  }, []);

  const handleFavoriteUserClick = useCallback(async (data) => {
    await favoriteUserAction(data);
  }, []);

  const handleDialogToggle = useCallback(async (data) => {
    setLocalData(data);
    dialog.toggleWithStack(
      dialogs[POST_MENU_DIALOG_TYPE](null, {
        onBlock: props.isBlock && blockDialog.toggle,
        onReport: props.isReport && reportDialog.toggle,
        onShare: props.isShare && postShareDialog.toggle,
        onChatShare: props.isChatShare && chatShareDialog.toggle,
        onDelete: props.isDelete && handleDeleteClick,
        onFavorite: props.isFavorite && handleFavoriteUserClick,
        type: props.type,
        ...data
      }),
      true
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
