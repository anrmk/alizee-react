import React from "react";

import { useHistory } from "react-router-dom";

import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  Card,
  Box,
  CardContent,
  ListItemText,
  CardHeader,
} from "@material-ui/core/";

import useStyles from "../Charts/styles";

function FavoriteList() {
  const classes = useStyles();

  const data = [
    { name: "Natal", userName: "@Natal" },
    {
      name: "Diego",
      userName: "@Diego",
    },
    {
      name: "Dron",
      userName: "@Dron",
    },

    {
      name: "Major",
      userName: "@Major",
    },
    {
      name: "BestLover",
      userName: "@BestLover",
    },
  ];

  const history = useHistory();

  const handleChangeRoute = () => {
    history.push();
  };
  return (
    <Card>
      <CardHeader title="  Top 5 Followers" />
      <Divider />
      <CardContent>
        <Box className={classes.content}>
          <List dense disablePadding>
            {data.map((item, idx) => (
              <ListItem
                alignItems="center"
                key={idx}
                dense
                onClick={() => handleChangeRoute(item.userName)}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.userName} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}

export default FavoriteList;
