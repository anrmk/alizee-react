import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Grid, Hidden } from "@material-ui/core";

import Sidebar from "./Sidebar";
import { FaqDetails } from "./Faq";

import ApiContext from "../../context/ApiContext";

import { PublicLayout } from "../../layouts";

import {
  createHelpRating,
  getHelp,
  getHelpDetail,
  deleteHelpRating,
} from "../../store/actions/help";
import { isEmptyObject } from "../../helpers/functions";

import useStyles from "./styles";

const HelpDetails = () => {
  const classes = useStyles();

  const apiClient = useContext(ApiContext);

  const help = useSelector((state) => state.help);
  const helpDetails = useSelector((state) => state.help.helpDetails);

  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (help.data.length > 0) {
      return;
    }
    dispatch(getHelp(apiClient));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHelpDetail(apiClient, params.currentQuestion));
  }, [dispatch, params.currentQuestion]);

  const handleVote = (id, boolean) => {
    if (boolean) {
      dispatch(createHelpRating(apiClient, id));
    } else {
      dispatch(deleteHelpRating(apiClient, id));
    }
  };

  return (
    <PublicLayout>
      <Grid container spacing={4}>
        <Hidden xsDown>
          <Grid item lg={3} xs={12} md={4} sm={5}>
            <Sidebar data={help?.data} />
          </Grid>
        </Hidden>
        <Grid item lg={9} md={8} sm={7}>
          {!isEmptyObject(helpDetails) && (
            <FaqDetails
              {...helpDetails}
              onVote={handleVote}
              isVoted={help.isVoted}
              data={help?.data}
              currentQuestion={params.currentQuestion}
            />
          )}
        </Grid>
      </Grid>
    </PublicLayout>
  );
};

export default HelpDetails;
