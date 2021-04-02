import React, { useState } from "react";

import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

function BlockUser({
  formId,
  userName,

  onSubmit,
}) {
  const [value, setValue] = useState("0");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onSubmit && onSubmit({ userName, blockType: value });
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} id={formId}>
      <FormControl component="fieldset">
        <FormLabel component="legend">@{userName} won't be able to find your profile, posts or story. We won't let them know you blocked them.</FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel value="0" control={<Radio />} label="Block user from accessing your profile." />
          <FormControlLabel value="1" control={<Radio />} label="Restrict, user will not be able to send you direct messages or reply to your posts." />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default BlockUser;
