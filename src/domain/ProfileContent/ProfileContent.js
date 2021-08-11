import React from "react";

import { Hidden, Divider } from "@material-ui/core";
import PostTabs from "./PostTabs";
import GridGallery from "../GridGallery";
import { ProfileStatisticsMobile } from "../ProfileStatistics";

function ProfileContent(props) {
  const { isOwner, items, hasMore, tabIndex, disabled, user } = props;
  const { onFetchMore, onTabChange, onItemClick, onSubscribeClick } = props;

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user);
  };

  return (
    <>
      <Hidden mdUp>
        <Divider />
        <ProfileStatisticsMobile
          isOwner={isOwner}
          userName={user.userName}
          followersCount={user?.followersCount}
          followingsCount={user?.followingsCount}
          favoritesCount={user?.favoritesCount}
        />
        <Divider />
      </Hidden>

      <PostTabs
        isOwner={isOwner}
        index={tabIndex}
        onTabChange={onTabChange}
        disabled={disabled}
      />
      <GridGallery
        isStubShow={!user.isFollow && !isOwner}
        items={items}
        hasMore={hasMore}
        onFetchMore={onFetchMore}
        onItemClick={onItemClick}
        onSubscribeClick={handleSubscribeClick}
      />
    </>
  );
}

export default ProfileContent;
