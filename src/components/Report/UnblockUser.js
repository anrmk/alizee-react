import React from "react";

import { Box, FormControl, FormLabel } from "@material-ui/core";

function UnblockUser({
  formId,

  name,
  userName,

  onSubmit,
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ userName });
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} id={formId}>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          {name ?? `@${userName}`} will now be able to see your posts and follow
          you on Instagram. Instagram won&apos;t let them known you unblocked
          them.
        </FormLabel>
      </FormControl>
    </Box>
  );
}

export default UnblockUser;
