import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MessageSenderInput, MessagesList } from "../Chat";

import { Avatar, Card, CardHeader, CardContent, CardActions, Divider } from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./styles";

function Comments(props) {
  const { children, headerBackComponent } = props;
  const { postId, isOwner, user, owner, description, items, isCommentable, isPurchased, isFollowed, hasMore } = props;
  const { onFetchMore, onCommentSendClick, onSendTip, onDeleteMessage } = props;

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
    onSendTip && onSendTip(owner);
  }, [owner]);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Link to={PROFILE_USERNAME_ROUTE(owner.userName)}>
            <Avatar src={owner.avatarUrl} />
          </Link>
        }
        title={owner.name}
        subheader={owner.userName}
        action={headerBackComponent}
      />
      {description && <CardContent>{description}</CardContent>}

      <CardActions className={classes.action} disableSpacing>
        {children}
      </CardActions>

      <Divider />

      {isPurchased && (
        <CardContent className={classes.cardContent}>
          <MessagesList
            isSendMessage={isSendMessage}
            userName={user.userName}
            items={items}
            hasMore={hasMore}
            onFetchMore={onFetchMore}
            onDeleteMessage={onDeleteMessage}/>
        </CardContent>
      )}

      {((isCommentable && isPurchased && isFollowed) || isOwner) && (
        <CardActions className={classes.cardFooter}>
          <MessageSenderInput hideMediaEditor hidePayment={isOwner} onSendMessageClick={handleCommentSendClick} onSendTip={handleSendTipClick} />
        </CardActions>
      )}
    </Card>
  );
}

export default Comments;
