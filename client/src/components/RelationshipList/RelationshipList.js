import React from "react";

import PropTypes from "prop-types";
import { List } from "@material-ui/core";

import RelationshipItem from "./RelationshipItem";

import useStyles from "./styles";

function RelationshipList(props) {
  const { items, currentUserName, onFollowClick } = props;
  const classes = useStyles();

  const handleFollowClick = (e, item) => {
    e.preventDefault();
    onFollowClick && onFollowClick(item);
  };

  return (
    <List dense={true} className={classes.root}>
      {items &&
        items.map((item) => (
          <RelationshipItem
            key={item.id}
            avatarUrl={item.avatarUrl}
            title={item.fullName}
            subtitle={item.userName}
            isFollow={item.isFollow}
            isMe={item.userName === currentUserName}
            onFollowClick={(e) => handleFollowClick(e, item)}
          />
        ))}
    </List>
  );
}

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
