import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "../routing/routing";

import SideNavigation from "../components/ui/sideNavigation/sideNavigation";

import "./app.scss";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3">
                            <SideNavigation />
                        </div>
                        <div className="col-12 col-lg-9">
                            <Routing />
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
