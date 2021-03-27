import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import AppMenuItemComponent from './AppMenuItemComponent'
import {AppProps} from "../../AppRouter/routes";

const AppMenuItem: React.FC<AppProps> = props => {
    const { label, path, Icon, items = [] } = props
    const classes = useStyles()
    const isExpandable = items && items.length > 0
    const [open, setOpen] = React.useState(false)

    function handleClick() {
        setOpen(!open)
    }

    const MenuItemRoot = (
        <AppMenuItemComponent className={classes.menuItem} link={path as string} onClick={handleClick}>
            {/* Display an icon if any */}
            {!!Icon && (
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
            )}
            <ListItemText primary={label} inset={!Icon} />
            {/* Display the expand menu if the item has children */}
            {isExpandable && !open && <IconExpandMore />}
            {isExpandable && open && <IconExpandLess />}
        </AppMenuItemComponent>
    )

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
                {items.map((item:any, index:any) => (
                    <AppMenuItem {...item} key={index} />
                ))}
            </List>
        </Collapse>
    ) : null

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    )
}

const useStyles = makeStyles(theme =>
    createStyles({
        menuItem: {
            '&.active': {
                background: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemIcon-root': {
                    color: '#fff',
                },
            },
        },
        menuItemIcon: {
            color: '#97c05c',
        },
    }),
)

export default AppMenuItem
