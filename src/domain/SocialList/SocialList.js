import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from "react-share";
import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";

import LinkIcon from "@material-ui/icons/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";

import { getUrlTo } from "../../helpers/functions";
import { POST_ID_ROUTE, PROFILE_USERNAME_ROUTE } from "../../constants/routes";
import { POST_TYPE } from "../../components/Post/Menu";

export default function SocialList({
  postId,
  userName,
  description,
  type = POST_TYPE,
}) {
  const postUrl = getUrlTo(
    type === POST_TYPE
      ? POST_ID_ROUTE(postId)
      : PROFILE_USERNAME_ROUTE(userName)
  );

  return (
    <List>
      <ListItem
        button
        url={postUrl}
        href={postUrl}
        title={userName}
        quote={description}
        resetButtonStyle={false}
        component={FacebookShareButton}>
        <ListItemIcon>
          <FacebookIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Share to Facebook" />
      </ListItem>

      <ListItem
        button
        url={postUrl}
        title={userName}
        via={description}
        resetButtonStyle={false}
        component={TwitterShareButton}>
        <ListItemIcon>
          <TwitterIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Share to Twitter" />
      </ListItem>

      <ListItem
        button
        url={postUrl}
        title={userName}
        resetButtonStyle={false}
        component={TelegramShareButton}>
        <ListItemIcon>
          <TelegramIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Share to Telegram" />
      </ListItem>

      <ListItem button onClick={() => navigator.clipboard.writeText(postUrl)}>
        <ListItemIcon>
          <LinkIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Copy" />
      </ListItem>
    </List>
  );
}
