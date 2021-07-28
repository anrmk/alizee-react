import React from "react";
import { useTranslation } from "react-i18next";

import { List, Typography } from "@material-ui/core";
import SidebarListItem from "./SidebarListItem";

import useStyles from "./styles";

function SidebarList({
  isLoading,
  items,
  selectedItemId,

  onItemClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      {items && items.length ? (
        <List className={classes.sidebarList} disabled>
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
    </>
  );
}

export default SidebarList;
