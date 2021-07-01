import React from "react";

import PostTabs from "./PostTabs";
import GridGallery from "../GridGallery";
import { ProfileStatisticsMobile } from "../ProfileStatistics";

import { Hidden, Divider } from "@material-ui/core";

function ProfileContent(props) {
  const { isOwner, items, hasMore, tabIndex, disabled, user } = props;
  const { onFetchMore, onTabChange, onItemClick } = props;

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

      <PostTabs isOwner={isOwner} index={tabIndex} onTabChange={onTabChange} disabled={disabled} />
      <GridGallery items={items} hasMore={hasMore} onFetchMore={onFetchMore} onItemClick={onItemClick} />
    </>
  );
}

export default ProfileContent;
