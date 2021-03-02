import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import InfiniteScroll from "react-infinite-scroll-component";

import { Box } from "@material-ui/core/";

import Message from "./Message";
import useStyles from "./styles";

const MessagesList = React.memo(({
  isSendMessage,
  hasMore,

  userId,
  items = [],
  liveChat = false,
  className,
  messageClassName,

  onFetchMore,
  onMediaView
}) => {
  const classes = useStyles();
  const messagesContainer = useRef(null);

  useEffect(() => {
    if (items.length > 0 && isSendMessage && messagesContainer.current.scrollTop < 0) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  }, [items]);

  return (
    <Box id="messagerContainer" className={clsx(classes.messenger, className)} ref={messagesContainer}>
     <InfiniteScroll
        className={classes.infinite}
        scrollableTarget="messagerContainer"
        scrollThreshold={-0.8}
        dataLength={items.length}
        next={onFetchMore}
        hasMore={hasMore}
      >
      {items && items.map((message) => (
        <Message
          key={message.id}
          message={message}
          isOwner={message.userId === userId}
          liveChat={liveChat}
          className={messageClassName}
          onMediaView={onMediaView} />
      ))}
      </InfiniteScroll>
    </Box>
  );
});

MessagesList.propTypes = {
  hasMore: PropTypes.bool,

  userId: PropTypes.string,
  items: PropTypes.array,
  liveChat: PropTypes.bool,

  className:  PropTypes.any,
  messageClassName: PropTypes.any,

  onFetchMore: PropTypes.func
}

MessagesList.defaultProps = { 
  hasMore: false,

  userId: "",
  items: [],
  liveChat: false,

  className: "",
  messageClassName: "",

  onFetchMore: undefined
}

export default MessagesList;
