import React, { useEffect, useContext } from "react";

import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";

import ApiContext from "../../context/ApiContext";
import { getNotificationsList, resetCurrentNotificationList } from "../../store/actions/notification";

import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Box } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ChevronRightIcon from "@material-ui/icons/ChevronRightOutlined";

import { POST_ID_ROUTE, PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./styles";

function Content({ data = [], onChangeType }) {
  const classes = useStyles();

  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();

  const history = useHistory();
  const params = useParams();

  const handleChangeRoute = (params) => {
    if (params.postId) {
      history.push(POST_ID_ROUTE(params.postId));
    } else {
      history.push(PROFILE_USERNAME_ROUTE(params.userName));
    }
  };

  useEffect(() => {
    onChangeType(params.contentId);
  }, [params.contentId]);

  useEffect(() => {
    dispatch(getNotificationsList(apiClient));
    return () => {
      dispatch(resetCurrentNotificationList());
    };
  }, [params.contentId]);

  return (
    <Box className={classes.section}>
      <List>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem
              className={classes.listItem}
              alignItems="flex-start"
              onClick={() => {
                handleChangeRoute({ postId: item.postId, userId: item.userName });
              }}
            >
              {!item?.status && <FiberManualRecordIcon color="primary" className={classes.icon} />}

              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography variant="subtitle1" color="textPrimary">
                      {item.name}
                    </Typography>
                    <Typography component="span" variant="body1">
                      {item.description}
                    </Typography>
                  </>
                }
                secondary={item.createdDate}
              />
              <ChevronRightIcon />
            </ListItem>

            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default Content;
