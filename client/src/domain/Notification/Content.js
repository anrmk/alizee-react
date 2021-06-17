import React from "react";
import { useHistory } from "react-router";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Divider,
  Box,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ChevronRightIcon from "@material-ui/icons/ChevronRightOutlined";

import Avatar from "../../components/Avatar";
import DisplayName from "../../components/DisplayName";

import { POST_ID_ROUTE, PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { ACTIVITY_LOG_TYPE } from "../../constants/activity";
import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

function Content({ data = [] }) {
  const history = useHistory();

  return (
    <List dense>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem button onClick={() => history.push(PROFILE_USERNAME_ROUTE(item.userName))}>
            {/* {!!item.status !== true && <FiberManualRecordIcon color="primary" className={classes.icon} />} */}

            <ListItemAvatar>
              <Avatar src={item.avatarUrl} alt={item.name} borderColor="silver" />
            </ListItemAvatar>

            <ListItemText
              primary={
                <>
                  <DisplayName name={item.name} userName={item.userName} identityVerified={true} />
                  <Typography component="span" variant="body1">
                    {ACTIVITY_LOG_TYPE[item.type]}
                  </Typography>
                </>
              }
              secondary={formatDate(item.createdDate)}
            />

            {item.relatedPostId ? (
              <ListItemSecondaryAction>
                <Button edge="end" variant="outlined" onClick={() => history.push(POST_ID_ROUTE(item.relatedPostId))}>
                  Post
                </Button>
              </ListItemSecondaryAction>
            ) : (
              <ChevronRightIcon />
            )}
          </ListItem>

          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

export default Content;
