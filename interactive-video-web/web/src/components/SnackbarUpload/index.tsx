import {Card, CardActions, Collapse, IconButton, List, Typography} from "@material-ui/core";
import React, {useState} from "react";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import UploadItem from "../UploadItem";

const useStyles = makeStyles((theme) => ({
    card: {
        width: 450
    },
    cardActionRoot: {
        padding: "8px 8px 8px 16px",
        backgroundColor: theme.palette.primary.main
    },
    title: {
        fontWeight: 'bold',
        color: theme.palette.primary.contrastText
    },
    icons: {
        marginLeft: 'auto !important',
        color: theme.palette.primary.contrastText
    },
    expand: {
        transform: 'rotate(0deg)'
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
}))

interface SnackbarUploadProps {
    id: string | number,
    total: number
}

const SnackbarUpload = React.forwardRef<any, SnackbarUploadProps>((props, ref) => {
    const {id, total} = props
    const classes = useStyles()
    const {closeSnackbar} = useSnackbar()
    const [expanded, setExpanded] = useState(true)


    return (
        <Card ref={ref} className={classes.card}>
            <CardActions classes={{root: classes.cardActionRoot}}>
                <Typography className={classes.title}>
                    Fazendo upload de vídeo
                </Typography>
                <div className={classes.icons}>
                    <IconButton
                        color={"inherit"}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded && <IconExpandMore/>}
                        {!expanded && <IconExpandLess/>}
                    </IconButton>
                    <IconButton
                        color={"inherit"}
                        onClick={() => closeSnackbar(id)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
            </CardActions>
            <Collapse in={expanded}>
                <List>
                    <UploadItem total={total}/>
                </List>
            </Collapse>
        </Card>
    );
})

export default SnackbarUpload