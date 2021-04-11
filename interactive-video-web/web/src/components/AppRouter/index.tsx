import React from 'react';
import {Route, Switch} from "react-router-dom";
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
        </Switch>
    );
};

export default AppRouter;