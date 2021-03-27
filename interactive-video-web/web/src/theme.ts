import {createMuiTheme, SimplePaletteColorOptions} from '@material-ui/core'
import {PaletteOptions} from "@material-ui/core/styles/createPalette";
import {green, red} from "@material-ui/core/colors";

const palette: PaletteOptions = {
    primary: {
        main: '#212121',
        light: '#484848',
        dark: '#000000',
        contrastText: '#fff'
    },
    secondary: {
        main: '#263238',
        light: '#4f5b62',
        dark: '#000a12',
        contrastText: '#fff'
    },
    background: {
        default: '#fafafa'
    },
    success: {
        main: green.A700,
        contrastText: '#ffffff',
    },
    error: {
        main: red.A400
    }
}

const theme = createMuiTheme({
    palette: palette,
    overrides: {
        MuiButton:{
          root: {
              color: (palette!.primary as SimplePaletteColorOptions).contrastText,
          }
        },
        MUIDataTable:{
            paper: {
                boxShadow: "none"
            }
        },
        MUIDataTableToolbar:{
            root:{
                minHeight: '58px',
                backgroundColor: palette.background?.default
            },
            icon: {
                color: (palette!.primary as SimplePaletteColorOptions).main,
                '&:hover, &:active, &:focus': {
                    color: '#055a52'
                }
            },
            iconActive: {
                color: '#055a52',
                '&:hover, &:active, &:focus': {
                    color: '#055a52'
                }
            }
        },
        MUIDataTableHeadCell: {
            fixedHeader: {
                paddingTop: 7,
                paddingBottom: 7,
                backgroundColor: (palette!.primary as SimplePaletteColorOptions).main,
                color: '#fff',
                '&[aria-sort]': {
                    backgroundColor: (palette!.secondary as SimplePaletteColorOptions).main,
                }
            },
            sortActive: {
                color: '#fff'
            },
            sortAction:{
                alignItems: "center"
            },
            sortLabelRoot: {
                '& svg' :{
                    color: '#fff !important'
                }
            }
        },
        MUIDataTableSelectCell: {
            headerCell:{
                backgroundColor: (palette!.primary as SimplePaletteColorOptions).main,
                '& span': {
                    color: '#fff !important'
                }
            },
            fixedLeft: {
                display: 'none'
            }
        },
        MUIDataTableToolbarSelect: {
            title: {
                color: (palette!.primary as SimplePaletteColorOptions).main,
            },
            iconButton:{
                color: (palette!.primary as SimplePaletteColorOptions).main,
            }
        },
        MUIDataTablePagination: {
            root: {
                color: (palette!.primary as SimplePaletteColorOptions).main,
            }
        }
    }
})

export default theme;