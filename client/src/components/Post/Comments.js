import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { MessageSenderInput, MessagesList } from "../Chat";

import { Avatar, Card, CardHeader, CardContent, CardActions, Divider } from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./styles";

function Comments(props) {
  const { children, headerBackComponent } = props;
  const { hasMore } = props;
  const { postId, isOwner, user, description, items, isCommentable, isPurchased } = props;
  const { onFetchMore, onCommentSendClick, onSendTip } = props;

  const classes = useStyles({ isPurchased });
  const [isSendMessage, setIsSendMessage] = useState(false);

  const handleCommentSendClick = (data) => {
    setIsSendMessage(true);
    onCommentSendClick && onCommentSendClick({ ...data, postId });
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
        avatar={
          <Link to={PROFILE_USERNAME_ROUTE(user.userName)}>
            <Avatar src={user.avatarUrl} />
          </Link>
        }
        title={user.name}
        subheader={user.userName}
        action={headerBackComponent}
      />
      <CardContent>{description}</CardContent>

      <CardActions className={classes.action} disableSpacing>
        {children}
      </CardActions>

      <Divider />

      {isPurchased && (
        <CardContent className={classes.cardContent}>
          {<MessagesList isSendMessage={isSendMessage} userId={user.id} items={items} onFetchMore={onFetchMore} hasMore={hasMore} />}
        </CardContent>
      )}

      {isCommentable && isPurchased && (
        <CardActions className={classes.cardFooter}>
          <MessageSenderInput hideMediaEditor hidePayment={isOwner} onSendMessageClick={handleCommentSendClick} onSendTip={handleSendTipClick} />
        </CardActions>
      )}
    </Card>
  );
}

export default Comments;
