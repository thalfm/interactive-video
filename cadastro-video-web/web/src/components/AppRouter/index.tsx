import React, {ComponentType, FunctionComponent, useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes";
import StoreContext from '../Store/StoreContext';


export const AppRouter: React.FC = () => {

    return (
        <Switch>
            {
                routes.map((route, key) => {

                        if (route.requiredAuth) {
                            return (
                                <PrivateRoute
                                    key={key}
                                    path={route.path}
                                    component={route.component as FunctionComponent}
                                />
                            )
                        }

                        return (
                            <PublicRoute
                                key={key}
                                path={route.path}
                                component={route.component as FunctionComponent}
                            />
                        )

                    }
                )
            }
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