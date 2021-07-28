import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  ListItem,
  List,
  ListItemText,
} from "@material-ui/core";
import useChartConfig from "./useChartConfig";
import useChartData from "./useChartData";

import useStyles from "./styles";

const PostStatistics = ({ data, onReset }) => {
  const [chart, setChart] = useState(false);
  const chartData = useChartData(data);
  const options = useChartConfig();
  const classes = useStyles();

  useEffect(
    () => () => {
      onReset();
    },
    []
  );

  const handleLegendClick = ({ currentTarget }, index, item) => {
    chart.setDatasetVisibility(
      item.datasetIndex,
      !chart.isDatasetVisible(item.datasetIndex)
    );
    const meta = chart.getDatasetMeta(0);
    const result = meta.data[index].hidden !== true;
    if (result) {
      meta.data[index].hidden = true;
      currentTarget.style.textDecoration = "line-through";
    } else {
      currentTarget.style.textDecoration = "none";
      meta.data[index].hidden = false;
    }
    chart.update();
  };

  return (
    <Card>
      <CardHeader title="POST STATISTICS" />
      <Divider />
      <CardContent>
        <>
          <Box height="200px">
            <Line
              ref={(ref) => {
                setChart(ref);
              }}
              data={chartData}
              options={options}
            />
          </Box>
          {chart && (
            <List className={classes.root} dense>
              {chart.options.plugins.legend.labels
                .generateLabels(chart)
                .map((item, idx) => (
                  <ListItem
                    component="li"
                    autoFocus
                    button
                    divider
                    key={idx}
                    onClick={(e) => {
                      handleLegendClick(e, idx, item);
                    }}>
                    <ListItemText
                      primary={item.text.toUpperCase()}
                      secondary={
                        <Box
                          left={0}
                          top="50%"
                          bottom="50%"
                          position="absolute"
                          component="span"
                          bgcolor={item.fillStyle}
                          borderRadius="50%"
                          height="6px"
                          width="6px"
                        />
                      }
                    />
                    <Typography variant="body1">
                      {chartData.datasets[idx].total}
                    </Typography>
                  </ListItem>
                ))}
            </List>
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default PostStatistics;
