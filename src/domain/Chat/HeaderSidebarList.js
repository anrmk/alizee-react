import React from "react";
import { useTranslation } from "react-i18next";

import { List, ListSubheader, Typography, Box } from "@material-ui/core";
import SidebarListItem from "./SidebarListItem";

import useStyles from "./styles";

function HeaderSidebarList({
  items,
  selectedItemId,

  onItemClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      {items && items.length ? (
        <List className={classes.sidebarList} subheader={<li />}>
          {items.map((category) => (
            <Box key={category.headerName}>
              <ListSubheader>{category.headerName}</ListSubheader>
              {category.results.map((item) => (
                <SidebarListItem
                  item={item}
                  key={item.id}
                  selected={selectedItemId === item.id}
                  onItemClick={onItemClick}
                />
              ))}
            </Box>
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

export default HeaderSidebarList;
