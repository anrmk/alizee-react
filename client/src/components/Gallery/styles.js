import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",

    "& img": {
      overflow: "hidden",
      display: "block",
      width: "100%",
    }
  },

  title: {
    position: "absolute",
    height: "100%",
    width: "100%",
    textAlign: "center",
    zIndex: 1,
    backgroundColor: theme.palette.type === "dark" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
    padding: "40% 0" 
  },

  pagination: {
    position: "absolute",
    bottom: theme.spacing(6),
    width: "100%",
    display: "flex",
    justifyContent: "center",

    "& ol": {
      position: "relative",
      listStyleType: "none",
      padding: theme.spacing(0),

      "& li": {
        float: "left",
        width: "14px",
        height: "14px",
        position: "relative",
        font: "0px/0 a",
        cursor: "pointer",

        "&::before": {
          content: "\".\"",
          position: "absolute",
          opacity: "0.8",
          left: "4px",
          top: "4px",
          width: "12px",
          height: "12px",
          backgroundColor: "rgba(144, 202, 249, 0.85)",
          borderRadius: "50%",
          boxShadow: "0px 0px 15px rgba(10, 1, 22, 0.5)",
          transition: "all .2s linear"
        },

        "&::focus::before": {
          transform: "scale(1.2)",
          background: "rgb(228, 228, 228)"
        },

        "&.active": {
          "&::before": {
            transform: "scale(1.2)",
            background: "rgb(228, 228, 228)"
          }
        }
      },

      "& li+li": {
        marginLeft: theme.spacing(2)
      }
    }
  },
}));

export default useStyles;
