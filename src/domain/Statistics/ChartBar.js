import React from "react";

import { Bar } from "react-chartjs-2";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@material-ui/core/";

import { useConfig, useChartData } from "./config";

import useStyles from "./styles";

function ChartPie({ dataset = [], name, date, total = "" }) {
  const classes = useStyles();

  const chartConfig = useConfig();
  const chartData = useChartData({ dataset, date });

  return (
    <Card>
      <CardHeader title={name} />
      <Divider />
      <CardContent>
        <Box className={classes.content}>
          <Bar data={chartData} options={chartConfig} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ChartPie;
