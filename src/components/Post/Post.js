import React, { memo, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import VerifiedIcon from "../Icons/VerifiedIcon";

import Tools from "./Tools";
import MediaContent from "../MediaContent";
import { MessageSenderInput } from "../Chat";
import CommentsPreview from "./CommentsPreview";
import SuggestionPeopleList from "../SuggestionPeopleList";
import FundraisingPost from "../FundraisingPost";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import useDoubleTap from "../../hooks/useDoubleTap";

import useStyles from "./styles";

function Post(props) {
  const classes = useStyles();
  const [isLikeAnimation, setIsLikeAnimation] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  let timerLikeAnimation = useRef().current;

  const { id, user, owner, post, comments } = props;
  const { likes, isLike, isFavorite, isUserFavorite, isTargetFunds } = props;
  const {
    onLike,
    onFavorite,
    onSendTip,
    onBuyPost,
    onReceipt,
    onPurchase,
    onShare,
    onMenu,
    onCommentSend,
    onFullScreen,
    onClick,
  } = props;

  const handleMenuClick = () => {
    onMenu &&
      onMenu({
        postId: id,
        userName: owner.userName,
        name: owner.name,
        isBlocked: owner.isBlocked,
        isOwner: user.userName === owner.userName,
        isFavorite: owner.isFavorite,
      });
  };

  const handleCommentSendClick = (data) => {
    onCommentSend && onCommentSend({ ...data, postId: id });
  };

  const handleFullScreenClick = () => {
    if (post.isPurchased || post.amount === 0) {
      onFullScreen &&
        onFullScreen({
          items: post?.media,
          startSlideIndex: currentSlideIndex,
        });
    }
  };

  const handleChangeSlideIndex = (index) => {
    if (post?.media[index]) {
      setCurrentSlideIndex(index);
    }
  };

  const handleLoadImg = () => {
    setIsLoaded(true);
  };

  const doubleTap = useDoubleTap(
    () => {
      if (!post.isPurchased && post.amount !== 0) return;

      onLike && onLike(id);

      timerLikeAnimation && clearTimeout(timerLikeAnimation);

      setIsLikeAnimation(true);
      timerLikeAnimation = setTimeout(() => setIsLikeAnimation(false), 400);
    },
    200,
    { onSingleTap: handleFullScreenClick }
  );

  const renderDescription = (text, withGutter) => (
    <Typography
      className={classes.postDescriptionText}
      variant="body2"
      component="p"
      gutterBottom={withGutter}>
      {text}
    </Typography>
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Link to={PROFILE_USERNAME_ROUTE(owner.userName)}>
            <Avatar src={owner.avatarUrl} />
          </Link>
        }
        title={
          <Box display="flex" alignItems="center">
            <Typography variant="body1" className={classes.cardName}>
              {owner.name}
            </Typography>
            {owner.identityVerified && (
              <VerifiedIcon fontSize="small" color="primary" />
            )}
          </Box>
        }
        subheader={
          <Link
            to={PROFILE_USERNAME_ROUTE(owner.userName)}
            className={classes.cardUserName}>
            {`@${owner.userName}`}
          </Link>
        }
        action={
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardMedia {...doubleTap} className={classes.cardMedia}>
        <MediaContent
          className={classes.mediaContent}
          isLoaded={isLoaded}
          id={id}
          user={owner}
          items={post.media}
          amount={post.amount}
          fundraising={post.fundraising}
          isPurchased={post.isPurchased}
          isTargetFunds={isTargetFunds}
          isOwner={user.userName === owner.userName}
          isLiked={isLikeAnimation}
          onPayClick={onBuyPost}
          onChangeIndex={handleChangeSlideIndex}
          onLoaded={handleLoadImg}
        />
      </CardMedia>

      {post?.isTargetFunds && (
        <>
          <CardActions>
            <FundraisingPost
              targetProgress={post.targetProgress}
              amount={post.amount}
              onSendDonate={onSendTip}
              user={owner}
              id={id}
              isOwner={user.userName === owner.userName}
            />
          </CardActions>

          <Divider />
        </>
      )}

      <CardContent className={classes.postCardContent}>
        {post.media.length === 0 &&
          post.description &&
          renderDescription(post.description, true)}

        <Tools
          id={id}
          user={owner}
          likes={likes}
          isLike={isLike}
          isFavorite={isFavorite}
          isVerified={owner.identityVerified}
          amount={post.amount}
          isPurchased={post.isPurchased}
          isOwner={user.userName === owner.userName}
          isCommentable={post.isCommentable}
          isTargetFunds={post?.isTargetFunds}
          onLike={onLike}
          onFavorite={onFavorite}
          onSendTip={onSendTip}
          onBuyPost={onBuyPost}
          onReceipt={onReceipt}
          onPurchase={onPurchase}
          onShare={onShare}
        />
        {post.media.length > 0 &&
          post.description &&
          renderDescription(post.description)}
      </CardContent>

      <CardActions className={classes.action} disableSpacing>
        {post?.userTags?.length > 0 && (
          <SuggestionPeopleList items={post?.userTags} limit={3} />
        )}
        {post.isCommentable &&
          (post.amount === 0 ||
            user.userName === owner.userName ||
            post.isPurchased) && (
            <>
              {comments.length > 0 && (
                <CommentsPreview
                  items={comments}
                  commentsCount={post.commentsCount}
                  postId={post.id}
                  onClick={onClick}
                />
              )}
              <Divider className={classes.divider} />
              <MessageSenderInput
                hideMediaEditor
                transparentBg
                currentFocus={false}
                placeholder="Add a comment..."
                onSendMessageClick={handleCommentSendClick}
              />
            </>
          )}
      </CardActions>
    </Card>
  );
}

export default memo(Post, isEqual);
