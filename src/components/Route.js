import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Introduce from "../routes/Introduce";
import Join from "../routes/Join";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ( {isLoggedIn, userObj, refreshUser} ) => {
    return (
        <Router>
            {isLoggedIn && userObj.displayName !== null && <Navigation />}
            <Switch>
                {isLoggedIn ?
                    <>
                        {userObj.displayName === null?
                            <>
                                <Route exact path="/Introduce">
                                    <Introduce userObj={userObj} refreshUser={refreshUser} />
                                </Route>
                            </>
                            :
                            <>
                                <Route exact path="/">
                                    <Home userObj={userObj} />
                                </Route>
                                <Route exact path="/Profile">
                                    <Profile />
                                </Route>
                            </>}
                    </>
                    :
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Route exact path="/Join">
                            <Join />
                        </Route>
                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;