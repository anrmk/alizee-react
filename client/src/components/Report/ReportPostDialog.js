import React, { useState } from "react";

import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

function ReportPostDialog({
  formId,
  postId,

  onReport,
}) {
  const [value, setValue] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if(!value)
      return;

    onReport && onReport({ postId, reportType: value });
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} id={formId}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Why are you reporting this post?</FormLabel>
        <RadioGroup aria-label="report" name="report" value={value} onChange={handleChange}>
          <FormControlLabel value="0" control={<Radio />} label="This content is offensive or violates Terms of Service" />
          <FormControlLabel value="1" control={<Radio />} label="This content contains stolen material (DMCA)" />
          <FormControlLabel value="2" control={<Radio />} label="It's spam" />
          <FormControlLabel value="3" control={<Radio />} label="It's inappropriate" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default ReportPostDialog;
