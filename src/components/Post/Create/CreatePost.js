import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  Box,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

import CreateTools from "./CreateTools";
import GridGalleryHorizontal from "../../GridGalleryHorizontal/GridGalleryHorizontal";
import ChipsInput from "../../ChipsInput";

import { POST_AMOUNT_TEXT_HELPER } from "../../../constants/form_validations";

import useStyles from "./styles";

const MEDIA_ID = "medias";
const DESCRIPTION_ID = "description";
const COMMENTABLE_ID = "commentable";
const EXPLORABLE_ID = "isExplorable";
const AMOUNT_ID = "amount";
const TAGGED_USERS_ID = "taggedUsers";
const IS_TARGET_FUNDS_ID = "isTargetFunds";

const schema = yup.object().shape({
  [MEDIA_ID]: yup.array().min(0).max(12).required("Media is required"),
  [DESCRIPTION_ID]: yup
    .string()
    .max(255, "Must be no more than 255 characters"),
  [COMMENTABLE_ID]: yup.boolean(),
  [EXPLORABLE_ID]: yup.boolean(),
  [AMOUNT_ID]: yup.number().typeError("Must be a number").min(0).notRequired(),
  [TAGGED_USERS_ID]: yup.array().nullable().notRequired(),
  [IS_TARGET_FUNDS_ID]: yup.bool().default(false),
});

export default function CreatePost({
  formId,
  medias = [],
  description = "",
  commentable = true,
  isExplorable = false,
  amount = 0,
  taggedUsers = [],
  targetFunds = false,

  onTagUsersClick,
  onSubmit,
}) {
  const classes = useStyles();

  const {
    errors,
    register,
    setValue,
    getValues,
    watch,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [MEDIA_ID]: medias,
      [DESCRIPTION_ID]: description,
      [COMMENTABLE_ID]: commentable,
      [EXPLORABLE_ID]: isExplorable,
      [AMOUNT_ID]: amount,
      [TAGGED_USERS_ID]: taggedUsers,
      [IS_TARGET_FUNDS_ID]: targetFunds,
    },
  });
  const mediaWatcher = watch(MEDIA_ID, []);
  const commentableWatcher = watch(COMMENTABLE_ID);
  const privateWatcher = watch(EXPLORABLE_ID);
  const taggedUsersWatcher = watch(TAGGED_USERS_ID);

  useEffect(() => {
    register({ name: MEDIA_ID });
    register({ name: COMMENTABLE_ID });
    register({ name: EXPLORABLE_ID });
    register({ name: TAGGED_USERS_ID });
    register({ name: IS_TARGET_FUNDS_ID });

    return () => {
      mediaWatcher.forEach((file) => URL.revokeObjectURL(file.previewUrl));
      setValue(MEDIA_ID, []);
    };
  }, []);

  const handleTagUsersClick = () => {
    onTagUsersClick && onTagUsersClick(getValues());
  };

  const handleFormSubmit = (data) => {
    onSubmit && onSubmit(data);
  };

  const handleTagUsersChange = (data) => {
    const mappedUsersNamesToKeys = taggedUsers.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: { ...curr } }),
      {}
    );
    const currentData = data.reduce(
      (acc, curr) => [...acc, { ...mappedUsersNamesToKeys[curr] }],
      []
    );
    setValue(TAGGED_USERS_ID, currentData);
  };

  const handleToolsChange = (e) => {
    const target = e.currentTarget;
    switch (target.type) {
      case "button":
        if (target.name === COMMENTABLE_ID) {
          setValue(target.name, !commentableWatcher);
        } else if (target.name === EXPLORABLE_ID) {
          setValue(target.name, !privateWatcher);
        } else if (target.name === TAGGED_USERS_ID) {
          handleTagUsersClick();
        }
        break;
      case "file": {
        const { files } = target;

        if (target.files.length > 0) {
          const mediaFiles = [...files];
          mediaFiles.forEach((file) => {
            file.previewURL = URL.createObjectURL(file);
          });
          setValue(MEDIA_ID, mediaFiles);
        }

        break;
      }

      default:
        break;
    }
  };

  const getTransformedItems = (items) =>
    items.map((item) => (typeof item === "string" ? item : item.name));

  return (
    <form
      id={formId}
      className={classes.root}
      onSubmit={handleSubmit(handleFormSubmit)}
      autoComplete="off">
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
              inputProps={{ maxLength: 255 }}
            />
          )}
        />
      </FormControl>
      <CreateTools
        isTaggable
        privateBtnName={EXPLORABLE_ID}
        commentBtnName={COMMENTABLE_ID}
        isExplorable={privateWatcher}
        isCommentable={commentableWatcher}
        onChange={handleToolsChange}
      />
      <Typography color="error">{errors[MEDIA_ID]?.message}</Typography>
      <Box display="flex" flexWrap="wrap" my={1}>
        <FormControl className={classes.inputText} variant="filled">
          <Controller
            name={AMOUNT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextField
                fullWidth
                placeholder="Amount"
                variant="outlined"
                inputMode="numeric"
                disabled={!mediaWatcher.length}
                value={value}
                error={!!errors[AMOUNT_ID]}
                helperText={
                  errors[AMOUNT_ID]?.message || POST_AMOUNT_TEXT_HELPER
                }
                onBlur={onBlur}
                onChange={onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Controller
                        name={IS_TARGET_FUNDS_ID}
                        control={control}
                        render={({
                          onChange: onTargetChange,
                          value: targetValue,
                        }) => (
                          <FormControlLabel
                            disabled={!mediaWatcher.length}
                            name={IS_TARGET_FUNDS_ID}
                            value={IS_TARGET_FUNDS_ID}
                            id={IS_TARGET_FUNDS_ID}
                            onChange={(e) => onTargetChange(e.target.checked)}
                            control={<Checkbox style={{ display: "none" }} />}
                            label={
                              <Box display="flex" alignItems="center">
                                <EmojiEventsIcon
                                  fontSize="small"
                                  color={targetValue ? "secondary" : "inherit"}
                                />
                              </Box>
                            }
                          />
                        )}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormControl>

        {taggedUsersWatcher.length > 0 && (
          <FormControl className={classes.inputText} variant="filled">
            <ChipsInput
              fullWidth
              inputProps={{ readOnly: true }}
              placeholder="Tagged People"
              id={TAGGED_USERS_ID}
              name={TAGGED_USERS_ID}
              max={3}
              items={getTransformedItems(taggedUsersWatcher)}
              // filters={chipsInputFilters}
              onChange={handleTagUsersChange}
            />
          </FormControl>
        )}

        {/* <CreateTools
          isTaggable
          privateBtnName={EXPLORABLE_ID}
          commentBtnName={COMMENTABLE_ID}
          isExplorable={privateWatcher}
          isCommentable={commentableWatcher}
          onChange={handleToolsChange}
        /> */}
      </Box>
      <GridGalleryHorizontal items={mediaWatcher} />
    </form>
  );
}
