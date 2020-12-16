import React from "react";
import PropTypes from "prop-types";

import { Message, MessageSenderInput, MessagesList } from "../Chat";

import { Avatar, Card, CardHeader, CardContent, CardActions, IconButton, Divider } from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

function Comments(props) {
  const { children } = props;
  const { hasMore } = props;
  const { userId, avatarUrl, title, subheader, description, items } = props;
  const { onFetchMore, onSendMessageClick } = props;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        title={title}
        subheader={subheader}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>{description}</CardContent>

      <CardActions>{children}</CardActions>

      <Divider />

      <CardContent>
        <MessagesList userId={userId} items={items} onFetchMore={onFetchMore} hasMore={hasMore} />
      </CardContent>

      <CardContent>
        <MessageSenderInput onSendMessageClick={onSendMessageClick} />
      </CardContent>
    </Card>
  );
}

Comments.propTypes = {
  hasMore: PropTypes.bool,

  userId: PropTypes.string,
  userName: PropTypes.string,
  items: PropTypes.array,

  children: PropTypes.any,

  onFetchMore: PropTypes.func,
  onSendMessageClick: PropTypes.func,
};

Comments.defaultProps = {
  hasMore: false,

  userId: "",
  userName: "",
  items: [],

  children: null,

  onFetchMore: undefined,
  onSendMessageClick: undefined,
};

export default Comments;
