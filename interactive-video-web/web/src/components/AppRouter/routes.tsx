import {RouteProps} from 'react-router-dom'
import Home from "../../pages/Home";
import Video from "../../pages/Video";
import Course from "../../pages/Courses";
import {Questions} from "../../pages/Questions";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideocamIcon from '@material-ui/icons/Videocam';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

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
        path: '/video',
        component: Video,
        exact: true,
        menu: true,
        requiredAuth: false,
        breadCrumb: true,
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