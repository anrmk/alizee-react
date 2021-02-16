import React from "react";
import PropTypes from "prop-types";

import { MessageSenderInput, MessagesList } from "../Chat";

import { Avatar, Card, CardHeader, CardContent, CardActions, Divider } from "@material-ui/core";

import useStyles from "./styles";

function Comments(props) {
  const classes = useStyles();
  const { children, headerBackComponent } = props;
  const { hasMore } = props;
  const { userId, avatarUrl, title, subheader, description, items, isCommentable } = props;
  const { onFetchMore, onSendMessageClick } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        title={title}
        subheader={subheader}
        action={headerBackComponent}
      />
      <CardContent>{description}</CardContent>

      <CardActions className={classes.action} disableSpacing>
        {children}
      </CardActions>

      <Divider />

      <CardContent className={classes.cardContent}>
        {<MessagesList userId={userId} items={items} onFetchMore={onFetchMore} hasMore={hasMore} />}
      </CardContent>

      {isCommentable && (
        <CardActions className={classes.cardFooter}>
          <MessageSenderInput onSendMessageClick={onSendMessageClick} hideMediaEditor={true} />
        </CardActions>
      )}
    </Card>
  );
}

Comments.propTypes = {
  hasMore: PropTypes.bool,

  userId: PropTypes.string,
  userName: PropTypes.string,
  items: PropTypes.array,
  isCommentable: PropTypes.bool,

  children: PropTypes.any,

  onFetchMore: PropTypes.func,
  onSendMessageClick: PropTypes.func,
};

Comments.defaultProps = {
  hasMore: false,

  userId: "",
  userName: "",
  items: [],
  isCommentable: false,

  children: null,

  onFetchMore: undefined,
  onSendMessageClick: undefined,
};

export default Comments;
