import * as React from 'react';
import { SnackbarProvider, SnackbarProviderProps, WithSnackbarProps } from 'notistack'
import {IconButton, Theme} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>{
    return {
        variantSuccess:{
            backgroundColor: theme.palette.success.main
        },
        variantError:{
            backgroundColor: theme.palette.error.main
        },
        variantInfo:{
            backgroundColor: theme.palette.primary.main
        }
    }
})

const Snackbar: React.FC<SnackbarProviderProps> = (props) => {
    let snackbarProviderRef: WithSnackbarProps;

    const classes = useStyles();
    const defaultProps: SnackbarProviderProps = {
        classes,
        autoHideDuration: 3000,
        maxSnack: 3,
        anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
        },
        ref: (el: WithSnackbarProps) => snackbarProviderRef = el,
        action: (key: number) => (
            <IconButton
                color={"inherit"}
                style={{fontSize: 20}}
                onClick={() => snackbarProviderRef.closeSnackbar(key)}
            >
                <CloseIcon />
            </IconButton>
        ),
        children: props.children
    }

    const newProps: SnackbarProviderProps = {...defaultProps, ...props}

    return (
        <SnackbarProvider {...newProps}>
            {props.children}
        </SnackbarProvider>
    );
};

export default Snackbar;