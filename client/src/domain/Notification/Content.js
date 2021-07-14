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
  Hidden,
} from "@material-ui/core";
//import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ChevronRightIcon from "@material-ui/icons/ChevronRightOutlined";

import Avatar from "../../components/Avatar";
import DisplayName from "../../components/DisplayName";

import { POST_ID_ROUTE, PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { ACTIVITY_LOG_TYPE } from "../../constants/activity";
import { formatDate } from "../../helpers/functions";

function Content({ data = [] }) {
  const history = useHistory();

  return (
    <List dense disablePadding>
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
                  <Hidden smUp>
                    <DisplayName name={item.name} userName={item.userName} identityVerified={true} noWrap={false} />
                  </Hidden>
                  <Hidden xsDown>
                    <DisplayName name={item.name} userName={item.userName} identityVerified={true} />
                  </Hidden>

                  <Typography component="span" variant="body2">
                    {ACTIVITY_LOG_TYPE[item.type]}
                  </Typography>
                  {item.description && (
                    <Typography component="span" variant="body2">
                      : {item.description}
                    </Typography>
                  )}
                </>
              }
              secondary={formatDate(item.createdDate)}
            />

            <Hidden xsDown>
              {item.relatedPostId ? (
                <ListItemSecondaryAction>
                  <Button edge="end" variant="outlined" onClick={() => history.push(POST_ID_ROUTE(item.relatedPostId))}>
                    Post
                  </Button>
                </ListItemSecondaryAction>
              ) : (
                <ChevronRightIcon />
              )}
            </Hidden>
            <Hidden smUp>
              <ChevronRightIcon />
            </Hidden>
          </ListItem>

          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

export default Content;
