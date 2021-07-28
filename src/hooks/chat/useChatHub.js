import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

import API from "../../constants/endpoints";
import ApiContext from "../../context/ApiContext";
import * as chatAction from "../../store/actions/chat";
import useSingleR from "../useSingleR";

export default function useChatHub() {
  const apiClient = useContext(ApiContext);
  const { connection } = useSingleR(API.endpoints.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleReceiveMessage = async (data) => {
      await dispatch(chatAction.addMessage(apiClient, data));
    };

    connection && connection.on("ReceiveMessage", handleReceiveMessage);
  }, [connection]);
}
