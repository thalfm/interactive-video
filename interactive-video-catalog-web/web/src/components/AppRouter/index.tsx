import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "../../pages/Home";
import VideoPlayer from "../../pages/VideoPlayer";

export const AppRouter: React.FC = () => {

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/video" exact component={VideoPlayer} />
        </Switch>
    );
};

export default AppRouter;