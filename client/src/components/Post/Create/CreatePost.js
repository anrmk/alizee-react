import React, { useState } from "react";

import { CreateTools } from "../../../components/Post";
import { POST_TYPE } from "../../../constants/feed";

import { Grid, GridList, GridListTile, FormControl, TextField } from "@material-ui/core";

import useStyles from "./styles";

export default function CreatePost({
  id,
  user,

  onSubmit
}) {
  const classes = useStyles();
  const defaultFormData = {
    description: "",
    commentable: true,
    private: false,
    amount: 0,
    type: POST_TYPE.POST,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [media, setMedia] = useState([]);

  const resetFormData = () => {
    setFormData(defaultFormData);
    setMedia([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.description.trim().length === 0 && media.length === 0) return;

    onSubmit && onSubmit(formData, media);
    resetFormData();
  };

  const handleFormDataChange = (e) => {
    var target = e.currentTarget;
    switch (target.type) {
      case "button":
        setFormData({
          ...formData,
          [target.name]: !formData[target.name],
        });
        break;
      case "file":
        var mediaFiles = [...target.files];
        mediaFiles.forEach((file) => (file.previewURL = URL.createObjectURL(file)));
        setMedia(mediaFiles);
        break;
      default:
        setFormData({ ...formData, [target.name]: target.value });
        break;
    }
  };

  return (
    <form id={id} className={classes.root} onSubmit={handleFormSubmit} autoComplete="off">
      <input type="hidden" name="private" value={formData.private} />
      <input type="hidden" name="commentable" value={formData.commentable} />

      <Grid container direction="column">
        <Grid item>
          <FormControl variant="filled" fullWidth>
            <TextField
              autoFocus
              name="description"
              variant="filled"
              placeholder="Write a caption..."
              multiline
              rows={5}
              required
              onChange={handleFormDataChange}
              value={formData.description}
              helperText={`Characters entered ${formData.description.length} out of 255`}
              inputProps={{ maxLength: 255 }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <CreateTools
            isPrivate={formData.private}
            isCommentable={formData.commentable}
            onChange={handleFormDataChange}
          />
        </Grid>
        {media.length > 0 && (<Grid item>
          <GridList cellHeight={120} cols={4} spacing={1}>
            {media.map((item) => (
              <GridListTile key={item.name} cols={1} rows={1}>
                <img src={item.previewURL} alt={item.name} />
              </GridListTile>
            ))}
          </GridList>
        </Grid>)}
        
      </Grid>
    </form>
  );
}
