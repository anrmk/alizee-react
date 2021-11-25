import React from "react";

import { Hidden, Divider } from "@material-ui/core";
import PostTabs from "./PostTabs";
import GridGallery from "../../../components/GridGallery";
import { ProfileStatisticsMobile } from "../ProfileStatistics";
import { FOLLOW_ACCEPTED } from "../../../constants/follow_types";

function ProfileContent(props) {
  const { isOwner, items, hasMore, tabIndex, disabled, user } = props;
  const { onFetchMore, onTabChange, onItemClick, onSubscribeClick } = props;

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
        isStubShow={
          isOwner ||
          user.followStatus === FOLLOW_ACCEPTED ||
          items?.length !== 0
        }
        items={items}
        hasMore={hasMore}
        onFetchMore={onFetchMore}
        onItemClick={onItemClick}
        onSubscribeClick={onSubscribeClick}
      />
    </>
  );
}

export default ProfileContent;
