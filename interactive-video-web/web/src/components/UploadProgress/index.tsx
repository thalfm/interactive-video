import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import {useSelector} from "react-redux";
import {StateUpload} from "../../store/upload/types";

interface UploadProgress {
    total: number
}

const UploadProgress: React.FC<UploadProgress> = (props) => {
    const classes = useStyles()
    const {total} = props

    const progress = useSelector<StateUpload, number>(
        state => {
            return state.upload.value
        }
    )

    return (
            <div className={classes.progressContainer}>
                <CircularProgress
                    variant={"determinate"}
                    value={100}
                    className={classes.progressBackground}
                />
                <CircularProgress
                    className={classes.progress}
                    variant={"determinate"}
                    value={parseFloat((progress * 100/ total).toFixed(0))}
                />
            </div>


    )
}

const useStyles = makeStyles((theme) => ({
    progress: {
        position: 'absolute',
        left: 0
    },
    progressContainer: {
        position: "relative"
    },
    progressBackground: {
        color: grey['300']
    }
}))

export default UploadProgress