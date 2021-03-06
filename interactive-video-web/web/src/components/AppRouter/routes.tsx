import {RouteProps} from 'react-router-dom'
import Home from "../../pages/Home";
import Login from '../../pages/Login';
import Video from "../../pages/Video";
import Course from "../../pages/Courses";
import {Questions} from "../../pages/Questions";

interface AppProps extends RouteProps {
    name: string,
    label: string,
    menu: boolean,
    icon?: string,
    requiredAuth: boolean,
    breadCrumb: boolean,
    list ?: AppProps[]
}

let routes: AppProps[] = [
    {
        name: 'curso',
        label: 'Cursos',
        icon: 'video_library',
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
        icon: 'videocam',
        exact: true,
        menu: true,
        path: '/video',
        component: Video,
        requiredAuth: false,
        breadCrumb: true,
        // list: [
        //     {
        //         name: 'video',
        //         label: 'Lista',
        //         path: '/video',
        //         exact: true,
        //         menu: true,
        //         component: Video,
        //         requiredAuth: false,
        //         breadCrumb: true,
        //     },
        //     {
        //         name: 'vicular_pergunta',
        //         label: 'Vincular pergunta',
        //         path: '/veido-pergunta',
        //         exact: true,
        //         menu: true,
        //         component: Video,
        //         requiredAuth: false,
        //         breadCrumb: true,
        //     }
        // ]
    },
    {
        name: 'pergunta',
        label: 'Perguntas',
        icon: 'question_answer',
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
        icon: 'dashboard',
        path: '/',
        component: Home,
        exact: true,
        menu: false,
        requiredAuth: false,
        breadCrumb: false
    },
]

export default routes;