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
    padding: theme.spacing(1, 1, 1, 20)
  },

  coverBox: {
    display: "flex",
    position: "absolute",
    bottom: theme.spacing(-8),
    padding: theme.spacing(1),
    width: "100%"
  },

  avatar: {
    margin: theme.spacing(0, 3),

    [theme.breakpoints.down("sm")] : {
      margin: theme.spacing(0, 1)
    }
  }
}));

export default useStyles;
