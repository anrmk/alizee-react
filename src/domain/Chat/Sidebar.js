import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
} from "@material-ui/core/";

import ChatIcon from "@material-ui/icons/ChatOutlined";

import { Search } from "../../components/Search";
import Avatar from "../../components/Avatar";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import SidebarList from "./SidebarList";

import useStyles from "./styles";

function Sidebar({
  isLoading,
  user,
  selectedItemId,
  items,

  onSearchChange,
  onItemClick,
  onNewChatClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Link to={PROFILE_USERNAME_ROUTE(user.userName)}>
            <Avatar src={user.avatarUrl} />
          </Link>
        }
        title={user.name}
        subheader={user.userName}
        action={
          <IconButton aria-label="new chat" onClick={onNewChatClick}>
            <ChatIcon />
          </IconButton>
        }
      />
      <Divider />

      <CardContent>
        <Search
          placeholder={t("ChatSidebarSearchInputLabel")}
          onChange={onSearchChange}
        />
      </CardContent>
      <CardContent className={classes.cardContent}>
        <SidebarList
          isLoading={isLoading}
          items={items}
          selectedItemId={selectedItemId}
          onItemClick={onItemClick}
        />
      </CardContent>
    </Card>
  );
}

export default Sidebar;
