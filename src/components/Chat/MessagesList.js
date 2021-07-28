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
      <List
        id="messagerContainer"
        className={classes.messenger}
        ref={messagesContainer}
        disablePadding
        component="div">
        <InfiniteScroll
          scrollableTarget="messagerContainer"
          scrollThreshold={1}
          dataLength={items.length}
          next={onFetchMore}
          hasMore={hasMore}
          inverse>
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
        </InfiniteScroll>
      </List>
    );
  }
);

export default MessagesList;
