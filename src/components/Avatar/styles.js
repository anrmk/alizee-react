/* eslint-disable quotes */
import { Badge, makeStyles, withStyles } from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
import grey from "@material-ui/core/colors/grey";

const SIZES = {
  small: "26px",
  medium: "40px",
  large: "65px",
  big: "96px",
  huge: "140px",
};

const BORDER_COLORS = {
  gold: yellow.A700,
  silver: grey["50"],
  blue: "#6FCBFF",
  black: grey["900"],
};

const getBorder = (width, color) => {
  if (!color) return "none";
  return `0px 0px 4px ${width || "1px"} ${
    BORDER_COLORS[color] ? BORDER_COLORS[color] : BORDER_COLORS.blue
  }`;
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: ({ size }) => (SIZES[size] ? SIZES[size] : SIZES.medium),
    height: ({ size }) => (SIZES[size] ? SIZES[size] : SIZES.medium),
    backgroundColor: ({ borderWidth, borderColor }) =>
      BORDER_COLORS[borderColor], // theme.palette.grey["500"],
    padding: ({ borderWidth, borderColor }) => "2px",
    overflow: "visible",
    "& > img.MuiAvatar-img": {
      borderRadius: "50%",
    },
    "&::after": {
      position: "absolute",
      display: ({ live }) => (live ? "block" : "none"),
      animationPlayState: ({ live, borderColor }) =>
        live && borderColor ? "running" : "paused",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      boxShadow: ({ borderWidth, borderColor }) =>
        getBorder(borderWidth, borderColor),
      animation: "$streamRipple 1.2s infinite ease-in-out",
      content: '""',
    },
  },
  badge: ({ online }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: online
        ? theme.palette.success
        : theme.palette.grey["400"],
      "&::after": {
        animationPlayState: online ? "running" : "paused",
        border: online ? theme.palette.success : theme.palette.grey["400"],
      },
    },
  }),
  "@keyframes streamRipple": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.2)",
      opacity: 0,
    },
  },
  controls: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    zIndex: theme.zIndex.tooltip,
    "& > .MuiIconButton-root": {
      color: theme.palette.common.white,
    },
  },
}));

export const StyledBadge = withStyles((theme) => ({
  badge: {
    background: theme.palette.success.contrast,
    color: theme.palette.success.contrast,
    boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$statusRipple 1.2s infinite ease-in-out",
      border: "2px solid currentColor",
      content: '""',
    },
  },
  dot: {
    height: ({ dotWidth }) => dotWidth || "8px",
    width: ({ dotWidth }) => dotWidth || "8px",
    borderRadius: "50%",
  },
  "@keyframes statusRipple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default useStyles;
