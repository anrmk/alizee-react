import React from "react";
import { useTranslation } from "react-i18next";

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  FOLLOW_PENDING,
  FOLLOW_REJECTED,
  FOLLOW_ACCEPTED,
  FOLLOW_NONE,
} from "../../constants/follow_types";

import Avatar from "../Avatar";
import DisplayName from "../DisplayName";

import useStyles from "./styles";

const RelationshipItem = React.memo((props) => {
  const { t } = useTranslation();

  const {
    userName,
    status,
    avatarUrl,
    coverUrl,
    name,
    subtitle,
    subscriptionPrice,
    identityVerified,

    isFollow,
    isFavorite,
    isMe,
  } = props;
  const {
    onSubscribeClick,
    onConfirmClick,
    onRejectClick,
    onUnrejectClick,
    onItemClick,
    onFavoriteClick,
  } = props;

  const classes = useStyles({ url: coverUrl });

  const handleSubscribeClick = (e) => {
    e.preventDefault();
    onSubscribeClick &&
      onSubscribeClick({
        userName,
        name,
        subscriptionPrice,
        avatarUrl,
        coverUrl,
        identityVerified,
        isFollow,
        followStatus: isFollow ? FOLLOW_ACCEPTED : FOLLOW_NONE,
      });
  };

  const handleConfirmClick = () => {
    onConfirmClick && onConfirmClick({ userName, status });
  };

  const handleRejectClick = () => {
    onRejectClick && onRejectClick({ userName, status });
  };

  const handleUnrejectClick = () => {
    onUnrejectClick && onUnrejectClick({ userName });
  };

  const handleItemClick = () => {
    onItemClick && onItemClick(userName);
  };

  const handleFavoriteClick = () => {
    onFavoriteClick && onFavoriteClick({ userName, isFavorite });
  };
  const renderActionButtons = () => {
    if (onFavoriteClick) {
      return (
        <Button
          disableElevation
          disableRipple
          size="small"
          variant="contained"
          color="primary"
          onClick={handleFavoriteClick}>
          {isFavorite
            ? t("FavoriteUserInfoBtnTextUnfavorite")
            : t("FavoriteUserInfoBtnTextFavorite")}
        </Button>
      );
    }
    switch (status) {
      case FOLLOW_PENDING:
        return (
          <>
            <Button
              disableElevation
              disableRipple
              size="small"
              variant="contained"
              color="primary"
              onClick={handleConfirmClick}>
              {t("ConfirmBtnTextFollowerItem")}
            </Button>
            &nbsp;
            <Button
              disableElevation
              disableRipple
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleRejectClick}>
              {t("DeclineBtnTextFollowerItem")}
            </Button>
          </>
        );

      case FOLLOW_REJECTED:
        return (
          <Button
            disableElevation
            disableRipple
            size="small"
            onClick={handleUnrejectClick}>
            {t("UnrejectBtnTextFollowerItem")}
          </Button>
        );

      default:
        return (
          <Button
            disableElevation
            disableRipple
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSubscribeClick}>
            {isFollow
              ? t("FollowingBtnTextFollowerItem")
              : t("FollowerBtnTextFollowerItem")}
          </Button>
        );
    }
  };
  return (
    <ListItem
      button
      className={classes.item}
      onClick={handleItemClick}
      component="li">
      <ListItemAvatar>
        <Avatar borderColor="silver" src={avatarUrl} />
      </ListItemAvatar>
      <ListItemText>
        <DisplayName
          name={name}
          userName={userName}
          identityVerified={identityVerified}
          noWrap={false}
          typographyProps={{ variant: "body1" }}
        />
      </ListItemText>

      {!isMe && (
        <ListItemSecondaryAction>
          {renderActionButtons()}
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
});

export default RelationshipItem;
