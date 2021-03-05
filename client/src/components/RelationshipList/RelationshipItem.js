import React from "react";
import { useTranslation } from "react-i18next";

import { Button, ListItem, ListItemText, ListItemAvatar, Typography } from "@material-ui/core";
import { FOLLOW_ACCEPTED, FOLLOW_PENDING, FOLLOW_REJECTED } from "../../constants/follow_types";

import Avatar from "../Avatar";

import useStyles from "./styles";
import { Link } from "react-router-dom";
import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

const RelationshipItem = React.memo((props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    id,
    userName,
    status,
    avatarUrl,
    title,
    subtitle,
    isFollow,
    isMe
  } = props;

  const {onItemClick, onFollowClick, onConfirmClick, onRejectClick, onUnrejectClick } = props;

  const handleFollowClick = (e) => {
    e.preventDefault();
    onFollowClick && onFollowClick({ id, userName, isFollow });
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    onConfirmClick && onConfirmClick({id, userName, status});
  }

  const handleRejectClick = (e) => {
    e.preventDefault();
    onRejectClick && onRejectClick({id, userName, status});
  }

  const handleUnrejectClick = (e) => {
    e.preventDefault();
    onUnrejectClick && onUnrejectClick({id, userName}); 
  }

  const renderActionButtons = () => {
    switch(status) {
      case FOLLOW_PENDING:
        return (
          <>
            <Button
              className={classes.itemButton}
              disableElevation
              disableRipple
              size="small"
              variant="contained"
              color="primary"
              onClick={handleConfirmClick}
            >
              {t("ConfirmBtnTextFollowerItem") }
            </Button>
    
            <Button
              className={classes.itemButton}
              disableElevation
              disableRipple
              size="small"
              color="secondary"
              onClick={handleRejectClick}
            >
              {t("DeclineBtnTextFollowerItem") }
            </Button>
          </>
        )
      case FOLLOW_REJECTED:
        return (<Button
          className={classes.itemButton}
          disableElevation
          disableRipple
          size="small"
          color="secondary"
          onClick={handleUnrejectClick}
        >
          {t("UnrejectBtnTextFollowerItem") }
        </Button>)

      case FOLLOW_ACCEPTED:
        break;
      default: 
          return (<Button
            className="primary"
            disableElevation
            disableRipple
            variant="contained"
            color="primary"
            size="small"
            onClick={handleFollowClick}
          >
            {isFollow ? t("FollowingBtnTextFollowerItem") : t("FollowerBtnTextFollowerItem")}
          </Button>)

    }
  }

  return (
    <ListItem 
      className={classes.item}
      button
      to={PROFILE_USERNAME_ROUTE(userName)}
      component={Link}>

      <ListItemAvatar>
        <Avatar src={avatarUrl} />
      </ListItemAvatar>
      
      <ListItemText
        primary={
          <Typography noWrap variant="body2" color="textPrimary">
            {title}
          </Typography>
        }
        secondary={
          <Typography noWrap variant="body2" color="textPrimary">
            {subtitle}
          </Typography>
        }
        onClick={onItemClick}
      />
      {!isMe && renderActionButtons()}
    </ListItem>
  );
});

export default RelationshipItem;
