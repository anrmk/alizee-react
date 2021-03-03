import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { MessageSenderInput, MessagesList } from "../Chat";

import { Avatar, Card, CardHeader, CardContent, CardActions, Divider } from "@material-ui/core";

import useStyles from "./styles";

function Comments(props) {
  const classes = useStyles();
  const { children, headerBackComponent } = props;
  const { hasMore } = props;
  const { isOwner, user, description, items, isCommentable } = props;
  const { onFetchMore, onSendMessageClick, onSendTip } = props;

  const [isSendMessage, setIsSendMessage] = useState(false);

  const handleMessageCreate = (data) => {
    setIsSendMessage(true);
    onSendMessageClick && onSendMessageClick(data);
  };

  useEffect(() => {
    if (items) {
      setIsSendMessage(false);
    }
  }, [items]);

  const handleSendTipClick = useCallback(() => {
    onSendTip && onSendTip(user);
  }, [user]);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        title={user.title}
        subheader={user.subheader}
        action={headerBackComponent}
      />
      <CardContent>{description}</CardContent>

      <CardActions className={classes.action} disableSpacing>
        {children}
      </CardActions>

      <Divider />

      <CardContent className={classes.cardContent}>
        {<MessagesList isSendMessage={isSendMessage} userId={user.id} items={items} onFetchMore={onFetchMore} hasMore={hasMore} />}
      </CardContent>

      {isCommentable && (
        <CardActions className={classes.cardFooter}>
          <MessageSenderInput hideMediaEditor={true} hidePayment={isOwner} onSendMessageClick={handleMessageCreate} onSendTip={handleSendTipClick} />
        </CardActions>
      )}
    </Card>
  );
}

Comments.propTypes = {
  hasMore: PropTypes.bool,
  isOwner: PropTypes.bool,

  user: PropTypes.object,
  items: PropTypes.array,
  isCommentable: PropTypes.bool,

  children: PropTypes.any,

  onFetchMore: PropTypes.func,
  onSendMessageClick: PropTypes.func,
  onSendTip: PropTypes.func
};

Comments.defaultProps = {
  hasMore: false,
  isOwner: false,
  user: {},
  items: [],
  isCommentable: false,

  children: null,

  onFetchMore: undefined,
  onSendMessageClick: undefined,
  onSendTip: undefined
};

export default Comments;
