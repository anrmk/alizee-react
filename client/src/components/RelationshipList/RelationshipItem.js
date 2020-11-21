import React from "react";
import PropTypes from "prop-types";

import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PROFILE_ROUTE } from "../../constants/routes";

import { ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, Button, IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/ToggleOnOutlined";
import PowerOffIcon from '@material-ui/icons/ToggleOffOutlined';

import useStyles from "./styles";

function RelationshipItem({
  id,
  userId,
  avatarUrl,
  username,
  isFollowing,
  me,

  onFollowClick,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  const handleFollowClick = (e, id, uId) => {
    e.preventDefault();
    onFollowClick && onFollowClick(id, uId);
  };

  return (
    <ListItem button className={classes.item}>
      <ListItemAvatar>
        <Avatar src={avatarUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={username}
        secondary={t("SecondTextFollowerItem")}
        onClick={(e) => {
          history.push(PROFILE_ROUTE(username));
        }}
      />
      {!me && (
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            color={isFollowing ? "primary" : "default"}
            aria-label={isFollowing ? t("FollowingBtnTextFollowerItem") : t("FollowerBtnTextFollowerItem")}
            onClick={(e) => handleFollowClick(e, id, userId)}
          >
            {isFollowing ? <CommentIcon /> : <PowerOffIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

{/* <Button edge="end" size="small" color="primary" >
            {isFollowing ? t("FollowingBtnTextFollowerItem") : t("FollowerBtnTextFollowerItem")}
          </Button> */}

RelationshipItem.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  isFollowing: PropTypes.bool,
  me: PropTypes.bool,

  onFollowClick: PropTypes.func,
};

RelationshipItem.defaultProps = {
  id: "",
  userId: "",
  avatarUrl: "",
  username: "",
  isFollowing: false,
  me: false,

  onFollowClick: undefined,
};

export default RelationshipItem;
