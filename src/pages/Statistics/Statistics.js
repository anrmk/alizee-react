import React, { useContext, useState } from "react";
import { connect } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as activityPaymentsActions from "../../store/actions/activity";

import { SortChartDate, ChartLine, ChartBar, FavoriteList } from "../../domain/Statistics";

import { FILTER_BY_DAYS, FILTER_BY_MONTHS, FILTER_BY_WEEKS, FILTER_BY_YEARS } from "../../constants/chart_sort_date";
import { monthlyDateChart, dailyDateChart, yearsDateChart, weeksDateChart } from "../../domain/Statistics/data";

import { Grid, Typography, Box } from "@material-ui/core/";

import useStyles from "./styles";

function Statistics(props) {
  const classes = useStyles();

  const apiClient = useContext(ApiContext);

  const [filter, setFilter] = useState("monthly");

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredDataByDate = () => {
    switch (filter) {
      case FILTER_BY_MONTHS:
        return monthlyDateChart;
      case FILTER_BY_DAYS:
        return dailyDateChart;
      case FILTER_BY_YEARS:
        return yearsDateChart;
      case FILTER_BY_WEEKS:
        return weeksDateChart;

      default:
        return monthlyDateChart;
    }
  };

  //   const {
  //     activity: { payment },
  //   } = props;
  //   const { getActivityPayments } = props;

  //   useEffect(() => {
  //     (async () => {
  //       await getActivityPayments(apiClient);
  //     })();
  //   }, []);

  //   const handleDateToggleClick = async (type) => {
  //     let startDate = new Date();
  //     let endDate = new Date();
  //     if (type === FILTER_BY_TODAY) {
  //       await getActivityPayments(apiClient);
  //     } else if (type === FILTER_BY_WEEK) {
  //       startDate.setDate(startDate.getDate() - 7);
  //       await getActivityPayments(apiClient, { start: startDate, end: endDate });
  //     } else if (type === FILTER_BY_MONTH) {
  //       startDate.setMonth(startDate.getMonth() - 1);
  //       await getActivityPayments(apiClient, { start: startDate, end: endDate });
  //     }
  //   };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" className={classes.title}>
            Statistics
          </Typography>
          <SortChartDate filter={filter} onFilter={handleFilter} />
        </Box>
      </Grid>

      <>
        {filteredDataByDate().charts.map((item, idx) => {
          return (
            <Grid
              item
              xs={12}
              lg={6}
              xl={
                item.name === "Income" || item.name === "Balance" || item.name === "Posts" || item.name === "Subscribe"
                  ? 6
                  : item.name === "Profile visitors"
                  ? 8
                  : 4
              }
              key={idx}
            >
              {item.name === "Profile visitors" || item.name === "Balance" ? (
                <ChartBar date={filteredDataByDate().date} name={item.name} dataset={item.dataset} total={item.total} />
              ) : (
                <ChartLine
                  date={filteredDataByDate().date}
                  name={item.name}
                  dataset={item.dataset}
                  total={item.total}
                />
              )}
            </Grid>
          );
        })}

        <Grid item xs={12} lg={6} xl={4}>
          <FavoriteList />
        </Grid>
      </>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    activity: {
      isFetching: state.activity.isFetching,
      payment: activityPaymentsActions.getActivityPaymentsChart(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getActivityPayments: (api, opts) => dispatch(activityPaymentsActions.getActivityPayments(api, opts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
