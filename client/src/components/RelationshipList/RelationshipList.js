import React from "react";

import PropTypes from "prop-types";
import { List } from "@material-ui/core";

import RelationshipItem from "./RelationshipItem";

import useStyles from "./styles";

const RelationshipList = React.memo(({ items, currentUserName, onFollowClick }) => {
  const classes = useStyles();

  return (
    <List dense={true} className={classes.root}>
      {items &&
        items.map((item) => (
          <RelationshipItem
            key={item.id}
            id={item.id}
            avatarUrl={item.avatarUrl}
            title={item.fullName}
            subtitle={item.userName}
            isFollow={item.isFollow}
            isMe={item.userName === currentUserName}
            onFollowClick={onFollowClick}
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
