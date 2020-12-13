import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from "@material-ui/core/styles";
import routes from "../../AppRouter/routes";
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const navigateTo = (path: string) => {
        history.push(path);
    }

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
                    routes.map((route, key) => {
                        if (!route.menu) {
                            return false;
                        }

                        return (
                            <ListItem
                                button
                                key={key}
                                onClick={() => navigateTo(route.path as string)}
                            >
                                <div className={classes.iconDrawer}>
                                    <Icon
                                        color="primary"
                                        fontSize={"large"}
                                    >
                                        {route.icon}
                                    </Icon>
                                </div>

                                <ListItemText primary={route.label}/>
                            </ListItem>
                        )
                    })
                }

            </List>
        </Drawer>
    );
}

export default Menu;