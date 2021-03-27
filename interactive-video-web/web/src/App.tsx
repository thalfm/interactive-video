import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import theme from "./theme";
import AppRouter from "./components/AppRouter";
import Snackbar from "./components/Snackbar";
import StoreProvider from './components/Store/StoreProvider';
import LoadingProvider from './components/Loading/LoadingProvider';
import BlockUI from './components/BlockUI';
import {Provider} from 'react-redux';
import store from './store'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    page: {
        flex: 1,
    }
}));

function App() {
    const classes = useStyles();

    return (
        <Provider store={store}>
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <LoadingProvider>
                        <BlockUI />
                        <Snackbar>
                            <StoreProvider>
                                <BrowserRouter>
                                    <AppRouter />
                                </BrowserRouter>
                            </StoreProvider>
                        </Snackbar>
                    </LoadingProvider>
                </MuiThemeProvider>
            </div>
        </Provider>

    );
}

export default App;
