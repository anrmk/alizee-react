import React from "react";

import { List } from "@material-ui/core";
import RelationshipItem from "./RelationshipItem";
import useStyles from "./styles";

const RelationshipList = React.memo(
  ({ items, wide, currentUserName, onSubscribeClick, onConfirmClick, onRejectClick, onUnrejectClick }) => {
    const classes = useStyles();

    return (
      <List dense className={classes.root}>
        {items &&
          items.map((item) => (
            <RelationshipItem
              key={item.id}
              wide={wide}
              name={item.name}
              userName={item.userName}
              avatarUrl={item.avatarUrl}
              coverUrl={item.coverUrl}
              subtitle={item.mood || `@${item.userName}`}
              isFollow={item.isFollow}
              status={item.status}
              ranking={item.ranking}
              subscriptionPrice={item.subscriptionPrice}
              isMe={item.userName === currentUserName}
              onSubscribeClick={onSubscribeClick}
              onConfirmClick={onConfirmClick}
              onRejectClick={onRejectClick}
              onUnrejectClick={onUnrejectClick}
            />
          ))}
      </List>
    );
  }
);

export default RelationshipList;
