/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import { useHistory } from "react-router-dom";

import {
  Hidden,
  Box,
  Typography,
  Link,
  List,
  ListItem,
} from "@material-ui/core";

import { FaqQuestionList } from "../Faq";

const SidebarList = ({ childs = [], name = "" }) => {
  const history = useHistory();
  return (
    <List disablePadding>
      {childs.map((item) => (
        <ListItem key={item.id}>
          <Hidden xsDown>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                history.push({
                  pathname: "/help",
                  hash: `#${item.name.replace(/\s+/g, "-").toLowerCase()}`,
                });
              }}>
              {item.name}
            </Link>
          </Hidden>

          <Hidden smUp>
            <Box>
              <Typography gutterBottom variant="body1">
                {item.name}
              </Typography>
              <FaqQuestionList data={item.articles} />
            </Box>
          </Hidden>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarList;
