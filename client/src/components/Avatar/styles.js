import { Badge, makeStyles, withStyles } from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { STREAM_VARIANT } from "./constants";

const SIZES = {
  "small": "25px",
  "medium": "40px",
  "upperMedium": "50px",
  "large": "65px"
}

const BORDER_COLORS = {
  "gold": yellow["A700"],
  "silver": blueGrey["100"],
  "blue": blue["600"]
}

const getBorder = (width, color) => {
  if (!color) return "none";
  return `rgb(0 0 0) 0px 0px 1px 2px, 
          0px 0px 0px ${width ? width : "4px"} ${BORDER_COLORS[color] ? BORDER_COLORS[color] : BORDER_COLORS["blue"]}`;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: ({ size }) => SIZES[size] ? SIZES[size] : SIZES["medium"],
    height: ({ size }) => SIZES[size] ? SIZES[size] : SIZES["medium"],
    boxShadow: ({ borderWidth, borderColor }) => getBorder(borderWidth, borderColor),
    overflow: "visible",
    "& > img.MuiAvatar-img": {
      borderRadius: "50%"
    },
    "&::after": {
      position: "absolute",
      display: ({ variant }) => variant === STREAM_VARIANT ? "block" : "none",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      boxShadow: ({ borderWidth, borderColor }) => getBorder(borderWidth, borderColor),
      animation: "$streamRipple 1.2s infinite ease-in-out",
      content: '""'
    },
  },
  "@keyframes streamRipple": {
    "0%": {
      opacity: 1
    },
    "100%": {
      transform: "scale(1.2)",
      opacity: 0
    },
  },
}));

export const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$statusRipple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
    badgeOffline: {
      "& .MuiBadge-badge": {
        backgroundColor: theme.palette.grey["400"],
        "&::after": {
          animationPlayState: "paused",
          border: theme.palette.grey["400"],
        },
      }
    },
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
