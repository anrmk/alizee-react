import { useState, useEffect } from "react";
import * as io from "socket.io-client";

import { wrapHttps } from "../helpers/functions";

export default function useSocketIO(userName, options) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect(
      wrapHttps(process.env.REACT_APP_SS_DOMAIN),
      options);

    setSocket(newSocket);
  }, [userName, options]);

  useEffect(() => {
    return () => {
      if(socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket]);

  return { socket };
}
