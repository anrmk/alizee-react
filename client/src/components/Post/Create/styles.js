import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
   
  },
  navigation: {
    width: "100%",
    marginBottom: "20px"
  },
  tools : {
    
    "& input": {
      width: "80px",
      marginRight: theme.spacing(1)
    }
  }
}));


export default useStyles;