import React, { useContext } from 'react';import {
    createMuiTheme, 
    MuiThemeProvider, 
    Backdrop, 
    CircularProgress,
    makeStyles,
    Theme,
    createStyles
} from "@material-ui/core";
import theme from "../../theme";
import LoadingContext from '../Loading/LoadingContext';

const localTheme = createMuiTheme({
    palette: {
        primary: theme.palette.success
    }
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: '#fff',
    },
  }),
);

const BlockUI = () => {
    const classes = useStyles();
    const loading = useContext(LoadingContext)
    return (
        <MuiThemeProvider theme={localTheme}>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </MuiThemeProvider>
    );
};

export default BlockUI;