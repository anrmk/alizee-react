import { useState, useEffect } from "react";
import * as io from "socket.io-client";

import { wrapHttps } from "../helpers/functions";

export default function useSocketIO(userName, options) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const isHttps = process.env.NODE_ENV === "production";
    const newSocket = io.connect(
      wrapHttps(process.env.REACT_APP_SS_DOMAIN, isHttps),
      options
    );

    setSocket(newSocket);
  }, [userName, options]);

  useEffect(
    () => () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    },
    [socket]
  );

  return { socket };
}
