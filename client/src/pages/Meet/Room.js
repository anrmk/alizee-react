import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, IconButton, Hidden, Typography } from "@material-ui/core";

import CloseIcon from '@material-ui/icons/Close';

import { StreamTabs } from "../../domain/Meet"
import { Video } from "../../components/Video";
import useViewport from "../../hooks/useViewport";
import { BREAKPOINT_LG } from "../../constants/breakpoints"
import useStyles, { StyledDrawer } from "./styles";

function Room(props) {
  const data = undefined;

  const classes = useStyles();
  const { t } = useTranslation();

  const { roomId } = useParams();
  const { user } = props;

  const [stream, setStream] = useState();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width } = useViewport();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          mandatory: {
            minWidth: 208,
            minHeight: 117,
            maxWidth: 208,
            maxHeight: 117
          }
        },
        audio: true 
      })
      .then((stream) => {
        setStream(stream);
      });
  }, []);

  useEffect(() => {
    if (width > BREAKPOINT_LG && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [width])

  const toggleDrawer = () => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleMessageCreate = async (message) => {
    console.log("handleMessageCreate", message);
  };

  return (
    <>
      <Grid className={classes.roomBox}>

        <Grid item className={classes.roomBoxVideo}>
          <Typography variant="h5" gutterBottom align="center">
            {t("MeetRoomTitle")}
          </Typography>

          <Video
            classVideoName={classes.roomVideo}
            key={roomId}
            stream={stream}
            onOpenDrawer={toggleDrawer}
          />

          <Typography variant="body1" className={classes.roomDescription}>
            {t("MeetRoomDescription")}
          </Typography>
        </Grid>

        <Hidden mdDown>
          <Grid item className={classes.roomBoxTabs}>
            <StreamTabs
              user={user}
              data={data}
              onMessageCreate={handleMessageCreate} />
          </Grid>
        </Hidden>

      </Grid>

      <StyledDrawer
        anchor="right"
        variant="persistent"
        transitionDuration={0}
        open={isDrawerOpen}>

        <IconButton
          className={classes.roomBoxDrawerCloseButton}
          onClick={toggleDrawer()}>
          <CloseIcon />
        </IconButton>

        <StreamTabs
          user={user}
          data={data}
          drawerTabChatMessageList={true}
          onMessageCreate={handleMessageCreate} />

      </StyledDrawer>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: {
      id: state.signIn?.userInfo?.id,
      username: state.signIn?.userInfo?.userName,
      name: state.signIn?.userInfo?.name,
      avatarUrl: state.signIn?.userInfo?.avatarUrl
    }
  };
}

export default connect(mapStateToProps)(Room);
