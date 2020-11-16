import React from "react";
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Button,
  makeStyles
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { PROFILE_ROUTE } from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
  item: {
    borderRadius: theme.shape.borderRadius
  },
  itemSecondText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "58%"
  }
}));

function RelationshipItem({
  id,
  userId,
  avatarUrl,
  username,
  isFollowing,
  me,

  onFollowClick
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  const handleFollowClick = (e, id, uId) => {
    e.preventDefault();
    onFollowClick && onFollowClick(id, uId);
  }

  return (
    <Link to={PROFILE_ROUTE(username)} className="not-link">
      <ListItem 
        button
        className={classes.item}>
        <ListItemAvatar>
          <Avatar src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={username}
          secondary={t("SecondTextFollowerItem")}
          primaryTypographyProps={{ className: classes.itemSecondText }}
          />
        {!me && (
          <ListItemSecondaryAction>
            <Button
              variant="contained"
              size="small"
              color="primary"
              disableElevation
              onClick={(e) => handleFollowClick(e, id, userId)}>
            {isFollowing ? t("FollowingBtnTextFollowerItem") : t("FollowerBtnTextFollowerItem")}
            </Button>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </Link>
  );
}

RelationshipItem.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  isFollowing: PropTypes.bool,
  me: PropTypes.bool,

  onFollowClick: PropTypes.func
}

RelationshipItem.defaultProps = {
  id: "",
  userId: "",
  avatarUrl: "",
  username: "",
  isFollowing: false,
  me: false,

  onFollowClick: undefined
};

export default RelationshipItem;
