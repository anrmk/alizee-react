import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Button,
  Container,
  Card,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import ApiContext from "../context/ApiContext";
import * as relationshipActions from "../store/actions/relationship";
import SearchInput from "../domain/Search";

import { PROFILE_USERNAME_ROUTE } from "../constants/routes";
import { formatDate } from "../helpers/functions";
import useBlockDialog from "../hooks/useBlockDialog";
import useUsersSearch from "../hooks/useUsersSearch";

function BlackList({ me, blocked, fetchBlocked }) {
  const apiClient = useContext(ApiContext);
  const blockDialog = useBlockDialog();
  const { onSearch, onFetchMore, onClearInput } = useUsersSearch(fetchBlocked);

  useEffect(() => {
    fetchBlocked(apiClient);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={
            <Link to={PROFILE_USERNAME_ROUTE(me.userName)}>
              <Avatar src={me.avatarUrl} />
            </Link>
          }
          title={me.name}
          subheader={`Blocked [${blocked.data?.length}]`}
        />
        <CardHeader
          title={
            <SearchInput onSendQuery={onSearch} onClearInput={onClearInput} />
          }
        />
      </Card>

      <InfiniteScroll
        scrollThreshold={1}
        dataLength={blocked.data?.length}
        next={onFetchMore}
        hasMore={blocked.hasMore}>
        <List dense>
          {blocked.data &&
            blocked.data.map((item) => (
              <ListItem
                alignItems="flex-start"
                key={`blf_${item.userName}`}
                to={PROFILE_USERNAME_ROUTE(item.userName)}>
                <ListItemAvatar>
                  <Avatar src={item.avatarUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`${item.userName} - ${formatDate(
                    item.createdDate
                  )}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      blockDialog.toggle({
                        userName: item.userName,
                        isBlocked: item.isBlocked,
                      })
                    }>
                    {item.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </InfiniteScroll>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    me: {
      userName: state.signIn?.userInfo.userName,
      name: state.signIn?.userInfo.name,
      avatarUrl: state.signIn?.userInfo.avatarUrl,
    },
    blocked: {
      data: state.users.data,
      isFetching: state.users.isFetching,
      hasMore: state.users.hasMore,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBlocked: (api, userName, query) =>
      dispatch(relationshipActions.getBlocked(api, userName, query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlackList);
