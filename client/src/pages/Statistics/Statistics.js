import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core/";

import ApiContext from "../../context/ApiContext";
import * as activityPaymentsActions from "../../store/actions/activity";
import PaymentChart, { FILTER_BY_TODAY, FILTER_BY_WEEK, FILTER_BY_MONTH } from "../../domain/PaymentChart/PaymentChart";

import useStyles from "./styles";

function Statistics(props) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();

  const { activity: { payment } } = props;
  const { getActivityPayments } = props;

  useEffect(() => {
    (async () => {
      await getActivityPayments(apiClient);
    })();
  }, []);

  const handleDateToggleClick = async (type) => {
    let startDate = new Date();
    let endDate = new Date();
    if (type === FILTER_BY_TODAY) {
      await getActivityPayments(apiClient);
    } else if (type === FILTER_BY_WEEK) {
      startDate.setDate(startDate.getDate() - 7);
      await getActivityPayments(apiClient, { start: startDate, end: endDate });
    } else if (type === FILTER_BY_MONTH) {
      startDate.setMonth(startDate.getMonth() - 1);
      await getActivityPayments(apiClient, { start: startDate, end: endDate });
    }
  }

  return (
    <Container>
      <Typography variant="h4" className={classes.title}>Statistics</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <PaymentChart data={payment} onDateClick={handleDateToggleClick} />
        </Grid>
      </Grid>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    activity: {
      isFetching: state.activity.isFetching,
      payment: activityPaymentsActions.getActivityPaymentsChart(state)
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getActivityPayments: (api, opts) => dispatch(activityPaymentsActions.getActivityPayments(api, opts))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
