import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import ApiContext from "../context/ApiContext";

import * as actionRelationship from "../store/actions/relationship";
import dialogs, { FOLLOWERS_LIST_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";
import { getDialogToggleType } from "../helpers/functions";

export default function useFollowingsDialog() {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const { followersList } = useSelector((state) => ({
    followersList: actionRelationship.getFilteredShare(state),
  }));
  const { userName } = useSelector((state) => state.signIn.userInfo);

  const dialog = useDialog();
  const [selectedChats, setSelectedChats] = useState([]);

  let dialogOptionsState = useRef({}).current;
  let contentOptionsState = useRef({}).current;

  useEffect(() => {
    if (followersList.length) {
      updateParams();
    }
  }, [followersList, selectedChats]);

  const resetQuery = () => {
    dispatch(actionRelationship.resetFollowingsFilter());
  };
  const handleFollowingsFilter = (query) => {
    dispatch(actionRelationship.filterFollowings(query));
  };

  const handleOpenClick = async (withStack = false, dialogOpts, contentOpts) => {
	const toggleType = getDialogToggleType(withStack)

    dialogOpts && (dialogOptionsState = dialogOpts);
    contentOpts && (dialogOptionsState = contentOpts);

    dialog[toggleType](
      dialogs[FOLLOWERS_LIST_DIALOG_TYPE](
        {
          loading: true,
          ...dialogOpts,
        },
        contentOpts
      )
    );

    await dispatch(actionRelationship.getShareFollowings(apiClient, userName));
  };

  const updateParams = () => {
    dialog.setParams(
      dialogs[FOLLOWERS_LIST_DIALOG_TYPE](
        {
          loading: false,
          state: selectedChats,
          ...dialogOptionsState,
        },
        {
          multiple: true,
          items: followersList,
          onItemSelect: (selected) => setSelectedChats(selected),
          onSendQuery: handleFollowingsFilter,
          resetQuery: resetQuery,
          ...contentOptionsState,
        }
      )
    );
  };

  return {
    toggle: handleOpenClick,
  };
}
