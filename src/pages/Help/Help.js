import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Hidden } from "@material-ui/core";

import { Sidebar, Content } from "../../domain/Help/index";

import ApiContext from "../../context/ApiContext";
import { getHelp } from "../../store/actions/help";
import useStyles from "../../domain/Help/styles";
import { PublicLayout } from "../../layouts";

function Help() {
  const classes = useStyles();
  const apiClient = useContext(ApiContext);
  const help = useSelector((state) => state.help);
  const dispatch = useDispatch();

  useEffect(() => {
    if (help.data.length > 0) {
      return;
    }
    dispatch(getHelp(apiClient));
  }, [dispatch]);

  return (
    <PublicLayout>
      <Grid container spacing={4}>
        <Hidden smUp>
          <Grid item lg={9} md={8} sm={7}>
            <Content data={help?.data} />
          </Grid>
        </Hidden>
        <Grid
          item
          lg={3}
          xs={12}
          md={4}
          sm={5}
          className={classes.sidebarSection}>
          <Sidebar data={help?.data} />
        </Grid>
        <Hidden xsDown>
          <Grid item lg={9} md={8} sm={7}>
            <Content data={help?.data} />
          </Grid>
        </Hidden>
      </Grid>
    </PublicLayout>
  );
}

export default Help;
