import { useState, useEffect, useContext, useCallback , useRef} from "react";
import { useSelector, useDispatch } from "react-redux";

import ApiContext from "../context/ApiContext";
import * as actionChat from "../store/actions/chat";
import dialogs, { FOLLOWERS_LIST_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";

export default function useFollowingsDialog() {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const { loading, followersList } = useSelector(state => ({
    loading: state.chat.isFetching,
    followersList: state.chat.data
  }));
  const dialog = useDialog();
  const [selectedChats, setSelectedChats] = useState([]);

  let dialogOptionsState = useRef({}).current;
  let contentOptionsState = useRef({}).current;

  useEffect(() => {
    if (followersList.length) {
      updateParams();
    }
  }, [followersList, selectedChats]);

  const handleOpenClick = async (withStack = false, dialogOpts, contentOpts) => {
    const toggleType = withStack ? "toggleWithStack" : "toggle";
    
    dialogOpts && (dialogOptionsState = dialogOpts);
    contentOpts && (dialogOptionsState = contentOpts);
    
    dialog[toggleType](dialogs[FOLLOWERS_LIST_DIALOG_TYPE]({
      loading: true,
      ...dialogOpts
    }, contentOpts));

    !loading && await dispatch(actionChat.getRooms(apiClient));
  }

  const updateParams = () => {
    dialog.setParams(dialogs[FOLLOWERS_LIST_DIALOG_TYPE]({
      loading: false,
      state: selectedChats,
      ...dialogOptionsState
    }, {
      multiple: true,
      items: followersList,
      onItemSelect: (selected) => setSelectedChats(selected),
      ...contentOptionsState
    }));
  };

  return {
    toggle: handleOpenClick,
  };
}
