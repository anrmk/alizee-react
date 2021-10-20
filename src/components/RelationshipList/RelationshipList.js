import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { List } from "@material-ui/core";

import RelationshipItem from "./RelationshipItem";

const RelationshipList = React.memo(
  ({
    items,
    currentUserName,
    onSubscribeClick,
    onConfirmClick,
    onRejectClick,
    onUnrejectClick,
    hasMore,
    onRefresh,
    onFetchMore,
  }) =>
    items &&
    items.length > 0 && (
      <InfiniteScroll
        scrollThreshold={1}
        dataLength={items.length}
        next={onFetchMore}
        hasMore={hasMore}>
        <List dense>
          {items.map((item) => (
            <RelationshipItem
              key={item.userName}
              name={item.name}
              userName={item.userName}
              avatarUrl={item.avatarUrl}
              coverUrl={item.coverUrl}
              subtitle={item.mood || `@${item.userName}`}
              followStatus={item.followStatus}
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
      </InfiniteScroll>
    )
);

export default RelationshipList;
