import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ListItem, ListItemAvatar, ListItemText, Button } from "@material-ui/core";
import { FOLLOW_ACCEPTED, FOLLOW_PENDING, FOLLOW_REJECTED } from "../../constants/follow_types";

import Avatar from "../Avatar";

import useStyles from "./styles";
import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

const RelationshipItem = React.memo((props) => {
  const { t } = useTranslation();

  const { userName, status, avatarUrl, coverUrl, name, subtitle, subscriptionPrice, isFollow, isMe, identityVerified } = props;
  const { onItemClick, onSubscribeClick, onConfirmClick, onRejectClick, onUnrejectClick } = props;

  const classes = useStyles({ url: coverUrl });

  const handleSubscribeClick = (e) => {
    e.preventDefault();
    onSubscribeClick && onSubscribeClick({ userName, name, isFollow, subscriptionPrice, avatarUrl });
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    onConfirmClick && onConfirmClick({ userName, status });
  };

  const handleRejectClick = (e) => {
    e.preventDefault();
    onRejectClick && onRejectClick({ userName, status });
  };

  const handleUnrejectClick = (e) => {
    e.preventDefault();
    onUnrejectClick && onUnrejectClick({ userName });
  };

  const renderActionButtons = () => {
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
              onClick={handleConfirmClick}
            >
              {t("ConfirmBtnTextFollowerItem")}
            </Button>
            &nbsp;
            <Button
              disableElevation
              disableRipple
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleRejectClick}
            >
              {t("DeclineBtnTextFollowerItem")}
            </Button>
          </>
        );

      case FOLLOW_REJECTED:
        return (
          <Button disableElevation disableRipple size="small" onClick={handleUnrejectClick}>
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
            onClick={handleSubscribeClick}
          >
            {isFollow ? t("FollowingBtnTextFollowerItem") : t("FollowerBtnTextFollowerItem")}
          </Button>
        );
    }
  };

  return (
    <ListItem className={classes.item} button to={PROFILE_USERNAME_ROUTE(userName)} component={Link}>
      <ListItemAvatar>
        <Avatar borderColor="silver" src={avatarUrl} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={subtitle} onClick={onItemClick} />
      {!isMe && renderActionButtons()}
    </ListItem>
  );
});

export default RelationshipItem;
