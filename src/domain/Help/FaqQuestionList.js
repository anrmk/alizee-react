import React from "react";

import { useHistory } from "react-router-dom";

import { Grid, Link } from "@material-ui/core";

function FaqQuestionList({ data = [], currentQuestion }) {
  const history = useHistory();

  return (
    <Grid container spacing={1}>
      {data.map((item) =>
        item.handle !== currentQuestion ? (
          <Grid xs={12} md={6} item key={item.id}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                history.push(`/help/${item.handle}`);
              }}
            >
              {item?.title}
            </Link>
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default FaqQuestionList;
