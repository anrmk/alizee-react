import React from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { List, Typography, Box } from "@material-ui/core";

import SidebarListItem from "./SidebarListItem";
import ROOMS_LIST_ID from "./mixins";
import useStyles from "../styles";

function SidebarList({
  items,
  selectedItemId,
  hasMore,

  onFetchMore,
  onItemClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <InfiniteScroll
      scrollThreshold={0.5}
      dataLength={items?.length}
      next={onFetchMore}
      hasMore={hasMore}
      scrollableTarget={ROOMS_LIST_ID}>
      {items && items.length ? (
        <List
          id={ROOMS_LIST_ID}
          className={classes.sidebarList}
          disabled
          component={Box}>
          {items.map((item) => (
            <SidebarListItem
              item={item}
              key={item.id}
              selected={selectedItemId === item.id}
              onItemClick={onItemClick}
            />
          ))}
        </List>
      ) : (
        <Typography variant="subtitle2">
          {t("ChatChatListEmptySubtitle")}
        </Typography>
      )}
    </InfiniteScroll>
  );
}

export default SidebarList;
