import { makeStyles } from "@material-ui/core/styles";

const spinAnimation = `
  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
`

const useStyles = makeStyles((theme) => ({
  loadingBtn: {
    animation: "$spin 1.5s linear infinite"
  },
  "@keyframes spin": {
    "from": {
      transform: "rotate(0deg)"
    },
    "to": {
      transform: "rotate(360deg)"
    },
  },
}));

export default useStyles;
