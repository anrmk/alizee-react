import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    background: theme.palette.background.mainGradient,
    opacity: "0.7",
    transition: "300ms linear",
    "&:hover": {
      opacity: 1,
    },
  },
  isDefault: {
    opacity: 1,
  },
  verified: {
    opacity: 1,
    background: theme.palette.grey["400"],
  },

  image: {
    width: "48px",
  },
}));

export default useStyles;
