import React, {useEffect, useState} from "react";
import {ListItem, ListItemIcon, ListItemText, Tooltip, Typography} from "@material-ui/core";
import MovieIcon from '@material-ui/icons/Movie';
import {makeStyles} from "@material-ui/core/styles";
import UploadProgress from "../UploadProgress";
import {StateUpload} from "../../store/upload/types";
import {useSelector} from "react-redux";

interface UploadItemProps {
    total: number
}

const UploadItem: React.FC<UploadItemProps> = (props) => {

    const [textProgress, setTextProgress] = useState('Em progresso')
    const classes = useStyles()
    const {total} = props
    const progress = useSelector<StateUpload, number>(
        state => {
            return state.upload.value
        }
    )

    useEffect(() => {
        if ((progress * 100 / total) === 100) {
            setTextProgress('Concluído')
        }
    }, [progress, total])

    return (
        <>
            <Tooltip
                disableFocusListener
                disableTouchListener
                title={"Upload"}
                placement={"left"}
            >
                <ListItem
                    className={classes.listItem}
                >
                    <ListItemIcon className={classes.movieIcon}>
                        <MovieIcon/>
                    </ListItemIcon>
                    <ListItemText
                        className={classes.listTextIcon}
                        primary={
                            <Typography noWrap={true} variant={'subtitle2'} color={'inherit'}>
                                {textProgress}
                            </Typography>
                        }
                    />
                    <UploadProgress total={total} />
                </ListItem>
            </Tooltip>

        </>
    );
}

const useStyles = makeStyles((theme) => ({
    movieIcon: {
        color: theme.palette.error.main,
        width: '40px'
    },
    listItem: {
        paddingTop: '7px',
        paddingBottom: '7px',
        height: '53px'
    },
    listTextIcon: {
        marginLeft: '6px',
        marginRight: '24px',
        color: theme.palette.text.secondary
    }
}))

export default UploadItem