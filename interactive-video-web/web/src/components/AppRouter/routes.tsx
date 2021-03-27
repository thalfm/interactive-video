import {RouteProps} from 'react-router-dom'
import Home from "../../pages/Home";
import Login from '../../pages/Login';
import Video from "../../pages/Video";
import Course from "../../pages/Courses";
import {Questions} from "../../pages/Questions";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideocamIcon from '@material-ui/icons/Videocam';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {Chat as ChatIcon} from "@material-ui/icons";

export interface AppProps extends RouteProps {
    name: string,
    label: string,
    menu: boolean,
    Icon?: any,
    requiredAuth: boolean,
    breadCrumb: boolean,
    items ?: AppProps[]
}

let routes: AppProps[] = [
    {
        name: 'curso',
        label: 'Cursos',
        Icon: VideoLibraryIcon,
        path: '/course',
        component: Course,
        exact: true,
        menu: true,
        requiredAuth: false,
        breadCrumb: true
    },
    {
        name: 'video',
        label: 'Videos',
        Icon: VideocamIcon,
        menu: true,
        requiredAuth: false,
        breadCrumb: false,
        items: [
            {
                name: 'video',
                label: 'Lista',
                path: '/video/lista',
                exact: true,
                menu: true,
                component: Video,
                requiredAuth: false,
                breadCrumb: true,
            }
        ]
    },
    {
        name: 'pergunta',
        label: 'Perguntas',
        Icon: QuestionAnswerIcon,
        path: '/question',
        component: Questions,
        exact: true,
        menu: true,
        requiredAuth: false,
        breadCrumb: true
    },
    {
        name: 'login',
        label: 'Login',
        path: '/admin',
        component: Login,
        exact: true,
        menu: false,
        requiredAuth: false,
        breadCrumb: true
    },
    {
        name: 'home',
        label: 'Home',
        Icon: 'dashboard',
        path: '/',
        component: Home,
        exact: true,
        menu: false,
        requiredAuth: false,
        breadCrumb: false
    },
]

export default routes;