import React from "react";
import { NavLink } from "react-router-dom";
import getRoute from "../../../routing/routingService";

import "./sideNavigation.scss";

const SideNavigation = () => {
    return (
        <>
            <nav className="sideNavigation">
                <ul>
                    <li>
                        <NavLink
                            className="sideNavLink"
                            to={getRoute("main")}
                            activeClassName="active"
                        >
                            <div className="sideNavLinkName">CustomArray</div>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            className="sideNavLink"
                            to={getRoute("material")}
                            activeClassName="active"
                        >
                            <div className="sideNavLinkName">
                                MaterialUiArray
                            </div>
                        </NavLink>
                    </li> */}
                </ul>
            </nav>
        </>
    );
};

export default SideNavigation;
