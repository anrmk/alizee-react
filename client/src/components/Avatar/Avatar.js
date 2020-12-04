import React from "react";
import clsx from "clsx";
import { Avatar as MUIAvatar } from "@material-ui/core";

import "./Avatar.scss";
import { DEFAULT_VARIANT, BADGE_VARIANT } from "./constants";
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
  avatarBaseProps,
  badgeProps,
  children
}) {
  const classes = useStyles({
    size,
    borderWidth,
    borderColor,
    variant
  });

  if (variant === BADGE_VARIANT) {
    return (
        <StyledBadge
          {...badgeProps}
          className={clsx(!online && classes.badgeOffline, badgeClassName)}>
          <MUIAvatar {...avatarBaseProps} className={clsx(classes.avatar)} src={src}>
            {children}
          </MUIAvatar>
        </StyledBadge>
    )
  }

  return (
    <MUIAvatar {...avatarBaseProps} className={clsx(classes.avatar, className)} src={src}>
      {children}
    </MUIAvatar>
  );
}

export default Avatar;
