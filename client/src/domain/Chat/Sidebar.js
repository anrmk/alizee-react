import React from "react";
import PropTypes from "prop-types";

import { Card, CardContent, CardHeader, IconButton, Divider } from "@material-ui/core/";
import { useTranslation } from "react-i18next";

import Search from "../../components/Search";
import Avatar from "../../components/Avatar";

import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import ChatIcon from "@material-ui/icons/ChatOutlined";

import SidebarList from "./SidebarList";
import useStyles from "./styles";

function Sidebar({
  isLoading,
  user,
  selectedItemId,
  items,

  onSearchChange,
  onItemClick,
  onActionClick,
  onNewChatClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} online />}
        title={user.name}
        subheader={user.username}
        action={
          <IconButton aria-label="new chat" onClick={onNewChatClick}>
            <ChatIcon />
          </IconButton>
        }
      />
      <Divider />

      <CardContent>
        <Search placeholder={t("ChatSidebarSearchInputLabel")} onChange={onSearchChange} />
      </CardContent>
      <CardContent className={classes.cardContent}>
        <SidebarList
          isLoading={isLoading}
          items={items}
          selectedItemId={selectedItemId}
          onItemClick={onItemClick}
          onActionClick={onActionClick}
        />
      </CardContent>
    </Card>
  );
}

Sidebar.propTypes = {
  isLoading: PropTypes.bool,
  user: PropTypes.any,
  selectedItemId: PropTypes.any,
  items: PropTypes.array,

  onSearchChange: PropTypes.func,
  onItemClick: PropTypes.func,
  onActionClick: PropTypes.func,
  onNewChatClick: PropTypes.func,
};

PropTypes.defaultProps = {
  isLoading: false,
  user: {
    avatarUrl: "",
    name: "",
    userName: "",
  },
  selectedItemId: undefined,
  items: [],

  onSearchChange: undefined,
  onItemClick: undefined,
  onActionClick: undefined,
  onNewChatClick: undefined,
};

export default Sidebar;
