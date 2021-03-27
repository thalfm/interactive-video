import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Route} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link, { LinkProps } from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Location from 'history';
import routes, {AppProps} from "../AppRouter/routes";
import RouteParser from 'route-parser'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Icon from "@material-ui/core/Icon";

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}
const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink as any} />;

const breadcrumbNameMap: { [key: string]: {label: string, Icon?: string} } = {};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '80px',
            marginLeft: '10px'
        },
        linkRouter: {
            color: '#4db5ab',
            '&:focus, &:active': {
                color: '#4db5ab',
            },
            '&:hover': {
                color: '#055a52',
            }
        },
        iconRouter: {
            marginBottom: "-5px"
        }
    }),
);

export const Breadcrumb: React.FC = () => {
    const classes = useStyles();

    useEffect(() => {
        if (routes) {

            const makeBreadcrumb = (route: AppProps) => {
                if (route.items) {
                    route.items.forEach((route) => makeBreadcrumb(route))
                }

                if (route.breadCrumb === true) {
                    breadcrumbNameMap[route.path as string] = {label: route.label, Icon: route.Icon}
                }
            }

            routes.forEach(route => makeBreadcrumb(route));
        }
    }, [])

    const makeBreadcrumbs = (location: Location) => {
        const pathnames = location
            .pathname
            .split('/')
            .filter(x => x)

        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/">
                    <Icon
                        className={classes.iconRouter}
                        color="primary"
                        fontSize={"small"}
                    >
                       dashboard
                    </Icon>
                    Home
                </LinkRouter>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1)
                        .join('/')
                        .replace('//', '/')}`;
                    const route = Object
                        .keys(breadcrumbNameMap)
                        .find(path => new RouteParser(path).match(to))

                    if (route === undefined) {
                        return false;
                    }

                    return last ? (
                        <Typography color="textPrimary" key={to}>
                            {breadcrumbNameMap[route].label}
                        </Typography>
                    ) : (
                        <LinkRouter color="inherit" to={to} key={to} className={classes.linkRouter}>
                            {breadcrumbNameMap[route].label}
                        </LinkRouter>
                    );
                })}
            </Breadcrumbs>
        );
    }

    return (
        <div className={classes.root}>
            <Route >
                {
                    ({location}: {location: Location}) => makeBreadcrumbs(location)
                }
            </Route>
        </div>
    );
};