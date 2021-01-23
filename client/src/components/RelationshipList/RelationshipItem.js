import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { Button, ListItem, ListItemText, ListItemAvatar, Typography } from "@material-ui/core";

import Avatar from "../Avatar";

import useStyles from "./styles";

const RelationshipItem = React.memo((props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    id,
    followId,
    userId,
    avatarUrl,
    title,
    subtitle,
    isFollow,
    isMe
  } = props;

  const {onItemClick, onFollowClick } = props;

  const handleFollowClick = () => {
    onFollowClick && onFollowClick({ id, followId, userId, isFollow });
  };

  return (
    <ListItem button className={classes.item}>
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
      {!isMe && (
        <Button
          className={classes.itemButton}
          disableElevation
          disableRipple
          variant={isFollow ? "outlined": "contained"}
          color="primary"
          size="small"
          onClick={handleFollowClick}
        >
          {isFollow ? t("FollowingBtnTextFollowerItem") : t("FollowerBtnTextFollowerItem")}
        </Button>
      )}
    </ListItem>
  );
});

RelationshipItem.propTypes = {
  avatarUrl: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isFollow: PropTypes.bool,
  isMe: PropTypes.bool,

  onFollowClick: PropTypes.func,
  onItemClick: PropTypes.func
};

RelationshipItem.defaultProps = {
  avatarUrl: "",
  title: "",
  subtitle: "",
  isFollow: false,
  isMe: false,

  onFollowClick: undefined,
  onItemClick: undefined
};

export default RelationshipItem;
