import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Typography, GridList, GridListTile, FormControl, TextField, InputAdornment, Box } from "@material-ui/core";

import { CreateTools } from "../../../components/Post";

import useStyles from "./styles";
import { CREATE_POST_DIALOG_TYPE } from "../../../constants/dialogs";

const MEDIA_ID = "medias";
const DESCRIPTION_ID = "description";
const COMMENTABLE_ID = "commentable";
const PRIVATE_ID = "private";
const AMOUNT_ID = "amount";

const schema = yup.object().shape({
  [MEDIA_ID]: yup
    .array()
    .min(1, "Medias must be at list 1")
    .max(12)
    .required("Media is required"),
  [DESCRIPTION_ID]: yup
    .string()
    .max(255, "Must be no more than 255 characters"),
  [COMMENTABLE_ID]: yup
    .boolean(),
  [PRIVATE_ID]: yup
    .boolean(),
  [AMOUNT_ID]: yup
    .number()
    .min(0)
    .notRequired()
});

export default function CreatePost({
  formId,

  onSubmit
}) {
  const classes = useStyles();
  const { errors, register, setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [MEDIA_ID]: [],
      [DESCRIPTION_ID]: "",
      [COMMENTABLE_ID]: true,
      [PRIVATE_ID]: false,
      [AMOUNT_ID]: 0
    }
  });
  const mediaWatcher = watch(MEDIA_ID, []);
  const commentableWatcher = watch(COMMENTABLE_ID);
  const privateWatcher = watch(PRIVATE_ID);

  useEffect(() => {
    register({ name: MEDIA_ID });
    register({ name: COMMENTABLE_ID });
    register({ name: PRIVATE_ID });

    return () => {
      mediaWatcher.forEach(file => URL.revokeObjectURL(file.previewUrl));
      setValue(MEDIA_ID, []);
    }
  }, [])

  const handleFormSubmit = (data) => {
    onSubmit && onSubmit(CREATE_POST_DIALOG_TYPE, data);
  };

  const handleToolsChange = (e) => {
    var target = e.currentTarget;
    switch (target.type) {
      case "button":
        console.log("TARGET", target.name);
        if (target.name === COMMENTABLE_ID) {
          setValue(target.name, !commentableWatcher);
        } else if (target.name === PRIVATE_ID) {
          setValue(target.name, !privateWatcher);
        }
        break;
      case "file":
        const files = target.files;

        if (files.length > 0) {
          const mediaFiles = [...files];
          mediaFiles.forEach((file) => (file.previewURL = URL.createObjectURL(file)));
          setValue(MEDIA_ID, mediaFiles);
        }
        break;
    }
  };


  return (
    <form id={formId} className={classes.root} onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
      <FormControl variant="filled" fullWidth>
        <Controller
          name={DESCRIPTION_ID}
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              autoFocus
              variant="filled"
              placeholder="Write a caption..."
              multiline
              rows={5}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={!!errors[DESCRIPTION_ID]}
              helperText={errors[DESCRIPTION_ID]?.message}
              inputProps={{ maxLength: 255 }} />
          )} />
      </FormControl>
      <Typography color="error">
        {errors[MEDIA_ID]?.message}
      </Typography>
      <Box display="flex" flexWrap="wrap" mt={1}>
        <FormControl className={classes.inputText} variant="filled">
          <Controller
            name={AMOUNT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField 
                fullWidth
                size="small"
                placeholder="Amount"
                variant="outlined"
                inputMode="numeric"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }} />
            )} />
        </FormControl>
        <CreateTools
          privateBtnName={PRIVATE_ID}
          commentBtnName={COMMENTABLE_ID}
          isPrivate={privateWatcher}
          isCommentable={commentableWatcher}
          onChange={handleToolsChange}
        />
      </Box>
      {mediaWatcher.length > 0 && (
        <GridList cellHeight={120} cols={4} spacing={1}>
          {mediaWatcher.map((item) => (
            <GridListTile key={item.name} cols={1} rows={1}>
              <img src={item.previewURL} alt={item.name} />
            </GridListTile>
          ))}
        </GridList>
      )}
    </form>
  );
}
