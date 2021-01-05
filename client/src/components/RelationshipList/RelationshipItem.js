import React from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PROFILE_ROUTE } from "../../constants/routes";

import { ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/ToggleOnOutlined";
import PowerOffIcon from "@material-ui/icons/ToggleOffOutlined";

import Avatar from "../Avatar";

import useStyles from "./styles";

function RelationshipItem({
  avatarUrl,
  title,
  subtitle,
  isFollow,
  isMe,

  onFollowClick,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <ListItem button className={classes.item}>
      <ListItemAvatar>
        <Avatar src={avatarUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={subtitle}
        onClick={(e) => {
          history.push(PROFILE_ROUTE(subtitle));
        }}
      />

      {!isMe && (
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            color={isFollow ? "primary" : "default"}
            aria-label={isFollow ? t("FollowingBtnTextFollowerItem") : t("FollowerBtnTextFollowerItem")}
            onClick={onFollowClick}
          >
            {isFollow ? <CommentIcon /> : <PowerOffIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

RelationshipItem.propTypes = {
  avatarUrl: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isFollow: PropTypes.bool,
  isMe: PropTypes.bool,

  onFollowClick: PropTypes.func,
};

RelationshipItem.defaultProps = {
  avatarUrl: "",
  title: "",
  subtitle: "",
  isFollow: false,
  isMe: false,

  onFollowClick: undefined,
};

export default RelationshipItem;
