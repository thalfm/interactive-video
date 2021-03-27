import React, {ComponentType, FunctionComponent, useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes";
import StoreContext from '../Store/StoreContext';
import Home from "../../pages/Home";
import Video from "../../pages/Video";
import Courses from "../../pages/Courses";
import {Questions} from "../../pages/Questions";


export const AppRouter: React.FC = () => {

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/video" component={Video} />
            <Route path="/course" component={Courses} />
            <Route path="/question" component={Questions} />
            {/*{*/}
            {/*    routes.map((route, key) => {*/}
            {/*            if (route.requiredAuth && route.path && route.component) {*/}
            {/*                return (*/}
            {/*                    <PrivateRoute*/}
            {/*                        key={key}*/}
            {/*                        path={route.path}*/}
            {/*                        component={route.component as FunctionComponent}*/}
            {/*                    />*/}
            {/*                )*/}
            {/*            }*/}

            {/*            if (route.path && route.component) {*/}
            {/*                return (*/}
            {/*                    <PublicRoute*/}
            {/*                        key={key}*/}
            {/*                        path={route.path}*/}
            {/*                        component={route.component as FunctionComponent}*/}
            {/*                    />*/}
            {/*                )*/}
            {/*            }*/}

            {/*            route.items?.map((r, k) => {*/}
            {/*                if (r.requiredAuth && r.path && r.component) {*/}
            {/*                    return (*/}
            {/*                        <PrivateRoute*/}
            {/*                            key={k}*/}
            {/*                            path={r.path}*/}
            {/*                            component={r.component as FunctionComponent}*/}
            {/*                        />*/}
            {/*                    )*/}
            {/*                }*/}

            {/*                if (r.path && r.component) {*/}
            {/*                    return (*/}
            {/*                        <PublicRoute*/}
            {/*                            key={k}*/}
            {/*                            path={r.path}*/}
            {/*                            component={r.component as FunctionComponent}*/}
            {/*                        />*/}
            {/*                    )*/}
            {/*                }*/}
            {/*            })*/}
            {/*        }*/}
            {/*    )*/}
            {/*}*/}
        </Switch>
    );
};

export default AppRouter;


interface RouteProps {
    component: ComponentType;
    path: any,
    key: number
}

const PrivateRoute: React.FC<RouteProps> = ({component: FunctionComponent, path, key}) => {
    const {token} = useContext(StoreContext);
    return (
        <Route
            key={key}
            path={path}
            exact={true}
            render={({location}) =>
                token ? (
                    <FunctionComponent/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

const PublicRoute: React.FC<RouteProps> = ({component: FunctionComponent, path, key}) => {
    return (
        <Route
            key={key}
            path={path}
            exact={true}
            render={({location}) =>
               <FunctionComponent/>
            }
        />
    );
}