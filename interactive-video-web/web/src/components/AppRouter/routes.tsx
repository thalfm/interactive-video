import {RouteProps} from 'react-router-dom'
import Home from "../../pages/Home";
import Login from '../../pages/Login';

interface AppProps extends RouteProps {
    name: string,
    label: string,
    menu: boolean,
    icon?: string,
    requiredAuth: boolean,
    breadCrumb: boolean
}

let routes: AppProps[] = [
    {
        name: 'login',
        label: 'Login',
        icon: 'Login',
        path: '/admin',
        component: Login,
        exact: true,
        menu: false,
        requiredAuth: false,
        breadCrumb: false
    },
    {
        name: 'home',
        label: 'Home',
        icon: 'dashboard',
        path: '/',
        component: Home,
        exact: true,
        menu: true,
        requiredAuth: false,
        breadCrumb: false
    },
    {
        name: 'video',
        label: 'Videos',
        icon: 'dashboard',
        path: '/video',
        component: Home,
        exact: true,
        menu: true,
        requiredAuth: false,
        breadCrumb: false
    },
]

export default routes;