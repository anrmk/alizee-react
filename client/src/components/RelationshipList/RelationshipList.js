import React from "react";
import { useHistory } from "react-router-dom";

import { List } from "@material-ui/core";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import RelationshipItem from "./RelationshipItem";

import useStyles from "./styles";

const RelationshipList = React.memo(({ items, currentUserName, onFollowClick, onConfirmClick, onRejectClick, onUnrejectClick }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <List dense={true} className={classes.root}>
      {items &&
        items.map((item) => (
          <RelationshipItem
            key={item.id}
            id={item.id}
            userName={item.userName}
            avatarUrl={item.avatarUrl}
            title={item.name}
            subtitle={item.mood || item.userName}
            isFollow={item.isFollow}
            status={item.status}
            isMe={item.userName === currentUserName}
            onFollowClick={onFollowClick}
            onConfirmClick={onConfirmClick}
            onRejectClick={onRejectClick}
            onUnrejectClick={onUnrejectClick}
            onItemClick={() => history.push(PROFILE_USERNAME_ROUTE(item.userName))}
          />
        ))}
    </List>
  );
});

export default RelationshipList;
