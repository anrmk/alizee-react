import React, { useEffect, useContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Hidden } from "@material-ui/core";

import { Sidebar, Content } from "../../domain/Help/index";

import ApiContext from "../../context/ApiContext";

import { getHelp } from "../../store/actions/help";

import ContainerLayout from "../Layouts/ContainerLayout";

import useStyles from "../../domain/Help/styles";


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
    <ContainerLayout>
      <Box className={classes.section}>
        <Grid container spacing={4}>
          <Hidden smUp>
            <Grid item md={7} lg={9} md={8} sm={7}>
              <Content data={help?.data} />
            </Grid>
          </Hidden>
          <Grid item md={5} lg={3} xs={12} md={4} sm={5} className={classes.sidebarSection}>
            <Sidebar data={help?.data} />
          </Grid>
          <Hidden xsDown>
            <Grid item md={7} lg={9} md={8} sm={7}>
              <Content data={help?.data} />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </ContainerLayout>
  );
}

export default Help;
