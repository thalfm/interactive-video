import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import NavBar from "../NavBar";
import { Breadcrumb } from "../Breadcrumb";

interface PageProps {
    title: string;
}
const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 'auto',
    },
    root: {
        display: 'flex',
    },
    page: {
        flex: 1,
    }
}));

const Page:React.FC<PageProps> = (props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <>
            <NavBar />
            <div className={classes.page}>
                <Breadcrumb />    
                <Box className={classes.content}>
                    <Container maxWidth="xl" className={classes.container}>
                        <Typography
                            component="h1"
                            variant="h5"
                        >
                            {props.title}
                        </Typography>
                        <Grid container>
                            <Grid item xs={12}>
                                <Paper className={fixedHeightPaper}>
                                    {props.children}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </div>
        </>
    );
}

export default Page;