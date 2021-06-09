import React from "react";

import { Grid, Box, Typography, Divider, Button, Breadcrumbs, Link, Card, CardActions } from "@material-ui/core";

import FaqQuestionList from "./FaqQuestionList";

function FaqDetails({ title, id, content, groupId, onVote, isVoted, data = [], currentQuestion }) {
  const transformData = () => {
    return data.reduce((acc, item) => {
      const res = item.childs.filter((el) => el.id === groupId);
      if (res.length > 0) {
        return res[0].articles;
      }
      return acc;
    }, []);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/help">
            Help
          </Link>

          <Typography color="textPrimary">{title}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" component="p" color="textSecondary">
          {content}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">Related articles</Typography>
        <FaqQuestionList data={transformData()} currentQuestion={currentQuestion} />
      </Grid>

      <Divider />

      <Grid item>
        <Typography variant="h6" align="center" gutterBottom>
          Was this helpful?
        </Typography>
        <Box display="flex" justifyContent="center">
          {isVoted ? (
            <Typography variant="body1">Thank you for providing feedback!</Typography>
          ) : (
            <>
              <Box>
                <Button
                  disableElevation
                  size="medium"
                  color="primary"
                  variant="contained"
                  onClick={() => onVote(id, true)}
                >
                  Yes
                </Button>
              </Box>
              <Box marginLeft={2}>
                <Button
                  disableElevation
                  size="medium"
                  color="primary"
                  variant="outlined"
                  onClick={() => onVote(id, false)}
                >
                  No
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default FaqDetails;
