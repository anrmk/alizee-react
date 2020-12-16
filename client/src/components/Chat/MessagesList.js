import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import InfiniteScroll from "react-infinite-scroll-component";

import { Box } from "@material-ui/core/";

import Message from "./Message";
import useStyles from "./styles";

function MessagesList({
  hasMore,

  userId,
  items,
  liveChat = false,
  className,
  messageClassName,

  onFetchMore
}) {
  const classes = useStyles();
  const messagesContainer = useRef(null);

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (items.length > 0 && firstLoad) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
      setFirstLoad(false);
    }
  }, [items])

  return (
    <Box id="messageContainer" className={clsx(classes.messenger, className)} ref={messagesContainer}>
     <InfiniteScroll
        scrollableTarget="messageContainer"
        scrollThreshold={-0.8}
        dataLength={items.length}
        next={onFetchMore}
        hasMore={hasMore}
        inverse={true}
      >
      {items && items.map((message) => (
        <Message
          key={message.id}
          message={message}
          isOwner={message.userId === userId}
          liveChat={liveChat}
          className={messageClassName} />
      ))}
      </InfiniteScroll>
    </Box>
  )
}

export default MessagesList;
