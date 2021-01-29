import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";

import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";

import meetImage from "../../../src/assets/img/meet_image.jpg";
import useStyles from "./styles";

const LINK_CODE_ID = "linkCode";

const EMPTY_VALUE_ERROR = "It is a required filed";

const schema = yup.object().shape({
  [LINK_CODE_ID]: yup.string().required(EMPTY_VALUE_ERROR),
});

function Meeting() {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [LINK_CODE_ID]: "",
    },
  });

  const handleCreate = () => {
    history.push(`/room`);
  };

  const handleJoinInputSubmit = (data) => {
    history.push(`/room/${data[LINK_CODE_ID]}`);
  };

  return (
    <Container className={classes.meetingContainer}>
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid item container direction="column" justify="center" xs={10} md={6} className={classes.meetingLinkItem}>
          <Typography variant="h4" align="left" paragraph>
            {t("MeetMeetingTitle")}
          </Typography>
          <Typography variant="body2" align="left" paragraph>
            {t("MeetMeetingSubtitle")}
          </Typography>

          <Grid item container direction="row" alignItems="center" className={classes.meetingLinkBox} spacing={4}>
            <Grid item>
              <Button size="large" variant="contained" className="primary" onClick={handleCreate}>
                <VideocamOutlinedIcon />
                {t("MeetMeetingNewMeetingButtonLabel")}
              </Button>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit(handleJoinInputSubmit)}>
                <Controller
                  name={LINK_CODE_ID}
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder={t("MeetMeetingLinkInputPlaceholder")}
                      type="text"
                      id={LINK_CODE_ID}
                      value={value}
                      error={!!errors[LINK_CODE_ID]}
                      helperText={errors[LINK_CODE_ID]?.message}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value.trim())}
                    />
                  )}
                />
              </form>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column" justify="center" xs={8} md={6} className={classes.meetingImageItem}>
          <Paper className={classes.meetingImagePaper}>
            <img className={classes.meetingImage} src={meetImage} alt="" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Meeting;
