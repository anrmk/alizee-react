import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),

    "& .MuiCardContent-root": {
      display: "flex",
      justifyContent: "space-evenly",
    },
  },

  tools: {
    display: "flex",
    alignItems: "center",

    "& > .MuiSvgIcon-root": {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },

    "& div.MuiFormControl-root": {
      width: "100%",
      "& input": {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: "100%"
      },
    },
    
    "& button": {
      marginLeft: theme.spacing(1)
    }
  },
}));

export default useStyles;
