import { makeStyles } from "@material-ui/core";

const textBase = (theme) => ({
  color: theme.palette.text.primary,
  transition: "color .2s",
  textDecoration: "none",
  [theme.breakpoints.up("md")]: {
    color: theme.palette.common.white,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    margin: theme.spacing(2, 0),
  },
  itemMobile: {
    textAlign: "center",
    textDecoration: "none",
  },
  text: {
    ...textBase(theme),
    fontSize: theme.typography.subtitle1.fontSize,
    "&:hover": {
      color: theme.palette.grey["300"],
    },
  },
  mood: {
    cursor: "pointer",
    padding: ({ isOwner }) => isOwner && theme.spacing(0.5),
    border: ({ isOwner }) => isOwner && "1px dashed",
    borderColor: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  },
  textMobile: {
    ...textBase(theme),
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
  textCaptionMobile: {
    ...textBase(theme),
    fontSize: theme.typography.subtitle1.fontSize,
  },
  divider: {
    width: "1px",
    height: "24px",
    alignSelf: "auto",
    backgroundColor: theme.palette.common.white,
    margin: theme.spacing(0, 1),
  },
}));

export default useStyles;
