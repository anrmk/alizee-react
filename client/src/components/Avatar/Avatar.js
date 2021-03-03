import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Avatar as MUIAvatar } from "@material-ui/core";

import { DEFAULT_VARIANT } from "./constants";
import useStyles, { StyledBadge } from "./styles";

function Avatar({
  src,
  size,
  className,
  badgeClassName,
  borderWidth,
  borderColor,
  variant = DEFAULT_VARIANT,
  online,
  live,
  avatarBaseProps,
  badgeProps,
  dotWidth,
  children,
}) {
  const classes = useStyles({
    size,
    borderWidth,
    borderColor,
    variant,
    online
  });

  if (online !== undefined) {
    return (
      <StyledBadge {...badgeProps} dotWidth={dotWidth} className={clsx(classes.badge, badgeClassName, className)}>
        <MUIAvatar {...avatarBaseProps} className={clsx(classes.avatar)} src={src}>
          {children}
        </MUIAvatar>
      </StyledBadge>
    );
  }

  return (
    <MUIAvatar {...avatarBaseProps} className={clsx(classes.avatar, className)} src={src}>
      {children}
    </MUIAvatar>
  );
}

Avatar.propTypes = {
  live: PropTypes.bool,
  online: PropTypes.bool,
  badgeProps: PropTypes.object,
  dotWidth: PropTypes.number
};

Avatar.defaultProps = {
  live: undefined,
  online: undefined,
  badgeProps: {
    overlap: "circle",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    variant: "dot",
  },
  dotWidth: undefined
};

export default Avatar;
