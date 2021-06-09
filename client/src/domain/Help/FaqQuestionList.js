import React from "react";
import { useHistory } from "react-router-dom";

import { Grid, Link, Box } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function FaqQuestionList({ data = [], currentQuestion }) {
  const history = useHistory();

  return (
    <Grid container spacing={1}>
      {data.map((item) =>
        item.handle !== currentQuestion ? (
          <Grid xs={12} md={6} item key={item.id}>
            <Box display="flex" alignItems="center">
              <ArrowForwardIcon fontSize="small" color="primary" />
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/help/${item.handle}`);
                }}
              >
                {item?.title}
              </Link>
            </Box>
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default FaqQuestionList;
