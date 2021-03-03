import { makeStyles } from "@material-ui/core";

const textBase = (theme) => ({
  color: theme.palette.text.primary,
  transition: "color .2s",
  textDecoration: "none",
  [theme.breakpoints.up("md")]: {
    color: theme.palette.common.white,
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  itemMobile: {
    textAlign: "center",
    textDecoration: "none",
    "& + &": {
      marginLeft: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3)
      },
    }
  },
  text: {
    ...textBase(theme),
    fontSize: theme.typography.subtitle2.fontSize,
    "&:hover": {
      color: theme.palette.grey["300"]
    },
  },
  textMobile: {
    ...textBase(theme),
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
  textCaptionMobile: {
    ...textBase(theme),
    fontSize: theme.typography.caption.fontSize,
  },
  divider: {
    width: "1px",
    height: "24px",
    alignSelf: "auto",
    backgroundColor: theme.palette.common.white,
    margin: theme.spacing(0, 1)
  }
}));

export default useStyles;
