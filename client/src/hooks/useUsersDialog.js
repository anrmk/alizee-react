import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import ApiContext from "../context/ApiContext";
import * as actionRelationship from "../store/actions/relationship";
import dialogs, { USERS_LIST_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";
import { isEmptyObject } from "../helpers/functions";

export default function useUsersDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.signIn.userInfo);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [optsState, setOptsState] = useState({});

  const { followersList } = useSelector((state) => ({
    followersList: state.users.share,
  }));

  useEffect(() => {
    if (followersList && !isEmptyObject(optsState)) {
      handleUpdateParams(followersList);
    }
  }, [followersList]);

  useEffect(() => {
    if (selectedItems.length) {
      handleUpdateParams();
    }
  }, [selectedItems]);

  const handleResetQuery = () => {
    dispatch(actionRelationship.resetFollowingsFilter());
  };

  const handleFollowingsFilter = async (query) => {
    if (!query) {
      await dispatch(actionRelationship.getShareFollowings(apiClient, userName));
    } else {
      await dispatch(actionRelationship.getFollowingsByQuery(apiClient, query));
    }
  };

  const handleOpenClick = async (dialogOpts, contentOpts, withStack = false) => {
    const toggleType = withStack ? "toggleWithStack" : "toggle";

    setOptsState({ dialogOpts, contentOpts });

    dialog[toggleType](
      dialogs[USERS_LIST_DIALOG_TYPE](
        {
          loading: true,
          ...dialogOpts,
        },
        contentOpts
      )
    );

    await dispatch(actionRelationship.getShareFollowings(apiClient, userName));

    dialog.setParams({ loading: false });
  }

  var handleUpdateParams = (followersList, dialogOpts, contentOpts) => {
    if (followersList) setCurrentItems([...followersList]);

    dialog.setParams(
      dialogs[USERS_LIST_DIALOG_TYPE](
        {
          state: selectedItems,
          ...optsState.dialogOpts,
          ...dialogOpts
        },
        {
          multiple: true,
          onItemSelect: (selected) => setSelectedItems(selected),
          items: followersList || currentItems,
          onSendQuery: handleFollowingsFilter,
          onResetQuery: handleResetQuery,
          ...optsState.contentOpts,
          ...contentOpts
        }
      )
    );
  }

  return {
    toggle: handleOpenClick,
    update: handleUpdateParams,
    selectedItems
  };
}
