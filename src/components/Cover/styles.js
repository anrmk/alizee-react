import { makeStyles } from "@material-ui/core";
import DefaultCover from "../../assets/img/default-cover.png";

const getGradient = () =>
  "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 15%, rgba(0, 0, 0, 0) 30%),";

const useStyles = makeStyles((theme) => ({
  cover: {
    "&": {
      [theme.breakpoints.down("sm")]: {
        position: "relative",
        height: "100px",
        width: "100%",
        top: 0,
        marginBottom: theme.spacing(4),
      },
    },
    position: "relative",
    height: "220px",
    backgroundImage: ({ imageUrl }) => getGradient(theme.palette.type) + `url("${imageUrl ? imageUrl : DefaultCover}")`,
    backgroundColor: theme.palette.background.paper,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useStyles;
