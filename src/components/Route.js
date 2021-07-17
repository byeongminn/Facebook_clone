import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Join from "../routes/Join";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ( {isLoggedIn, userObj} ) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ?
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/Profile">
                            <Profile />
                        </Route>
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