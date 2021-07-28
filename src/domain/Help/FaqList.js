import React from "react";

import { Box, Typography, Divider } from "@material-ui/core";

import FaqQuestionList from "./FaqQuestionList";

function FaqList({ data = [] }) {
  return (
    <>
      {data.map((item) => (
        <Box key={item.id} mb={3}>
          <Typography variant="h5">{item.name}</Typography>
          {item.subtitle && (
            <Typography variant="subtitle1" color="textSecondary">
              {item.subtitle}
            </Typography>
          )}

          {item.childs.map(
            (el) =>
              el.articles.length > 0 && (
                <React.Fragment key={el.id}>
                  <Box
                    pt={1}
                    pb={1}
                    id={el.name.replace(/\s+/g, "-").toLowerCase()}>
                    <Typography variant="h6">{el.name}</Typography>
                    <FaqQuestionList data={el.articles} />
                  </Box>
                  <Divider />
                </React.Fragment>
              )
          )}
        </Box>
      ))}
    </>
  );
}

export default FaqList;
