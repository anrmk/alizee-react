import React from "react";
import { useHistory } from "react-router-dom";
import { ABOUT_ROUTE, HELP_ROUTE, PRIVACY_ROUTE } from "../../constants/routes";

import { Box, Typography, ListItem, Link, List } from "@material-ui/core";
import useStyles from "./styles";

function Navbar({ open }) {
  const classes = useStyles({ open });
  const history = useHistory();

  return (
    <Box m={2} className={classes.root} >
      <List component="ul">
        <ListItem disableGutters>
          <Link href="#" onClick={() => history.push(ABOUT_ROUTE)}>
            About
          </Link>
        </ListItem>
        <ListItem disableGutters>
          <Link href="#" onClick={() => history.push(HELP_ROUTE)}>
            Help
          </Link>
        </ListItem>
        <ListItem disableGutters>
          <Link href="#">API</Link>
        </ListItem>
        <ListItem disableGutters>
          <Link href="#" onClick={() => history.push(PRIVACY_ROUTE)}>
            Privacy
          </Link>
        </ListItem>
        <ListItem disableGutters>
          <Link href="#">Terms</Link>
        </ListItem>
        <ListItem disableGutters>
          <Link href="#">Locations</Link>
        </ListItem>
        <ListItem disableGutters>
          <Link href="#">Top Accounts</Link>
        </ListItem>
        <ListItem disableGutters>
          <Link href="#">Language</Link>
        </ListItem>
      </List>
      <Typography variant="caption">© 2021 Studio XR </Typography>
    </Box>
  );
}

export default Navbar;
