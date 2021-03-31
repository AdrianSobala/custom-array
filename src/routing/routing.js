import React from "react";
import { Route, Switch } from "react-router-dom";
import getRoute from "./routingService";

import MainPage from "../components/pages/mainPage/mainPage";
import MaterialUiArrayPage from "../components/pages/materialUiArrayPage/materialUiArrayPage";
import NotfoundPage from "../components/pages/notfoundPage";

const Routing = (props) => {
    return (
        <Switch>
            <Route
                exact
                path={getRoute("main", true)}
                render={(props) => <MainPage {...props} />}
            />
            <Route
                exact
                path={getRoute("material", true)}
                render={(props) => <MaterialUiArrayPage {...props} />}
            />

            <Route render={(props) => <NotfoundPage {...props} />} />
        </Switch>
    );
};

export default Routing;
