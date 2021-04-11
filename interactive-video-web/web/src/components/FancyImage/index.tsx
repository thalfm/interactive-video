import React from 'react';
import {Backdrop, createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme} from "@material-ui/core";
import theme from "../../theme";

import {Frame, Preview} from "./styles";

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

interface File {
    id: number,
    preview: string,
    name: string,
    url: string
}
interface FileProps {
    file: File,
    openHandle: {
        open: boolean,
        setOpen: Function
    };
}
const FancyImage: React.FC<FileProps> = ({file, openHandle}) => {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={localTheme}>
            <Backdrop className={classes.backdrop} open={openHandle.open} onClick={() => openHandle.setOpen(false)}>
                <Frame>
                    <Preview src={file.preview} />
                </Frame>
            </Backdrop>
        </MuiThemeProvider>
    );
};

export default FancyImage;