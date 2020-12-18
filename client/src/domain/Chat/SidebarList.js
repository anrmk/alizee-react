import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { List, CircularProgress } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/ChatOutlined";

import SidebarListItem from "./SidebarListItem";
import Empty from "../../components/Chat/Empty";

import useStyles from "./styles";

function SidebarList({
  isLoading,
  items,
  selectedItemId,

  onItemClick,
  onActionClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <List className={classes.sidebarList}>
      {items && items.length ? (
        items.map((item) => (
          <SidebarListItem
            id={item.id}
            key={item.id}
            fullName={item.name}
            avatarUrl={item.avatarUrl}
            description={item.lastMessage}
            date={item.offlineDate}
            newMessages={item.unreadMessageCount}
            selected={selectedItemId === item.id}
            onItemClick={onItemClick}
            onActionClick={onActionClick}
          />
        ))
      ) : isLoading ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <Empty
          title={t("ChatChatListEmptyTitle")}
          subTitle={t("ChatChatListEmptySubtitle")}
          iconComponent={<ChatIcon fontSize="large" />}
        />
      )}
    </List>
  );
}

SidebarList.propTypes = {
  isLoading: PropTypes.bool,
  selectedItemId: PropTypes.string,
  items: PropTypes.array,

  onItemClick: PropTypes.func,
  onActionClick: PropTypes.func,
};

SidebarList.defaultProps = {
  isLoading: false,
  selectedItemId: undefined,
  items: [],

  onItemClick: undefined,
  onActionClick: undefined,
};

export default SidebarList;
