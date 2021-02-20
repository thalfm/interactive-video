import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


type Props = {
    open: boolean,
    setOpen: Function,
    title: string,
    onHandleClose?: Function,
};
const FullModal: React.FC<Props> = (props) => {
    const classes = useStyles();

    const handleClose = () => {
        if (props.onHandleClose) {
            props.onHandleClose();
        }
        props.setOpen(false);
    };

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    >
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            {props.children}
        </Dialog>
    );
};

export default FullModal;