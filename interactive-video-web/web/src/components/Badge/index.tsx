import * as React from 'react';
import {Chip, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckIcon from "@material-ui/icons/Check";
import theme from "../../theme";

const localTheme = createMuiTheme({
    palette: {
        primary: theme.palette.success,
        secondary: theme.palette.error
    }
})

export const BadgeYes = () => {
    return (
        <MuiThemeProvider theme={localTheme}>
            <Chip icon={<CheckIcon/>} label="Sim" color="primary"/>
        </MuiThemeProvider>
    );
};


export const BadgeNo = () => {
    return (
        <MuiThemeProvider theme={localTheme}>
            <Chip icon={<CancelOutlinedIcon/>} label="Não" color="secondary"/>
        </MuiThemeProvider>
    );
};