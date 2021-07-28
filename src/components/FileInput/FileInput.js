import React, { useRef } from "react";

import useStyles from "./styles";

function InputField({
  children,
  accept = "image/jpeg, image/jpg, image/gif, image/png",

  onChange,
}) {
  const classes = useStyles();
  const mediaRef = useRef();
  return (
    <div>
      {React.cloneElement(children, {
        onClick: (e) => {
          mediaRef.current.click();
        },
      })}

      <input
        className={classes.root}
        type="file"
        ref={mediaRef}
        accept={accept}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
