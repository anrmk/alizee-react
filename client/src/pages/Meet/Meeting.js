import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";

import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';

import meetImage from "../../../src/assets/img/meet_image.jpg";
import useStyles from "./styles"
import CustomInput from "../../components/CustomInput";

const LINK_CODE_ID = "linkCode"

const EMPTY_VALUE_ERROR = "It is a required filed";

const schema = yup.object().shape({
  [LINK_CODE_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
});

function Meeting() {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  const { errors, control, getValues, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreate = () => {
    history.push(`/room`);
  }

  const handleJoinInputSubmit = (_data) => {
    history.push(`/room`);
  };

  return (
    <Container className={classes.meetingContainer} >
      <Grid container direction="row" justify="center" spacing={8}>

        <Grid item className={clsx(classes.meetingItem, classes.meetingLinkItem)} xs={10} md={6}>
          <Typography variant="h4" className={classes.title}>
            {t("MeetingHeader")}
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            {t("MeetingSubheader")}
          </Typography>

          <Grid container className={classes.meetingLinkBox} spacing={4}>
            <Grid item>
              <Button size="large"
                variant="contained"
                onClick={() => handleCreate()}>
                <VideocamOutlinedIcon />
                {t("MeetingNewMeetingButton")}
              </Button>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit(handleJoinInputSubmit)}>
                <Controller
                  name={LINK_CODE_ID}
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <CustomInput
                      type="text"
                      disableUnderline
                      placeholder={t("MeetingPlaceholderLinkInput")}
                      id={LINK_CODE_ID}
                      value={value}
                      error={!!errors[LINK_CODE_ID]}
                      onBlur={onBlur}
                      onChange={e => onChange(e.target.value.trim())}
                    />
                  )} />
              </form>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={clsx(classes.meetingItem, classes.meetingImageItem)} xs={8} md={6}>
          <Paper className={classes.meetingImagePaper}>
            <img className={classes.meetingImage} src={meetImage} alt="" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Meeting;