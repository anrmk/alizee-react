import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { List } from "@material-ui/core/";

import Message from "./Message";
import useStyles from "./styles";

const MessagesList = React.memo(
  ({
    hasMore,

    userName,
    items = [],
    liveChat = false,

    onFetchMore,
    onMediaView,
    onDeleteMessage,
  }) => {
    const classes = useStyles();
    const messagesContainer = useRef(null);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
      setScrollHeight(messagesContainer.current.scrollHeight);
    }, [items]);

    useEffect(() => {
      messagesContainer.current.scrollTop = scrollHeight;
    }, [scrollHeight]);

    const handleMessageClick = (uN) => {
      console.log(uN);
    };

    return (
      <InfiniteScroll
        scrollableTarget="messagerContainer"
        scrollThreshold={-0.8}
        dataLength={items.length}
        next={onFetchMore}
        hasMore={hasMore}
      >
        <List id="messagerContainer" className={classes.messenger} ref={messagesContainer}>
          {items &&
            items.map((message) => (
              <Message
                key={message.id}
                message={message}
                isOwner={message.userName === userName}
                liveChat={liveChat}
                onMediaView={onMediaView}
                onMessageClick={handleMessageClick}
                onDelete={onDeleteMessage}
              />
            ))}
        </List>
      </InfiniteScroll>
    );
  }
);

export default MessagesList;
