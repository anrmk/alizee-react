import React from "react";
import {Link} from "react-router-dom";

import PropTypes from "prop-types";
import { List, ListSubheader } from "@material-ui/core";

import RelationshipItem from "./RelationshipItem";
import { PROFILE_ROUTE, POST_ROUTE, SUGESTED_PEOPLE } from "../../constants/routes";

import useStyles from "./styles";

function RelationshipList({ items, currentUserId, onFollowClick }) {
  const classes = useStyles();

  return (
    <List dense={true} className={classes.root}>
      {items &&
        items.map((item) => (
          <RelationshipItem
            key={item?.id}
            id={item?.id}
            userId={item?.userId}
            avatarUrl={item?.avatarUrl}
            username={item?.userName}
            isFollowing={item?.isFollowing}
            me={item?.userId === currentUserId}
            onFollowClick={onFollowClick}
          />
        ))}
    </List>
  );
}

RelationshipList.propTypes = {
  items: PropTypes.array,
  currentUserId: PropTypes.string,
  onFollowClick: PropTypes.func,
};

RelationshipList.defaultProps = {
  items: [],
  currentUserId: "",
  onFollowClick: undefined,
};

export default RelationshipList;
