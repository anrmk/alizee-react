import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Box } from "@material-ui/core/";

import Message from "./Message";
import useStyles from "./styles";

function MessagesList({
  userId,
  items,
  liveChat = false,
  className,
  messageClassName
}) {
  const classes = useStyles();
  const messagesContainer = useRef(null);

  useEffect(() => {
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
  }, [items])

  return (
    <Box className={clsx(classes.messenger, className)} ref={messagesContainer}>
      {items && items.map((message) => (
        <Message
          key={message.id}
          message={message}
          isOwner={message.userId === userId}
          liveChat={liveChat}
          className={messageClassName} />
      ))}
    </Box>
  )
}

export default MessagesList;
