import React from "react";

import { List } from "@material-ui/core";
import RelationshipItem from "./RelationshipItem";

const RelationshipList = React.memo(
  ({ items, currentUserName, onSubscribeClick, onConfirmClick, onRejectClick, onUnrejectClick }) => {
    return (
      <List dense>
        {items &&
          items.map((item) => (
            <RelationshipItem
              key={item.id}
              name={item.name}
              userName={item.userName}
              avatarUrl={item.avatarUrl}
              coverUrl={item.coverUrl}
              subtitle={item.mood || `@${item.userName}`}
              isFollow={item.isFollow}
              status={item.status}
              subscriptionPrice={item.subscriptionPrice}
              identityVerified={item.identityVerified}
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
