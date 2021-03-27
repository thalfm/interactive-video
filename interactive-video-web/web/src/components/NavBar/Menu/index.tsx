import React from 'react';
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from "@material-ui/core/styles";
import routes from "../../AppRouter/routes";
import AppMenuItem from "./AppMenuItem";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    iconDrawer: {
        marginRight: '19px'
    }
}));

interface MenuProps {
    open: boolean
}

const Menu: React.FC<MenuProps> = (props) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
        >
            <div className={classes.toolbarIcon}>
            </div>
            <Divider/>
            <List>
                {
                    routes.map((item, index) => {
                        if (!item.menu) {
                            return false;
                        }

                        return (
                            <AppMenuItem {...item} key={index} />
                        )
                    })
                }

            </List>
        </Drawer>
    );
}

export default Menu;