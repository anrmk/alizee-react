import React, { useState } from "react";

import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { BLOCKED_TYPE, RESTRICTED_TYPE } from "../../constants/block_types";

function BlockUser({
  formId,
  postId,
  name,
  userName,

  onSubmit,
}) {
  const [value, setValue] = useState(BLOCKED_TYPE);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onSubmit && onSubmit({ userName, postId, blockType: value });
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} id={formId}>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          {name ?? `@${userName}`} won&apos;t be able to find your profile,
          posts or story. We won&apos;t let them know you blocked them.
        </FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel
            value={BLOCKED_TYPE}
            control={<Radio />}
            label="Block user from accessing your profile."
          />
          <FormControlLabel
            value={RESTRICTED_TYPE}
            control={<Radio />}
            label="Restrict, user will not be able to send you direct messages or reply to your posts."
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default BlockUser;
