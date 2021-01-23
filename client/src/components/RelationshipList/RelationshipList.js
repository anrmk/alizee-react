import React from "react";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import { List } from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import RelationshipItem from "./RelationshipItem";

import useStyles from "./styles";

const RelationshipList = React.memo(({ items, currentUserName, onFollowClick }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <List dense={true} className={classes.root}>
      {items &&
        items.map((item) => (
          <RelationshipItem
            key={item.id}
            id={item.id}
            followId={item.followId}
            userId={item.userId}
            avatarUrl={item.avatarUrl}
            title={item.name}
            subtitle={item.mood || item.userName}
            isFollow={item.isFollow}
            isMe={item.userName === currentUserName}
            onFollowClick={onFollowClick}
            onItemClick={() => history.push(PROFILE_USERNAME_ROUTE(item.userName))}
          />
        ))}
    </List>
  );
});

RelationshipList.propTypes = {
  items: PropTypes.array,
  currentUserName: PropTypes.string,

  onFollowClick: PropTypes.func,
};

RelationshipList.defaultProps = {
  items: [],
  currentUserName: "",

  onFollowClick: undefined,
};

export default RelationshipList;
