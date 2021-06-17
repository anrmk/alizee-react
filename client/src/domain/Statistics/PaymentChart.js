import React, { useState } from "react";
import clsx from "clsx";
// import { Bar } from "react-chartjs-2";
import { useResizeDetector } from "react-resize-detector";
import { Box, Card, CardContent, Link, Typography } from "@material-ui/core/";

import useStyles from "./styles";

export const FILTER_BY_TODAY = "today";
export const FILTER_BY_WEEK = "week";
export const FILTER_BY_MONTH = "month";

function PaymentChart({ data, onDateClick }) {
  const classes = useStyles();
  const { ref } = useResizeDetector();
  const [activeDate, setActiveDate] = useState(FILTER_BY_TODAY);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Other",
        maxBarThickness: 100,
        data: data.otherTotal,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Tips",
        maxBarThickness: 100,
        data: data.tipsTotal,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Posts",
        maxBarThickness: 100,
        data: data.postsTotal,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            callback: (value) => {
              return "$" + value;
            },
          },
        },
      ],
    },
  };

  const handleDateClick = (type) => {
    setActiveDate(type);
    onDateClick && onDateClick(type);
  };

  const renderBtn = (text, type) => (
    <Typography
      className={clsx(classes.dateBtn, type === activeDate && classes.active)}
      onClick={() => handleDateClick(type)}
      component={Link}
    >
      {text}
    </Typography>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
          Payment
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total Amount
        </Typography>
        <Typography variant="h5">$ {data.total || 0}</Typography>
        <Box display="flex" justifyContent="flex-end">
          {renderBtn("Today", FILTER_BY_TODAY)}
          {renderBtn("Week", FILTER_BY_WEEK)}
          {renderBtn("Month", FILTER_BY_MONTH)}
        </Box>
        <Box className={classes.content} ref={ref}>
          {/* <Bar redraw data={chartData} options={chartOptions} /> */}
        </Box>
      </CardContent>
    </Card>
  );
}

export default PaymentChart;
