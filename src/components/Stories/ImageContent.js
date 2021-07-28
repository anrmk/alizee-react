import React from "react";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./styles";

export default function ImageContent({ url, action, config }) {
  const [loaded, setLoaded] = React.useState(false);
  const classes = useStyles({ loaded });

  const { imageContentClassName } = config;

  const handleLoaded = () => {
    setLoaded(true);
    action("play");
  };

  return (
    <>
      <img
        className={clsx(classes.image, imageContentClassName)}
        src={url}
        alt="content-img"
        onLoad={handleLoaded}
      />
      {!loaded && <CircularProgress className={classes.loader} />}
    </>
  );
}
