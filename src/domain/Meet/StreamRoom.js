import React from "react";
import clsx from "clsx";

import { Container, Card, CardContent, CardHeader, Divider, Hidden, IconButton, withWidth } from "@material-ui/core";

import ChatIcon from "@material-ui/icons/Chat";

import StreamTabs from "./StreamTabs";
import Avatar from "../../components/Avatar";
import { Video } from "../../components/Video";
import SlidingViews from "../../components/SlidingViews";

import useSlidingViews, { RIGHT_OPEN_TYPE } from "../../hooks/useSlidingViews";
import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

function StreamRoom(props) {
  const classes = useStyles();
  const { stream, streamData, user, isPeerToPeer = false, roomId, width } = props;
  const { currentSlidingViewsState, toggleSlidingViewsState } = useSlidingViews(RIGHT_OPEN_TYPE);

  const handleMessageCreate = async (message) => {
    console.log("handleMessageCreate", message);
  };

  const handleSlidingViewToggle = () => {
    toggleSlidingViewsState();
  };

  return (
    <Container>
      <SlidingViews
        mobileOnly
        currentState={currentSlidingViewsState}
        firstSize={["md"].includes(width) ? 7 : 8}
        secondSize={["md"].includes(width) ? 5 : 4}
      >
        <Card className={classes.roomVideoBox}>
          <CardHeader
            avatar={<Avatar src={streamData ? streamData.avatarUrl : user.avatarUrl} />}
            title={streamData ? streamData.name: user.username}
            subheader={streamData?.showActivity && (streamData.offlineDate ? formatDate(streamData.offlineDate) : "online")}
            action={
              <Hidden mdUp>
                <IconButton aria-label="new chat" onClick={handleSlidingViewToggle}>
                  <ChatIcon />
                </IconButton>
              </Hidden>

            }
          />
          <Divider />
          <CardContent>
            <Video
              classVideoName={clsx(classes.roomVideo, isPeerToPeer && classes.roomVideoDivider)}
              key={roomId}
              stream={stream}
              controls={false}
            />
            {isPeerToPeer && (
              <Video
                classVideoName={classes.roomVideo}
                key={`${roomId} + second`}
                stream={stream}
                controls={false}
                customControls={false}
              />
            )}
          </CardContent>
        </Card>

        <StreamTabs
          user={user}
          data={streamData}
          onClose={handleSlidingViewToggle}
          onMessageCreate={handleMessageCreate}
        />
      </SlidingViews>
    </Container>
  );
}

export default withWidth()(StreamRoom);
