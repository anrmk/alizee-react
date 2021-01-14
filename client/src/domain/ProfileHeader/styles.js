import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cover: {
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "220px",
    backgroundImage: ({ imageUrl }) => `url("${imageUrl}")`,
    backgroundColor: theme.palette.background.paper,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    wordBreak: "break-all"
  },

  coverBox: {
    display: "flex",
    position: "absolute",
    bottom: theme.spacing(-7),
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  avatar: {
    margin: theme.spacing(0, 2),

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0, 1),
    },
  },
}));

export default useStyles;
