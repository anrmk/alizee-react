import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  LinearProgress,
  Box,
} from "@material-ui/core/";

import ChatIcon from "@material-ui/icons/ChatOutlined";

import Avatar from "../../components/Avatar";

import DisplayName from "../../components/DisplayName";

import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import SidebarList from "./SidebarList";
import HeaderSidebarList from "./HeaderSidebarList";

import useStyles from "./styles";
import SearchInput from "../Search";

function Sidebar({
  user,
  selectedItemId,
  items,
  roomsHasMore,
  loading,

  onRoomsFetchMore,
  onSearchChange,
  onItemClick,
  onNewChatClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isSearch, setIsSearch] = useState();

  const handleSearch = (val) => {
    // setIsSearch(val !== "");

    onSearchChange && onSearchChange(val || null);
  };

  return (
    <Card className={clsx(classes.card, classes.sideBarRoot)}>
      <CardHeader
        avatar={
          <Link to={PROFILE_USERNAME_ROUTE(user.userName)}>
            <Avatar src={user.avatarUrl} />
          </Link>
        }
        title={
          <Box display="flex" justifyContent="space-between">
            <DisplayName
              name={user.name}
              userName={user.userName}
              identityVerified={user.identityVerified}
              noWrap={false}
              alignItems="flex-start"
            />
            <IconButton aria-label="new chat" onClick={onNewChatClick}>
              <ChatIcon />
            </IconButton>
          </Box>
        }
      />
      {loading && <LinearProgress />}
      <Divider />

      <CardContent>
        <SearchInput loading={loading} onSendQuery={handleSearch} />
      </CardContent>
      <CardContent className={classes.cardContent}>
        {isSearch ? (
          <HeaderSidebarList
            items={items}
            selectedItemId={selectedItemId}
            onItemClick={onItemClick}
          />
        ) : (
          <SidebarList
            items={items}
            selectedItemId={selectedItemId}
            hasMore={roomsHasMore}
            onFetchMore={onRoomsFetchMore}
            onItemClick={onItemClick}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Sidebar;
