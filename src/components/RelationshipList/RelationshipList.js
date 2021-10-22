import React from "react";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { List } from "@material-ui/core";

import RelationshipItem from "./RelationshipItem";
import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

const RelationshipList = React.memo(
  ({
    items,
    currentUserName,
    onSubscribeClick,
    onConfirmClick,
    onRejectClick,
    onUnrejectClick,
    onFavoriteClick,
    hasMore,
    onRefresh,
    onFetchMore,
  }) => {
    const history = useHistory();

    const handleChangeRouteClick = (userName) => {
      history.push(PROFILE_USERNAME_ROUTE(userName));
    };
    return (
      <>
        {items && items.length > 0 && (
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
                  isFollow={item.isFollow}
                  isFavorite={item.isFavorite}
                  status={item.status}
                  subscriptionPrice={item.subscriptionPrice}
                  identityVerified={item.identityVerified}
                  isMe={item.userName === currentUserName}
                  onSubscribeClick={onSubscribeClick}
                  onConfirmClick={onConfirmClick}
                  onRejectClick={onRejectClick}
                  onUnrejectClick={onUnrejectClick}
                  onFavoriteClick={onFavoriteClick}
                  onItemClick={handleChangeRouteClick}
                />
              ))}
            </List>
          </InfiniteScroll>
        )}
      </>
    );
  }
);

export default RelationshipList;
